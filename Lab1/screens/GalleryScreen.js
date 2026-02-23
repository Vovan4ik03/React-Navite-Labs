import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      {[...Array(8)].map((_, i) => (
        <View key={i} style={styles.box} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },

  box: {
    width: '48%',
    height: 120,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 10,
  },
});
