import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext.js";
import axios from "axios";
import "./App.css";

// admin
import Dashboard from "./admin/Dashboard.jsx";

// client
import LandingPage from "./pages/LandingPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ArtistProfilePage from "./pages/ArtistProfilePage.jsx";
import EditArtist from "./pages/EditArtist.jsx";
import AddArtwork from "./pages/AddArtwork.jsx";
// import EditArtwork from "./pages/EditArtwork.jsx";
import ArtworkPage from "./pages/ArtworkPage.jsx";
import ArtistsPage from "./pages/ArtistsPage.jsx";

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    id: 0,
    role: "",
    status: false,
  });

  // check if may unod and authState if may ara wala lamg, if wala e set
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     axios
  //       .get("http://localhost:3005/auth/auth", {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then((response) => {
  //         if (!response.data.error) {
  //           setAuthState({
  //             username: response.data.username,
  //             email: response.data.email,
  //             firstName: response.data.firstName,
  //             lastName: response.data.lastName,
  //             id: response.data.id,
  //             role: response.data.role,
  //             status: true,
  //           });
  //         } else {
  //           setAuthState({
  //             ...authState,
  //             status: false,
  //           });
  //           localStorage.removeItem("accessToken");
  //           navigate("/");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching authentication data:", error);
  //         setAuthState({
  //           ...authState,
  //           status: false,
  //         });
  //         localStorage.removeItem("accessToken");
  //         navigate("/");
  //       });
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3005/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
          localStorage.removeItem("accessToken");
          navigate("/");
        } else {
          setAuthState({
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            id: response.data.id,
            role: response.data.role,
            status: true,
          });
        }
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/admin" exact element={<Dashboard />} />
          <Route path="/signup" exact element={<SignupPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/artists" exact element={<ArtistsPage />} />
          <Route
            path="/artistprofile/:id"
            exact
            element={<ArtistProfilePage />}
          />
          <Route path="/editartist/:id" exact element={<EditArtist />} />
          <Route path="/artistprofile/:id/add" exact element={<AddArtwork />} />
          <Route
            path="/artworkpage/:artworkId"
            exact
            element={<ArtworkPage />}
          />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
