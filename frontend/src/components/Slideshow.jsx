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
    speed: 1500,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src="hero-image.jpg"
          alt="Image 1"
          className="w-full h-screen object-fill"
        />
      </div>
      <div>
        <img
          src="https://placehold.co/1200x800/green/white"
          alt="Image 2"
          className="w-full h-screen object-cover"
        />
      </div>
      <div>
        <img
          src="https://placehold.co/1200x800/pink/black"
          alt="Image 3"
          className="w-full h-screen object-cover"
        />
      </div>
    </Slider>
  );
}
