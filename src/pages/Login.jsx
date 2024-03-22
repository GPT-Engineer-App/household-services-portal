import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = storedUsers.find((user) => user.name === username && user.password === password);
      if (user) {
        const loggedInProfiles = JSON.parse(localStorage.getItem("loggedInProfiles")) || [];
        loggedInProfiles.push({ ...user, bio: user.bio || "", image: user.image || "" });
        localStorage.setItem("loggedInProfiles", JSON.stringify(loggedInProfiles));
        localStorage.setItem("activeProfile", JSON.stringify({ ...user, bio: user.bio || "", image: user.image || "" }));
        navigate("/index");
      } else {
        alert("Invalid username or password.");
      }
    } else {
      alert("Please enter your username and password.");
    }
  };

  const handleSignUp = () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.some((user) => user.name === username);
        if (!userExists) {
          const newUser = { name: username, password };
          storedUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(storedUsers));
          const loggedInProfiles = JSON.parse(localStorage.getItem("loggedInProfiles")) || [];
          loggedInProfiles.push({ ...newUser, bio: "", image: "" });
          localStorage.setItem("loggedInProfiles", JSON.stringify(loggedInProfiles));
          localStorage.setItem("activeProfile", JSON.stringify({ ...newUser, bio: "", image: "" }));
          navigate("/index");
        } else {
          alert("Username already exists. Please choose a different username.");
        }
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={6}>
      <VStack spacing={4} p={6}>
        <Text fontSize="2xl">{isSignUp ? "Sign Up" : "Log In"}</Text>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {isSignUp && (
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
        )}
        <Button colorScheme="blue" onClick={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp ? "Sign Up" : "Log In"}
        </Button>
        <Text onClick={() => setIsSignUp(!isSignUp)} cursor="pointer" color="blue.500">
          {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
