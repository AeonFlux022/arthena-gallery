import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [artistProfile, setArtistProfile] = useState({});

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      id: 0,
      role: "",
      status: false,
    });
    // navigate("/");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <nav className="bg-neutral text-black shadow-md">
        <div className=" mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="max-w-24" src="/tertiary-logo.png" alt="logo" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-5">
                <Link
                  to="/"
                  className="flex hover:bg-secondary hover:text-black py-2 px-3"
                >
                  Home
                </Link>
                <Link
                  to="#"
                  className="flex hover:bg-secondary hover:text-black py-2 px-3"
                >
                  Gallery
                </Link>
                <Link
                  to="#"
                  className="flex hover:bg-secondary hover:text-black py-2 px-3"
                >
                  Artists
                </Link>
                {authState.status && authState.role === "ARTIST" && (
                  <Link
                    to={`/artistprofile/${authState.id}`}
                    className="flex hover:bg-secondary hover:text-black py-2 px-3"
                  >
                    My Profile
                  </Link>
                )}
                {authState.status ? (
                  <div className="flex items-center">
                    <span className="flex py-2 px-3 font-bold">
                      Hello, {authState.firstName}!
                    </span>
                    <Link
                      onClick={handleLogout}
                      type="button"
                      className="flex hover:bg-secondary hover:text-black py-2 px-3"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="flex hover:bg-secondary hover:text-black py-2 px-3"
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      className="flex hover:bg-secondary hover:text-black py-2 px-3"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
