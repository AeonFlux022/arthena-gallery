import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

function EditArtwork() {
  const { artworkId } = useParams();
  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex justify-between items-center space-y-2 mb-2">
          <h1 className="font-bold text-2xl">Artwork Details</h1>
          <button className="w-32 text-white bg-primary p-2 hover:bg-primary-dark">
            Save Changes
          </button>
        </div>
        <hr />
        <div className="flex gap-4 pt-4">
          <div className="bg-gray-300 w-1/2 h-screen"></div>
          <div className="bg-pink-300 w-1/2 h-44 p-4">
            <p>Details</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditArtwork;
