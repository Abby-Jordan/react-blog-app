import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getDynamicIdFromUrl from '../../utils/trailingSlash';
import moment from 'moment';

const BlogPostItem = ({ post }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const postId = getDynamicIdFromUrl(post.url);
    navigate(`/post/${postId}`);
  };


  const formattedDate = moment(post.publishedAt).format('Do MMMM YYYY');

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',  cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
    }, }} onClick={handleNavigate}>
      <CardMedia
        height="140"
        component="img"
        image={post.urlToImage}
        alt={post.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="right">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostItem;
