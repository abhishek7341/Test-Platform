import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CSSProperties } from "@mui/styled-engine";
import { Box } from "@mui/material";
import bannerImage from "../../assets/Sample.png";
import "./Carousel.css";
import { ICarouselPropType } from "../../utility/interfaces/carousel";
import { List } from "reselect/es/types";
import { getAllBanners } from "../../services/bannerService";

interface bannerPayload {
  image: string;
  text: string;
}

export default function Carousel({ style }: ICarouselPropType) {
  const [banners, setBanners] = useState<Array<bannerPayload>>([]);
  const getBanners = async () => {
    try {
      let bannerList: Array<bannerPayload> = [];
      const response = await getAllBanners();
      response.data.data.result.map((res: any) => {
        bannerList.push({ image: res.bannerImagePath, text: res.bannerText });
      });
      setBanners(bannerList);
    } catch (err) {}
  };
  useEffect(() => {
    getBanners();
  }, []);

  const settings = {
    dots: true,
    dotsClass: "dots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    bannerImage,
    bannerImage,
    bannerImage,
    bannerImage,
    bannerImage,
  ];
  return (
    <Box className={"carousel"} sx={style}>
      <Slider {...settings}>
        {banners.map((banner: bannerPayload) => (
          <div className="bannerDiv">
            <img className="bannerImg" src={bannerImage} alt="img" />
            <span className="bannerText">{banner.text}</span>
          </div>
        ))}
      </Slider>
    </Box>
  );
}
