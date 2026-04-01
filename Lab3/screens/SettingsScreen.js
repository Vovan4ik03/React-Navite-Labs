import React, { useContext } from "react";
import { View, Text, Switch } from "react-native";
import { GameContext } from "../context/GameContext";
import {
  createStyles,
  lightTheme,
  darkTheme,
} from "../styles/globalStyles";

export default function SettingsScreen() {
  const { darkMode, setDarkMode } = useContext(GameContext);

  const theme = darkMode ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.switchRow}>
        <Text style={styles.text}>Темна тема</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}