import React, { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import moment from "moment";

function Gallery() {
  return (
    <>
      <Header />
      <main className="px-4 md:px-6 lg:px-8 my-5">
        <h1 className="text-2xl">Gallery</h1>
      </main>
    </>
  );
}

export default Gallery;
