import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Button
} from '@mui/material';
import {
  Description,
  Business,
  Mail,
  Send,
  Assignment,
  Settings,
  Print,
  GetApp,
  Add
} from '@mui/icons-material';

// Import komponen surat
import LayananSurat from './LayananSurat';
import SuratDinas from './SuratDinas';
import SuratMasuk from './SuratMasuk';
import SuratKeluar from './SuratKeluar';
import SyaratanSurat from './SyaratanSurat';
import PengaturanSurat from './PengaturanSurat';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`persuratan-tabpanel-${index}`}
      aria-labelledby={`persuratan-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `persuratan-tab-${index}`,
    'aria-controls': `persuratan-tabpanel-${index}`,
  };
}

const PersuratanDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Mock data untuk statistik
  const stats = {
    layananSurat: 45,
    suratDinas: 12,
    suratMasuk: 8,
    suratKeluar: 15,
    totalTemplate: 67,
    menungguPersetujuan: 5
  };

  const recentActivities = [
    { type: 'layanan', title: 'Surat Keterangan Domisili', date: '2024-01-10', status: 'completed' },
    { type: 'dinas', title: 'Surat Edaran Gotong Royong', date: '2024-01-09', status: 'pending' },
    { type: 'masuk', title: 'Surat dari Kecamatan', date: '2024-01-08', status: 'new' },
    { type: 'keluar', title: 'Surat Undangan Rapat', date: '2024-01-07', status: 'sent' }
  ];

  const quickActions = [
    { title: 'Cetak Surat Layanan', icon: <Print />, color: 'primary' },
    { title: 'Buat Surat Dinas', icon: <Add />, color: 'secondary' },
    { title: 'Input Surat Masuk', icon: <Mail />, color: 'info' },
    { title: 'Kirim Surat Keluar', icon: <Send />, color: 'warning' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sistem Persuratan Desa
      </Typography>
      
      {/* Dashboard Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistik Persuratan
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {stats.layananSurat}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Layanan Surat
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">
                      {stats.suratDinas}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Surat Dinas
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="info.main">
                      {stats.suratMasuk}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Surat Masuk
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      {stats.suratKeluar}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Surat Keluar
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aksi Cepat
              </Typography>
              <Grid container spacing={1}>
                {quickActions.map((action, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant="outlined"
                      color={action.color}
                      startIcon={action.icon}
                      fullWidth
                      size="small"
                      sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                    >
                      {action.title}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Aktivitas Terbaru
          </Typography>
          <List>
            {recentActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {activity.type === 'layanan' && <Description color="primary" />}
                    {activity.type === 'dinas' && <Business color="secondary" />}
                    {activity.type === 'masuk' && <Mail color="info" />}
                    {activity.type === 'keluar' && <Send color="warning" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.title}
                    secondary={activity.date}
                  />
                  <Chip
                    label={activity.status}
                    color={activity.status === 'completed' ? 'success' : 
                           activity.status === 'pending' ? 'warning' :
                           activity.status === 'new' ? 'info' : 'default'}
                    size="small"
                  />
                </ListItem>
                {index < recentActivities.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Tabs untuk berbagai jenis surat */}
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="persuratan tabs"
        >
          <Tab 
            label="Layanan Surat" 
            icon={<Description />} 
            {...a11yProps(0)} 
          />
          <Tab 
            label="Surat Dinas" 
            icon={<Business />} 
            {...a11yProps(1)} 
          />
          <Tab 
            label="Surat Masuk" 
            icon={<Mail />} 
            {...a11yProps(2)} 
          />
          <Tab 
            label="Surat Keluar" 
            icon={<Send />} 
            {...a11yProps(3)} 
          />
          <Tab 
            label="Syaratan Surat" 
            icon={<Assignment />} 
            {...a11yProps(4)} 
          />
          <Tab 
            label="Pengaturan" 
            icon={<Settings />} 
            {...a11yProps(5)} 
          />
        </Tabs>
        
        <TabPanel value={value} index={0}>
          <LayananSurat />
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <SuratDinas />
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <SuratMasuk />
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          <SuratKeluar />
        </TabPanel>
        
        <TabPanel value={value} index={4}>
          <SyaratanSurat />
        </TabPanel>
        
        <TabPanel value={value} index={5}>
          <PengaturanSurat />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PersuratanDashboard;