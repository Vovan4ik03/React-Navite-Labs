import React from "react";
import { View, Text, SectionList, StyleSheet, SafeAreaView } from "react-native";

const DATA = [
  {
    title: "Викладачі",
    data: [
      { name: "Морозов А.В.", phone: "+380 67 123 45 67" },
      { name: "Добржанський О.О.", phone: "+380 50 234 56 78" },
    ],
  },
  {
    title: "Студенти",
    data: [
      { name: "Макаров В.Д.", phone: "+380 93 345 67 89" },
      { name: "Остапенко В.О.", phone: "+380 68 456 78 90" },
      { name: "Кардашов О.О.", phone: "+380 95 567 89 01" },
    ],
  },
];

export default function ContactsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.phone + index}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "#f4f4f4",
  },

  itemRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
  },

  phone: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
  },

  sep: {
    height: 1,
    backgroundColor: "#e6e6e6",
    marginLeft: 16,
  },
});