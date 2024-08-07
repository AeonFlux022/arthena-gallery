import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

function ArtworkPageByUser() {
  const { artworkId } = useParams();
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState({});
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };
  const [file, setFile] = useState(null);

  const fetchArtwork = async () => {
    try {
      const artworkResponse = await fetch(
        `http://localhost:3005/artworks/byId/${artworkId}`
      );

      const artworkData = await artworkResponse.json();
      setArtwork(artworkData);
    } catch (error) {
      console.error("Error fetching user and artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtwork(artworkId);
  }, [artworkId]);

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex justify-between items-center space-y-2 mb-2">
          <h1 className="font-bold text-2xl">{artwork.title}</h1>
          {/* <button className="w-44 text-white bg-primary p-2 hover:bg-primary-dark">
            Save Changes
          </button> */}
        </div>
        <hr />
        <div className="flex gap-4 pt-8">
          <div className="flex bg-gray-100 w-1/2 h-3/4">
            <img
              className="justify-center items-center mx-auto h-full"
              src={`http://localhost:3005/uploads/${artwork.imageUrl}`}
            />
          </div>
          <div className="flex flex-col w-1/2 h-44 px-4 pb-4 space-y-3">
            <h1 className="font-bold text-xl ">About the Artwork</h1>
            <span className="font-light text-pretty">
              {artwork.description}
            </span>
            <div className="flex flex-row gap-2 pt-8">
              <div className="uppercase w-1/4">
                <ul className="space-y-3">
                  <li>Medium</li>
                  <li>Orientation</li>
                  <li>Dimensions</li>
                  <li>Artwork Form</li>
                  <li>Price</li>
                  <li>Year Made</li>
                </ul>
              </div>
              <div className="w-1/2">
                <ul className="space-y-3">
                  <li>{artwork.medium}</li>
                  <li>{artwork.orientation}</li>
                  <li>{artwork.dimensions}</li>
                  <li>{artwork.artForms}</li>
                  <li>&#8369; {artwork.price}</li>
                  <li>{artwork.yearMade}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtworkPageByUser;
