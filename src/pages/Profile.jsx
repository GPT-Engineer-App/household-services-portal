import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Image, Input, VStack } from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    image: null,
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

  return (
    <VStack spacing={4}>
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
      <Button colorScheme="blue">Uppdatera Profil</Button>
    </VStack>
  );
};

export default Profile;
