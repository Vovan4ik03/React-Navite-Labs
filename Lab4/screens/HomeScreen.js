import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

import PathBar from '../components/PathBar';
import MemoryCard from '../components/MemoryCard';
import ItemRow from '../components/ItemRow';
import CreateFolderModal from '../components/CreateFolderModal';
import CreateFileModal from '../components/CreateFileModal';
import EditFileModal from '../components/EditFileModal';
import InfoModal from '../components/InfoModal';

import { colors } from '../styles/homeStyles';
import {
  ensureRootExists,
  formatBytes,
  getParentDirectory,
  getRelativePath,
  readDirectory,
  ROOT_DIR,
} from '../utils/storage';

export default function HomeScreen() {
  const [currentDir, setCurrentDir] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);
  const [memory, setMemory] = useState({ total: '—', free: '—', used: '—' });

  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [editVisible, setEditVisible] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const canGoUp = useMemo(() => currentDir !== ROOT_DIR, [currentDir]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await ensureRootExists();

        const total = await FileSystem.getTotalDiskCapacityAsync();
        const free = await FileSystem.getFreeDiskStorageAsync();

        if (!mounted) return;

        setMemory({
          total: formatBytes(total),
          free: formatBytes(free),
          used: formatBytes(total - free),
        });

        const data = await readDirectory(ROOT_DIR);
        if (mounted) setItems(data);
      } catch (e) {
        Alert.alert('Помилка', e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await readDirectory(currentDir);
        if (mounted) setItems(data);
      } catch (e) {
        Alert.alert('Помилка читання', e.message);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [currentDir]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();

      setMemory({
        total: formatBytes(total),
        free: formatBytes(free),
        used: formatBytes(total - free),
      });

      const data = await readDirectory(currentDir);
      setItems(data);
    } finally {
      setRefreshing(false);
    }
  };

  const handleOpen = async (item) => {
    if (item.isDirectory) {
      setCurrentDir(item.uri.endsWith('/') ? item.uri : `${item.uri}/`);
      return;
    }

    if (item.extension !== 'txt') {
      Alert.alert('Увага', 'Для перегляду та редагування підтримуються тільки .txt файли.');
      return;
    }

    try {
      const content = await FileSystem.readAsStringAsync(item.uri);
      setEditingFile(item);
      setEditingText(content);
      setEditVisible(true);
    } catch (e) {
      Alert.alert('Помилка відкриття', e.message);
    }
  };

  const handleGoUp = () => {
    if (!canGoUp) return;
    setCurrentDir(getParentDirectory(currentDir));
  };

  const handleCreateFolder = async (name) => {
    try {
      await FileSystem.makeDirectoryAsync(`${currentDir}${name}`, {
        intermediates: true,
      });
      setFolderModalVisible(false);
      onRefresh();
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  const handleCreateFile = async (name, content) => {
    try {
      const fileName = name.endsWith('.txt') ? name : `${name}.txt`;
      await FileSystem.writeAsStringAsync(`${currentDir}${fileName}`, content || '');
      setFileModalVisible(false);
      onRefresh();
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  const handleSaveFile = async (text) => {
    try {
      await FileSystem.writeAsStringAsync(editingFile.uri, text);
      setEditVisible(false);
      setEditingFile(null);
      setEditingText('');
      onRefresh();
    } catch (e) {
      Alert.alert('Помилка збереження', e.message);
    }
  };

  const handleDelete = (item) => {
    Alert.alert('Підтвердження', `Видалити "${item.name}"?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(item.uri, { idempotent: true });
            onRefresh();
          } catch (e) {
            Alert.alert('Помилка видалення', e.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.top}>
        <Text style={styles.title}>Файловий менеджер</Text>
      </View>

      <MemoryCard {...memory} />

      <PathBar
        currentPath={getRelativePath(currentDir)}
        onGoUp={handleGoUp}
        canGoUp={canGoUp}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.folderButton]}
          onPress={() => setFolderModalVisible(true)}
        >
          <Text style={styles.actionText}>📁 Нова папка</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.fileButton]}
          onPress={() => setFileModalVisible(true)}
        >
          <Text style={styles.actionText}>📄 Новий файл</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Вміст директорії</Text>
        <Text style={styles.listCount}>{items.length}</Text>
      </View>

      {loading ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Завантаження...</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.uri}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
          contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>Папка порожня</Text>
              <Text style={styles.emptySubtext}>Створи нову папку або .txt файл</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ItemRow
              item={item}
              onOpen={handleOpen}
              onDelete={handleDelete}
              onInfo={(i) => {
                setSelectedItem(i);
                setInfoVisible(true);
              }}
              onEdit={handleOpen}
            />
          )}
        />
      )}

      <CreateFolderModal
        visible={folderModalVisible}
        onClose={() => setFolderModalVisible(false)}
        onSubmit={handleCreateFolder}
      />

      <CreateFileModal
        visible={fileModalVisible}
        onClose={() => setFileModalVisible(false)}
        onSubmit={handleCreateFile}
      />

      <EditFileModal
        visible={editVisible}
        fileName={editingFile?.name}
        initialValue={editingText}
        onClose={() => setEditVisible(false)}
        onSave={handleSaveFile}
      />

      <InfoModal
        visible={infoVisible}
        item={selectedItem}
        onClose={() => setInfoVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  top: {
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  folderButton: {
    backgroundColor: colors.greenDark,
  },
  fileButton: {
    backgroundColor: colors.blueDark,
  },
  actionText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  listTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  listCount: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySubtext: {
    color: colors.muted,
    fontSize: 14,
  },
});