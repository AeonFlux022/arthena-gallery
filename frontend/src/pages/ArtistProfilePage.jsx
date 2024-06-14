import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";

function ArtistProfilePage() {
  const [loggedArtist, setLoggedArtist] = useState({});
  const [artistProfile, setArtistProfile] = useState({});
  const { authState, setAuthState } = useContext(AuthContext);
  // const [artistId, setArtistId] = useState(null);

  const fetchArtist = async () => {
    try {
      // Fetch the artist profile data
      const profileResponse = await fetch(
        `http://localhost:3005/artists/byId/${authState.id}`
      );
      const profileData = await profileResponse.json();
      setArtistProfile(profileData);
    } catch (error) {
      console.error("Error fetching user and artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtist(authState.id);
  }, [authState.id]);

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex bg-yellow-300 rounded-br-lg rounded-tl-lg">
          <div className="flex-shrink-0 p-4">
            <img
              className="w-36 h-36 rounded-full"
              src={`http://localhost:3005/uploads/${
                artistProfile.image || "https://placehold.co/300x300"
              }`}
              alt="Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x300";
              }}
            />
          </div>
          <div className="flex-grow p-5 pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">
                  {artistProfile.firstName}, {artistProfile.lastName}
                </h1>
                <span className="block">{artistProfile.email}</span>
              </div>
              <Link to={`/editartist/${authState.id}`}>
                <button className="p-2 text-white bg-black w-32 hover:bg-gray-800">
                  Edit Profile
                </button>
              </Link>
            </div>
            <blockquote className="pt-5 text-justify">
              {artistProfile.bio}
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistProfilePage;
