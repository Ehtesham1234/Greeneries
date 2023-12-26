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

// import { useRef } from "react";
// import moon from "/dark-plant.jpeg";
// import land from "/plant.jpeg";
// // import cat from "./cat.gif";

// import { Parallax, ParallaxLayer } from "@react-spring/parallax";

// const ParallaxImage = () => {
//   const ref = useRef();
//   return (
//     <div>
//       <Parallax pages={4} ref={ref}>
//         {/* <ParallaxLayer speed={1}>
//           <h2>Welcome to my website</h2>
//       </ParallaxLayer>

//       <ParallaxLayer offset={1} speed={0.5}>
//           <h2>Web development is fun!</h2>
//       </ParallaxLayer> */}

//         <ParallaxLayer
//           offset={0}
//           speed={1}
//           factor={2}
//           style={{
//             backgroundImage: `url(${moon})`,
//             backgroundSize: "cover",
//           }}
//         />

//         <ParallaxLayer
//           offset={2}
//           speed={1}
//           factor={4}
//           style={{
//             backgroundImage: `url(${land})`,
//             backgroundSize: "cover",
//           }}
//         ></ParallaxLayer>

//         {/* <ParallaxLayer
//           sticky={{ start: 0.9, end: 2.5 }}
//           style={{ textAlign: "center" }}
//         >
//           <img src={cat} />
//         </ParallaxLayer> */}

//         <ParallaxLayer
//           offset={0.2}
//           speed={0.05}
//           onClick={() => ref.current.scrollTo(3)}
//         >
//           <h2>Welcome to my website</h2>
//         </ParallaxLayer>

//         <ParallaxLayer
//           offset={3}
//           speed={2}
//           onClick={() => ref.current.scrollTo(0)}
//         >
//           <h2>Hi Mom!</h2>
//         </ParallaxLayer>
//       </Parallax>
//     </div>
//   );
// };

// export default ParallaxImage;
