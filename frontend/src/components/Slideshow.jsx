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
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      <div className="flex w-full">
        <div className="flex flex-row">
          <div className="w-1/2 bg-yellow-300 flex mx-auto items-center justify-center">
            check
          </div>
          <img src="poster4.png" alt="Image 1" className="w-1/2 h-screen" />
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <div className="w-1/2 bg-green-300">check</div>
          <img src="poster5.png" alt="Image 1" className="w-1/2 h-screen" />
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <div className="w-1/2 bg-pink-300">check</div>
          <img src="poster8.png" alt="Image 1" className="w-1/2 h-screen" />
        </div>
      </div>
    </Slider>
  );
}
