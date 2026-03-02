import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

export default function CustomDrawer(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.profile}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Макаров В</Text>
        <Text style={styles.group}>Група: ВТ-22-2</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("News")}
        >
          <Text style={styles.menuText}>📰 Новини</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Contacts")}
        >
          <Text style={styles.menuText}>📞 Контакти</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>React Native • Expo Snack</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profile: {
    padding: 18,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: { width: 84, height: 84, borderRadius: 42 },
  name: { marginTop: 10, fontSize: 18, fontWeight: "700" },
  group: { marginTop: 4, opacity: 0.7 },

  menu: { paddingTop: 10 },
  menuItem: { paddingHorizontal: 18, paddingVertical: 14 },
  menuText: { fontSize: 16, fontWeight: "600" },

  footer: { marginTop: "auto", padding: 18, borderTopWidth: 1, borderTopColor: "#eee" },
  footerText: { opacity: 0.6, fontSize: 12, textAlign: "center" },
});