import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea, useToast, VStack, Image, List, ListItem, IconButton } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaUserCircle, FaComments } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState(() => {
    const storedAds = localStorage.getItem("ads");
    return storedAds ? JSON.parse(storedAds) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("profile");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("ads", JSON.stringify(ads));
  }, [ads]);

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
        const newAd = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
          postedBy: currentUser,
          applicants: [],
        };
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

  const handleApply = (adId) => {
    setAds((prevAds) => {
      const updatedAds = prevAds.map((ad) => {
        if (ad.id === adId) {
          return {
            ...ad,
            applicants: [...ad.applicants, currentUser],
          };
        }
        return ad;
      });
      return updatedAds;
    });
  };

  const handleStartChat = (user) => {
    navigate("/chat", { state: { userId: user.name } });
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>SnabbTjänst</Heading>
        <Flex align="center">
          <Image borderRadius="full" boxSize="40px" src={currentUser.image} fallbackSrc="https://via.placeholder.com/40" alt="Profile" mr={2} />
          <Link to="/profile">
            <Button leftIcon={<FaUserCircle />} variant="ghost">
              Min Profil
            </Button>
          </Link>
        </Flex>
      </Flex>
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
                    <Image borderRadius="full" boxSize="50px" src={ad.postedBy.image} fallbackSrc="https://via.placeholder.com/50" alt={`${ad.postedBy.name}'s portrait`} mr={4} />
                    <Box flex={1}>
                      <Heading size="sm">{ad.title}</Heading>
                      <Box color="gray.600" fontSize="sm" mb={2}>
                        Posted by {ad.postedBy.name}
                      </Box>
                      <Box color="gray.600" fontSize="sm" mb={2}>
                        {ad.description}
                      </Box>
                      <Box color="gray.500" fontSize="sm" mb={2}>
                        Adress: {ad.address}
                      </Box>
                      <Box fontWeight="semibold">
                        Pris: {ad.price} SEK {ad.priceType === "hourly" ? "per timma" : "(engångsavgift)"}
                      </Box>
                      {currentUser && ad.postedBy.name !== currentUser.name && (
                        <>
                          <Button size="sm" colorScheme="green" mt={2} onClick={() => handleApply(ad.id)} disabled={ad.applicants.some((applicant) => applicant.name === currentUser.name)}>
                            {ad.applicants.some((applicant) => applicant.name === currentUser.name) ? "Applied" : "Apply"}
                          </Button>
                          <Button size="sm" colorScheme="blue" mt={2} ml={2} onClick={() => handleStartChat(ad.postedBy)}>
                            Start Chat
                          </Button>
                        </>
                      )}
                    </Box>
                    {currentUser && ad.postedBy.name === currentUser.name && <IconButton icon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => handleDelete(ad.id)} aria-label="Delete ad" />}
                  </Flex>
                </ListItem>
              ))}
              {ads.length === 0 && <ListItem>Inga aktiva förfrågningar. Var först med att lägga upp en!</ListItem>}
            </List>
          </Stack>
        </Box>
      </Flex>
      <Box mt={6}>
        <Button leftIcon={<FaComments />} colorScheme="green" onClick={() => navigate("/chat")}>
          Open Chat
        </Button>
      </Box>
    </Container>
  );
};

export default Index;
