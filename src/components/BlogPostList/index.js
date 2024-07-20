import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Grid, Pagination } from '@mui/material';
import BlogPostItem from '../BlogPostItem';
import axios from 'axios';
import config from '../../config';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${config.API_URL}/everything?q=blog&pageSize=10&page=${page}&apiKey=${config.API_KEY}`
      )
      .then((response) => {
        setPosts(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  return (
    <Container
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BlogPostItem post={post} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
            count={10}
            page={page}
            onChange={(event, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}
    </Container>
  );
};

export default BlogPostList;
