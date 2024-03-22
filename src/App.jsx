import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

if (!sessionStorage.getItem("globalAds")) {
  sessionStorage.setItem("globalAds", JSON.stringify([]));
}

export default App;
