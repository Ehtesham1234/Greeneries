import * as React from "react";
import { Grid, Container, Typography } from "@mui/material";
import BlogCard from "./BlogCard";

export default function BlogCardList() {
  const posts = [
    {
      title: "Blog Post 1",
      description: "This is the first blog post",
      image: "https://via.placeholder.com/150",
      link: "/blog/post-1",
    },
    {
      title: "Blog Post 2",
      description: "This is the second blog post",
      image: "https://via.placeholder.com/150",
      link: "/blog/post-2",
    },
    {
      title: "Blog Post 3",
      description: "This is the third blog post",
      image: "https://via.placeholder.com/150",
      link: "/blog/post-3",
    },
    {
      title: "Blog Post 3",
      description: "This is the third blog post",
      image: "https://via.placeholder.com/150",
      link: "/blog/post-3",
    },
    {
      title: "Blog Post 3",
      description: "This is the third blog post",
      image: "https://via.placeholder.com/150",
      link: "/blog/post-3",
    },
    {
      title: "Blog Post 3",
      description: "This is the third blog post",
      image: "https://via.placeholder.com/150",
      link: "/blog/post-3",
    },
  ];
  return (
    <Container sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Top Blog
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 3 }}>
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <BlogCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
