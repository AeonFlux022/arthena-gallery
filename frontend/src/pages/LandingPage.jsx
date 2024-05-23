import React from "react";
import "../index.css";
import Header from "../components/Header";

function LandingPage() {
  return (
    <>
      <Header />
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </>
  );
}

export default LandingPage;
