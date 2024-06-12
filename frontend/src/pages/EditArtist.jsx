import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

function EditArtist() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [artistProfile, setArtistProfile] = useState({});

  const fetchArtist = async () => {
    // let { artistId } = useParams;
    try {
      // Fetch the artist profile data
      const profileResponse = await fetch(
        `http://localhost:3005/artists/byId/${authState.id}`
      );
      console.log(authState.id);
      const profileData = await profileResponse.json();
      setArtistProfile(profileData);
      console.log(profileData);
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

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Public Profile</h1>
          <hr />
        </div>
        <div className="pt-4">
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
                        value={formatBirthdate(artistProfile.birthdate)}
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
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Tell us a little bit of yourself"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-1/2 p-3">Profile Picture</div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditArtist;
