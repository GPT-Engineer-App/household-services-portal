import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const storedAds = JSON.parse(sessionStorage.getItem("globalAds")) || [];
    setAds(storedAds);
  }, []);

  const handleChatClick = (adId, userId) => {
    navigate("/chat", { state: { adId, userId } });
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading as="h1" size="xl">
        Advertisements
      </Heading>
      {ads.length === 0 ? (
        <Text>No ads available.</Text>
      ) : (
        ads.map((ad) => (
          <Box key={ad.id} p={5} shadow="md" borderWidth="1px">
            <Heading as="h3" size="lg">
              {ad.title}
            </Heading>
            <Text mt={4}>{ad.description}</Text>
            <Text mt={2}>Posted by: {ad.postedBy.name}</Text>
            <Button mt={4} onClick={() => handleChatClick(ad.id, ad.postedBy.name)}>
              Chat with {ad.postedBy.name}
            </Button>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default Index;
