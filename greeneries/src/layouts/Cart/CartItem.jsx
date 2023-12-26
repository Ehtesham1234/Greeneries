import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({ item }) => {
  return (
    <Grid item xs={12}>
      <Card
        sx={{ display: "flex", flexDirection: "row", "& > *": { flex: 1 } }}
      >
        <CardContent>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100px", height: "100px" }}
          />
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent>
            <Typography variant="h5">{item.name}</Typography>
            <Typography variant="subtitle1">{item.description}</Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button>
            <RemoveIcon />
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button>
            <AddIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2">{`$${item.price}`}</Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button size="small" color="primary">
              Save for later
            </Button>
            <Button size="small" color="primary">
              Remove
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default CartItem;
