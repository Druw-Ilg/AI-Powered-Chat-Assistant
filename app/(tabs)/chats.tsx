import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

const Chats = () => {
  const router = useRouter();
  interface Chat {
    id: string;
  }

  const [chats, setChats] = React.useState<Chat[]>([]);

  const handleChatPress = (chatId: string) => {
    router.push(`/Chatbot?chatId=${chatId}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item.id)}
          >
            <Text style={styles.chatTitle}>Chat {item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatTitle: {
    fontSize: 16,
  },
});

export default Chats;
