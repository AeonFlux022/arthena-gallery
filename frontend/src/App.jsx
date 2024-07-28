import { useState, useEffect, useContext } from "react";
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
import ArtistProfilePage from "./pages/artist/ArtistProfilePage.jsx";
import EditArtist from "./pages/artist/EditArtist.jsx";
import AddArtwork from "./pages/artist/AddArtwork.jsx";
// import EditArtwork from "./pages/EditArtwork.jsx";
import ArtworkPageByUser from "./pages/ArtworkPageByUser.jsx";
import Gallery from "./pages/Gallery.jsx";
import ArtistsPage from "./pages/guest/ArtistsPage.jsx";
import Artist from "./pages/guest/Artist.jsx";

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    id: 0,
    role: "",
    status: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get("http://localhost:3005/auth/auth", {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          });
          if (!response.data.error) {
            setAuthState((prevState) => ({
              ...prevState,
              username: response.data.username,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              id: response.data.id,
              role: response.data.user.role,
              status: true,
            }));
          } else {
            setAuthState((prevState) => ({
              ...prevState,
              status: false,
            }));
            localStorage.removeItem("accessToken");
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching authentication data:", error);
          setAuthState((prevState) => ({
            ...prevState,
            status: false,
          }));
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      }
    };

    fetchData();
  }, []);

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
  //             role: response.data.user.role,
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

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/admin" exact element={<Dashboard />} />
          <Route path="/signup" exact element={<SignupPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/allArtists" exact element={<ArtistsPage />} />
          <Route path="/gallery" exact element={<Gallery />} />
          <Route path="/artist/:artistid" exact element={<Artist />} />
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
            element={<ArtworkPageByUser />}
          />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
