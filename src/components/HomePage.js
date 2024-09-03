import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';

// Styled Card with animation
const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
  margin: theme.spacing(2), // Add margin to ensure cards don't touch the edges
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(/assets/hero-bg.jpg)`, // Menggunakan path relatif dari folder public
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(8, 2),
  textAlign: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',// Dark overlay for better text visibility
    zIndex: 1,
  },
}));


const HomePage = () => {
  return (
    <Box>
      <HeroSection>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Agung Dev Tools
          </Typography>
          <Typography variant="h5" paragraph>
            Agung Dev Tools is a comprehensive platform offering a range of free, user-friendly productivity tools designed to enhance your daily tasks. Whether you need to generate strong passwords, translate text between languages, or perform basic calculations, our tools are crafted to provide a seamless and efficient experience. Our goal is to help you accomplish tasks with ease, supported by a modern and intuitive interface.
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} to="/password-generator" sx={{ marginTop: 2 }}>
            Explore Tools
          </Button>
        </Box>
      </HeroSection>
      <Box sx={{ padding: '40px', backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <AnimatedCard>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300x200"
                alt="Password Generator"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Password Generator
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easily generate strong and secure passwords to enhance your online security. Our tool offers customizable options to meet your security needs.
                </Typography>
                <Button size="small" component={Link} to="/password-generator" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                  Open Tool Now
                </Button>
              </CardContent>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedCard>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300x200"
                alt="Translate Tool"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Translate Tool
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quickly translate text between multiple languages to bridge communication gaps. Ideal for travelers, students, and professionals.
                </Typography>
                <Button size="small" component={Link} to="/translate-tool" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                  Open Tool Now
                </Button>
              </CardContent>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedCard>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300x200"
                alt="Standard Calculator"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Standard Calculator
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Perform basic arithmetic operations with our simple and straightforward calculator. Perfect for everyday calculations.
                </Typography>
                <Button size="small" component={Link} to="/calculator" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                  Open Tool Now
                </Button>
              </CardContent>
            </AnimatedCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
