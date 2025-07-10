import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  FamilyRestroom as FamilyRestroomIcon,
  HomeWork as HomeWorkIcon,
  Description as DocumentIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Map as MapIcon,
  Help as HelpIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { 
    text: 'Beranda', 
    icon: <HomeIcon />, 
    path: '/admin' 
  },
  { 
    text: 'Kependudukan', 
    icon: <PeopleIcon />, 
    path: null,
    children: [
      { text: 'Data Penduduk', path: '/admin/penduduk' },
      { text: 'Data Keluarga', path: '/admin/keluarga' },
      { text: 'Rumah Tangga', path: '/admin/rumah-tangga' },
      { text: 'Kelompok', path: '/admin/kelompok' },
    ]
  },
  { 
    text: 'Wilayah', 
    icon: <MapIcon />, 
    path: null,
    children: [
      { text: 'Dusun', path: '/admin/wilayah/dusun' },
      { text: 'RW', path: '/admin/wilayah/rw' },
      { text: 'RT', path: '/admin/wilayah/rt' },
      { text: 'Peta Wilayah', path: '/admin/wilayah/peta' },
    ]
  },
  { 
    text: 'Layanan', 
    icon: <DescriptionIcon />, 
    path: null,
    children: [
      { text: 'Persuratan', path: '/admin/layanan/persuratan' },
      { text: 'Permohonan', path: '/admin/layanan/permohonan' },
      { text: 'Layanan Mandiri', path: '/admin/layanan/mandiri' },
    ]
  },
  { 
    text: 'Laporan', 
    icon: <AssessmentIcon />, 
    path: null,
    children: [
      { text: 'Statistik Penduduk', path: '/admin/laporan/statistik' },
      { text: 'Laporan Bulanan', path: '/admin/laporan/bulanan' },
      { text: 'Ekspor Data', path: '/admin/laporan/ekspor' },
    ]
  },
  { 
    text: 'Pengaturan', 
    icon: <SettingsIcon />, 
    path: '/admin/pengaturan' 
  },
];

const Sidebar = ({ open, onClose, isMobile }) => {
  const theme = useTheme();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (text) => {
    setOpenMenus(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        ...(isSmallScreen && { justifyContent: 'center' })
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ 
          display: open ? 'block' : 'none',
          fontWeight: 'bold',
          color: theme.palette.primary.main
        }}>
          SIMBANG
        </Typography>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.children ? (
              <>
                <ListItemButton 
                  onClick={() => handleClick(item.text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: location.pathname.startsWith(`/admin/${item.text.toLowerCase()}`) 
                        ? theme.palette.primary.main 
                        : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontWeight: location.pathname.startsWith(`/admin/${item.text.toLowerCase()}`) 
                        ? 'bold' 
                        : 'normal'
                    }}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {open && (openMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={openMenus[item.text] || false} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.text}
                        component={RouterLink}
                        to={child.path}
                        selected={location.pathname === child.path}
                        sx={{
                          pl: 4,
                          '&.Mui-selected': {
                            backgroundColor: theme.palette.action.selected,
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover,
                            },
                          },
                        }}
                      >
                        <ListItemText 
                          primary={child.text} 
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            fontWeight: location.pathname === child.path ? '500' : 'normal'
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main 
                      : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? '500' : 'normal'
                  }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(9),
            },
          }),
        },
      }}
      open={open}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
