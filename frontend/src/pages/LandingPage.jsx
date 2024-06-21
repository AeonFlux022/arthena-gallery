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
        <div className="flex flex-row bg-primary h-screen">
          <div className="w-1/2 flex items-center justify-start text-white mx-auto px-4 md:px-6 lg:px-8">
            <div className="pr-24">
              <h1 className="text-6xl mb-5">Empowering our student artists.</h1>
              <span className="text-xl">
                Join our community of emerging artist and share your art to
                ignite inspiration.
              </span>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100">second check</div>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default LandingPage;
