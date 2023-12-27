import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "@emotion/react";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          "& > *": { flex: 1 },
        }}
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
            <Typography variant="h5" sx={{ color: theme.palette.text.main }}>
              {item.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: theme.palette.text.main }}
            >
              {item.description}
            </Typography>
          </CardContent>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Button
            variant="outlined"
            onClick={handleDecrease}
            sx={{ color: theme.palette.text.main }}
          >
            <RemoveIcon />
          </Button>
          <TextField
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            size="small" // makes the TextField smaller
            style={{
              width: "60px",
              margin: "0 10px",
              color: theme.palette.text.main,
            }}
          />
          <Button
            variant="outlined"
            onClick={handleIncrease}
            sx={{ color: theme.palette.text.main }}
          >
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
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.text.main }}
            >{`$${item.price}`}</Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button size="small" variant="h4" color="primary">
              Save for later
            </Button>
            <Button size="small" variant="h4" color="primary">
              Remove
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default CartItem;
