import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea, useToast, VStack, Image, List, ListItem, ListIcon, IconButton } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [ads, setAds] = useState(() => {
    const storedAds = localStorage.getItem("ads");
    return storedAds ? JSON.parse(storedAds) : [];
  });

  useEffect(() => {
    localStorage.setItem("ads", JSON.stringify(ads));
  }, [ads]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const processPayment = async (amount) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.address && formData.price) {
      const paymentSuccessful = await processPayment(formData.price);
      if (paymentSuccessful) {
        const newAd = { ...formData, id: Math.random().toString(36).substr(2, 9) };
        setAds((prevAds) => [...prevAds, newAd]);
        setFormData({ title: "", description: "", price: "" });
      } else {
        toast({
          title: "Betalning misslyckades.",
          description: "Det gick inte att genomföra betalningen. Försök igen.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Annons publicerad.",
        description: "Din annons är nu synlig för andra.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Fält saknas.",
        description: "Vänligen fyll i alla fält innan du skickar in.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (adId) => {
    setAds((prevAds) => {
      const updatedAds = prevAds.filter((ad) => ad.id !== adId);
      return updatedAds;
    });
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Heading mb={6}>Anslagstavla för Hushållstjänster</Heading>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex={1} mr={{ base: 0, md: 6 }}>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Tjänst som behövs</FormLabel>
              <Input id="title" placeholder="Ange en titel för din förfrågan" name="title" value={formData.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Beskrivning</FormLabel>
              <Textarea id="description" placeholder="Beskriv tjänsten du behöver" name="description" value={formData.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="address">Adress</FormLabel>
              <Input id="address" placeholder="Ange adressen för tjänsten" name="address" value={formData.address} onChange={handleInputChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="priceType">Pristyp</FormLabel>
              <Select id="priceType" name="priceType" value={formData.priceType} onChange={handleInputChange}>
                <option value="hourly">Per timma</option>
                <option value="fixed">Engångsavgift</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="price">Pris ({formData.priceType === "hourly" ? "SEK/timma" : "SEK"})</FormLabel>
              <Input id="price" placeholder={`Ange ${formData.priceType === "hourly" ? "timlön" : "fast pris"} för tjänsten`} name="price" type="number" value={formData.price} onChange={handleInputChange} />
            </FormControl>
            <Button leftIcon={<FaPlus />} colorScheme="blue" type="submit">
              Lägg upp annons
            </Button>
          </VStack>
        </Box>
        <Box flex={2} mt={{ base: 6, md: 0 }}>
          <Stack spacing={4}>
            <Heading size="md">Aktiva förfrågningar</Heading>
            <List spacing={3}>
              {ads.map((ad) => (
                <ListItem key={ad.id} p={4} boxShadow="md" borderRadius="md">
                  <Flex align="center" justify="space-between">
                    <Image borderRadius="full" boxSize="50px" src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMTAxNDk5NXww&ixlib=rb-4.0.3&q=80&w=1080" alt="User portrait" mr={4} />
                    <Box flex={1}>
                      <Heading size="sm">{ad.title}</Heading>
                      <Box color="gray.600" fontSize="sm" mb={2}>
                        {ad.description}
                      </Box>
                      <Box color="gray.500" fontSize="sm" mb={2}>
                        Adress: {ad.address}
                      </Box>
                      <Box fontWeight="semibold">
                        Pris: {ad.price} SEK {ad.priceType === "hourly" ? "per timma" : "(engångsavgift)"}
                      </Box>
                    </Box>
                    <IconButton icon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => handleDelete(ad.id)} aria-label="Delete ad" />
                  </Flex>
                </ListItem>
              ))}
              {ads.length === 0 && <ListItem>Inga aktiva förfrågningar. Var först med att lägga upp en!</ListItem>}
            </List>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;
