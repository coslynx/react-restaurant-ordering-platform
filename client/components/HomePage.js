import React from 'react';
import { Container, Typography, Grid, Button, Box, Image } from '@mui/material';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getFeaturedDishes } from '../../utils/api';

const HomePage = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isLoading, error, data: featuredDishes } = useQuery('featuredDishes', getFeaturedDishes);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Welcome to [Restaurant Name]!
      </Typography>
      <Typography variant="h5" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        [Restaurant Tagline]
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Image src="/images/restaurant-hero.jpg" alt="Restaurant Hero Image" width={500} height={300} />
      </Box>
      <Typography variant="h5" gutterBottom align="center" sx={{ mt: 4, color: isDarkMode ? 'white' : 'black' }}>
        Featured Dishes
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
          Failed to load featured dishes. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {featuredDishes.map((dish) => (
            <Grid item xs={12} sm={6} md={4} key={dish._id}>
              {/ Render dish card here /}
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" color="primary" href="/menu">
          View Our Menu
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;