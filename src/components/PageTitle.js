import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const PageTitle = ({ title, breadcrumbs = [] }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          component={RouterLink}
          to="/admin"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            component={breadcrumb.to ? RouterLink : 'span'}
            to={breadcrumb.to}
            sx={{
              color: index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
              cursor: breadcrumb.to ? 'pointer' : 'default',
            }}
          >
            {breadcrumb.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default PageTitle;
