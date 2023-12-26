import React from "react";
import { Parallax } from "react-parallax";

const ParallaxImage = ({ image, children }) => {
  return (
    <Parallax bgImage={image} strength={500}>
      <div>
        <div>{children}</div>
      </div>
    </Parallax>
  );
};

export default ParallaxImage;
