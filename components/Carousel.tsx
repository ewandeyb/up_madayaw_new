import React from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/app/globals.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

const SampleNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

export default Carousel;