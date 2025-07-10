import React from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn, Menu as MenuIcon, Search as SearchIcon, ShoppingCart } from '@mui/icons-material';

const StyledHeader = styled('header')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '15px 0',
}));

const HeroSection = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
  padding: '120px 0 80px',
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
  },
}));

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ fontFamily: '"Poppins", sans-serif' }}>
      {/* Header */}
      <StyledHeader>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={6} md={2}>
              <Typography variant="h5" fontWeight={700} color="primary">
                KIT
              </Typography>
            </Grid>
            
            {!isMobile && (
              <Grid item md={6}>
                <Box display="flex" justifyContent="center" gap={4}>
                  {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((item) => (
                    <Button key={item} color="inherit">
                      {item}
                    </Button>
                  ))}
                </Box>
              </Grid>
            )}
            
            <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <IconButton><SearchIcon /></IconButton>
              <IconButton><ShoppingCart /></IconButton>
              {isMobile && <IconButton><MenuIcon /></IconButton>}
            </Grid>
          </Grid>
        </Container>
      </StyledHeader>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontSize: isMobile ? '2.5rem' : '4rem', 
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 3
                }}
              >
                Modern Furniture for Modern Living
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 4, fontSize: '1.1rem' }}
              >
                Discover our curated collection of high-quality furniture designed to bring comfort and style to your home.
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  View Collection
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Modern Furniture"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Box py={10} bgcolor="background.paper">
        <Container maxWidth="lg">
          <Box textAlign="center" maxWidth="700px" mx="auto" mb={8}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              Our Features
            </Typography>
            <Typography color="text.secondary">
              We provide the best furniture with super quality and modern design that suits your needs.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                title: 'Premium Quality',
                description: 'High-quality materials and craftsmanship for lasting durability.',
                icon: '⭐',
                image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              },
              {
                title: 'Modern Design',
                description: 'Contemporary designs that complement any interior style.',
                icon: '🎨',
                image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              },
              {
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping to your doorstep.',
                icon: '🚚',
                image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={feature.image}
                    alt={feature.title}
                  />
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          bgcolor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          mr: 2,
                          fontSize: '1.2rem'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box py={8} bgcolor="#f8f9fa">
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography color="text.secondary">
              Stay updated with our latest products and exclusive offers.
            </Typography>
          </Box>
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              maxWidth: '600px',
              mx: 'auto',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              size="large"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: '50px',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box bgcolor="#1a1a1a" color="white" py={6}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                KIT
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Modern furniture for modern living. We provide high-quality furniture with the best design.
              </Typography>
              <Box display="flex" gap={2}>
                {[<Facebook />, <Twitter />, <Instagram />, <LinkedIn />].map((icon, index) => (
                  <IconButton key={index} color="inherit">
                    {icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
            {['Shop', 'About', 'Support'].map((category, index) => (
              <Grid item xs={6} md={2} key={index}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  {category}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map((item, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>
                      <Typography 
                        component="a" 
                        href="#" 
                        sx={{ 
                          color: 'text.secondary',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Grid>
            ))}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Contact Us
              </Typography>
              <Box component="address" sx={{ fontStyle: 'normal', color: 'text.secondary' }}>
                <Typography>123 Furniture St.</Typography>
                <Typography>New York, NY 10001</Typography>
                <Typography>Email: info@kitfurniture.com</Typography>
                <Typography>Phone: (123) 456-7890</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={6} pt={3} borderTop="1px solid rgba(255, 255, 255, 0.1)">
            <Typography variant="body2" color="text.secondary" textAlign="center">
              © {new Date().getFullYear()} KIT Furniture. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
