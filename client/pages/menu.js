import React from 'react';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import DishCard from '../components/DishCard';
import { getMenu } from '../../utils/api';

const MenuPage = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isLoading, error, data: menu } = useQuery('menu', getMenu);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
          Failed to load menu. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Our Menu
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {menu.categories.map((category) => (
          <Grid item xs={12} key={category.name}>
            <Typography variant="h5" gutterBottom align="left" sx={{ color: isDarkMode ? 'white' : 'black' }}>
              {category.name}
            </Typography>
            <Grid container spacing={3}>
              {category.dishes.map((dish) => (
                <Grid item xs={12} sm={6} md={4} key={dish._id}>
                  <DishCard dish={dish} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MenuPage;