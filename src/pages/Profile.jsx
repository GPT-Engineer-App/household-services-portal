import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, VStack, Button, Image, Textarea } from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : { name: "", bio: "", image: "", password: "" };
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setProfile({ ...profile, [name]: value });
    }
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

  const handleUpdateProfile = () => {
    if (currentPassword === profile.password) {
      if (newPassword === confirmPassword) {
        setProfile({ ...profile, password: newPassword });
        alert("Profile updated!");
      } else {
        alert("New password and confirm password do not match!");
      }
    } else {
      alert("Current password is incorrect!");
    }
    localStorage.setItem("profile", JSON.stringify(profile));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
        <FormLabel>Current Password</FormLabel>
        <Input type="password" placeholder="Enter your current password" name="currentPassword" value={currentPassword} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>New Password</FormLabel>
        <Input type="password" placeholder="Enter your new password" name="newPassword" value={newPassword} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm New Password</FormLabel>
        <Input type="password" placeholder="Confirm your new password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {profile.image && <Image src={profile.image} alt="Profile picture" />}
      </FormControl>
      <Button colorScheme="blue" onClick={handleUpdateProfile}>
        Update Profile
      </Button>
    </VStack>
  );
};

export default Profile;
