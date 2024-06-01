import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";

function LandingPage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default LandingPage;
