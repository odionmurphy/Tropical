import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const upcomingTrips = [
  {
    id: "bali",
    name: "Palm House Escape",
    place: "Ubud, Bali",
    dates: "Jun 12 – 17, 2026",
    guests: "2 guests",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    host: "Anika",
  },
];

export default function TripsScreen({
  onMessageHost,
}: {
  onMessageHost?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [tripFilter, setTripFilter] = useState("Upcoming");
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>YOUR NEXT CHAPTER</Text>
      <Text style={styles.title}>Trips</Text>
      <Text style={styles.subtitle}>
        All the little getaways you’re looking forward to.
      </Text>
      <View style={styles.segment}>
        {["Upcoming", "Past", "Saved"].map((filter) => {
          const selected = tripFilter === filter;
          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setTripFilter(filter)}
              style={[styles.segmentOption, selected && styles.segmentSelected]}
            >
              <Text
                style={
                  selected ? styles.segmentSelectedText : styles.segmentText
                }
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {tripFilter === "Upcoming" && upcomingTrips.length ? (
        upcomingTrips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripImageWrap}>
              <Image
                source={trip.image}
                style={styles.tripImage}
                contentFit="cover"
              />
              <View style={styles.confirmedPill}>
                <View style={styles.statusDot} />
                <Text style={styles.confirmedText}>Confirmed</Text>
              </View>
            </View>
            <View style={styles.tripBody}>
              <Text style={styles.tripName}>{trip.name}</Text>
              <Text style={styles.tripPlace}>{trip.place}</Text>
              <View style={styles.tripMetaRow}>
                <SymbolView
                  name={{
                    ios: "calendar",
                    android: "calendar_month",
                    web: "calendar_month",
                  }}
                  tintColor="#184e3d"
                  size={15}
                />
                <Text style={styles.tripMeta}>{trip.dates}</Text>
              </View>
              <View style={styles.tripMetaRow}>
                <SymbolView
                  name={{ ios: "person.2", android: "group", web: "group" }}
                  tintColor="#184e3d"
                  size={15}
                />
                <Text style={styles.tripMeta}>{trip.guests}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.hostRow}>
                <View style={styles.hostAvatar}>
                  <Text style={styles.hostInitial}>A</Text>
                </View>
                <Text style={styles.hostText}>
                  Hosted by <Text style={styles.hostName}>{trip.host}</Text>
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={onMessageHost}
                  style={styles.messageButton}
                >
                  <Text style={styles.messageButtonText}>Message host</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <SymbolView
              name={{
                ios: tripFilter === "Past" ? "sun.horizon" : "suitcase.rolling",
                android: tripFilter === "Past" ? "wb_twilight" : "luggage",
                web: tripFilter === "Past" ? "wb_twilight" : "luggage",
              }}
              tintColor="#184e3d"
              size={26}
            />
          </View>
          <Text style={styles.emptyTitle}>
            {tripFilter === "Upcoming"
              ? "Your next escape starts here"
              : tripFilter === "Past"
                ? "A new chapter awaits"
                : "Your saved trips will be right here"}
          </Text>
          <Text style={styles.emptyCopy}>
            {tripFilter === "Upcoming"
              ? "When you book a stay, all your travel details will live here."
              : tripFilter === "Past"
                ? "Past adventures will appear here after you travel."
                : "Save a stay to keep it close while you plan."}
          </Text>
        </View>
      )}
      <View style={styles.inspiration}>
        <Text style={styles.inspirationEyebrow}>A CHANGE OF SCENERY</Text>
        <Text style={styles.inspirationTitle}>Dreaming of somewhere warm?</Text>
        <Text style={styles.inspirationCopy}>
          There’s a little sunshine waiting for you.
        </Text>
      </View>
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
    letterSpacing: 1.3,
  },
  title: {
    marginHorizontal: 20,
    marginTop: 5,
    color: "#18231e",
    fontSize: 29,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  subtitle: {
    marginHorizontal: 20,
    marginTop: 5,
    color: "#777e78",
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 280,
  },
  segment: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 21,
    marginBottom: 17,
    borderRadius: 13,
    backgroundColor: "#f3f5f2",
    padding: 4,
    alignItems: "center",
  },
  segmentOption: {
    flex: 1,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  segmentSelected: {
    backgroundColor: "#fff",
    shadowColor: "#18231e",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  segmentSelectedText: { color: "#184e3d", fontSize: 11, fontWeight: "700" },
  segmentText: {
    flex: 1,
    textAlign: "center",
    color: "#858b86",
    fontSize: 11,
    fontWeight: "600",
  },
  tripCard: {
    marginHorizontal: 18,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#edf0ed",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  tripImageWrap: { height: 174, backgroundColor: "#e3e9e3" },
  tripImage: { width: "100%", height: "100%" },
  confirmedPill: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#41966b",
  },
  confirmedText: { color: "#285b40", fontSize: 10, fontWeight: "700" },
  tripBody: { padding: 15 },
  tripName: { color: "#18231e", fontSize: 17, fontWeight: "700" },
  tripPlace: { color: "#777e78", fontSize: 12, marginTop: 3, marginBottom: 12 },
  tripMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  tripMeta: { color: "#59625b", fontSize: 11 },
  divider: {
    height: 1,
    backgroundColor: "#edf0ed",
    marginTop: 15,
    marginBottom: 12,
  },
  hostRow: { flexDirection: "row", alignItems: "center" },
  hostAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e6d9c4",
    alignItems: "center",
    justifyContent: "center",
  },
  hostInitial: { color: "#735a3f", fontSize: 12, fontWeight: "700" },
  hostText: { flex: 1, marginLeft: 8, color: "#777e78", fontSize: 10 },
  hostName: { color: "#18231e", fontWeight: "700" },
  messageButton: {
    minHeight: 32,
    justifyContent: "center",
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: "#dce5dc",
    borderRadius: 11,
  },
  messageButtonText: { color: "#184e3d", fontSize: 10, fontWeight: "700" },
  emptyCard: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 21,
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "#f5f8f4",
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 19,
    backgroundColor: "#e6efe5",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    marginTop: 14,
    color: "#18231e",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyCopy: {
    maxWidth: 245,
    marginTop: 7,
    color: "#777e78",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  inspiration: {
    marginHorizontal: 18,
    marginTop: 19,
    borderRadius: 19,
    backgroundColor: "#184e3d",
    padding: 17,
  },
  inspirationEyebrow: {
    color: "#c5ddbd",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  inspirationTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 7,
  },
  inspirationCopy: { color: "#dbe9d9", fontSize: 11, marginTop: 4 },
});
