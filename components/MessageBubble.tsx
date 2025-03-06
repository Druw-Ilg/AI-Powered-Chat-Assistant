import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageBubble: React.FC<{ message: string; isUser: boolean }> = ({
  message,
  isUser,
}) => {
  return (
    <View
      style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
    >
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#0084ff",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "green",

    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
});

export default MessageBubble;
