import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  Paper
} from '@mui/material';
import {
  Settings,
  Description,
  Image,
  Security,
  Backup,
  Restore
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PengaturanSurat = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    header: {
      tinggi: 100,
      logo: '',
      nama_desa: 'Desa Simbang',
      alamat: 'Jl. Raya No. 123, Kecamatan ABC',
      telepon: '(021) 1234567',
      email: 'info@desasimbang.id'
    },
    footer: {
      tinggi: 80,
      nama_kades: 'Kepala Desa',
      jabatan: 'Kepala Desa Simbang',
      nip: '123456789012345'
    },
    format: {
      font: 'Times New Roman',
      ukuran_font: 12,
      margin_kiri: 2.5,
      margin_kanan: 2.5,
      margin_atas: 3,
      margin_bawah: 2.5,
      spasi_baris: 1.5
    },
    keamanan: {
      ttd_digital: false,
      watermark: false,
      qr_code: true,
      password_protect: false
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Implementasi penyimpanan pengaturan
  };

  const handleReset = () => {
    // Reset ke pengaturan default
    console.log('Resetting to default settings');
  };

  const fontOptions = [
    'Times New Roman',
    'Arial',
    'Calibri',
    'Georgia',
    'Verdana'
  ];

  const renderHeaderTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Pengaturan Header Surat
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Informasi Desa
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Desa"
                  value={settings.header.nama_desa}
                  onChange={(e) => handleSettingChange('header', 'nama_desa', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Alamat"
                  multiline
                  rows={2}
                  value={settings.header.alamat}
                  onChange={(e) => handleSettingChange('header', 'alamat', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telepon"
                  value={settings.header.telepon}
                  onChange={(e) => handleSettingChange('header', 'telepon', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={settings.header.email}
                  onChange={(e) => handleSettingChange('header', 'email', e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Logo dan Format
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tinggi Header (px)"
                  type="number"
                  value={settings.header.tinggi}
                  onChange={(e) => handleSettingChange('header', 'tinggi', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<Image />}
                  fullWidth
                >
                  Upload Logo Desa
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderFooterTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Pengaturan Footer Surat
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Informasi Penandatangan
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Kepala Desa"
                  value={settings.footer.nama_kades}
                  onChange={(e) => handleSettingChange('footer', 'nama_kades', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Jabatan"
                  value={settings.footer.jabatan}
                  onChange={(e) => handleSettingChange('footer', 'jabatan', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="NIP"
                  value={settings.footer.nip}
                  onChange={(e) => handleSettingChange('footer', 'nip', e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Format Footer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tinggi Footer (px)"
                  type="number"
                  value={settings.footer.tinggi}
                  onChange={(e) => handleSettingChange('footer', 'tinggi', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<Image />}
                  fullWidth
                >
                  Upload Tanda Tangan
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderFormatTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Pengaturan Format Surat
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Font dan Ukuran
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Font</InputLabel>
                  <Select
                    value={settings.format.font}
                    onChange={(e) => handleSettingChange('format', 'font', e.target.value)}
                    label="Font"
                  >
                    {fontOptions.map(font => (
                      <MenuItem key={font} value={font}>{font}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ukuran Font"
                  type="number"
                  value={settings.format.ukuran_font}
                  onChange={(e) => handleSettingChange('format', 'ukuran_font', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Spasi Baris"
                  type="number"
                  step="0.1"
                  value={settings.format.spasi_baris}
                  onChange={(e) => handleSettingChange('format', 'spasi_baris', parseFloat(e.target.value))}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Margin (cm)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Kiri"
                  type="number"
                  step="0.1"
                  value={settings.format.margin_kiri}
                  onChange={(e) => handleSettingChange('format', 'margin_kiri', parseFloat(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Kanan"
                  type="number"
                  step="0.1"
                  value={settings.format.margin_kanan}
                  onChange={(e) => handleSettingChange('format', 'margin_kanan', parseFloat(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Atas"
                  type="number"
                  step="0.1"
                  value={settings.format.margin_atas}
                  onChange={(e) => handleSettingChange('format', 'margin_atas', parseFloat(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Bawah"
                  type="number"
                  step="0.1"
                  value={settings.format.margin_bawah}
                  onChange={(e) => handleSettingChange('format', 'margin_bawah', parseFloat(e.target.value))}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderKeamananTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Pengaturan Keamanan Surat
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Fitur Keamanan
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.keamanan.ttd_digital}
                      onChange={(e) => handleSettingChange('keamanan', 'ttd_digital', e.target.checked)}
                    />
                  }
                  label="Tanda Tangan Digital"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.keamanan.watermark}
                      onChange={(e) => handleSettingChange('keamanan', 'watermark', e.target.checked)}
                    />
                  }
                  label="Watermark"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.keamanan.qr_code}
                      onChange={(e) => handleSettingChange('keamanan', 'qr_code', e.target.checked)}
                    />
                  }
                  label="QR Code untuk Verifikasi"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.keamanan.password_protect}
                      onChange={(e) => handleSettingChange('keamanan', 'password_protect', e.target.checked)}
                    />
                  }
                  label="Proteksi Password PDF"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderBackupTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Backup dan Restore
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Backup Pengaturan
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Backup pengaturan surat untuk mencegah kehilangan data
            </Typography>
            <Button
              variant="contained"
              startIcon={<Backup />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Backup Pengaturan
            </Button>
            <Button
              variant="outlined"
              startIcon={<Restore />}
              fullWidth
            >
              Restore Pengaturan
            </Button>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Reset ke Default
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Kembalikan semua pengaturan ke pengaturan default
            </Typography>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleReset}
              fullWidth
            >
              Reset ke Default
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Pengaturan Surat
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Kelola pengaturan global untuk semua template surat dalam sistem.
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Header" icon={<Description />} />
          <Tab label="Footer" icon={<Description />} />
          <Tab label="Format" icon={<Settings />} />
          <Tab label="Keamanan" icon={<Security />} />
          <Tab label="Backup" icon={<Backup />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderHeaderTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderFooterTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderFormatTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {renderKeamananTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        {renderBackupTab()}
      </TabPanel>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
        >
          Simpan Pengaturan
        </Button>
      </Box>
    </Box>
  );
};

export default PengaturanSurat;