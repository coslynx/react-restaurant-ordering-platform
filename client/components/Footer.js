import React from 'react';
import { Container, Typography, Grid, Link } from '@mui/material';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <Container maxWidth="md" sx={{ mt: 8, py: 4, bgcolor: isDarkMode ? '#121212' : '#f5f5f5', color: isDarkMode ? 'white' : 'black' }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" gutterBottom align="center">
            &copy; {new Date().getFullYear()} [Restaurant Name]. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item>
              <Link href="/about" underline="hover">
                About Us
              </Link>
            </Grid>
            <Grid item>
              <Link href="/contact" underline="hover">
                Contact Us
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;