import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, FormControl, FormLabel, Input, VStack, Button, Image, Textarea } from "@chakra-ui/react";

const Profile = () => {
  const navigate = useNavigate();
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

  const updateAdsWithNewUsername = (newName, oldName) => {
    const ads = JSON.parse(localStorage.getItem("ads")) || [];
    const updatedAds = ads.map((ad) => {
      if (ad.postedBy.name === oldName) {
        ad.postedBy.name = newName;
      }

      ad.applicants = ad.applicants.map((applicant) => {
        return applicant.name === oldName ? { ...applicant, name: newName } : applicant;
      });
      return ad;
    });
    localStorage.setItem("ads", JSON.stringify(updatedAds));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      const updatedProfile = { ...prevProfile, [name]: value };
      if (name === "name" && prevProfile.name !== value) {
        updateAdsWithNewUsername(value, prevProfile.name);
      }
      return updatedProfile;
    });

    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
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
        navigate("/");
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
    <Link to="/">
        <Button colorScheme="blue" mt={4}>
          Go to Dashboard
        </Button>
      </Link>
    </VStack>
  );
};

export default Profile;
