import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea, useToast, VStack, Image, List, ListItem, IconButton } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaUserCircle, FaComments } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAds = JSON.parse(localStorage.getItem("ads")) || [];
        setAds(storedAds);

        const storedProfile = JSON.parse(localStorage.getItem("profile"));
        setCurrentUser(storedProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    priceType: "hourly",
    price: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.address && formData.price) {
      const newAd = {
        id: Date.now().toString(),
        ...formData,
        postedBy: currentUser,
        applicants: [],
      };

      const storedAds = JSON.parse(localStorage.getItem("ads")) || [];
      storedAds.push(newAd);
      localStorage.setItem("ads", JSON.stringify(storedAds));

      setAds((prevAds) => [...prevAds, newAd]);
      setFormData({ title: "", description: "", address: "", priceType: "hourly", price: "" });

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
    const storedAds = JSON.parse(localStorage.getItem("ads")) || [];
    const updatedAds = storedAds.filter((ad) => ad.id !== adId);
    localStorage.setItem("ads", JSON.stringify(updatedAds));
    setAds(updatedAds);
  };

  const handleApply = (adId) => {
    const storedAds = JSON.parse(localStorage.getItem("ads")) || [];
    const updatedAds = storedAds.map((ad) => {
      if (ad.id === adId) {
        return {
          ...ad,
          applicants: [...ad.applicants, currentUser.name],
        };
      }
      return ad;
    });
    localStorage.setItem("ads", JSON.stringify(updatedAds));
    setAds(updatedAds);
  };

  const handleStartChat = (ad) => {
    localStorage.setItem(`chat_notification_${ad.postedBy.name}`, "true");
    navigate("/chat", { state: { adId: ad.id, userId: currentUser.name } });
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
            <Heading size="md">Aktiva annonser</Heading>
            <List spacing={3}>
              {ads.map((ad) => (
                <ListItem key={ad.id} p={4} boxShadow="md" borderRadius="md">
                  <Flex align="center" justify="space-between">
                    <Image borderRadius="full" boxSize="50px" src={ad.postedBy.image} fallbackSrc="https://via.placeholder.com/50" alt={`${ad.postedBy.name}'s portrait`} mr={4} />
                    <Box flex={1}>
                      <Heading size="sm">{ad.title}</Heading>
                      <Box color="gray.600" fontSize="sm" mb={2}>
                        Publicerad av {ad.postedBy.name}
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
                            {ad.applicants.some((applicant) => applicant.name === currentUser.name) ? "Ansökt" : "Ansök"}
                          </Button>
                          <Button size="sm" colorScheme="blue" mt={2} ml={2} onClick={() => handleStartChat(ad)}>
                            Starta chatt
                          </Button>
                        </>
                      )}
                    </Box>
                    {currentUser && ad.postedBy.name === currentUser.name && <IconButton icon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => handleDelete(ad.id)} aria-label="Ta bort annons" />}
                  </Flex>
                </ListItem>
              ))}
              {ads.length === 0 && <ListItem>Inga aktiva annonser. Var först med att lägga upp en!</ListItem>}
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
