import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "./context/GameContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}