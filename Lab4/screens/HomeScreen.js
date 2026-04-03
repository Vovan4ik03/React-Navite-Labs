import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';
import styles from '../styles/homeStyles';
import { getStorageInfo, formatBytes } from '../utils/storage';

const ROOT = FileSystem.documentDirectory;

export default function HomeScreen() {
  const [currentDir, setCurrentDir] = useState(ROOT);
  const [items, setItems] = useState([]);
  const [storage, setStorage] = useState(null);

  const [folderModal, setFolderModal] = useState(false);
  const [fileModal, setFileModal] = useState(false);
  const [editorModal, setEditorModal] = useState(false);

  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const [currentFile, setCurrentFile] = useState('');

  useEffect(() => {
    loadDir();
    loadStorage();
  }, [currentDir]);

  const loadStorage = async () => {
    const data = await getStorageInfo();
    setStorage(data);
  };

  const loadDir = async () => {
    const files = await FileSystem.readDirectoryAsync(currentDir);

    const detailed = await Promise.all(
      files.map(async (name) => {
        const uri = currentDir + name;
        const info = await FileSystem.getInfoAsync(uri, { size: true });

        return {
          name,
          uri,
          isDirectory: info.isDirectory,
          size: info.size || 0,
          modificationTime: info.modificationTime,
        };
      })
    );

    detailed.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    setItems(detailed);
  };

  const goUp = () => {
    if (currentDir === ROOT) return;
    const parent = currentDir.split('/').slice(0, -2).join('/') + '/';
    setCurrentDir(parent);
  };

  const openItem = async (item) => {
    if (item.isDirectory) {
      setCurrentDir(item.uri + '/');
    } else {
      const content = await FileSystem.readAsStringAsync(item.uri);
      setCurrentFile(item.uri);
      setFileContent(content);
      setEditorModal(true);
    }
  };

  const saveFile = async () => {
    await FileSystem.writeAsStringAsync(currentFile, fileContent);
    setEditorModal(false);
    loadDir();
  };

  const createFolder = async () => {
    if (!folderName.trim()) return;

    await FileSystem.makeDirectoryAsync(currentDir + folderName);
    setFolderName('');
    setFolderModal(false);
    loadDir();
  };

  const createFile = async () => {
    if (!fileName.trim()) return;

    const name = fileName.endsWith('.txt')
      ? fileName
      : fileName + '.txt';

    await FileSystem.writeAsStringAsync(
      currentDir + name,
      fileContent || ''
    );

    setFileName('');
    setFileContent('');
    setFileModal(false);
    loadDir();
  };

  const deleteItem = (item) => {
    Alert.alert('Delete', item.name, [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: async () => {
          await FileSystem.deleteAsync(item.uri);
          loadDir();
        },
      },
    ]);
  };

  const showInfo = (item) => {
    Alert.alert(
      'Info',
      `Name: ${item.name}
Type: ${item.isDirectory ? 'Folder' : 'File'}
Size: ${formatBytes(item.size)}
Modified: ${new Date(item.modificationTime * 1000)}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>File Manager</Text>

      {/* STORAGE */}
      {storage && (
        <View style={styles.storageCard}>
          <Text>Total: {formatBytes(storage.total)}</Text>
          <Text>Used: {formatBytes(storage.used)}</Text>
          <Text>Free: {formatBytes(storage.free)}</Text>
        </View>
      )}

      {/* PATH */}
      <View style={styles.pathCard}>
        <Text numberOfLines={2}>{currentDir}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.topButtonsRow}>
        <TouchableOpacity style={styles.upButton} onPress={goUp}>
          <Text style={styles.actionButtonText}>⬆ Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.folderButton}
          onPress={() => setFolderModal(true)}
        >
          <Text style={styles.actionButtonText}>📁 Folder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fileButton}
          onPress={() => setFileModal(true)}
        >
          <Text style={styles.actionButtonText}>📄 File</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <TouchableOpacity
              style={styles.itemMain}
              onPress={() => openItem(item)}
            >
              <Text style={styles.itemIcon}>
                {item.isDirectory ? '📁' : '📄'}
              </Text>

              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                  {item.isDirectory
                    ? 'Folder'
                    : formatBytes(item.size)}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.itemActions}>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => showInfo(item)}
              >
                <Text style={styles.smallButtonText}>Info</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item)}
              >
                <Text style={styles.smallButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* CREATE FOLDER */}
      <Modal visible={folderModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Create Folder</Text>
              <TouchableOpacity onPress={() => setFolderModal(false)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={folderName}
              onChangeText={setFolderName}
            />

            <TouchableOpacity style={styles.confirmBtn} onPress={createFolder}>
              <Text style={{ color: '#fff' }}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* CREATE FILE */}
      <Modal visible={fileModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Create File</Text>
              <TouchableOpacity onPress={() => setFileModal(false)}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={fileName}
              onChangeText={setFileName}
            />

            <TextInput
              style={styles.input}
              placeholder="Content"
              value={fileContent}
              onChangeText={setFileContent}
              multiline
            />

            <TouchableOpacity style={styles.confirmBtn} onPress={createFile}>
              <Text style={{ color: '#fff' }}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* EDITOR */}
      <Modal visible={editorModal}>
        <SafeAreaView style={styles.editorContainer}>
          <TextInput
            style={styles.editorInput}
            multiline
            value={fileContent}
            onChangeText={setFileContent}
          />

          <TouchableOpacity style={styles.confirmBtn} onPress={saveFile}>
            <Text style={{ color: '#fff' }}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}