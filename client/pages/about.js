import React from 'react';
import { Container, Typography, Grid, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import TeamMemberCard from './TeamMemberCard';
import { teamMembers } from '../../data/teamMembers';

const AboutUsPage = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        About Us
      </Typography>
      <Divider sx={{ mt: 4, mb: 4 }} />
      <Typography variant="body1" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        We are a passionate team of food enthusiasts dedicated to bringing you the best culinary experience. Our mission is to create a welcoming and comfortable atmosphere where you can enjoy delicious food and exceptional service.
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Our team is committed to using fresh, high-quality ingredients and traditional cooking techniques to create dishes that are both flavorful and satisfying. We take pride in our commitment to customer service and strive to make every visit memorable.
      </Typography>
      <Typography variant="h5" gutterBottom align="center" sx={{ mt: 4, color: isDarkMode ? 'white' : 'black' }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <TeamMemberCard member={member} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Image src="/images/restaurant-interior.jpg" alt="Restaurant Interior" width={500} height={300} />
      </Box>
    </Container>
  );
};

export default AboutUsPage;