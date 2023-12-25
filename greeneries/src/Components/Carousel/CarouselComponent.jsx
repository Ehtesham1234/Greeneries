import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardComponent from "../Card/CardComponent";
import ParallaxBackground from "./ParralaxBackground";
import { Box } from "@mui/material";

const CarouselComponent = () => {
  var items = [
    {
      name: "Random Name #2",
      description: "Probably the most random thing you have ever seen!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
    {
      name: "Random Name #3",
      description: "Probably the most random thing you have ever seen!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <ParallaxBackground>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        interval={2000}
        infinite
      >
        {items.map((item, i) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            key={i}
          >
            <CardComponent key={i} item={item} />
          </Box>
        ))}
      </Carousel>
    </ParallaxBackground>
  );
};

export default CarouselComponent;
