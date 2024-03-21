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
      localStorage.setItem("profile", JSON.stringify({ name: username, password }));
      navigate("/index");
    } else {
      alert("Please enter your username and password.");
    }
  };

  const handleSignUp = () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        localStorage.setItem("profile", JSON.stringify({ name: username, password }));
        navigate("/index");
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
