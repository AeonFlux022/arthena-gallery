import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import AlertNotification from "../components/AlertNotification.jsx";

function SignupPage() {
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    phoneNumber: "",
    gender: "",
    birthdate: "",
    age: "",
    address: "",
    image: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // fix ta ni dapat
    // if wala unod ang fields ma error
    // const emptyFields = Object.values(formData).some((field) => !field);
    // if (emptyFields) {
    //   setAlert({
    //     type: "danger",
    //     message: "Please fill in the required fields.",
    //   });
    //   return;
    // }

    try {
      const response = await axios.post(
        `http://localhost:3005/artists/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setAlert({
        type: "success",
        message: "Account created successfully!",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3500);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setAlert({ type: "danger", message: "Error creating user." });
      }
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="bg-neutral">
        <section className="flex h-dvh flex-col lg:flex-row">
          <div className="flex flex-col w-full justify-center p-8 lg:w-3/4">
            <div className="justify-center w-full mx-auto">
              <div className="leading-6 mb-6">
                <h1 className="text-4xl font-bold">Join us today!</h1>
                <p className="text-xl">Sign up and let's get started.</p>
              </div>
              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        First Name
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          value={formData.firstName}
                          className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Middle Name
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="middleName"
                          onChange={handleChange}
                          value={formData.middleName}
                          className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Middle Name"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Last Name
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          value={formData.lastName}
                          className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Phone Number
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="phoneNumber"
                          onChange={handleChange}
                          value={formData.phoneNumber}
                          className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Birth Date
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="date"
                          name="birthdate"
                          onChange={handleChange}
                          value={formData.birthdate}
                          className="block w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Age
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="number"
                          name="age"
                          onChange={handleChange}
                          value={formData.age}
                          className="block w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Age"
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
                          onChange={handleChange}
                          value={formData.gender}
                          className="block w-full border-box h-11 p-2.5 bg-neutral placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark appearance-none"
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
                  <div className="flex flex-row gap-2">
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Username
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          value={formData.username}
                          className="block w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Username"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Email
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                          className="block w-full box-border p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Email"
                        />
                      </div>
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
                        onChange={handleChange}
                        value={formData.password}
                        className="block w-full box-border p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark focus:border-0"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Address
                    </label>
                    <div className="my-2 shadow-sm">
                      <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                        className="block w-full box-border p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <AlertNotification alert={alert} closeAlert={closeAlert} />
                  <div className="flex flex-col gap-2 justify-center mt-8 text-sm lg:flex-row">
                    <button
                      className="bg-primary text-white font-bold w-full p-3 hover:bg-primary-light"
                      type="submit"
                    >
                      Create New Account
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
          <div className="flex flex-col bg-primary text-center justify-center gap-2 p-8 text-white lg:w-1/3">
            <h1 className="text-3xl">Already a member?</h1>
            <p className="text-xl">Login to access your account.</p>
            <div className="justify-center mt-4">
              <Link className="" to="/login">
                <button className="bg-secondary text-black font-bold p-3 w-full lg:w-44 hover:bg-secondary-dark">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignupPage;
