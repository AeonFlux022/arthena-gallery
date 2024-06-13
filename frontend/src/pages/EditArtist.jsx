import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";
import AlertNotification from "../components/AlertNotification.jsx";

function EditArtist() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artistProfile, setArtistProfile] = useState({});
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };

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

  const formatBirthdate = (birthdate) => {
    if (!birthdate) return "";
    return moment(birthdate).format("YYYY-MM-DD");
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setArtistProfile((prevArtistProfile) => ({
        ...prevArtistProfile,
        [name]: files[0],
      }));
    } else {
      setArtistProfile((prevArtistProfile) => ({
        ...prevArtistProfile,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", artistProfile.image);
    formData.append("firstName", artistProfile.firstName);
    formData.append("middleName", artistProfile.middleName);
    formData.append("lastName", artistProfile.lastName);
    formData.append("email", artistProfile.email);
    formData.append("bio", artistProfile.bio);
    formData.append("phoneNumber", artistProfile.phoneNumber);
    formData.append("gender", artistProfile.gender);
    formData.append("birthdate", artistProfile.birthdate);
    formData.append("age", artistProfile.age);
    formData.append("address", artistProfile.address);

    console.log(formData);

    axios
      .put(`http://localhost:3005/artists/update/${authState.id}`, formData)
      .then((response) => {
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          firstName: artistProfile.firstName,
          lastName: artistProfile.lastName,
          email: artistProfile.email,
        }));

        setAlert({ type: "success", message: "Profile updated successfully." });
        setTimeout(() => {
          navigate(`/artistProfile/${authState.id}`);
        }, 2000);
      })
      .catch((error) => {
        setAlert({ type: "danger", message: "Failed to update profile." });
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex justify-between items-center space-y-2 mb-2">
          <h1 className="font-bold text-2xl">Public Profile</h1>
          <button
            className="w-32 text-white bg-primary p-2 hover:bg-primary-dark"
            onClick={handleUpdate}
          >
            Save Profile
          </button>
        </div>
        <hr />
        <div className="pt-4">
          <AlertNotification alert={alert} closeAlert={closeAlert} />
          <form>
            <section className="flex flex-row gap-2">
              <div className="w-1/2 ">
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    First Name
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="firstName"
                      value={artistProfile.firstName || ""}
                      onChange={handleChange}
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Middle Name
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="middleName"
                      value={artistProfile.middleName || ""}
                      onChange={handleChange}
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Middle Name"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Last Name
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="lastName"
                      value={artistProfile.lastName || ""}
                      onChange={handleChange}
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Phone Number
                    </label>
                    <div className="my-2">
                      <input
                        type="text"
                        name="phoneNumber"
                        value={artistProfile.phoneNumber || ""}
                        onChange={handleChange}
                        className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Email
                    </label>
                    <div className="my-2">
                      <input
                        type="text"
                        name="email"
                        value={artistProfile.email || ""}
                        onChange={handleChange}
                        className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Address
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="address"
                      value={artistProfile.address || ""}
                      onChange={handleChange}
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Address"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Birhtdate
                    </label>
                    <div className="my-2">
                      <input
                        type="date"
                        name="birthdate"
                        value={formatBirthdate(artistProfile.birthdate || "")}
                        onChange={handleChange}
                        className="w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Age
                    </label>
                    <div className="my-2">
                      <input
                        type="number"
                        name="age"
                        value={artistProfile.age || ""}
                        onChange={handleChange}
                        className="w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Gender
                    </label>
                    <div className="my-2 shadow-sm">
                      <select
                        name="gender"
                        value={artistProfile.gender || ""}
                        onChange={handleChange}
                        className="block w-full border-box h-11 p-2.5 bg-neutral placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Bio
                  </label>
                  <div className="my-2">
                    <textarea
                      name="bio"
                      value={artistProfile.bio || ""}
                      onChange={handleChange}
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Tell us a little bit of yourself"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <span className="font-medium leading-6">Profile Picture</span>
                <img
                  className="w-48 h-48 rounded-full mx-auto"
                  src="https://placehold.co/300x300"
                />
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditArtist;
