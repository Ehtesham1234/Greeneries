import React from "react";
import {
  TextField,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Pinterest,
  ArrowForwardIos,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import PlantCard from "../../Components/Plants/PlantCard";
import BlogCardList from "../../Components/Blog/BlogCardList";

const ImageContainer = styled("div")({
  width: "100%",
  height: "400px",
  backgroundImage: `url('/dark-plant.jpeg')`,
  backgroundSize: "cover",
});

const SocialMedia = styled("div")(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(2),
}));

const TopButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 0,
  bottom: 0,
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: theme.spacing(2),
  flexDirection: "column",
}));

const NextButton = styled(Button)(({ theme }) => ({
  color: "red",
  textTransform: "none",
}));
const CommentForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(2),
}));

const CommentButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxWidth: "200px",
}));

export default function BlogPost() {
  const treeData = [
    {
      name: "Japanese Maple",
      image: "https://example.com/images/japanese_maple.jpg",
      details:
        "Known for its graceful shape and vibrant fall colors. Thrives in well-drained soil and partial shade.",
      rating: 4.5,
      benefits: [
        "Beautiful foliage",
        "Low maintenance",
        "Attracts birds and butterflies",
      ],
    },
    {
      name: "Weeping Willow",
      image: "https://example.com/images/weeping_willow.jpg",
      details:
        "Elegant tree with cascading branches that provide shade and privacy. Prefers moist soil and full sun.",
      rating: 4,
      benefits: ["Graceful appearance", "Tolerates wet soil", "Provides shade"],
    },
    {
      name: "Weeping Willow",
      image: "https://example.com/images/weeping_willow.jpg",
      details:
        "Elegant tree with cascading branches that provide shade and privacy. Prefers moist soil and full sun.",
      rating: 4,
      benefits: ["Graceful appearance", "Tolerates wet soil", "Provides shade"],
    },
  ];
  const visibleTree = treeData.slice(0, 2);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ImageContainer />
        </Grid>
        <Grid item xs={2} sx={{ marginTop: 5, marginBottom: 5 }}>
          <SocialMedia>
            <IconButton>
              <Facebook />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <LinkedIn />
            </IconButton>
            <IconButton>
              <Pinterest />
            </IconButton>
          </SocialMedia>
        </Grid>
        <Grid item xs={8} sx={{ marginTop: 5, marginBottom: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            BlossyLeaf
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Why PM Modi Planted Parijat Tree in Ayodhya?
          </Typography>
          <Typography variant="body1">
            Have you ever heard of a tree so enchanting it seems like a creature
            from the realm of fantasy? Meet: The Parijat tree – a botanical
            wonder that’s as elusive as a unicorn and as essential as your...
          </Typography>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Related product
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 3, marginBottom: 3 }}>
              {visibleTree.map((tree, i) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <PlantCard tree={tree} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <PaginationContainer>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              The Hidden Powers of Maghai Pan: More than Just a Chew
            </Typography>
            <NextButton endIcon={<ArrowForwardIos />}>Next article</NextButton>
          </PaginationContainer>
          <CommentForm noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  label="Your name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <TextField
              required
              id="message"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <CommentButton
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Post comment
            </CommentButton>
          </CommentForm>
        </Grid>
        <Grid container spacing={2}>
          <BlogCardList />
        </Grid>
        <Grid item xs={2}>
          <TopButton variant="contained" color="secondary">
            Top
          </TopButton>
        </Grid>
      </Grid>
    </Box>
  );
}
