import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

const ParallaxBackground = ({ children }) => {
  const ref = useRef();
  const theme = useTheme();
  useEffect(() => {
    const element = ref.current;
    let x = 0;

    const animateBackground = () => {
      x = x < window.innerWidth ? x + 1 : 0;
      element.style.backgroundPosition = `${x}px 0px`;
      requestAnimationFrame(animateBackground);
    };

    animateBackground();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundImage:
          theme.palette.mode === "dark"
            ? "url('/dark-plant.jpeg')"
            : "url('/plant.jpeg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "0px 0px",
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
        paddingTop: "1rem", // Added padding to the top
        paddingBottom: "1rem", // Added padding to the bottom
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxBackground;
