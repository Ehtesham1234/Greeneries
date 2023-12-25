import React from "react";
import { useTheme } from "@emotion/react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const sections = [
    {
      title: "Solutions",
      links: ["Marketing", "Analytics", "Commerce", "Insights"],
    },
    {
      title: "Support",
      links: ["Pricing", "Documentation", "Guides", "API Status"],
    },
    { title: "Company", links: ["About", "Blog", "Jobs", "Press", "Partners"] },
    { title: "Legal", links: ["Claim", "Privacy", "Terms"] },
  ];

  return (
    <Box
      sx={{
        bgcolor: "primary.dark",
        // color: "white",
        p: 2,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ marginTop: 10, marginBottom: 10 }}>
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Typography
                  variant="body2"
                  display="block"
                  gutterBottom
                  key={link}
                  sx={{ mt: 1 }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" gutterBottom>
              The latest news articles, and resources sent to your inbox weekly.
            </Typography>
            <TextField variant="filled" placeholder="Email" fullWidth />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              style={{ marginTop: 16 }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, bgcolor: "grey.800" }} />

        <Box
          mt={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">
            © 2023 Your Company Inc. All rights reserved.
          </Typography>
          <Box>
            <Facebook sx={{ mx: 1 }} />
            <Instagram sx={{ mx: 1 }} />
            <Twitter sx={{ mx: 1 }} />
            <LinkedIn sx={{ mx: 1 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
