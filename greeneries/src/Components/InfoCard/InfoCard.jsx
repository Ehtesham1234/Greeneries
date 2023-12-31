import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTheme } from "@mui/material/styles";

const InfoCards = () => {
  const theme = useTheme();
  const infoData = [
    {
      icon: <StoreIcon />,
      title: "Largest Nursery",
      description: "Aliquam iusto quidem et voluptates possimus error quas ut",
    },
    {
      icon: <GroupIcon />,
      title: "Lifetime Support",
      description: "Aliquam iusto quidem et voluptates possimus error quas ut",
    },
    {
      icon: <HomeIcon />,
      title: "All India Delivery",
      description: "Aliquam iusto quidem et voluptates possimus error quas ut",
    },
    {
      icon: <LocalShippingIcon />,
      title: "Secure Shipping",
      description: "Aliquam iusto quidem et voluptates possimus error quas ut",
    },
  ];

  // Access the color directly from the theme
  //   const backgroundColor =
  //     theme.palette.mode === "light"
  //       ? theme.palette.primary.main
  //       : theme.palette.primary.main;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        border: "none",
        boxShadow: "none",
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: theme.palette.primary.main, // Use the color here
      }}
    >
      {infoData.map((info, index) => (
        <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
          <Box>
            {/* <Card> */}
            <CardContent>
              {info.icon}
              <Typography variant="h6">{info.title}</Typography>
              <Typography variant="body2">{info.description}</Typography>
            </CardContent>
            {/* </Card> */}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCards;
