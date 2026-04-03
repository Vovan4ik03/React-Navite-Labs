import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { colors } from '../styles/homeStyles';

export default function CreateFileModal({ visible, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const fileName = trimmed.endsWith('.txt') ? trimmed : trimmed + '.txt';

    onSubmit(fileName, content);
    setName('');
    setContent('');
  };

  const handleClose = () => {
    setName('');
    setContent('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>

            <View style={styles.modal}>

              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.title}>Створити текстовий файл</Text>

                <TouchableOpacity onPress={handleClose}>
                  <Text style={styles.close}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* CONTENT */}
              <ScrollView keyboardShouldPersistTaps="handled">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Імʼя файлу"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                />

                <TextInput
                  value={content}
                  onChangeText={setContent}
                  placeholder="Початковий вміст"
                  placeholderTextColor={colors.muted}
                  style={[styles.input, styles.textArea]}
                  multiline
                  textAlignVertical="top"
                />
              </ScrollView>

              {/* BUTTONS */}
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, styles.cancel]}
                  onPress={handleClose}
                >
                  <Text style={styles.buttonText}>Скасувати</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.save]}
                  onPress={handleCreate}
                >
                  <Text style={styles.buttonText}>Створити</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: 16,
  },

  modal: {
    backgroundColor: colors.panel,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: '80%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },

  close: {
    fontSize: 22,
    color: colors.muted,
  },

  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },

  textArea: {
    minHeight: 120,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  button: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancel: {
    backgroundColor: colors.cardSoft,
  },

  save: {
    backgroundColor: colors.green,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});