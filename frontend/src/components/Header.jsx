import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      firstName: "",
      lastName: "",
      id: 0,
      role: "",
      status: false,
    });
    setTimeout(() => {
      navigate("/login");
    }, 0);
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
            {/* menu for mobile ni sya */}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleMenuToggle}
                className="flex items-center px-3 py-2 border rounded text-black border-black hover:bg-secondary hover:text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {isMenuOpen && (
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="sm:ml-6 sm:block">check</div>
              </div>
            )}

            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-5">
                <Link
                  to="/"
                  className="flex hover:bg-secondary hover:text-black py-2 px-3"
                >
                  <span>Home</span>
                </Link>
                <Link
                  to="#"
                  className="flex hover:bg-secondary hover:text-black py-2 px-3"
                >
                  <Link
                    to="/gallery"
                    className="flex hover:bg-secondary hover:text-black py-2 px-3"
                  >
                    <span>Gallery</span>
                  </Link>
                </Link>
                <Link
                  to="/allArtists"
                  className="flex hover:bg-secondary hover:text-black py-2 px-3"
                >
                  <span>Artists</span>
                </Link>
                {authState.status && authState.role === 1 && (
                  <Link
                    to={`/artistprofile/${authState.id}`}
                    className="flex hover:bg-secondary hover:text-black py-2 px-3"
                  >
                    <span>My Profile</span>
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
                      <span>Logout</span>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="flex hover:bg-secondary hover:text-black py-2 px-3"
                    >
                      <span>Signup</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex hover:bg-secondary hover:text-black py-2 px-3"
                    >
                      <span>Login</span>
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
