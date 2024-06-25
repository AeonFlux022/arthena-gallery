import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

function ArtistsPage() {
  const [allArtists, setAllArtists] = useState({});
  // const [artworks, setArtworks] = useState({});
  const [artworksByArtist, setArtworksByArtist] = useState({});

  const fetchArtists = async () => {
    try {
      const response = await fetch(`http://localhost:3005/artists`);
      const artistsData = await response.json();
      setAllArtists(artistsData);

      const artistWithArtworks = await Promise.all(
        artistsData.map(async (artist) => {
          const artworkResponse = await fetch(
            `http://localhost:3005/artworks/all/byId/${artist.id}`
          );
          const artworkData = await artworkResponse.json();
          return { ...artist, artworks: artworkData.artworks || [] };
        })
      );
      setArtworksByArtist(
        artistWithArtworks.reduce((acc, artist) => {
          acc[artist.id] = artist.artworks;
          return acc;
        }, {})
      );
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
      <main className="px-4 md:px-6 lg:px-8 my-5">
        <section className="space-y-3 mb-3">
          <h1 className="text-2xl">Artists</h1>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <div className="w-1/3">
              <div className="my-2 relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="search"
                  className="flex-1 w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                  placeholder="Search for an artist"
                />
              </div>
            </div>
            <div>
              <span>Sort By</span>
            </div>
          </div>
        </section>
        <section className="h-auto py-4">
          {Object.values(allArtists).map((artist) => (
            <div key={artist.id} className="w-full mb-10">
              <div className="bg-neutral h-auto flex flex-row">
                <div className="w-1/3 flex flex-col p-5 space-y-3 justify-between">
                  <div className="justify-center mx-auto items-center">
                    <img
                      src={`http://localhost:3005/uploads/${artist.image}`}
                      className="rounded-full bg-gray-300 size-32"
                    />
                  </div>
                  <div className="items-end">
                    <h3 className="text-lg font-bold text-primary">
                      {artist.firstName} {artist.lastName}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {artist.address}
                    </span>
                    <button className="mt-5 w-full items-end mx-auto text-white bg-primary p-2 hover:bg-primary-dark">
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="w-full p-5">
                  <div className="grid grid-cols-3 gap-4">
                    {(artworksByArtist[artist.id] || [])
                      .slice(0, 3)
                      .map((artwork) => (
                        <div key={artwork.id} className="bg-white shadow-md">
                          <img
                            src={`http://localhost:3005/uploads/${artwork.imageUrl}`}
                            alt={artwork.title}
                            className="w-full h-56 object-cover "
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-bold">
                              {artwork.title}
                            </h3>
                            <p className="text-sm">{artwork.dimensions}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* <section className="h-auto py-4">
          {Object.values(allArtists).map((artist) => (
            <div key={artist.id} className="w-full mb-5">
              <div className="bg-neutral shadow-md h-auto flex flex-row">
                <div className="w-1/3 flex flex-col p-5 space-y-3">
                  <div className="justify-center mx-auto items-center">
                    <img
                      src={`http://localhost:3005/uploads/${artist.image}`}
                      className="rounded-full bg-gray-300 size-32"
                    />
                  </div>
                  <div className="">
                    <h3 className="text-lg font-bold text-primary">
                      {artist.firstName} {artist.lastName}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {artist.address}
                    </span>
                    <button className="mt-5 w-full text-white bg-primary p-2 hover:bg-primary-dark">
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="w-full p-4 bg-yellow-200">
                  <div className="flex flex-row space-between">
                    {(artworksByArtist[artist.id] || []).map((artwork) => (
                      <div
                        key={artwork.id}
                        className="w-1/3 p-4 bg-white rounded-lg shadow-md"
                      >
                        <img
                          src={`http://localhost:3005/uploads/${artwork.imageUrl}`}
                          alt={artwork.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold">{artwork.title}</h3>
                          <p>{artwork.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section> */}
      </main>
    </>
  );
}

export default ArtistsPage;
