import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardComponent from "../Card/CardComponent";

const CarouselComponent = () => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      calories: "67",
      carbohydrates: "17.0 g",
      protein: "0.60 g",
      fat: "0.40 g",
    },
    // Add more items here...
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
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} autoPlay={true} interval={2000} infinite>
      {items.map((item, i) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CardComponent key={i} item={item} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
