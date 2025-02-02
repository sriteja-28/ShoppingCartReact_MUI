import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Data } from "../Products/Cards";
import { Box, Grid } from '@mui/material';

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true); 

  useEffect(() => {
    const storedSlides = localStorage.getItem("slides");
    if (storedSlides) {
      setSlides(JSON.parse(storedSlides));
    } else {
      localStorage.setItem("slides", JSON.stringify(Data));
      setSlides(Data);
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 2000,
  };

  return (
<Box sx={{ padding: { xs: 2, sm: 4 } }}>
  <Grid container justifyContent="center">
    <Grid item xs={12} sm={10} md={12} sx={{ width: '100%' }}>
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide) => (
          <div
            key={slide._id}
            style={{
              width: '100%', 
              height: '400px', 
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center', 
            }}
          >
            <img
              src={slide.MblImg}
              alt={slide.name}
              style={{
                width: '100%', 
                height: '400px', 
                objectFit: 'contain',
                borderRadius: '10px', 
              }}
            />
          </div>
        ))}
      </Slider>
    </Grid>
  </Grid>
</Box>




  );
};

export default Carousel;