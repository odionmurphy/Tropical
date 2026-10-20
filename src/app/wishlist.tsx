import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Stay } from "./index";

type WishlistProps = { stays: Stay[]; onExplore: () => void };

export default function WishlistScreen({ stays, onExplore }: WishlistProps) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 24 }}
    >
      <Text style={styles.eyebrow}>YOUR LITTLE COLLECTION</Text>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>Keep the places you love close.</Text>
      {stays.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <SymbolView
              name={{
                ios: "heart",
                android: "favorite_border",
                web: "favorite_border",
              }}
              tintColor="#184e3d"
              size={27}
            />
          </View>
          <Text style={styles.emptyTitle}>A few favorites, perhaps?</Text>
          <Text style={styles.emptyCopy}>
            Tap the heart on a stay to save it here for later.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={onExplore}
            style={styles.exploreButton}
          >
            <Text style={styles.exploreButtonText}>Explore stays</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.list}>
          {stays.map((stay) => (
            <View key={stay.id} style={styles.card}>
              <Image
                source={stay.image}
                style={styles.image}
                contentFit="cover"
              />
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{stay.name}</Text>
                <Text style={styles.location}>{stay.location}</Text>
                <Text style={styles.price}>
                  ${stay.price}
                  <Text style={styles.perNight}> / night</Text>
                </Text>
              </View>
              <SymbolView
                name={{
                  ios: "heart.fill",
                  android: "favorite",
                  web: "favorite",
                }}
                tintColor="#d95569"
                size={20}
                style={styles.heart}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  eyebrow: {
    marginHorizontal: 20,
    color: "#184e3d",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  title: {
    marginHorizontal: 20,
    marginTop: 5,
    color: "#18231e",
    fontSize: 29,
    fontWeight: "700",
    letterSpacing: -0.8,
  },
  subtitle: {
    marginHorizontal: 20,
    marginTop: 5,
    color: "#777e78",
    fontSize: 12,
  },
  emptyCard: {
    marginHorizontal: 20,
    marginTop: 34,
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 34,
    alignItems: "center",
    backgroundColor: "#f5f8f4",
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#e6efe5",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    marginTop: 16,
    color: "#18231e",
    fontSize: 17,
    fontWeight: "700",
  },
  emptyCopy: {
    maxWidth: 235,
    marginTop: 7,
    color: "#777e78",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  exploreButton: {
    marginTop: 20,
    minHeight: 43,
    borderRadius: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#184e3d",
  },
  exploreButtonText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  list: { paddingHorizontal: 18, paddingTop: 22, gap: 14 },
  card: {
    minHeight: 108,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#edf0ed",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  image: { width: 112, height: 108, backgroundColor: "#e6ebe5" },
  cardBody: { flex: 1, paddingHorizontal: 12 },
  cardName: { color: "#18231e", fontSize: 13, fontWeight: "700" },
  location: { color: "#777e78", fontSize: 11, marginTop: 4 },
  price: { color: "#18231e", fontSize: 12, fontWeight: "700", marginTop: 9 },
  perNight: { color: "#777e78", fontWeight: "400" },
  heart: { marginRight: 13 },
});
