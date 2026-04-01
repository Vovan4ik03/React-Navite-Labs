import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GameContext } from "../context/GameContext";
import ClickObject from "../components/ClickObject";
import {
  createStyles,
  lightTheme,
  darkTheme,
} from "../styles/globalStyles";

export default function HomeScreen() {
  const { score, addPoints, darkMode } = useContext(GameContext);

  const theme = darkMode ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>

      <View style={styles.scoreCard}>
        <Text style={styles.text}>Очки</Text>
        <Text style={[styles.title, { marginBottom: 0 }]}>
          {score}
        </Text>
      </View>
      
      <View style={{ marginTop: 30 }}>
        <ClickObject styles={styles} />
      </View>

    </View>
  );
}