import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ChatMessage = { id: string; text: string; time: string; mine: boolean };

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hi Anika! We can’t wait for our stay in Bali. Is the villa easy to get to from the airport?",
    time: "10:42 AM",
    mine: true,
  },
  {
    id: "2",
    text: "Hi Murphy! I’m so happy you chose Palm House 🌿 It’s about 35 minutes by car. I can arrange a driver for you if you’d like.",
    time: "10:48 AM",
    mine: false,
  },
  {
    id: "3",
    text: "That would be lovely, thank you!",
    time: "10:51 AM",
    mine: true,
  },
];

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const [openChat, setOpenChat] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}`, text, time: "Now", mine: true },
    ]);
    setDraft("");
  };

  if (openChat) {
    return (
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.chatHeader, { paddingTop: insets.top + 8 }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to inbox"
            onPress={() => setOpenChat(false)}
            style={styles.backButton}
          >
            <SymbolView
              name={{
                ios: "arrow.left",
                android: "arrow_back",
                web: "arrow_back",
              }}
              tintColor="#18231e"
              size={19}
            />
          </Pressable>
          <View style={styles.hostAvatar}>
            <Text style={styles.hostInitial}>A</Text>
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.headerName}>Anika</Text>
            <Text style={styles.headerStatus}>Your host · Bali</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Conversation details"
            style={styles.moreButton}
          >
            <SymbolView
              name={{
                ios: "ellipsis",
                android: "more_horiz",
                web: "more_horiz",
              }}
              tintColor="#18231e"
              size={20}
            />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={styles.thread}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.stayPreview}>
            <Image
              source="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80"
              style={styles.previewImage}
              contentFit="cover"
            />
            <View style={styles.previewCopy}>
              <Text style={styles.previewEyebrow}>YOUR UPCOMING STAY</Text>
              <Text style={styles.previewTitle}>Palm House Escape</Text>
              <Text style={styles.previewMeta}>Ubud, Bali · Jun 12 – 17</Text>
            </View>
          </View>
          <Text style={styles.dayLabel}>TODAY</Text>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.messageRow, message.mine && styles.messageRowMine]}
            >
              {!message.mine && (
                <View style={styles.tinyAvatar}>
                  <Text style={styles.tinyAvatarText}>A</Text>
                </View>
              )}
              <View
                style={[
                  styles.bubble,
                  message.mine ? styles.bubbleMine : styles.bubbleOther,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.mine && styles.messageTextMine,
                  ]}
                >
                  {message.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    message.mine && styles.messageTimeMine,
                  ]}
                >
                  {message.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View
          style={[
            styles.composerWrap,
            { paddingBottom: Math.max(insets.bottom, 10) },
          ]}
        >
          <View style={styles.composer}>
            <TextInput
              accessibilityLabel="Write a message"
              value={draft}
              onChangeText={setDraft}
              placeholder="Write a message…"
              placeholderTextColor="#919891"
              style={styles.input}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Send message"
              onPress={sendMessage}
              style={[
                styles.sendButton,
                !draft.trim() && styles.sendButtonDisabled,
              ]}
            >
              <SymbolView
                name={{
                  ios: "arrow.up",
                  android: "arrow_upward",
                  web: "arrow_upward",
                }}
                tintColor="#fff"
                size={17}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>A LITTLE NOTE FROM PARADISE</Text>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>Inbox</Text>
          <Text style={styles.subtitle}>
            Lovely conversations, all in one place.
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="New message"
          style={styles.newMessage}
        >
          <SymbolView
            name={{
              ios: "square.and.pencil",
              android: "edit_square",
              web: "edit_square",
            }}
            tintColor="#184e3d"
            size={19}
          />
        </Pressable>
      </View>
      <View style={styles.searchBox}>
        <SymbolView
          name={{ ios: "magnifyingglass", android: "search", web: "search" }}
          tintColor="#788078"
          size={17}
        />
        <TextInput
          placeholder="Search messages"
          placeholderTextColor="#919891"
          style={styles.searchInput}
        />
      </View>
      <View style={styles.filters}>
        <View style={styles.activeFilter}>
          <Text style={styles.activeFilterText}>All</Text>
        </View>
        <Text style={styles.filterText}>Unread</Text>
        <Text style={styles.filterText}>Hosts</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open conversation with Anika"
        onPress={() => setOpenChat(true)}
        style={styles.conversation}
      >
        <View style={styles.conversationAvatar}>
          <Text style={styles.conversationInitial}>A</Text>
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.conversationBody}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Anika</Text>
            <Text style={styles.time}>10:51 AM</Text>
          </View>
          <Text style={styles.tripLabel}>Palm House Escape · Ubud, Bali</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            That would be lovely, thank you!
          </Text>
        </View>
        <View style={styles.unreadDot} />
      </Pressable>
      <View style={styles.divider} />
      <View style={styles.emptyNote}>
        <View style={styles.palmIcon}>
          <SymbolView
            name={{ ios: "sun.max.fill", android: "wb_sunny", web: "wb_sunny" }}
            tintColor="#c88748"
            size={20}
          />
        </View>
        <Text style={styles.emptyNoteTitle}>More warm hellos soon</Text>
        <Text style={styles.emptyNoteCopy}>
          Your conversations with hosts will appear here.
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
    letterSpacing: 1.2,
  },
  titleRow: {
    marginHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#18231e",
    fontSize: 29,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  subtitle: { color: "#777e78", fontSize: 12, marginTop: 4 },
  newMessage: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#eef4ed",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    height: 45,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 13,
    borderRadius: 14,
    backgroundColor: "#f5f7f4",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  searchInput: { flex: 1, color: "#18231e", fontSize: 12, paddingVertical: 8 },
  filters: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activeFilter: {
    borderRadius: 12,
    backgroundColor: "#184e3d",
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  activeFilterText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  filterText: {
    color: "#777e78",
    fontSize: 10,
    fontWeight: "600",
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  conversation: {
    marginHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  conversationAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e6d9c4",
    alignItems: "center",
    justifyContent: "center",
  },
  conversationInitial: { color: "#735a3f", fontSize: 17, fontWeight: "700" },
  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5d9b6d",
    borderWidth: 2,
    borderColor: "#fff",
  },
  conversationBody: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { color: "#18231e", fontSize: 13, fontWeight: "700" },
  time: { color: "#89918b", fontSize: 9 },
  tripLabel: { color: "#47715a", fontSize: 9, fontWeight: "600", marginTop: 3 },
  lastMessage: { color: "#777e78", fontSize: 11, marginTop: 5 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d95569",
  },
  divider: { height: 1, backgroundColor: "#edf0ed", marginHorizontal: 20 },
  emptyNote: { alignItems: "center", marginTop: 36, paddingHorizontal: 30 },
  palmIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#fbf3e9",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyNoteTitle: {
    color: "#18231e",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
  },
  emptyNoteCopy: { color: "#89918b", fontSize: 10, marginTop: 4 },
  chatHeader: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#edf0ed",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    width: 34,
    height: 36,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  hostAvatar: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: "#e6d9c4",
    alignItems: "center",
    justifyContent: "center",
  },
  hostInitial: { color: "#735a3f", fontSize: 14, fontWeight: "700" },
  headerCopy: { flex: 1 },
  headerName: { color: "#18231e", fontSize: 13, fontWeight: "700" },
  headerStatus: { color: "#777e78", fontSize: 10, marginTop: 2 },
  moreButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  thread: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 20 },
  stayPreview: {
    minHeight: 76,
    borderRadius: 15,
    backgroundColor: "#f4f7f2",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
  },
  previewImage: { width: 83, height: 76 },
  previewCopy: { paddingHorizontal: 11 },
  previewEyebrow: {
    color: "#47715a",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  previewTitle: {
    color: "#18231e",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  previewMeta: { color: "#777e78", fontSize: 9, marginTop: 3 },
  dayLabel: {
    alignSelf: "center",
    color: "#a0a7a0",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1.1,
    marginTop: 20,
    marginBottom: 14,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    marginBottom: 11,
    maxWidth: "88%",
  },
  messageRowMine: { alignSelf: "flex-end", justifyContent: "flex-end" },
  tinyAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#e6d9c4",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyAvatarText: { color: "#735a3f", fontSize: 9, fontWeight: "700" },
  bubble: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingTop: 9,
    paddingBottom: 7,
  },
  bubbleMine: { borderBottomRightRadius: 5, backgroundColor: "#184e3d" },
  bubbleOther: { borderBottomLeftRadius: 5, backgroundColor: "#f1f4f0" },
  messageText: { color: "#26332b", fontSize: 11, lineHeight: 17 },
  messageTextMine: { color: "#fff" },
  messageTime: {
    color: "#8a918b",
    fontSize: 8,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  messageTimeMine: { color: "#c7dacd" },
  composerWrap: {
    borderTopWidth: 1,
    borderTopColor: "#edf0ed",
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  composer: {
    minHeight: 46,
    borderRadius: 16,
    paddingLeft: 13,
    paddingRight: 5,
    backgroundColor: "#f4f6f3",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: { flex: 1, color: "#18231e", fontSize: 12, paddingVertical: 8 },
  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 13,
    backgroundColor: "#184e3d",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: { backgroundColor: "#9eb5a4" },
});
