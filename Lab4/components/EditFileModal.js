import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { colors } from '../styles/homeStyles';

export default function EditFileModal({
  visible,
  fileName,
  initialValue,
  onClose,
  onSave,
}) {
  const [text, setText] = useState(initialValue || '');

  useEffect(() => {
    setText(initialValue || '');
  }, [initialValue, visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            
            {/* HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Редагування файлу</Text>
                <Text style={styles.fileName}>{fileName}</Text>
              </View>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* EDITOR */}
            <TextInput
              value={text}
              onChangeText={setText}
              style={styles.editor}
              multiline
              textAlignVertical="top"
              placeholder="Вміст файлу"
              placeholderTextColor={colors.muted}
            />

            {/* BUTTONS */}
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.button, styles.cancel]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Закрити</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.save]}
                onPress={() => onSave(text)}
              >
                <Text style={styles.buttonText}>Зберегти</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
    paddingTop: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },

  fileName: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },

  close: {
    fontSize: 24,
    color: colors.muted,
  },

  editor: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: 16,
    padding: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },

  button: {
    flex: 1,
    padding: 14,
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