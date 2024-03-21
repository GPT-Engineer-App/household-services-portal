import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, VStack, Button, Image, Textarea } from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : { name: "", bio: "", image: "" };
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Enter your username" name="name" value={profile.name} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Bio</FormLabel>
        <Textarea placeholder="A short bio" name="bio" value={profile.bio} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {profile.image && <Image src={profile.image} alt="Profile picture" />}
      </FormControl>
      <Button
        colorScheme="blue"
        onClick={() => {
          localStorage.setItem("profile", JSON.stringify(profile));
          alert("Profile updated!");
        }}
      >
        Update Profile
      </Button>
    </VStack>
  );
};

export default Profile;
