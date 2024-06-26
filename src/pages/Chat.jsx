import React, { useState, useEffect } from "react";
import { Box, Input, Button, Text, VStack, HStack, Heading, IconButton, useToast } from "@chakra-ui/react";
import { FaRegSmile, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adId, userId } = location.state || {};

  const hasNotification = localStorage.getItem(`chat_notification_${userId}`) === "true";

  if (hasNotification) {
    localStorage.removeItem(`chat_notification_${userId}`);
  }

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const filteredMessages = storedMessages.filter((message) => message.ad === adId && (message.sender === userId || message.recipient === userId));
    setMessages(filteredMessages);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = storedUsers.find((user) => user.name === userId);
    setCurrentUser(currentUser);
  }, [adId, userId]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: userId,
        recipient: adId,
        ad: adId,
        timestamp: new Date().toISOString(),
      };

      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      storedMessages.push(newMessage);
      localStorage.setItem("messages", JSON.stringify(storedMessages));

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  if (!adId || !userId) {
    return (
      <Box p={4}>
        <Text>No chat data available.</Text>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

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
