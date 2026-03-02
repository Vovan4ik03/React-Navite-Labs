import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { generateNews } from "../data/newsData";

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(() => generateNews(10, 0));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNews(10, 0));
      setRefreshing(false);
    }, 1200);
  }, []);

  
  const loadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      setNews((prev) => [...prev, ...generateNews(6, prev.length)]);
      setLoadingMore(false);
    }, 900);
  }, [loadingMore]);

  const ListHeader = useMemo(
    () => (
      <View style={styles.listHeader}>
        <Text style={styles.h1}>Новини</Text>
        <Text style={styles.sub}>
          Доріжка цікавих новин 
        </Text>
      </View>
    ),
    []
  );

  const ListFooter = useMemo(
    () => (
      <View style={styles.listFooter}>
        <Text style={styles.footerText}>
          {loadingMore ? "Завантаження..." : "Кінець списку"}
        </Text>
      </View>
    ),
    [loadingMore]
  );

  const ItemSeparator = useCallback(() => <View style={styles.separator} />, []);

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Details", { item })}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
          <Text style={styles.cardLink}>Відкрити деталі →</Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ItemSeparatorComponent={ItemSeparator}
      
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listHeader: { padding: 16, paddingBottom: 6 },
  h1: { fontSize: 24, fontWeight: "700" },
  sub: { marginTop: 6, fontSize: 13, opacity: 0.7 },

  separator: { height: 10 },

  card: {
    marginHorizontal: 14,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardImage: { width: "100%", height: 170 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardDesc: { marginTop: 6, opacity: 0.8 },
  cardLink: { marginTop: 10, fontWeight: "600" },

  listFooter: { padding: 14, alignItems: "center" },
  footerText: { opacity: 0.7 },
});