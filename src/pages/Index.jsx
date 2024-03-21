import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast, VStack, Image, List, ListItem, ListIcon, IconButton } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      setAds((prevAds) => [...prevAds, { ...formData, id: Math.random().toString(36).substr(2, 9) }]);
      setFormData({ title: "", description: "" });
      toast({
        title: "Advertisement posted.",
        description: "Your ad is now live for others to see.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Missing fields.",
        description: "Please fill out all fields before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (adId) => {
    setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Heading mb={6}>Household Services Bulletin Board</Heading>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex={1} mr={{ base: 0, md: 6 }}>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Service Needed</FormLabel>
              <Input id="title" placeholder="Enter a title for your request" name="title" value={formData.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea id="description" placeholder="Describe the service you need" name="description" value={formData.description} onChange={handleInputChange} />
            </FormControl>
            <Button leftIcon={<FaPlus />} colorScheme="blue" type="submit">
              Post Ad
            </Button>
          </VStack>
        </Box>
        <Box flex={2} mt={{ base: 6, md: 0 }}>
          <Stack spacing={4}>
            <Heading size="md">Active Requests</Heading>
            <List spacing={3}>
              {ads.map((ad) => (
                <ListItem key={ad.id} p={4} boxShadow="md" borderRadius="md">
                  <Flex align="center" justify="space-between">
                    <Image borderRadius="full" boxSize="50px" src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMTAxNDk5NXww&ixlib=rb-4.0.3&q=80&w=1080" alt="User portrait" mr={4} />
                    <Box flex={1}>
                      <Heading size="sm">{ad.title}</Heading>
                      <Box color="gray.600" fontSize="sm">
                        {ad.description}
                      </Box>
                    </Box>
                    <IconButton icon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => handleDelete(ad.id)} aria-label="Delete ad" />
                  </Flex>
                </ListItem>
              ))}
              {ads.length === 0 && <ListItem>No active requests. Be the first to post one!</ListItem>}
            </List>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;
