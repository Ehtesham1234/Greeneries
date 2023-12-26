import React from "react";
import { Typography, Box, Grid } from "@mui/material";

const BlossyLeaf = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            BlossyLeaf
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            BlossyLeaf is an Indian online platform that sells plants, gardening
            supplies, and related products. It was founded in 2014 with the aim
            of making gardening accessible to everyone. BlossyLeaf offers a
            variety of plants, tools, fertilizers, and other gardening
            accessories. The platform also provides resources such as articles,
            videos, and a gardening community for enthusiasts to share their
            knowledge and experiences.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Plants
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            Plants are important for several reasons, especially in modern times
            when people spend more time indoors due to work and lifestyle
            changes.
          </Typography>
          <Typography variant="body1" paragraph>
            • Aesthetic appeal: Plants can add beauty and life to any space
            whether it’s an office home or outdoor garden. They come in various
            shapes sizes colors making them versatile appealing.
          </Typography>
          <Typography variant="body1" paragraph>
            • Health benefits: Plants can improve air quality by absorbing
            pollutants releasing oxygen They can also reduce stress levels boost
            mood improve mental health.
          </Typography>
          <Typography variant="body1" paragraph>
            • Sustainability: Keeping plants can be an eco-friendly option as
            they can help reduce carbon emissions reduce waste support
            biodiversity.
          </Typography>
          <Typography variant="body1" paragraph>
            • Food production: Growing plants like vegetables fruits can provide
            source fresh healthy produce free from harmful pesticides chemicals.
          </Typography>
          <Typography variant="body1" paragraph>
            • Education: Keeping plants provide great opportunity learning
            biology botany natural world.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlossyLeaf;
