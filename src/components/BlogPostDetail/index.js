import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, Grid, CircularProgress } from '@mui/material';
import getDynamicIdFromUrl from '../../utils/trailingSlash';

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NEWS_API_URL}/everything?q=blog&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then(response => {
        const selectedPost = response.data.articles.find(article => getDynamicIdFromUrl(article.url) === id);
        setPost(selectedPost);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!post) return <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
    <CircularProgress />
  </Grid>;

  if (post.content === "[Removed]") return <Grid container display='flex' flexDirection='column' justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
    <Typography>
      No Content For This Post
    </Typography>
    <Button sx={{
      marginTop: '50px'
    }} variant="contained" component={Link} to="/">Back</Button>
  </Grid>;

  return (
    <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
    }}
  >
      <Typography variant="h4" component="div" gutterBottom>
        {post.title}
      </Typography>
      <Box display='flex' justifyContent='center'>
        <img src={post.urlToImage} alt={post.title} style={{ width: '75%', justifyContent: 'center', display: 'flex' }} />
      </Box>
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
        <Button variant="contained" component={Link} to="/" sx={{ width: 'auto' }}>
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default BlogPostDetails;
