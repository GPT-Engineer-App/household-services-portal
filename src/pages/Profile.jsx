import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : { password: "" };
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
          <FormLabel>Lösenord</FormLabel>
          <Input type="password" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSaveProfile}>
          Spara
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
