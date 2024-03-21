import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Textarea } from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : { name: "", password: "", bio: "", image: "" };
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleSaveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={6}>
      <VStack spacing={4} p={6}>
        <FormControl>
          <FormLabel>Användarnamn</FormLabel>
          <Input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Lösenord</FormLabel>
          <Input type="password" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Profilbild (URL)</FormLabel>
          <Input type="text" value={profile.image} onChange={(e) => setProfile({ ...profile, image: e.target.value })} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSaveProfile}>
          Spara
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
