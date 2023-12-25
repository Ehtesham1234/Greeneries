import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import Category from "./Category";

const CategoryList = () => {
  const [showMore, setShowMore] = useState(false);

  const categories = [
    { name: "Category 1", image: "https://via.placeholder.com/150" },
    { name: "Category 2", image: "https://via.placeholder.com/150" },
    { name: "Category 3", image: "https://via.placeholder.com/150" },
    { name: "Category 4", image: "https://via.placeholder.com/150" },
    { name: "Category 5", image: "https://via.placeholder.com/150" },
    { name: "Category 6", image: "https://via.placeholder.com/150" },
    // Add more categories as needed
  ];

  const visibleCategories = showMore ? categories : categories.slice(0, 5);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      {visibleCategories.map((category, index) => (
        <Category key={index} image={category.image} name={category.name} />
      ))}
      {categories.length > 5 && !showMore && (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
  );
};

export default CategoryList;
