import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      console.log(authState.id);
      const profileData = await profileResponse.json();
      setArtistProfile(profileData);
      // console.log(profileData);
    } catch (error) {
      console.error("Error fetching user and artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="p-4 flex justify-around items-center bg-yellow-300 rounded-br-lg rounded-tl-lg">
          <img
            className="w-48 h-48 rounded-full mx-auto"
            src="https://placehold.co/200x200"
          />
          <div className="p-5 pt-6">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {artistProfile.firstName}, {artistProfile.lastName}
                </h1>
                <span>{artistProfile.email}</span>
              </div>
              <button className="p-3 text-white bg-black w-32">
                Contact Me
              </button>
            </div>

            <blockquote className="pt-5 text-justify">
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim."
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistProfilePage;
