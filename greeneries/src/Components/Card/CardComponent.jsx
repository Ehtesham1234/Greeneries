import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
const CardComponent = (props) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: {
          xs: "90%", // width on extra small screens
          sm: "90%", // width on small screens
          md: "60%", // width on medium screens
          lg: "60%", // width on large screens
          xl: "60%", // width on extra large screens
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        boxSizing: "border-box",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.item.name}
          title={props.item.name}
          image="https://via.placeholder.com/150"
        />
        <CardContent
          sx={{ flexGrow: 1, backgroundColor: theme.palette.primary.main }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.item.description}
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop="16px">
            <Typography variant="body2" color="text.secondary">
              Calories: {props.item.calories}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Carbohydrates: {props.item.carbohydrates}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" marginTop="16px">
            <Typography variant="body2" color="text.secondary">
              Protein: {props.item.protein}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fat (Unsaturated): {props.item.fat}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
