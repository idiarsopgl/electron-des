import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import { 
  People as PeopleIcon, 
  Home as HomeIcon, 
  Receipt as ReceiptIcon, 
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
  Notifications as NotificationsIcon,
  Announcement as AnnouncementIcon
} from '@mui/icons-material';

// Komponen Statistik Card
const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}.light`,
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          <Icon fontSize="large" />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Komponen Daftar Terbaru
const RecentList = ({ title, items, icon: Icon }) => (
  <Card sx={{ height: '100%' }}>
    <CardHeader 
      title={title}
      action={
        <Button size="small" color="primary">
          Lihat Semua
        </Button>
      }
    />
    <Divider />
    <List>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemIcon>
              <Icon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={item.title} 
              secondary={item.subtitle}
            />
            <IconButton size="small">
              <ArrowForwardIcon />
            </IconButton>
          </ListItem>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPenduduk: 0,
    totalKeluarga: 0,
    totalRumahTangga: 0,
    totalSurat: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Fetch data dari API
  useEffect(() => {
    // Contoh data statis, ganti dengan fetch API
    setStats({
      totalPenduduk: 1250,
      totalKeluarga: 450,
      totalRumahTangga: 380,
      totalSurat: 124
    });

    setRecentActivities([
      { title: 'Pendaftaran Baru', subtitle: 'Budi Santoso mendaftar sebagai penduduk' },
      { title: 'Pembaruan Data', subtitle: 'Data keluarga An. Ahmad diperbarui' },
      { title: 'Pengajuan Surat', subtitle: 'Surat pengantar untuk Siti Aisyah' },
      { title: 'Kegiatan Desa', subtitle: 'Gotong royong RT 03' }
    ]);

    setAnnouncements([
      { title: 'Jadwal Siskamling', subtitle: 'Minggu ini giliran RW 02' },
      { title: 'Bansos Tahap 2', subtitle: 'Pendaftaran dibuka sampai 30 Juli 2023' },
      { title: 'Posyandu', subtitle: 'Akan dilaksanakan tanggal 15 Juli 2023' }
    ]);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Statistik Utama */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Penduduk" 
            value={stats.totalPenduduk.toLocaleString()} 
            icon={PeopleIcon} 
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Keluarga" 
            value={stats.totalKeluarga.toLocaleString()} 
            icon={HomeIcon} 
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Rumah Tangga" 
            value={stats.totalRumahTangga.toLocaleString()} 
            icon={HomeIcon} 
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Surat" 
            value={stats.totalSurat.toLocaleString()} 
            icon={ReceiptIcon} 
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Konten Utama */}
      <Grid container spacing={3}>
        {/* Aktivitas Terbaru */}
        <Grid item xs={12} md={8}>
          <RecentList 
            title="Aktivitas Terbaru" 
            items={recentActivities}
            icon={EventIcon}
          />
        </Grid>

        {/* Pengumuman */}
        <Grid item xs={12} md={4}>
          <RecentList 
            title="Pengumuman" 
            items={announcements}
            icon={AnnouncementIcon}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
