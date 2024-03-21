import React, { useState, useEffect } from "react";
import { Box, Input, Button, Text, VStack, HStack } from "@chakra-ui/react";

const Chat = ({ location }) => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem(`messages_${location.state.userId}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [inputMessage, setInputMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    localStorage.setItem(`messages_${location.state.userId}`, JSON.stringify(messages));
  }, [messages, location.state.userId]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: currentUser.name,
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box borderWidth={1} borderRadius="md" p={4} h="400px" overflowY="auto">
          {messages.map((message) => (
            <Text key={message.id} mb={2}>
              <strong>{message.timestamp}:</strong> {message.text}
            </Text>
          ))}
        </Box>
        <HStack>
          <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;
