import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Text, VStack, HStack } from '@chakra-ui/react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        timestamp: new Date().toLocaleString(),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      setInputMessage('');
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
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button onClick={handleSendMessage} colorScheme="blue">
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;