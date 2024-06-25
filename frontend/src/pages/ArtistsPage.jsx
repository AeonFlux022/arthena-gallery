import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

function ArtistsPage() {
  const [allArtists, setAllArtists] = useState({});

  const fetchArtists = async () => {
    try {
      const response = await fetch(`http://localhost:3005/artists`);
      const artistsData = await response.json();
      setAllArtists(artistsData);
      console.log(allArtists);
    } catch (error) {
      console.error("Error fetching user and artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <>
      <Header />
      <div>Artists Page</div>
    </>
  );
}

export default ArtistsPage;
