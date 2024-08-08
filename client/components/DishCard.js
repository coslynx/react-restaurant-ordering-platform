import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const DishCard = ({ dish }) => {
  const dispatch = useDispatch();
  const { name, price, image, description, id } = dish;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...dish }));
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="bold" mt={2}>
          ${price}
        </Typography>
      </CardContent>
      <Button variant="contained" size="small" sx={{ margin: '1rem' }} onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default DishCard;