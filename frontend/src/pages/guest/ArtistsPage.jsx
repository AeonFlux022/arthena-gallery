import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../index.css";
import axios from "axios";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import moment from "moment";

function ArtistsPage() {
  const [allArtists, setAllArtists] = useState({});
  // const [artworks, setArtworks] = useState({});
  const [artworksByArtist, setArtworksByArtist] = useState({});
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

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

  const handleSearch = (searchTerm) => {
    searchTerm = searchTerm.trim().toLowerCase();

    if (!searchTerm) {
      setFilteredArtists([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = Object.values(allArtists).filter(
      ({ firstName, lastName }) =>
        `${firstName} ${lastName}`.toLowerCase().includes(searchTerm)
    );

    setFilteredArtists(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const handleArtworkClick = (artworkId) => {
    navigate(`/artworkpage/${artworkId}`);
  };

  return (
    <>
      <Header />
      <main className="px-4 md:px-6 lg:px-8 my-5">
        <section className="space-y-3 mb-3">
          <h1 className="text-2xl">Artists</h1>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <div className="w-1/3">
              <SearchBar onSearch={handleSearch} />
              {showSuggestions && (
                <div className="bg-neutral border border-t-0 shadow-lg p-3">
                  {filteredArtists.map((artist) => (
                    <div key={artist.id} className="">
                      <Link
                        to={`/artist/${artist.id}`}
                        className="font-semibold"
                      >
                        {artist.firstName} {artist.lastName}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
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
                    <Link to={`/artist/${artist.id}`}>
                      <button className="mt-5 w-full items-end mx-auto text-white bg-primary p-2 hover:bg-primary-dark">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full p-5">
                  <div className="grid grid-cols-3 gap-4">
                    {(artworksByArtist[artist.id] || [])
                      .slice(0, 3)
                      .map((artwork) => (
                        <div
                          key={artwork.id}
                          className="bg-white shadow-md cursor-pointer hover:cursor-pointer"
                          onClick={() => handleArtworkClick(artwork.id)}
                        >
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
      </main>
    </>
  );
}

export default ArtistsPage;
