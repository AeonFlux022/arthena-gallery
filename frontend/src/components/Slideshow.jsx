import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slideshow() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      <div>
        <div className="flex">
          <div className="absolute h-screen flex items-center justify-left px-10">
            <div className="w-2/3 flex flex-col space-y-5">
              <h1 className="text-6xl leading-[4rem] text-black">
                Want to earn while making art?
              </h1>
              <span className="text-xl text-balance font-light">
                Your dedicated online art gallery.
              </span>
              <button className="bg-secondary w-44 p-3 font-bold text-black hover:bg-secondary-dark">
                Learn more
              </button>
            </div>
          </div>
          <img
            src="slideshow-1.png"
            alt="Image 1"
            className="w-full h-screen"
          />
        </div>
      </div>
      <div>
        <div className="flex w-full">
          <div className="absolute h-screen flex items-center justify-left px-10">
            <div className="w-2/3 flex flex-col space-y-5">
              <h1 className="text-6xl leading-[4rem] text-black">
                Earning can also be creative.
              </h1>
              <span className="text-xl text-balance font-light">
                Your dedicated online art gallery.
              </span>
              <button className="bg-secondary w-44 p-3 font-bold text-black hover:bg-secondary-dark">
                Learn more
              </button>
            </div>
          </div>
          <img
            src="slideshow-2.png"
            alt="Image 1"
            className="w-full h-screen"
          />
        </div>
      </div>
    </Slider>
  );
}
