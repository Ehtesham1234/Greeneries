import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import WeatherPlant from "./WeatherPlant";

const WeatherPlantList = () => {
  const [showMore, setShowMore] = useState(false);

  const Plant = [
    { name: "Plant 1", image: "https://via.placeholder.com/150" },
    { name: "Plant 2", image: "https://via.placeholder.com/150" },
    { name: "Plant 3", image: "https://via.placeholder.com/150" },
    { name: "Plant 4", image: "https://via.placeholder.com/150" },
    { name: "Plant 5", image: "https://via.placeholder.com/150" },
    { name: "Plant 6", image: "https://via.placeholder.com/150" },
    // Add more Plant as needed
  ];

  const visiblePlant = showMore ? Plant : Plant.slice(0, 4);

  return (
    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Winter Plant
        {/* yeh weather k according change kerna hoga dysnamic rahega */}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        {visiblePlant.map((Plant, index) => (
          <WeatherPlant key={index} image={Plant.image} name={Plant.name} />
        ))}
        {Plant.length > 4 && !showMore && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "1rem auto" }}
              onClick={() => setShowMore(true)}
            >
              Show More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WeatherPlantList;
