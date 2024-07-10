import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

function ArtistProfilePage() {
  const [loggedArtist, setLoggedArtist] = useState({});
  const [artistProfile, setArtistProfile] = useState({});
  const [artworkData, setArtworkData] = useState({});
  const { authState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [artistId, setArtistId] = useState(null);

  const fetchArtist = async () => {
    try {
      // Fetch the artist profile data
      const profileResponse = await fetch(
        `http://localhost:3005/artists/byId/${authState.id}`
      );
      const profileData = await profileResponse.json();
      setArtistProfile(profileData);
      // console.log(artistProfile);
    } catch (error) {
      console.error("Error fetching user and artist data:", error);
    }
  };

  useEffect(() => {
    if (authState.id) {
      fetchArtist();
    }
  }, [authState.id]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3005/artworks/all/byId/${authState.id}`
      );
      const responseData = await response.json();
      // console.log(responseData);
      setArtworkData(responseData.artworks || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching artworks:", error);
    }
  };

  useEffect(() => {
    if (authState.id) {
      fetchArtworks();
    }
  }, [authState.id]);

  const handleEditArtwork = (artworkId) => {
    navigate(`/artworkpage/${artworkId}`);
  };

  const roleText = (role) => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Artist";
      case 2:
        return "Buyer";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex flex-row gap-5 mb-5">
          <div className="flex flex-col w-1/4 h-auto rounded text-center border border-primary p-5">
            <img
              className="rounded-full border-4 border-primary size-36 mx-auto items-center justify-center mb-5"
              src={`http://localhost:3005/uploads/${
                artistProfile.image || "https://placehold.co/300x300"
              }`}
              alt="Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x300";
              }}
            />
            <div className="flex flex-col mb-5">
              <Link to={`/editartist/${authState.id}`}>
                <button className="p-2 text-white bg-black w-44 hover:bg-gray-800">
                  Edit Profile
                </button>
              </Link>
            </div>
            <h1 className="text-xl">
              {artistProfile.firstName} {artistProfile.lastName}
            </h1>
            <span className="text-sm">{artistProfile.email}</span>
            <section className="flex flex-col h-96 space-y-5 mt-5 text-sm">
              <hr />
              <div className="flex flex-col">
                <span className="font-bold text-xs">Art Style</span>
                <span>{artistProfile.artStyle || "Not yet added"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs">Address</span>
                <span>{artistProfile.address}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs">Contact Number</span>
                <span>{artistProfile.phoneNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs">Birthdate</span>
                <span>
                  {moment(artistProfile.birthdate).format("MMMM D, YYYY")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs">Member Since</span>
                <span> {moment(artistProfile.createdAt).format("MMMM YYYY")}</span>
              </div>
            </section>
          </div>
          <div className="flex w-3/4">
            <section className="">
              <div className="font-bold text-xl space-y-3 mb-3">
                <h1>Artworks</h1>
              </div>
              <hr />
              <div className="pt-4">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="mb-3">
                    {artworkData.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {artworkData.map((artwork) => (
                          <>
                            <div
                              className="card w-full border border-primary"
                              key={artwork.id}
                              onClick={() => handleEditArtwork(artwork.id)}
                            >
                              <img
                                className="card-image w-full h-48 object-cover"
                                src={
                                  artwork.imageUrl
                                    ? `http://localhost:3005/uploads/${artwork.imageUrl}`
                                    : "https://placeholder.com/500x300"
                                }
                              />
                              <div className="card-body">
                                <div className="flex flex-row justify-between">
                                  <h1 className="font-bold">{artwork.title}</h1>
                                  <span className="text-lg">
                                    &#8369; {artwork.price}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm mb-3">
                                    {artwork.status}
                                  </span>
                                  <span className="truncate ...">
                                    {artwork.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    ) : (
                      <div>No artworks found.</div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        {/* <div className="flex bg-primary-light text-white rounded-br-lg rounded-tl-lg mb-5">
          <div className="flex-shrink-0">
            <img
              className="w-52 h-full"
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
                <span className="">{roleText(authState.role)}</span>
                <h1 className="text-2xl font-bold">
                  {artistProfile.firstName}, {artistProfile.lastName}
                </h1>
                <span className="">{artistProfile.email}</span>
              </div>
              <Link to={`/editartist/${authState.id}`}>
                <button className="p-2 text-white bg-black w-44 hover:bg-gray-800">
                  Edit Profile
                </button>
              </Link>
            </div>
            <blockquote className="pt-5 text-justify">
              {artistProfile.bio}
            </blockquote>
          </div>
        </div> */}
        <div className="flex">
          <div className="flex flex-col bg-gray-200 border border-primary rounded p-2 h-24 w-full justify-center items-center text-center">
            <Link to={`/artistprofile/${authState.id}/add`}>
              <button className="w-56 p-3 bg-secondary text-black font-bold hover:bg-secondary-dark">
                Add your artwork
              </button>
            </Link>
          </div>
        </div>
        {/* <section className="my-5 h-44 pt-4">
          <div className="font-bold text-xl space-y-3 mb-5">
            <h1>Artworks</h1>
            <hr />
          </div>
          <div className="pt-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="mb-3">
                {artworkData.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {artworkData.map((artwork) => (
                      <>
                        <div
                          className="card w-full border border-primary"
                          key={artwork.id}
                          onClick={() => handleEditArtwork(artwork.id)}
                        >
                          <img
                            className="card-image w-full h-48 object-cover"
                            src={
                              artwork.imageUrl
                                ? `http://localhost:3005/uploads/${artwork.imageUrl}`
                                : "https://placeholder.com/500x300"
                            }
                          />
                          <div className="card-body">
                            <div className="flex flex-row justify-between">
                              <h1 className="font-bold">{artwork.title}</h1>
                              <span className="text-lg">
                                &#8369; {artwork.price}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm mb-3">
                                {artwork.status}
                              </span>
                              <span className="truncate ...">
                                {artwork.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div>No artworks found.</div>
                )}
              </div>
            )}
          </div>
        </section> */}
      </div>
    </>
  );
}

export default ArtistProfilePage;
