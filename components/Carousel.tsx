import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        <div className="carousel-slide">
          <img src="/img/upmin.jpg" alt="Image 1" className="w-full h-full object-cover" />
        </div>
        <div className="carousel-slide">
          <img src="/img/1.png" alt="Image 2" className="w-full h-full object-cover" />
        </div>
        <div className="carousel-slide">
          <img src="/img/2.png" alt="Image 3" className="w-full h-full object-cover" />
        </div>
        <div className="carousel-slide">
          <img src="/img/3.png" alt="Image 4" className="w-full h-full object-cover" />
        </div>
        <div className="carousel-slide">
          <img src="/img/4.png" alt="Image 5" className="w-full h-full object-cover" />
        </div>
        <div className="carousel-slide">
          <img src="/img/5.png" alt="Image 6" className="w-full h-full object-cover" />
        </div>
        {/* Add more images as needed */}
      </Slider>
    </div>
  );
};

export default Carousel;