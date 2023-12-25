import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTheme } from "@mui/material/styles";

const PlantCard = ({ tree }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        // width: {
        //   xs: "90%", // width on extra small screens
        //   sm: "90%", // width on small screens
        //   md: "60%", // width on medium screens
        //   lg: "60%", // width on large screens
        //   xl: "60%", // width on extra large screens
        // },
        width: "270px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        boxSizing: "border-box",
        marginBottom: 2,
        transition: "transform 0.15s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={tree.name}
          height="150"
          // image={tree.image}
          image="https://via.placeholder.com/150"
        />
        <CardContent
          sx={{ flexGrow: 1, backgroundColor: theme.palette.primary.main }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {tree.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {tree.details}
          </Typography>
          <Rating name="rating" value={tree.rating} />
          <Typography variant="body2" color="textSecondary">
            Benefits: {tree.benefits.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <AddShoppingCartIcon /> Add to Cart
        </Button>
        <Button size="small" color="secondary">
          <FavoriteIcon /> Favorite
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlantCard;
