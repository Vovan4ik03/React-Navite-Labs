import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Реєстрація</Text>

      <TextInput
        placeholder="Електронна пошта"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Пароль"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput placeholder="Пароль (ще раз)" style={styles.input} />
      <TextInput placeholder="Прізвище" style={styles.input} />
      <TextInput placeholder="Ім'я" style={styles.input} />

      <Button title="Зареєструватися" onPress={() => alert('OK')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  header: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
});
