import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/homeStyles';

export default function PathBar({ currentPath, onGoUp, canGoUp }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Поточний шлях</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.path}>{currentPath}</Text>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.upButton, !canGoUp && styles.disabled]}
          onPress={onGoUp}
          disabled={!canGoUp}
        >
          <Text style={styles.upButtonText}>⬆ Вгору</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 6,
  },
  path: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  upButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  upButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  disabled: {
    opacity: 0.45,
  },
});