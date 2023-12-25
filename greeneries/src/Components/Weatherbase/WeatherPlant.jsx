import React from "react";
import { CardMedia, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const WeatherPlant = ({ image, name }) => {
  const theme = useTheme();
  return (
    <Box sx={{ margin: 2 }}>
      <Box
        // Card
        sx={{
          width: 200,
          margin: "1rem",
          transition: "transform 0.15s ease-in-out",
          boxShadow: "none",
          backgroundColor: theme.palette.background.main,
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="img"
          title={name}
          sx={{
            height: 0,
            paddingTop: "100%", // This makes the height equal to the width
            borderRadius: "50%",
            backgroundSize: "cover",
            backgroundImage: `url(${image})`,
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          style={{ textAlign: "center" }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default WeatherPlant;
