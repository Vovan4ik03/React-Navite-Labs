import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/homeStyles';

export default function CreateFolderModal({ visible, onClose, onSubmit }) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setName('');
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Створити нову папку</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Назва папки"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={handleClose}>
              <Text style={styles.buttonText}>Скасувати</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.save]} onPress={handleCreate}>
              <Text style={styles.buttonText}>Створити</Text>
            </TouchableOpacity>
          </View>
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
  input: {
    marginTop: 14,
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  cancel: {
    backgroundColor: colors.cardSoft,
  },
  save: {
    backgroundColor: colors.green,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
  },
});