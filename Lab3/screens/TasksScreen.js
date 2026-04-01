import React, { useContext } from "react";
import { View, Text } from "react-native";
import { GameContext } from "../context/GameContext";
import {
  createStyles,
  lightTheme,
  darkTheme,
} from "../styles/globalStyles";

export default function TasksScreen() {
  const { tasks, darkMode } = useContext(GameContext);

  const theme = darkMode ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.card}>
          <Text style={styles.text}>
            {task.done ? "✔️" : "❌"} {task.title}
          </Text>
        </View>
      ))}
    </View>
  );
}