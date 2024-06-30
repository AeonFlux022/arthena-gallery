import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../index.css";
import axios from "axios";
import Header from "../components/Header";

function LandingPage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex flex-row bg-primary h-screen shadow-lg">
        <div className="w-1/2 flex items-center justify-start text-white mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col space-y-5 pr-24">
            <h1 className="text-6xl leading-[4rem]">
              Empowering our student artists.
            </h1>
            <span className="text-xl text-balance font-light">
              Join our community of emerging artist and share your art to ignite
              inspiration.
            </span>
            <button className="bg-secondary w-44 p-3 font-bold text-black hover:bg-secondary-dark">
              Explore Artwork
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-gray-100">
          <img src="hero-image.jpg" className="h-full object-cover" />
        </div>
      </div>
      <section className="container mx-auto h-auto my-20">
        <div className="container mx-auto w-3/4 lg:w-1/2 text-center mb-12">
          <h1 className="text-4xl mb-4">Our Featured Artworks</h1>
          <span className="text-xl font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quippe:
            habes enim a rhetoribus; Quis istud possit, inquit, negare? Satis
            est ad hoc responsum.
          </span>
        </div>
        {/* <div className="grid grid-cols-1 mx-auto px-3 gap-2 lg:grid-cols-4 lg:px-0">
            {artworkData.map((artwork) => (
              <Card key={artwork.title} {...artwork} />
            ))}
          </div> */}
      </section>
      <section className="mx-auto text-center bg-gray-200 my-20 ">
        <div className="flex flex-col justify-center items-center py-32">
          <p className="text-xl mb-8">
            &#34;Pollicetur certe. Sint modo partes vitae beatae. Duo Reges:
            constructio interrete. Nihilo magis.&#34;
          </p>
          <div className="rounded-full bg-secondary size-12 mb-3"></div>
          <span className="font-bold">
            Enrik Junemark Facundo, Vice President of SIPD
          </span>
        </div>
      </section>
      <section className="p-3">
        <figure className="flex mx-auto items-center container p-6 h-96 mb-4 bg-black lg:p-0 lg:gap-10">
          <img
            src="https://placehold.co/500x400/d2d2d2/222"
            className="hidden lg:block lg:h-full"
            alt="sample-image"
          />
          <div className="flex flex-col text-center text-neutral lg:text-left lg:justify-center">
            <span className="mb-4">John Doe</span>
            <figcaption className="space-y-24">
              <h5 className="text-3xl lg:text-5xl lg:tracking-wide">
                The best way to wireframe a website.
              </h5>
              <div className="hover:text-secondary hover:cursor-pointer">
                <span>Read More</span>
              </div>
            </figcaption>
          </div>
        </figure>
        <div className="container mx-auto gap-4 grid lg:grid-cols-2">
          <div className="bg-white shadow-lg h-auto p-6 space-y-4 flex flex-col">
            <h1 className="text-xl">
              Keys to writing copy that actually converts and sells users
            </h1>
            <span>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor parturient
            </span>
          </div>
          <div className="bg-white shadow-lg h-auto p-6 space-y-4 flex flex-col">
            <h1 className="text-xl">
              Keys to writing copy that actually converts and sells users
            </h1>
            <span>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor parturient
            </span>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 px-8 py-10 mt-10">
        <div className="container mx-auto flex flex-col h-64 py-3 justify-around items-center lg:flex lg:flex-row lg:gap-4">
          <div className="flex flex-col text-center mb-6 space-y-3 lg:w-1/2 lg:text-left">
            <h1 className="text-3xl ">Ready to get started?</h1>
            <span className="text-lg">Sign up or contact us.</span>
          </div>
          <div className="flex flex-col w-full justify-end lg:w-1/2 lg:flex-row gap-4">
            <Link to="/signup">
              <button className="bg-primary text-neutral w-full lg:w-60 px-8 py-3 hover:bg-primary-dark">
                Create an Account
              </button>
            </Link>

            <button className="border text-black border-black w-full lg:w-60 px-8 py-3 hover:bg-black hover:border-black hover:text-neutral">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
