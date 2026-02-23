import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function NewsScreen() {
  const newsData = Array.from({ length: 8 }).map((_, i) => ({
    id: i.toString(),
    title: 'Заголовок новини',
    text: 'Короткий текст новини',
    date: 'Дата новини',
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новини</Text>

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },

  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
  },

  image: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    marginRight: 10,
    borderRadius: 6,
  },

  title: { fontWeight: 'bold' },
  date: { color: '#888', fontSize: 12 },
});
