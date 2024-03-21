import React, { useState, useEffect } from "react";
import { Box, Input, Button, Text, VStack, HStack, Heading, IconButton } from "@chakra-ui/react";
import { FaRegSmile, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Chat = ({ location }) => {
  const navigate = useNavigate();
  const { adId, userId } = location.state;

  const hasNotification = localStorage.getItem(`chat_notification_${userId}`) === "true";

  if (hasNotification) {
    localStorage.removeItem(`chat_notification_${userId}`);
  }

  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem(`messages_${adId}_${userId}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [inputMessage, setInputMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    localStorage.setItem(`messages_${adId}_${userId}`, JSON.stringify(messages));
  }, [messages, adId, userId]);

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
    <Box bg="gray.100" minH="100vh">
      <Box bg="white" p={4} borderBottomWidth={1}>
        <HStack>
          <IconButton icon={<FaArrowLeft />} onClick={() => navigate(-1)} aria-label="Back" />
          <Heading size="lg">{userId}</Heading>
        </HStack>
      </Box>
      <Box p={4} maxH="calc(100vh - 120px)" overflowY="auto">
        {messages.map((message) => (
          <Box key={message.id} mb={4} maxW="80%" borderRadius="lg" p={2} bg={message.sender === currentUser.name ? "green.100" : "white"} ml={message.sender === currentUser.name ? "auto" : 0}>
            <Text>{message.text}</Text>
            <Text fontSize="xs" color="gray.500" textAlign="right">
              {message.timestamp}
            </Text>
          </Box>
        ))}
      </Box>
      <Box bg="white" p={4} borderTopWidth={1} position="fixed" bottom={0} left={0} right={0}>
        <HStack>
          <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." />
          <IconButton icon={<FaRegSmile />} aria-label="Emoji" />
          <Button onClick={handleSendMessage} colorScheme="green">
            Send
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Chat;
