import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/homeStyles';

export default function MemoryCard({ total, free, used }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Статистика памʼяті пристрою</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Загальний обсяг</Text>
        <Text style={styles.value}>{total}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Вільний простір</Text>
        <Text style={styles.value}>{free}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Зайнятий простір</Text>
        <Text style={styles.value}>{used}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 12,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
  },
  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
});