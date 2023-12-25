import React, { useState } from "react";
import PlantCard from "./PlantCard";
import { Grid, Box, Button, Typography } from "@mui/material";
const PlantCardList = () => {
  const [showMore, setShowMore] = useState(false);
  const treeData = [
    {
      name: "Japanese Maple",
      image: "https://example.com/images/japanese_maple.jpg",
      details:
        "Known for its graceful shape and vibrant fall colors. Thrives in well-drained soil and partial shade.",
      rating: 4.5,
      benefits: [
        "Beautiful foliage",
        "Low maintenance",
        "Attracts birds and butterflies",
      ],
    },
    {
      name: "Weeping Willow",
      image: "https://example.com/images/weeping_willow.jpg",
      details:
        "Elegant tree with cascading branches that provide shade and privacy. Prefers moist soil and full sun.",
      rating: 4,
      benefits: ["Graceful appearance", "Tolerates wet soil", "Provides shade"],
    },
    {
      name: "Red Oak",
      image: "https://example.com/images/red_oak.jpg",
      details:
        "Majestic tree with vibrant fall colors. Thrives in well-drained soil and full sun.",
      rating: 4.8,
      benefits: ["Strong and durable", "Provides shade", "Attracts wildlife"],
    },
    {
      name: "Red Oak",
      image: "https://example.com/images/red_oak.jpg",
      details:
        "Majestic tree with vibrant fall colors. Thrives in well-drained soil and full sun.",
      rating: 4.8,
      benefits: ["Strong and durable", "Provides shade", "Attracts wildlife"],
    },
    {
      name: "Red Oak",
      image: "https://example.com/images/red_oak.jpg",
      details:
        "Majestic tree with vibrant fall colors. Thrives in well-drained soil and full sun.",
      rating: 4.8,
      benefits: ["Strong and durable", "Provides shade", "Attracts wildlife"],
    },
    {
      name: "Red Oak",
      image: "https://example.com/images/red_oak.jpg",
      details:
        "Majestic tree with vibrant fall colors. Thrives in well-drained soil and full sun.",
      rating: 4.8,
      benefits: ["Strong and durable", "Provides shade", "Attracts wildlife"],
    },
    {
      name: "Red Oak",
      image: "https://example.com/images/red_oak.jpg",
      details:
        "Majestic tree with vibrant fall colors. Thrives in well-drained soil and full sun.",
      rating: 4.8,
      benefits: ["Strong and durable", "Provides shade", "Attracts wildlife"],
    },
  ];

  const visibleTree = showMore ? treeData : treeData.slice(0, 6);
  return (
    <Box sx={{ marginTop: 1, marginBottom: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Top Trend
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 3, marginBottom: 3 }}>
        {visibleTree.map((tree, i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <PlantCard tree={tree} />
            </Box>
          </Grid>
        ))}
        {treeData.length > 6 && !showMore && (
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
      </Grid>
    </Box>
  );
};

export default PlantCardList;
