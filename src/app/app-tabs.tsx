import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ExploreScreen, { stays } from "./index";
import MessagesScreen from "./messages";
import ProfileScreen from "./profile";
import TripsScreen from "./trips";
import WishlistScreen from "./wishlist";

const tabs = [
  {
    name: "explore",
    label: "Explore",
    ios: "magnifyingglass",
    material: "search",
  },
  {
    name: "wishlist",
    label: "Wishlist",
    ios: "heart",
    material: "favorite_border",
  },
  {
    name: "trips",
    label: "Trips",
    ios: "suitcase.rolling",
    material: "luggage",
  },
  {
    name: "messages",
    label: "Inbox",
    ios: "bubble.left.and.bubble.right",
    material: "chat",
  },
  {
    name: "profile",
    label: "Profile",
    ios: "person.crop.circle",
    material: "account_circle",
  },
];

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("explore");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "wishlist":
        return (
          <WishlistScreen
            stays={stays.filter((stay) => savedIds.includes(stay.id))}
            onExplore={() => setActiveTab("explore")}
          />
        );
      case "trips":
        return <TripsScreen onMessageHost={() => setActiveTab("messages")} />;
      case "messages":
        return <MessagesScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return (
          <ExploreScreen savedIds={savedIds} onToggleSaved={toggleSaved} />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <View
        style={[
          styles.tabBarDock,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const active = activeTab === tab.name;
            return (
              <Pressable
                key={tab.name}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setActiveTab(tab.name)}
                style={styles.tab}
              >
                <View
                  style={[styles.iconWrap, active && styles.iconWrapActive]}
                >
                  <SymbolView
                    name={{
                      ios: tab.ios as never,
                      android: tab.material as never,
                      web: tab.material as never,
                    }}
                    tintColor={active ? "#184e3d" : "#89918b"}
                    size={24}
                    fallback={<Text style={styles.fallbackIcon}>•</Text>}
                  />
                </View>
                <Text
                  style={[styles.tabLabel, active && styles.tabLabelActive]}
                >
                  {tab.label}
                </Text>
                {tab.name === "wishlist" && savedIds.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{savedIds.length}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  tabBarDock: {
    width: "100%",
    maxWidth: 820,
    alignSelf: "center",
    paddingHorizontal: 13,
    paddingTop: 7,
    backgroundColor: "#fff",
  },
  tabBar: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#f0f2ef",
    shadowColor: "#233329",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    gap: 3,
    minHeight: 58,
  },
  iconWrap: {
    width: 46,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: { backgroundColor: "#eaf1ea" },
  tabLabel: { fontSize: 9, color: "#89918b", fontWeight: "500" },
  tabLabelActive: { color: "#184e3d", fontWeight: "700" },
  fallbackIcon: { color: "#184e3d", fontSize: 20 },
  badge: {
    position: "absolute",
    top: 0,
    right: "25%",
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#d95569",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
});
