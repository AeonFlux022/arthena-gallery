import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// admin
import Dashboard from "./admin/Dashboard.jsx";

// client
import LandingPage from "./pages/LandingPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/admin" exact element={<Dashboard />} />
        <Route path="/signup" exact element={<SignupPage />} />
        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
