import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CSSProperties } from "@mui/styled-engine";
import { Box } from "@mui/material";
import bannerImage from "../../assets/Sample.png";
import classes from "./Carousel.module.css";
import { ICarouselPropType } from "../../utility/interfaces/carousel";

export default function Carousel({ style }: ICarouselPropType) {
  var settings = {
    dots: true,
    dotsClass: classes.dots,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    "../../assets/Sample.png",
    "../../assets/Sample.png",
    "../../assets/Sample.png",
    "../../assets/Sample.png",
    "../../assets/Sample.png",
  ];
  return (
    <div className={classes.carousel} style={style}>
      <Slider {...settings}>
        {images.map((image: string) => (
          <div>
            <img
              style={{ width: "100%", height: "100%" }}
              src={bannerImage}
              alt="img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
