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
    <div className='mx-auto max-w-xl sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl'>
      <Slider {...settings}>
        <div>
          <img src="/img/upmin.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="/img/1.png" alt="Image 2" />
        </div>
        <div>
          <img src="/img/2.png" alt="Image 3" />
        </div>
        <div>
          <img src="/img/3.png" alt="Image 4" />
        </div>
        <div>
          <img src="/img/4.png" alt="Image 5" />
        </div>
        <div>
          <img src="/img/5.png" alt="Image 6" />
        </div>
        {/* Add more images as needed */}
      </Slider>
    </div>
  );
};

export default Carousel;