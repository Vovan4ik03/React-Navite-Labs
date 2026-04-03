import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/homeStyles';
import { formatBytes, formatDate } from '../utils/storage';

export default function ItemRow({ item, onOpen, onInfo, onDelete, onEdit }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.main} onPress={() => onOpen(item)}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{item.isDirectory ? '📁' : '📄'}</Text>
        </View>

        <View style={styles.infoWrap}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.meta} numberOfLines={1}>
            {item.isDirectory
              ? `Папка • ${formatDate(item.modificationTime)}`
              : `${item.extension.toUpperCase()} • ${formatBytes(item.size)} • ${formatDate(item.modificationTime)}`}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        {!item.isDirectory && (
          <TouchableOpacity style={[styles.btn, styles.editBtn]} onPress={() => onEdit(item)}>
            <Text style={styles.btnText}>Редаг.</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.btn, styles.infoBtn]} onPress={() => onInfo(item)}>
          <Text style={styles.btnText}>Інфо</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={() => onDelete(item)}>
          <Text style={styles.btnText}>Видалити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.cardSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  infoWrap: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
  },
  infoBtn: {
    backgroundColor: colors.blue,
  },
  deleteBtn: {
    backgroundColor: colors.red,
  },
  editBtn: {
    backgroundColor: colors.green,
  },
  btnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
});