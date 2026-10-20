import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const menuItems = [
  {
    id: "personal",
    icon: "person.text.rectangle",
    android: "badge",
    title: "Personal information",
    subtitle: "Your details, your way",
  },
  {
    id: "payments",
    icon: "creditcard",
    android: "credit_card",
    title: "Payments & payouts",
    subtitle: "Your travel, made easy",
  },
  {
    id: "preferences",
    icon: "slider.horizontal.3",
    android: "tune",
    title: "Travel preferences",
    subtitle: "Tell us what you love",
  },
  {
    id: "support",
    icon: "questionmark.circle",
    android: "help_outline",
    title: "Help & support",
    subtitle: "We’re always here",
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [travelMode, setTravelMode] = useState(false);
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topline}>
        <Text style={styles.eyebrow}>YOUR TROPICAL HOMEBASE</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={() => setSelectedMenu("Settings")}
          style={styles.settingsButton}
        >
          <SymbolView
            name={{ ios: "gearshape", android: "settings", web: "settings" }}
            tintColor="#184e3d"
            size={19}
          />
        </Pressable>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>MU</Text>
          <View style={styles.avatarLeaf}>
            <SymbolView
              name={{ ios: "leaf.fill", android: "eco", web: "eco" }}
              tintColor="#fff"
              size={11}
            />
          </View>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>Murphy Usunobun</Text>
          <Text style={styles.memberSince}>Exploring the world since 2024</Text>
          <View style={styles.memberPill}>
            <SymbolView
              name={{
                ios: "sparkle",
                android: "auto_awesome",
                web: "auto_awesome",
              }}
              tintColor="#a96c32"
              size={11}
            />
            <Text style={styles.memberPillText}>Sunshine member</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setSelectedMenu("Edit profile")}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>
      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>08</Text>
          <Text style={styles.statLabel}>TRIPS</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>COUNTRIES</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statLabel}>GUEST RATING</Text>
        </View>
      </View>
      <View style={styles.travelToggle}>
        <View style={styles.travelIcon}>
          <SymbolView
            name={{ ios: "airplane", android: "flight", web: "flight" }}
            tintColor="#184e3d"
            size={19}
          />
        </View>
        <View style={styles.travelCopy}>
          <Text style={styles.travelTitle}>I’m traveling</Text>
          <Text style={styles.travelSubtitle}>
            {travelMode
              ? "Your profile is ready for hosts"
              : "Let hosts know you’re on the move"}
          </Text>
        </View>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: travelMode }}
          accessibilityLabel="Travel mode"
          onPress={() => setTravelMode((value) => !value)}
          style={[styles.switch, travelMode && styles.switchOn]}
        >
          <View
            style={[styles.switchKnob, travelMode && styles.switchKnobOn]}
          />
        </Pressable>
      </View>
      <Text style={styles.sectionHeading}>Make yourself at home</Text>
      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <View key={item.id}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedMenu(item.title)}
              style={styles.menuItem}
            >
              <View style={styles.menuIcon}>
                <SymbolView
                  name={{
                    ios: item.icon as never,
                    android: item.android as never,
                    web: item.android as never,
                  }}
                  tintColor="#184e3d"
                  size={17}
                />
              </View>
              <View style={styles.menuCopy}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <SymbolView
                name={{
                  ios: "chevron.right",
                  android: "chevron_right",
                  web: "chevron_right",
                }}
                tintColor="#9ba39c"
                size={15}
              />
            </Pressable>
            {index < menuItems.length - 1 && (
              <View style={styles.menuDivider} />
            )}
          </View>
        ))}
      </View>
      {selectedMenu ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {selectedMenu === "Edit profile"
              ? "Your profile editor is ready to connect."
              : `${selectedMenu} settings are ready to personalize.`}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setSelectedMenu("")}
          >
            <Text style={styles.noticeDismiss}>Got it</Text>
          </Pressable>
        </View>
      ) : null}
      <Pressable
        accessibilityRole="button"
        onPress={() => setSelectedMenu("Signed out")}
        style={styles.signOut}
      >
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
      <Text style={styles.version}>TROPICA · VERSION 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  topline: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyebrow: {
    color: "#184e3d",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  settingsButton: {
    width: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: "#eef4ed",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    marginHorizontal: 20,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 23,
    backgroundColor: "#dfeadf",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: "#184e3d",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  avatarLeaf: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#5b936b",
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: { flex: 1, marginLeft: 13 },
  name: { color: "#18231e", fontSize: 16, fontWeight: "700" },
  memberSince: { color: "#777e78", fontSize: 10, marginTop: 4 },
  memberPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fbf3e9",
  },
  memberPillText: { color: "#97612f", fontSize: 8, fontWeight: "700" },
  editButton: {
    borderWidth: 1,
    borderColor: "#dce5dc",
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  editText: { color: "#184e3d", fontSize: 10, fontWeight: "700" },
  statsCard: {
    minHeight: 75,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 17,
    backgroundColor: "#f5f8f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  stat: { flex: 1, alignItems: "center", gap: 4 },
  statNumber: { color: "#184e3d", fontSize: 17, fontWeight: "700" },
  statLabel: {
    color: "#879087",
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  statDivider: { height: 31, width: 1, backgroundColor: "#e2e9e0" },
  travelToggle: {
    minHeight: 68,
    marginHorizontal: 20,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#edf0ed",
    borderRadius: 16,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  travelIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: "#eef4ed",
    alignItems: "center",
    justifyContent: "center",
  },
  travelCopy: { flex: 1, marginLeft: 10 },
  travelTitle: { color: "#18231e", fontSize: 11, fontWeight: "700" },
  travelSubtitle: { color: "#89918b", fontSize: 9, marginTop: 3 },
  switch: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#d5dbd5",
    padding: 3,
    justifyContent: "center",
  },
  switchOn: { backgroundColor: "#184e3d" },
  switchKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
  },
  switchKnobOn: { alignSelf: "flex-end" },
  sectionHeading: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
    color: "#18231e",
    fontSize: 14,
    fontWeight: "700",
  },
  menuCard: {
    marginHorizontal: 20,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#edf0ed",
    paddingHorizontal: 11,
  },
  menuItem: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#f1f5f0",
    alignItems: "center",
    justifyContent: "center",
  },
  menuCopy: { flex: 1 },
  menuTitle: { color: "#25312a", fontSize: 10, fontWeight: "700" },
  menuSubtitle: { color: "#89918b", fontSize: 8, marginTop: 3 },
  menuDivider: { height: 1, backgroundColor: "#f0f2ef", marginLeft: 44 },
  notice: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: "#eef4ed",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noticeText: { flex: 1, color: "#315b42", fontSize: 10 },
  noticeDismiss: { color: "#184e3d", fontSize: 10, fontWeight: "700" },
  signOut: {
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 8,
  },
  signOutText: { color: "#bd5260", fontSize: 10, fontWeight: "700" },
  version: {
    color: "#a0a7a0",
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 4,
  },
});
