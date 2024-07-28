import React, { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import Header from "../../components/Header";
import moment from "moment";

function Artist() {
  const { artistid } = useParams();
  const [artistProfile, setArtistProfile] = useState({});
  const [artworkData, setArtworkData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchArtist = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/artists/byId/${artistid}`
      );
      const data = await response.json();
      setArtistProfile(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching user and artist data:", error);
    }
  };

  useEffect(() => {
    if (artistid) {
      fetchArtist(artistid);
    }
  }, [artistid]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3005/artworks/all/byId/${artistid}`
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
    if (artistid) {
      fetchArtworks();
    }
  }, [artistid]);

  const handleArtwork = (artworkId) => {
    navigate(`/artworkpage/${artworkId}`);
  };

  return (
    <>
      <Header />
      <main className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex gap-5 mb-5">
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
              {/* <Link to={`/editartist/${authState.id}`}>
                <button className="p-2 text-white bg-black w-44 hover:bg-gray-800">
                  Edit Profile
                </button>
              </Link> */}
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
                <span>
                  {moment(artistProfile.createdAt).format("MMMM YYYY")}
                </span>
              </div>
            </section>
          </div>
          <div className="w-3/4">
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
                      <div className="grid grid-cols-3 gap-5">
                        {artworkData.map((artwork) => (
                          <>
                            <div
                              className="card w-full"
                              key={artwork.id}
                              onClick={() => handleArtwork(artwork.id)}
                            >
                              <img
                                className="card-image w-full h-52 object-cover rounded"
                                src={
                                  artwork.imageUrl
                                    ? `http://localhost:3005/uploads/${artwork.imageUrl}`
                                    : "https://placeholder.com/500x300"
                                }
                              />
                              <div className="card-body ">
                                <div className="flex flex-row justify-between">
                                  <h1 className="font-bold">{artwork.title}</h1>
                                  <span className="text-lg">
                                    &#8369; {artwork.price}
                                  </span>
                                </div>
                                <span className="text-xs">
                                  {artwork.dimensions}
                                </span>
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
      </main>
    </>
  );
}

export default Artist;
