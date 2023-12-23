import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Category = ({ image, name }) => {
  const theme = useTheme();
  return (
    <Box sx={{ margin: 2 }}>
      <Card
        sx={{
          width: 150,
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
      </Card>
    </Box>
  );
};

export default Category;
