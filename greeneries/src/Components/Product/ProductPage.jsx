import React, { useState } from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/dark-plant.jpeg");
  const images = [
    "/dark-plant.jpeg",
    "/dark-plant.jpeg",
    "/dark-plant.jpeg",
    "/plant.jpeg",
  ];

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "300px",
          }}
        >
          <img src={selectedImage} alt="Sneaker" style={{ width: "100%" }} />
          <Box display="flex" justifyContent="center" mt={2}>
            {images.map((image, index) => (
              <Box key={index} mx={1}>
                <img
                  src={image}
                  alt={`Sneaker ${index + 1}`}
                  style={{ width: "50px", cursor: "pointer" }}
                  onClick={() => setSelectedImage(image)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          //   alignItems="center"
          height="100%"
        >
          <Typography variant="h5" gutterBottom>
            BlossyLeaf
          </Typography>
          <Typography variant="h2" gutterBottom>
            Lily Plant
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro error
            corporis atque? Culpa, cumque? Dicta eaque tenetur amet. Obcaecati
            quia nihil voluptates labore ipsam molestiae enim aperiam dicta
            architecto unde.
          </Typography>
          <Typography variant="h4" gutterBottom>
            $125.00
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <s>$250.00</s>
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Button variant="outlined" onClick={handleDecrease}>
              <RemoveIcon />
            </Button>
            <TextField
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              size="small" // makes the TextField smaller
              style={{ width: "60px", margin: "0 10px" }}
            />
            <Button variant="outlined" onClick={handleIncrease}>
              <AddIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "16px" }}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
