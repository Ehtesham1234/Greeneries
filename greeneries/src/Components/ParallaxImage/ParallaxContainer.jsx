import React from "react";
import ParallaxImage from "./ParallaxImage";

const ParallaxContainer = () => {
  return (
    <ParallaxImage image="./dark-plant.jpeg">
      <h1>Your Parallax Content</h1>
      <p>Additional content goes here.</p>
    </ParallaxImage>
  );
};

export default ParallaxContainer;
