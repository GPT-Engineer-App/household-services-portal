import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Image, Input, VStack } from "@chakra-ui/react";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile
      ? JSON.parse(storedProfile)
      : {
          name: "",
          bio: "",
          image: null,
        };
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("currentUser", JSON.stringify(profile));
    localStorage.setItem("currentUser", JSON.stringify(profile));
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={6}>
      <VStack spacing={4} p={6}>
        <FormControl>
          <FormLabel>Profilnamn</FormLabel>
          <Input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>BIO</FormLabel>
          <Input type="text" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Profilbild</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {profile.image && <Image src={profile.image} alt="Profilbild" boxSize="100px" />}
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdateProfile}>
          Uppdatera Profil
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
