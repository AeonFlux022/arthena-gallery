import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";

function AddArtwork() {
  let { id } = useParams();
  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">Show {id}.</div>
    </>
  );
}

export default AddArtwork;
