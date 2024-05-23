import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/signup" exact element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
