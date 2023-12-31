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
            BlossyLeaf Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Aliquam iusto quidem et voluptates possimus error quas ut ipsa aut
            pariatur ipsum officia quibusdam tempore, assumenda earum nemo odio
            temporibus autem fugiat quisquam in ab quasi? Nam rerum a nihil
            minus in quis fuga sint accusamus, error praesentium eum excepturi.
            Suscipit totam aliquam odit omnis minima eligendi ab, atque fugiat
            beatae a, vitae ducimus modi. Vel ab quasi unde commodi corporis?
            Harum, laboriosam! Dolore vero officiis blanditiis, quae nobis,
            atque illum illo rerum adipisci esse cupiditate similique et quod?
            Vel, quo corporis. Pariatur esse dolore obcaecati voluptas nostrum
            eligendi consequuntur laborum, deserunt explicabo. Amet tempore
            culpa ratione laborum est voluptate illo mollitia quos quasi
            corrupti nisi, porro nostrum optio, blanditiis laudantium. .
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
