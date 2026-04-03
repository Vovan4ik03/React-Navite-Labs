import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/homeStyles';
import { formatBytes, formatDate } from '../utils/storage';

export default function InfoModal({ visible, item, onClose }) {
  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Інформація про обʼєкт</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.line}>
            <Text style={styles.label}>Назва: </Text>
            {item.name}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.label}>Тип: </Text>
            {item.isDirectory ? 'Папка' : item.extension.toUpperCase()}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.label}>Розмір: </Text>
            {item.isDirectory ? '—' : formatBytes(item.size)}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.label}>Остання модифікація: </Text>
            {formatDate(item.modificationTime)}
          </Text>

          <Text style={styles.line}>
            <Text style={styles.label}>URI: </Text>
            {item.uri}
          </Text>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: colors.panel,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  close: {
    color: colors.muted,
    fontSize: 22,
    fontWeight: '700',
  },
  line: {
    color: colors.text,
    marginBottom: 10,
    lineHeight: 22,
  },
  label: {
    fontWeight: '700',
    color: colors.muted,
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: colors.blue,
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeText: {
    color: colors.white,
    fontWeight: '700',
  },
});