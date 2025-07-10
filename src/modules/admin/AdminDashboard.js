import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { 
  Box, 
  Toolbar, 
  AppBar, 
  IconButton, 
  Typography, 
  Avatar, 
  Badge, 
  Tooltip,
  useTheme,
  useMediaQuery,
  CssBaseline,
  Container,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Dashboard as DashboardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';
import Penduduk from '../penduduk/Penduduk';
import Keluarga from '../keluarga/Keluarga';
import RumahTangga from '../rumahtangga/RumahTangga';
import HomeDashboard from '../home/HomeDashboard';
import IdentitasDesa from '../identitas_desa/IdentitasDesa';
import PersuratanDashboard from '../persuratan/PersuratanDashboard';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        marginLeft: 0,
      }),
    },
  }),
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AdminLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location, isMobile]);

  // Get current page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(Boolean);
    if (path.length <= 2) return 'Dashboard';
    
    const page = path[path.length - 1];
    return page
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account settings">
              <IconButton
                onClick={() => {}}
                size="small"
                sx={{ ml: 2 }}
                aria-controls="account-menu"
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBarStyled>
      
      {/* Sidebar */}
      <Sidebar 
        open={isMobile ? mobileOpen : open} 
        onClose={() => setMobileOpen(false)} 
        isMobile={isMobile} 
      />
      
      {/* Main Content */}
      <Main open={isMobile ? true : open}>
        <Toolbar />
        
        {/* Breadcrumbs */}
        <Container maxWidth={false} sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/admin"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Typography color="text.primary">
              {getPageTitle()}
            </Typography>
          </Breadcrumbs>
        </Container>
        
        {/* Page Content */}
        <Container maxWidth={false}>
          <Routes>
            <Route index element={<HomeDashboard />} />
            <Route path="identitas-desa" element={<IdentitasDesa />} />
            <Route path="penduduk" element={<Penduduk />} />
            <Route path="keluarga" element={<Keluarga />} />
            <Route path="persuratan" element={<PersuratanDashboard />} />
            {/* Add more routes as needed */}
          </Routes>
        </Container>
      </Main>
    </Box>
  );
};

export default AdminDashboard;
