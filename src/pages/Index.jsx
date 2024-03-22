import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";

const Index = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const storedAds = JSON.parse(localStorage.getItem("ads")) || [];
    setAds(storedAds);
  }, []);

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
          </Box>
        ))
      )}
    </VStack>
  );
};

export default Index;
