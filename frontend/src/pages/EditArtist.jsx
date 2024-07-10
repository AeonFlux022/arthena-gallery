import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";
import AlertNotification from "../components/AlertNotification.jsx";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function EditArtist() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artistProfile, setArtistProfile] = useState({});
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };
  const [file, setFile] = useState(null);

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
      const file = files[0];
      setFile(file);
      setArtistProfile((prevArtistProfile) => ({
        ...prevArtistProfile,
        [name]: files[0], // Store the file name, not the file object
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

    // console.log(formData);

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
            className="w-44 text-white bg-primary p-2 hover:bg-primary-dark"
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
                    <div className="my-2 relative shadow-sm">
                      <select
                        name="gender"
                        value={artistProfile.gender || ""}
                        onChange={handleChange}
                        className="block w-full border-box h-11 p-2.5 bg-neutral placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 appearance-none"
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
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
                <div className="relative">
                  <img
                    className="w-48 h-48 rounded-full mx-auto border-4 border-primary"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : `http://localhost:3005/uploads/${artistProfile.image}` ||
                          "https://placehold.co/300x300"
                    }
                    alt="avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/300x300";
                    }}
                  />
                  <div>
                    <label
                      htmlFor="profilePicture"
                      className="absolute p-3 cursor-pointer w-12 h-12 rounded-full items-center bg-primary text-white bottom-0 left-0 translate-x-60 -translate-y-1  hover:bg-primary-dark"
                    >
                      <img src="/photo-camera.svg" className="mx-auto" />
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      className="hidden"
                      name="image"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditArtist;
