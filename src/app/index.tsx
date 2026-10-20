import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type Stay = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: string;
  category: string;
  image: string;
  images: string[];
  dates: string;
  description: string;
};

type ExploreProps = {
  savedIds: string[];
  onToggleSaved: (id: string) => void;
};

const ink = "#18231e";
const muted = "#777e78";
const green = "#184e3d";
const materialIcons: Record<string, string> = {
  sparkles: "auto_awesome",
  "sun.max": "wb_sunny",
  "water.waves": "water",
  "figure.pool.swim": "pool",
  house: "house",
  "arrow.left": "arrow_back",
  "heart.fill": "favorite",
  heart: "favorite_border",
  "star.fill": "star",
  "checkmark.seal.fill": "verified",
  leaf: "eco",
  wifi: "wifi",
  magnifyingglass: "search",
  "slider.horizontal.3": "tune",
  sparkle: "auto_awesome",
  "arrow.up.arrow.down": "swap_vert",
};
const categories = [
  { label: "All stays", icon: "sparkles" },
  { label: "Tropical", icon: "sun.max" },
  { label: "Beachfront", icon: "water.waves" },
  { label: "Pools", icon: "figure.pool.swim" },
  { label: "Cabins", icon: "house" },
];

export const stays: Stay[] = [
  {
    id: "palm-house",
    name: "Palm House Escape",
    location: "Ubud, Bali",
    price: 248,
    rating: "4.98",
    category: "Tropical",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    ],
    dates: "Jun 12 – 17",
    description:
      "Wake to birdsong in a secluded jungle villa, with an open-air living space and your own private plunge pool.",
  },
  {
    id: "garden-villa",
    name: "The Garden Villa",
    location: "Canggu, Bali",
    price: 186,
    rating: "4.92",
    category: "Pools",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    ],
    dates: "Jun 20 – 25",
    description:
      "A warm, modern hideaway tucked into a leafy garden, just a short ride from the coast and local cafés.",
  },
  {
    id: "lagoon-cottage",
    name: "Lagoon House",
    location: "Nusa Penida, Indonesia",
    price: 214,
    rating: "4.89",
    category: "Beachfront",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
    dates: "Jul 02 – 08",
    description:
      "Slow island mornings, breezy interiors and a turquoise lagoon just beyond the garden gate.",
  },
  {
    id: "coastal-retreat",
    name: "Coastal Retreat",
    location: "Phuket, Thailand",
    price: 295,
    rating: "5.0",
    category: "Beachfront",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    dates: "Jul 14 – 19",
    description:
      "A peaceful coastal home framed by palms, designed for long lunches and sunset swims.",
  },
];

function Icon({
  name,
  color = ink,
  size = 19,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  return (
    <SymbolView
      name={{
        ios: name as never,
        android: (materialIcons[name] ?? name) as never,
        web: (materialIcons[name] ?? name) as never,
      }}
      tintColor={color}
      size={size}
      fallback={<Text style={{ color, fontSize: size }}>•</Text>}
    />
  );
}

export default function ExploreScreen({
  savedIds,
  onToggleSaved,
}: ExploreProps) {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const desktopLayout = Platform.OS === "web" && windowWidth >= 900;
  const columnCount = desktopLayout ? 3 : 1;
  const cardPhotoWidth = desktopLayout
    ? (Math.min(windowWidth, 1320) - 112) / 3
    : windowWidth - 36;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All stays");
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [bookingRequested, setBookingRequested] = useState(false);

  const visibleStays = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stays.filter((stay) => {
      const matchesCategory =
        category === "All stays" || stay.category === category;
      const matchesSearch =
        !normalizedQuery ||
        `${stay.name} ${stay.location}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.pageContent}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>
              tropica<Text style={styles.brandDot}>.</Text>
            </Text>
            <Text style={styles.brandSubtitle}>Find your somewhere</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Your profile"
            style={styles.avatarSmall}
          >
            <Text style={styles.avatarSmallText}>M</Text>
          </Pressable>
        </View>
        <View style={styles.searchShell}>
          <Icon name="magnifyingglass" color={green} size={20} />
          <TextInput
            accessibilityLabel="Search places to stay"
            placeholder="Where do you want to wake up?"
            placeholderTextColor="#89918b"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            returnKeyType="search"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search filters"
            style={styles.filterButton}
          >
            <Icon name="slider.horizontal.3" color="#fff" size={18} />
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((item) => {
            const active = category === item.label;
            return (
              <Pressable
                key={item.label}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setCategory(item.label)}
                style={[
                  styles.categoryItem,
                  active && styles.categoryItemActive,
                ]}
              >
                <View style={styles.categoryIconWrap}>
                  <Icon
                    name={item.icon}
                    color={active ? green : "#7c847e"}
                    size={24}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    active && styles.categoryLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Somewhere sunny</Text>
            <Text style={styles.sectionSubtitle}>
              Handpicked stays for your next escape
            </Text>
          </View>
          <Pressable accessibilityRole="button" style={styles.sortButton}>
            <Icon name="arrow.up.arrow.down" color={ink} size={16} />
          </Pressable>
        </View>
        <FlatList
          key={`stays-${columnCount}`}
          data={visibleStays}
          keyExtractor={(item) => item.id}
          numColumns={columnCount}
          columnWrapperStyle={
            columnCount > 1 ? styles.desktopStayRow : undefined
          }
          contentContainerStyle={[
            styles.stayList,
            desktopLayout && styles.desktopStayList,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No stays found</Text>
              <Text style={styles.emptyCopy}>
                Try a different place or category.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const saved = savedIds.includes(item.id);
            return (
              <View
                style={[
                  styles.stayCard,
                  desktopLayout && styles.desktopStayCard,
                ]}
              >
                <View
                  style={[
                    styles.cardImageWrap,
                    desktopLayout && styles.desktopCardImageWrap,
                  ]}
                >
                  <ImageCarousel
                    images={item.images}
                    imageStyle={styles.cardImage}
                    accessibilityLabel={`${item.name} photo`}
                    onImagePress={() => setSelectedStay(item)}
                    pageWidth={cardPhotoWidth}
                  />
                  <View pointerEvents="none" style={styles.guestFavorite}>
                    <Icon name="sparkle" size={12} color={green} />
                    <Text style={styles.favoriteText}>Guest favorite</Text>
                  </View>
                  <Pressable
                    style={styles.heartButton}
                    accessibilityRole="button"
                    accessibilityLabel={
                      saved
                        ? `Remove ${item.name} from wishlist`
                        : `Save ${item.name} to wishlist`
                    }
                    onPress={() => onToggleSaved(item.id)}
                  >
                    <Icon
                      name={saved ? "heart.fill" : "heart"}
                      color={saved ? "#d34b61" : "#fff"}
                      size={20}
                    />
                  </Pressable>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`View ${item.name}`}
                  onPress={() => setSelectedStay(item)}
                  style={styles.cardInfo}
                >
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.cardRating}>
                      <Icon name="star.fill" size={12} />
                      <Text style={styles.cardRatingText}>{item.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                  <Text style={styles.cardDates}>
                    {item.dates} · Tropical retreat
                  </Text>
                  <Text style={styles.cardPrice}>
                    <Text style={styles.cardPriceStrong}>${item.price}</Text>{" "}
                    night
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
      <StayDetailModal
        stay={selectedStay}
        saved={selectedStay ? savedIds.includes(selectedStay.id) : false}
        bookingRequested={bookingRequested}
        insets={insets}
        pageWidth={windowWidth}
        onClose={() => {
          setSelectedStay(null);
          setBookingRequested(false);
        }}
        onToggleSaved={() => {
          if (selectedStay) onToggleSaved(selectedStay.id);
        }}
        onReserve={() => setBookingRequested(true)}
      />
    </View>
  );
}

function StayDetailModal({
  stay,
  saved,
  bookingRequested,
  insets,
  pageWidth,
  onClose,
  onToggleSaved,
  onReserve,
}: {
  stay: Stay | null;
  saved: boolean;
  bookingRequested: boolean;
  insets: ReturnType<typeof useSafeAreaInsets>;
  pageWidth: number;
  onClose: () => void;
  onToggleSaved: () => void;
  onReserve: () => void;
}) {
  const { height: windowHeight } = useWindowDimensions();
  const [translateY] = useState(() => new Animated.Value(windowHeight));
  const [backdropOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!stay) return;

    translateY.setValue(windowHeight);
    backdropOpacity.setValue(0);
    const animation = Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 560,
        easing: Easing.bezier(0.22, 0.78, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 440,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [backdropOpacity, stay, translateY, windowHeight]);

  const closeDetail = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: windowHeight,
        duration: 460,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 340,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onClose();
    });
  };

  return (
    <Modal
      visible={stay !== null}
      animationType="none"
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={closeDetail}
    >
      {stay && (
        <View style={styles.detailModalRoot}>
          <Animated.View
            pointerEvents="none"
            style={[styles.detailBackdrop, { opacity: backdropOpacity }]}
          />
          <Animated.View
            style={[styles.detailSheet, { transform: [{ translateY }] }]}
          >
            <View style={[styles.screen, { paddingTop: insets.top }]}>
              <ScrollView
                contentContainerStyle={styles.detailContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.detailImageWrap}>
                  <ImageCarousel
                    images={stay.images}
                    imageStyle={styles.detailImage}
                    accessibilityLabel={`${stay.name} photo`}
                    pageWidth={pageWidth}
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Back to stays"
                    onPress={closeDetail}
                    style={[styles.floatingButton, styles.backButton]}
                  >
                    <Icon name="arrow.left" />
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      saved ? "Remove from wishlist" : "Save to wishlist"
                    }
                    onPress={onToggleSaved}
                    style={[styles.floatingButton, styles.detailHeart]}
                  >
                    <Icon
                      name={saved ? "heart.fill" : "heart"}
                      color={saved ? "#d34b61" : ink}
                    />
                  </Pressable>
                </View>
                <View style={styles.detailBody}>
                  <View style={styles.titleRatingRow}>
                    <View style={styles.detailTitleWrap}>
                      <Text style={styles.eyebrow}>
                        A LITTLE PIECE OF PARADISE
                      </Text>
                      <Text style={styles.detailTitle}>{stay.name}</Text>
                      <Text style={styles.detailLocation}>
                        {stay.location} · {stay.dates}
                      </Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Icon name="star.fill" size={14} />
                      <Text style={styles.ratingText}>{stay.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.rule} />
                  <View style={styles.hostRow}>
                    <View style={styles.hostAvatar}>
                      <Text style={styles.hostInitial}>A</Text>
                    </View>
                    <View style={styles.hostCopy}>
                      <Text style={styles.hostName}>Hosted by Anika</Text>
                      <Text style={styles.hostMeta}>
                        Superhost · 6 years hosting
                      </Text>
                    </View>
                    <Icon name="checkmark.seal.fill" color={green} size={21} />
                  </View>
                  <View style={styles.rule} />
                  <Text style={styles.sectionHeading}>
                    Facility &amp; Equipments
                  </Text>
                  <Amenity
                    icon="star.fill"
                    title="Top 10% of homes"
                    subtitle="This home is highly ranked based on rating reviews, and reliability"
                  />
                  <Amenity
                    icon="water.waves"
                    title="Private pool"
                    subtitle="A peaceful swim, any time of day"
                  />
                  <Amenity
                    icon="leaf"
                    title="Tropical garden"
                    subtitle="A little extra calm, right outside"
                  />
                  <View style={styles.rule} />
                  <Text style={styles.sectionHeading}>
                    Your island hideaway
                  </Text>
                  <Text style={styles.description}>{stay.description}</Text>
                </View>
              </ScrollView>
              <View
                style={[
                  styles.bookingBar,
                  { paddingBottom: Math.max(insets.bottom, 12) },
                ]}
              >
                <View>
                  <Text style={styles.priceLine}>
                    <Text style={styles.priceAmount}>${stay.price}</Text>
                    <Text style={styles.priceUnit}> / night</Text>
                  </Text>
                  <Text style={styles.underlinedDates}>{stay.dates}</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={onReserve}
                  style={({ pressed }) => [
                    styles.reserveButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.reserveText}>
                    {bookingRequested ? "Request sent ✓" : "Reserve"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </Modal>
  );
}

function ImageCarousel({
  images,
  imageStyle,
  accessibilityLabel,
  onImagePress,
  pageWidth,
}: {
  images: string[];
  imageStyle: object;
  accessibilityLabel: string;
  onImagePress?: () => void;
  pageWidth: number;
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <View style={styles.carousel}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={images.length > 1}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          setActiveImage(
            Math.round(event.nativeEvent.contentOffset.x / pageWidth),
          );
        }}
      >
        {images.map((uri, index) => (
          <Pressable
            key={`${uri}-${index}`}
            accessibilityRole={onImagePress ? "button" : undefined}
            accessibilityLabel={
              onImagePress
                ? `View ${accessibilityLabel}`
                : `${accessibilityLabel} ${index + 1} of ${images.length}`
            }
            onPress={onImagePress}
            style={[styles.carouselPage, { width: pageWidth }]}
          >
            <Image
              source={uri}
              style={imageStyle}
              contentFit="cover"
              transition={180}
              accessibilityLabel={`${accessibilityLabel} ${index + 1} of ${images.length}`}
            />
          </Pressable>
        ))}
      </ScrollView>
      {images.length > 1 && (
        <View style={styles.imageDots}>
          {images.map((_, index) => (
            <View key={index} style={styles.dotHitTarget}>
              <View
                style={[styles.dot, activeImage === index && styles.dotActive]}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function Amenity({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.amenityRow}>
      <View style={styles.amenityIcon}>
        <Icon name={icon} color={green} size={19} />
      </View>
      <View>
        <Text style={styles.amenityTitle}>{title}</Text>
        <Text style={styles.amenitySubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  pageContent: {
    flex: 1,
    width: "100%",
    maxWidth: 1320,
    alignSelf: "center",
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    color: green,
    fontSize: 25,
    lineHeight: 29,
    fontWeight: "800",
    letterSpacing: -1.2,
  },
  brandDot: { color: "#e09a56" },
  brandSubtitle: {
    color: muted,
    fontSize: 11,
    marginTop: 1,
    letterSpacing: 0.3,
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#e7efe7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d5e2d6",
  },
  avatarSmallText: { fontSize: 14, fontWeight: "700", color: green },
  searchShell: {
    marginHorizontal: 18,
    height: 56,
    borderWidth: 1,
    borderColor: "#e4e8e3",
    borderRadius: 18,
    paddingLeft: 15,
    paddingRight: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    shadowColor: "#243329",
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  searchInput: { flex: 1, color: ink, fontSize: 13, paddingVertical: 8 },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: green,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryScroll: { height: 100, flexGrow: 0, marginTop: 16 },
  categoryRow: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    gap: 21,
    alignItems: "center",
  },
  categoryItem: {
    alignItems: "center",
    minWidth: 55,
    minHeight: 80,
    gap: 4,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  categoryIconWrap: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryItemActive: { borderBottomColor: green },
  categoryLabel: { color: "#7b827d", fontSize: 10, fontWeight: "500" },
  categoryLabelActive: { color: green, fontWeight: "700" },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: ink,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  sectionSubtitle: { color: muted, fontSize: 11, marginTop: 3 },
  sortButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e6e9e6",
  },
  stayList: { paddingHorizontal: 18, paddingTop: 2, paddingBottom: 120 },
  stayCard: { marginBottom: 19 },
  desktopStayList: { paddingHorizontal: 32, paddingBottom: 72 },
  desktopStayRow: { gap: 24, alignItems: "flex-start" },
  desktopStayCard: { flex: 1, minWidth: 0, marginBottom: 30 },
  cardImageWrap: {
    height: 218,
    width: "100%",
    borderRadius: 19,
    overflow: "hidden",
    backgroundColor: "#e3e9e3",
  },
  desktopCardImageWrap: {
    height: 315,
    aspectRatio: 1.28,
    borderRadius: 18,
  },
  carousel: { ...StyleSheet.absoluteFill },
  carouselPage: { height: "100%", width: "100%" },
  cardImage: { width: "100%", height: "100%" },
  guestFavorite: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    zIndex: 1,
  },
  favoriteText: { fontSize: 10, color: ink, fontWeight: "600" },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    backgroundColor: "rgba(24,35,30,0.28)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  imageDots: {
    position: "absolute",
    bottom: 11,
    alignSelf: "center",
    flexDirection: "row",
    gap: 4,
    backgroundColor: "rgba(24,35,30,0.22)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 5,
    zIndex: 2,
  },
  dotHitTarget: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.65)",
  },
  dotActive: { width: 5, height: 5, backgroundColor: "#fff" },
  cardInfo: { paddingTop: 10, paddingHorizontal: 2 },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTitle: { color: ink, fontSize: 14, fontWeight: "700", flex: 1 },
  cardRating: { flexDirection: "row", alignItems: "center", gap: 4 },
  cardRatingText: { color: ink, fontSize: 11, fontWeight: "600" },
  cardLocation: { color: muted, fontSize: 12, marginTop: 3 },
  cardDates: { color: "#858b86", fontSize: 11, marginTop: 3 },
  cardPrice: { color: ink, fontSize: 12, marginTop: 6 },
  cardPriceStrong: { fontWeight: "700" },
  emptyState: { alignItems: "center", paddingTop: 80 },
  emptyTitle: { color: ink, fontSize: 17, fontWeight: "700" },
  emptyCopy: { color: muted, fontSize: 13, marginTop: 6 },
  detailModalRoot: { flex: 1, justifyContent: "flex-end" },
  detailBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 27, 21, 0.18)",
  },
  detailSheet: {
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: "#101a14",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  detailContent: { paddingBottom: 20 },
  detailImageWrap: {
    height: 300,
    backgroundColor: "#e3e9e3",
    overflow: "hidden",
  },
  detailImage: { width: "100%", height: "100%" },
  floatingButton: {
    position: "absolute",
    top: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  backButton: { left: 16 },
  detailHeart: { right: 16 },
  detailBody: { paddingHorizontal: 21, paddingTop: 20 },
  titleRatingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  detailTitleWrap: { flex: 1 },
  eyebrow: {
    color: green,
    fontSize: 9,
    letterSpacing: 1.3,
    fontWeight: "700",
    marginBottom: 6,
  },
  detailTitle: {
    color: ink,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: -0.6,
  },
  detailLocation: { color: muted, fontSize: 12, marginTop: 5 },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingTop: 18,
  },
  ratingText: { color: ink, fontSize: 12, fontWeight: "700" },
  rule: { height: 1, backgroundColor: "#eceeeb", marginVertical: 16 },
  hostRow: { flexDirection: "row", alignItems: "center" },
  hostAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e6d9c4",
    alignItems: "center",
    justifyContent: "center",
  },
  hostInitial: { color: "#735a3f", fontSize: 16, fontWeight: "700" },
  hostCopy: { flex: 1, marginLeft: 11 },
  hostName: { color: ink, fontSize: 13, fontWeight: "700" },
  hostMeta: { color: muted, fontSize: 11, marginTop: 3 },
  sectionHeading: {
    color: ink,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 7,
  },
  description: { color: "#656d67", fontSize: 12, lineHeight: 19 },
  amenities: { gap: 13, marginTop: 16 },
  amenityRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  amenityIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#eef4ed",
    alignItems: "center",
    justifyContent: "center",
  },
  amenityTitle: { color: ink, fontSize: 12, fontWeight: "600" },
  amenitySubtitle: { color: muted, fontSize: 10, marginTop: 2 },
  bookingBar: {
    minHeight: 75,
    borderTopWidth: 1,
    borderTopColor: "#eceeeb",
    paddingHorizontal: 20,
    paddingTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  priceLine: { color: ink },
  priceAmount: { color: ink, fontSize: 16, fontWeight: "700" },
  priceUnit: { color: muted, fontSize: 11 },
  underlinedDates: {
    color: ink,
    fontSize: 10,
    marginTop: 4,
    textDecorationLine: "underline",
  },
  reserveButton: {
    minWidth: 135,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#d95569",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  reserveText: { color: "#fff", fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.83 },
});
