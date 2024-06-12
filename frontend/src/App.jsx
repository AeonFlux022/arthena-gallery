import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
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
          <Route
            path="/artistprofile/:id"
            exact
            element={<ArtistProfilePage />}
          />
          <Route path="/editartist/:id" exact element={<EditArtist />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
