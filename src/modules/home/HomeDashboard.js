import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import {
  People,
  Business,
  LocationCity,
  Assignment,
  TrendingUp,
  AccountBalance,
  Description,
  Security,
  Settings,
  Notifications,
  Person,
  FamilyRestroom as Family,
  Group,
  Mail,
  Warning,
  CheckCircle,
  AccessTime,
  Refresh,
  BarChart,
  PieChart,
  Timeline
} from '@mui/icons-material';

const HomeDashboard = () => {
  const [statistics, setStatistics] = useState({
    penduduk: {
      total: 0,
      laki: 0,
      perempuan: 0,
      keluarga: 0,
      rtm: 0,
      mutasi_bulan_ini: 0
    },
    wilayah: {
      dusun: 0,
      rw: 0,
      rt: 0
    },
    persuratan: {
      total_surat: 0,
      bulan_ini: 0,
      menunggu: 0
    },
    keuangan: {
      anggaran: 0,
      realisasi: 0,
      persentase: 0
    },
    program: {
      aktif: 0,
      peserta: 0,
      bantuan: 0
    },
    layanan: {
      mandiri: 0,
      online: 0,
      offline: 0
    }
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [quickStats, setQuickStats] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const mockData = {
      penduduk: {
        total: 2547,
        laki: 1287,
        perempuan: 1260,
        keluarga: 743,
        rtm: 812,
        mutasi_bulan_ini: 15
      },
      wilayah: {
        dusun: 5,
        rw: 12,
        rt: 35
      },
      persuratan: {
        total_surat: 1247,
        bulan_ini: 67,
        menunggu: 8
      },
      keuangan: {
        anggaran: 2500000000,
        realisasi: 1875000000,
        persentase: 75
      },
      program: {
        aktif: 12,
        peserta: 1340,
        bantuan: 8
      },
      layanan: {
        mandiri: 156,
        online: 89,
        offline: 67
      }
    };

    const mockActivities = [
      {
        id: 1,
        type: 'penduduk',
        title: 'Pendaftaran penduduk baru',
        description: 'Ahmad Sugiarto telah didaftarkan sebagai penduduk baru',
        time: '2 menit yang lalu',
        icon: <Person color="primary" />
      },
      {
        id: 2,
        type: 'surat',
        title: 'Permohonan surat keterangan',
        description: 'Surat Keterangan Domisili atas nama Siti Fatimah',
        time: '15 menit yang lalu',
        icon: <Description color="secondary" />
      },
      {
        id: 3,
        type: 'keuangan',
        title: 'Realisasi anggaran',
        description: 'Input realisasi belanja operasional bulan ini',
        time: '1 jam yang lalu',
        icon: <AccountBalance color="success" />
      },
      {
        id: 4,
        type: 'program',
        title: 'Bantuan DTKS',
        description: 'Penambahan 5 keluarga penerima bantuan DTKS',
        time: '2 jam yang lalu',
        icon: <Group color="info" />
      }
    ];

    const mockNotifications = [
      {
        id: 1,
        type: 'warning',
        title: 'Backup Database',
        message: 'Backup database terakhir 3 hari yang lalu',
        urgent: true
      },
      {
        id: 2,
        type: 'info',
        title: 'Update Sistem',
        message: 'Tersedia update sistem versi 2024.01',
        urgent: false
      },
      {
        id: 3,
        type: 'success',
        title: 'Sinkronisasi Berhasil',
        message: 'Data berhasil disinkronisasi dengan server pusat',
        urgent: false
      }
    ];

    setStatistics(mockData);
    setRecentActivities(mockActivities);
    setNotifications(mockNotifications);
  }, []);

  const StatCard = ({ title, value, subtitle, icon, color = 'primary', trend = null }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} fontSize="small" />
                <Typography variant="body2" color="success.main">
                  {trend}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.light`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={onClick}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Avatar sx={{ bgcolor: `${color}.light`, mx: 'auto', mb: 2, width: 48, height: 48 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  const quickActions = [
    {
      title: 'Tambah Penduduk',
      description: 'Daftarkan penduduk baru',
      icon: <Person />,
      color: 'primary',
      onClick: () => console.log('Navigate to add penduduk')
    },
    {
      title: 'Cetak Surat',
      description: 'Cetak surat layanan',
      icon: <Description />,
      color: 'secondary',
      onClick: () => console.log('Navigate to print letter')
    },
    {
      title: 'Input Keuangan',
      description: 'Input data keuangan',
      icon: <AccountBalance />,
      color: 'success',
      onClick: () => console.log('Navigate to finance input')
    },
    {
      title: 'Kelola Program',
      description: 'Kelola program bantuan',
      icon: <Assignment />,
      color: 'warning',
      onClick: () => console.log('Navigate to program management')
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard Desa
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Sistem Informasi Desa Terpadu
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => window.location.reload()}
        >
          Refresh Data
        </Button>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Penduduk"
            value={statistics.penduduk.total}
            subtitle={`${statistics.penduduk.laki} Laki-laki, ${statistics.penduduk.perempuan} Perempuan`}
            icon={<People />}
            color="primary"
            trend={`+${statistics.penduduk.mutasi_bulan_ini} bulan ini`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Keluarga (KK)"
            value={statistics.penduduk.keluarga}
            subtitle={`${statistics.penduduk.rtm} RTM terdaftar`}
            icon={<Family />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Surat Bulan Ini"
            value={statistics.persuratan.bulan_ini}
            subtitle={`${statistics.persuratan.menunggu} menunggu approval`}
            icon={<Description />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Realisasi Anggaran"
            value={`${statistics.keuangan.persentase}%`}
            subtitle={`Rp ${(statistics.keuangan.realisasi / 1000000000).toFixed(1)}M dari Rp ${(statistics.keuangan.anggaran / 1000000000).toFixed(1)}M`}
            icon={<AccountBalance />}
            color="success"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Quick Actions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aksi Cepat
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <QuickActionCard {...action} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Statistics Chart Placeholder */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Statistik Bulanan
                </Typography>
                <Box>
                  <IconButton size="small">
                    <BarChart />
                  </IconButton>
                  <IconButton size="small">
                    <PieChart />
                  </IconButton>
                  <IconButton size="small">
                    <Timeline />
                  </IconButton>
                </Box>
              </Box>
              
              {/* Placeholder for chart */}
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography color="textSecondary">
                  Chart will be displayed here (integrate with Chart.js or similar)
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Detailed Statistics */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistik Detail
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Wilayah Administratif
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><LocationCity /></ListItemIcon>
                      <ListItemText primary={`${statistics.wilayah.dusun} Dusun`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Business /></ListItemIcon>
                      <ListItemText primary={`${statistics.wilayah.rw} RW`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><People /></ListItemIcon>
                      <ListItemText primary={`${statistics.wilayah.rt} RT`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Program dan Layanan
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Assignment /></ListItemIcon>
                      <ListItemText primary={`${statistics.program.aktif} Program Aktif`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Group /></ListItemIcon>
                      <ListItemText primary={`${statistics.program.peserta} Peserta Program`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Security /></ListItemIcon>
                      <ListItemText primary={`${statistics.layanan.mandiri} Layanan Mandiri`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Notifications */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifikasi
              </Typography>
              <List>
                {notifications.map((notif, index) => (
                  <ListItem key={notif.id} divider={index < notifications.length - 1}>
                    <ListItemIcon>
                      {notif.type === 'warning' && <Warning color="warning" />}
                      {notif.type === 'info' && <Notifications color="info" />}
                      {notif.type === 'success' && <CheckCircle color="success" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={notif.title}
                      secondary={notif.message}
                    />
                    {notif.urgent && (
                      <Chip label="Urgent" color="error" size="small" />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aktivitas Terbaru
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={activity.id} divider={index < recentActivities.length - 1}>
                    <ListItemIcon>
                      {activity.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                Lihat Semua Aktivitas
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeDashboard;