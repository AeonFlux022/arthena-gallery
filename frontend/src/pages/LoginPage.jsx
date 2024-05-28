import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function LoginPage() {
  return (
    <>
      <div className="h-dvh bg-neutral">
        <section className="flex h-full px-0 flex-col lg:flex-row">
          <div className="flex flex-col w-full justify-center py-5 lg:w-3/4">
            <div className="w-full px-20 pt-20 mb-20">
              <div className="leading-6 mb-6">
                <h1 className="text-4xl">Welcome to Arthena Gallery!</h1>
                <p className="text-xl">Please login to continue.</p>
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
