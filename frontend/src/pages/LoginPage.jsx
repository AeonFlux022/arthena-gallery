import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";
import { AuthContext } from "../helpers/AuthContext";
import AlertNotification from "../components/AlertNotification.jsx";

function LoginPage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const closeAlert = () => {
    setAlert(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Check if username and password fields are not empty
    if (!username || !password) {
      setAlert({
        type: "danger",
        message: "Please fill in all fields.",
      });
      return;
    }

    const data = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:3005/auth/login",
        data
      );
      if (response.data.error) {
        setAlert({
          type: "danger",
          message: "Invalid username or password.",
        });
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: response.data.role,
          status: true,
        });
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error
      ) {
        setAlert({ type: "danger", message: error.response.data.error });
      } else {
        setAlert({
          type: "danger",
          message: "Wrong username or password combination.",
        });
      }
    }
  };

  return (
    <>
      <div className="h-dvh bg-neutral">
        <section className="flex h-full px-0 flex-col lg:flex-row">
          <div className="flex flex-col w-full justify-center py-5 lg:w-3/4">
            <div className="w-full px-20 pt-20 mb-20">
              <AlertNotification alert={alert} closeAlert={closeAlert} />
              <div className="leading-6 mb-6">
                <h1 className="text-4xl font-bold">
                  Welcome to Arthena Gallery!
                </h1>
                <p className="text-xl">Please login to continue.</p>
              </div>
              <div className="">
                <form onSubmit={handleLogin}>
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Username or Email
                    </label>
                    <div className="my-2 shadow-sm">
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                        placeholder="Enter username or email"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Password
                    </label>
                    <div className="my-2 shadow-sm">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-center mt-8">
                    <button
                      className="bg-primary text-white font-bold w-full p-3 hover:bg-primary-light"
                      type="submit"
                    >
                      Login
                    </button>
                    <Link
                      to="/"
                      className="text-center border border-black text-black font-bold w-full p-3 hover:bg-black hover:border-black hover:text-neutral"
                    >
                      Go Back
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-primary text-center justify-center gap-3 p-5 text-white lg:w-1/3">
            <h1 className="text-3xl">New to Arthena Gallery?</h1>
            <p className="text-xl">Signup to create an account.</p>
            <div className="justify-center mt-4">
              <Link className="" to="/signup">
                <button className="bg-secondary text-black font-bold p-3 w-full lg:w-44 hover:bg-secondary-dark">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
