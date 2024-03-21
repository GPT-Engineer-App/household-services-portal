import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea, useToast, VStack } from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : { name: "", bio: "", image: "" };
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Profil uppdaterad.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading mb={6}>Min Profil</Heading>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Namn</FormLabel>
          <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <Textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="image">Profilbild URL</FormLabel>
          <Input id="image" name="image" value={profile.image} onChange={handleInputChange} />
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Spara
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;