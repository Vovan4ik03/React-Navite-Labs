import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TasksScreen from "../screens/TasksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Гра") {
              iconName = focused ? "game-controller" : "game-controller-outline";
            } else if (route.name === "Завдання") {
              iconName = focused ? "checkbox" : "checkbox-outline";
            } else if (route.name === "Налаштування") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",

          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
          },

          headerShown: false,
        })}
      >
        <Tab.Screen name="Гра" component={HomeScreen} />
        <Tab.Screen name="Завдання" component={TasksScreen} />
        <Tab.Screen name="Налаштування" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}