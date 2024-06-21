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
            <div className="flex flex-col space-y-5 pr-24">
              <h1 className="text-6xl leading-[4rem]">
                Empowering our student artists.
              </h1>
              <span className="text-xl text-balance">
                Join our community of emerging artist and share your art to
                ignite inspiration.
              </span>
              <button className="bg-secondary w-44 p-3 font-bold text-black hover:bg-secondary-dark">
                Explore Artwork
              </button>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100"></div>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default LandingPage;
