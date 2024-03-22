import React from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";

const Index = () => {
  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading as="h1" size="xl">
        Advertisements
      </Heading>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text>No ads available.</Text>
      </Box>
    </VStack>
  );
};

export default Index;
