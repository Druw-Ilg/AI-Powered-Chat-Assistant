import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import LoadingIndicator from "../components/LoadingIndicator";
import { Mistral } from "@mistralai/mistralai"; // Import Mistral SDK

const apiKey = process.env.Mistral_API_KEY; // Load API key from environment
const client = new Mistral({ apiKey: apiKey }); // Initialize Mistral client

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  console.log(`apiKey:  ${apiKey}`);

  const handleSend = async (message: string) => {
    if (!message.trim()) return; // Prevent empty messages

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
    ]);
    setLoading(true);

    try {
      // Call Mistral API using Fetch
      const chatResponse = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [{ role: "user", content: message }],
      });

      if (chatResponse.choices && chatResponse.choices.length > 0) {
        const botMessage = chatResponse.choices[0].message.content;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: JSON.stringify(botMessage) || "No response", isUser: false },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: No response from the bot.", isUser: false },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response from Mistral API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Unable to get response.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && <LoadingIndicator />}
      </ScrollView>
      <ChatInput onSend={handleSend} />
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
