import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [navigation, item.title]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.author}>Опублікував: Редакція NewsApp</Text>
        <Text style={styles.date}>2 березня 2026</Text>
      </View>

      <Text style={styles.desc}>
        {item.description}{"\n\n"}
        Сьогодні вранці в гірському регіоні спостерігалося рідкісне природне
        явище — м’яке золоте світло, що проходило крізь туманні шари долини,
        створювало враження казкового пейзажу. Місцеві фотографи назвали цей
        момент одним із найкрасивіших світанків сезону.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },

  image: { width: "100%", height: 220, borderRadius: 14 },

  title: { marginTop: 14, fontSize: 24, fontWeight: "700" },

  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  author: {
    fontSize: 13,
    color: "#666",
  },

  date: {
    fontSize: 13,
    color: "#666",
  },

  desc: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.85,
  },
});