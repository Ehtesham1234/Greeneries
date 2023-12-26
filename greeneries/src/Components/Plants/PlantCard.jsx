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
  const maxChar = 50; // Maximum number of characters to display
  const description =
    tree.details.length > maxChar
      ? tree.details.substring(0, maxChar) + "... See More"
      : tree.details;
  const benefits =
    tree.benefits.join(", ").length > maxChar
      ? tree.benefits.join(", ").substring(0, maxChar) + "... See More"
      : tree.benefits.join(", ");

  return (
    <Card
      sx={{
        width: "16.875rem",
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
          image="https://via.placeholder.com/150"
        />
        <CardContent
          sx={{ flexGrow: 1, backgroundColor: theme.palette.primary.main }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {tree.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <Rating name="rating" value={tree.rating} />
          <Typography variant="body2" color="textSecondary">
            Benefits: {benefits}
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
