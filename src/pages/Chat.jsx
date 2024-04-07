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
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?adId=${adId}&userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error",
          description: "Failed to fetch messages. Please check the console for more details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/users/current");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        toast({
          title: "Error",
          description: "Failed to fetch current user. Please check the console for more details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchMessages();
    fetchCurrentUser();
  }, [adId, userId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputMessage,
            sender: currentUser._id,
            ad: adId,
          }),
        });

        if (response.ok) {
          const newMessage = await response.json();
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setInputMessage("");
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
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
