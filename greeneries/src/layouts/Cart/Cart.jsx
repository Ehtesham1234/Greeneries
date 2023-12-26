import React from "react";
import { Typography, Button, Grid, Box, Divider } from "@mui/material";
import CartItem from "./CartItem";

const Cart = () => {
  const items = [
    {
      id: 1,
      name: "Apple Juice",
      description: "250ml",
      price: 2.99,
      image: "/dark-plant.jpeg",
    },
    {
      id: 2,
      name: "Grapes Juice",
      description: "250ml",
      price: 3.19,
      image: "/dark-plant.jpeg",
    },
  ];

  const subtotal = items.reduce((total, item) => total + item.price, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h4">Shopping Cart</Typography>
        <Button variant="outlined" color="primary">
          Remove all
        </Button>
      </Box>
      <Grid container spacing={2}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Grid>
      <Divider sx={{ margin: "16px 0" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Box>
          <Typography variant="h6">{`Subtotal: $${subtotal.toFixed(
            2
          )}`}</Typography>
          <Typography variant="subtitle1">{`${items.length} items total`}</Typography>
        </Box>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
