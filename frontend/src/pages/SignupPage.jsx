import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../index.css";

function SignupPage() {
  return (
    <>
      {/* <Header /> */}
      <div className="h-dvh bg-neutral">
        <section className="flex h-full px-0 flex-col lg:flex-row">
          <div className="flex flex-col w-full justify-center py-5 lg:w-3/4">
            <div className="w-full px-20 pt-20 mb-20">
              <div className="leading-6 mb-6">
                <h1 className="text-4xl">Join us today!</h1>
                <p className="text-xl">Sign up and let's get started.</p>
              </div>
              <div className="">
                <form>
                  <div className="flex flex-row gap-2">
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        First Name
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
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
                          id="middleName"
                          className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
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
                          id="lastName"
                          className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Phone Number
                      </label>
                      <div className="my-2 shadow-sm">
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
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
                          id="birthdate"
                          className="block w-full border-0 py-2 px-3 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
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
                          id="age"
                          className="block w-full border-0 py-2 px-3 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                          placeholder="Age"
                        />
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
                          id="username"
                          className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
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
                          id="email"
                          className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
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
                        id="password"
                        className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium leading-6">
                      Description
                    </label>
                    <div className="my-2 shadow-sm">
                      <input
                        type="text"
                        name="bio"
                        id="bio"
                        className="block w-full border-0 py-2 pl-3 pr-20 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                        placeholder="Describe yourself"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-center mt-8">
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
          <div className="flex flex-col bg-primary text-center justify-center gap-3 p-5 text-white lg:w-1/3">
            <h1 className="text-3xl">Already a member?</h1>
            <p className="text-xl">Login to access your account.</p>
            <div className="justify-center mt-4">
              <Link className="" href="/login">
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
