import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  Business,
  LocationOn,
  Phone,
  Email,
  Language,
  Image,
  Edit,
  Save,
  Cancel,
  Upload,
  Map,
  Info,
  AccountBalance,
  People,
  EmojiFlags
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

const IdentitasDesa = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [identitas, setIdentitas] = useState({
    // Data Umum Desa
    nama_desa: '',
    kode_desa: '',
    kode_pos: '',
    nama_kecamatan: '',
    nama_kabupaten: '',
    nama_provinsi: '',
    
    // Kontak dan Komunikasi
    alamat_kantor: '',
    telepon: '',
    email_desa: '',
    website: '',
    
    // Geografis
    luas_wilayah: '',
    batas_utara: '',
    batas_selatan: '',
    batas_timur: '',
    batas_barat: '',
    koordinat_latitude: '',
    koordinat_longitude: '',
    ketinggian: '',
    
    // Demografi
    jumlah_penduduk: 0,
    jumlah_kk: 0,
    jumlah_rtm: 0,
    jumlah_dusun: 0,
    jumlah_rw: 0,
    jumlah_rt: 0,
    
    // Kepala Desa
    nama_kepala_desa: '',
    nip_kepala_desa: '',
    periode_jabatan: '',
    mulai_jabatan: '',
    akhir_jabatan: '',
    
    // Logo dan Media
    logo_desa: '',
    foto_kantor: '',
    
    // Visi Misi
    visi: '',
    misi: '',
    
    // Sejarah
    sejarah_desa: '',
    
    // Status
    status_desa: 'Desa', // Desa, Kelurahan
    tahun_pembentukan: '',
    dasar_hukum_pembentukan: ''
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    // Load data identitas desa from API
    const mockData = {
      nama_desa: 'Simbang',
      kode_desa: '3201012003',
      kode_pos: '16153',
      nama_kecamatan: 'Cikupa',
      nama_kabupaten: 'Tangerang',
      nama_provinsi: 'Banten',
      
      alamat_kantor: 'Jl. Raya Simbang No. 123, RT 001/RW 001',
      telepon: '021-12345678',
      email_desa: 'info@desasimbang.id',
      website: 'https://desasimbang.id',
      
      luas_wilayah: '15.75',
      batas_utara: 'Desa Curug',
      batas_selatan: 'Desa Pakulonan',
      batas_timur: 'Desa Bojong',
      batas_barat: 'Desa Pasir Bolang',
      koordinat_latitude: '-6.2088',
      koordinat_longitude: '106.8456',
      ketinggian: '25',
      
      jumlah_penduduk: 2547,
      jumlah_kk: 743,
      jumlah_rtm: 812,
      jumlah_dusun: 5,
      jumlah_rw: 12,
      jumlah_rt: 35,
      
      nama_kepala_desa: 'H. Ahmad Sugiarto, S.Sos',
      nip_kepala_desa: '196805152014061001',
      periode_jabatan: '2019-2025',
      mulai_jabatan: '2019-08-17',
      akhir_jabatan: '2025-08-17',
      
      visi: 'Terwujudnya Desa Simbang yang Mandiri, Sejahtera, dan Berkarakter',
      misi: `1. Meningkatkan kualitas pelayanan publik\n2. Mengembangkan potensi ekonomi desa\n3. Memperkuat sistem pemerintahan yang transparan\n4. Membangun infrastruktur yang berkualitas\n5. Memberdayakan masyarakat dalam pembangunan`,
      
      sejarah_desa: 'Desa Simbang didirikan pada tahun 1945 dengan luas wilayah 15.75 km². Nama "Simbang" berasal dari bahasa Sunda yang berarti tempat pertemuan atau berkumpul...',
      
      status_desa: 'Desa',
      tahun_pembentukan: '1945',
      dasar_hukum_pembentukan: 'SK Gubernur Jawa Barat No. 123/1945'
    };
    
    setIdentitas(mockData);
    setOriginalData(mockData);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save to API
    console.log('Saving identitas desa:', identitas);
    setOriginalData({ ...identitas });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIdentitas(originalData);
    setIsEditing(false);
  };

  const handleChange = (field) => (event) => {
    setIdentitas(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleFileUpload = (field) => {
    // Handle file upload for logo/images
    console.log('Upload file for:', field);
  };

  const renderInfoTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Informasi Umum Desa
          </Typography>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Batal
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
              >
                Simpan
              </Button>
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Umum
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Desa"
                  value={identitas.nama_desa}
                  onChange={handleChange('nama_desa')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Kode Desa"
                  value={identitas.kode_desa}
                  onChange={handleChange('kode_desa')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Kode Pos"
                  value={identitas.kode_pos}
                  onChange={handleChange('kode_pos')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kecamatan"
                  value={identitas.nama_kecamatan}
                  onChange={handleChange('nama_kecamatan')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Kabupaten"
                  value={identitas.nama_kabupaten}
                  onChange={handleChange('nama_kabupaten')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Provinsi"
                  value={identitas.nama_provinsi}
                  onChange={handleChange('nama_provinsi')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Status Desa</InputLabel>
                  <Select
                    value={identitas.status_desa}
                    onChange={handleChange('status_desa')}
                    label="Status Desa"
                  >
                    <MenuItem value="Desa">Desa</MenuItem>
                    <MenuItem value="Kelurahan">Kelurahan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tahun Pembentukan"
                  value={identitas.tahun_pembentukan}
                  onChange={handleChange('tahun_pembentukan')}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Kontak dan Komunikasi
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Alamat Kantor Desa"
                  value={identitas.alamat_kantor}
                  onChange={handleChange('alamat_kantor')}
                  multiline
                  rows={2}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Telepon"
                  value={identitas.telepon}
                  onChange={handleChange('telepon')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email Desa"
                  value={identitas.email_desa}
                  onChange={handleChange('email_desa')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  value={identitas.website}
                  onChange={handleChange('website')}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Logo dan Media
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                    src={identitas.logo_desa}
                  >
                    <Business />
                  </Avatar>
                  <Typography variant="body2" gutterBottom>
                    Logo Desa
                  </Typography>
                  {isEditing && (
                    <Button
                      size="small"
                      startIcon={<Upload />}
                      onClick={() => handleFileUpload('logo_desa')}
                    >
                      Upload
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                    src={identitas.foto_kantor}
                    variant="rounded"
                  >
                    <Image />
                  </Avatar>
                  <Typography variant="body2" gutterBottom>
                    Foto Kantor
                  </Typography>
                  {isEditing && (
                    <Button
                      size="small"
                      startIcon={<Upload />}
                      onClick={() => handleFileUpload('foto_kantor')}
                    >
                      Upload
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderGeografiTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Geografis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Luas Wilayah (km²)"
                  value={identitas.luas_wilayah}
                  onChange={handleChange('luas_wilayah')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ketinggian (mdpl)"
                  value={identitas.ketinggian}
                  onChange={handleChange('ketinggian')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Latitude"
                  value={identitas.koordinat_latitude}
                  onChange={handleChange('koordinat_latitude')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Longitude"
                  value={identitas.koordinat_longitude}
                  onChange={handleChange('koordinat_longitude')}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Batas Wilayah
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Batas Utara"
                  value={identitas.batas_utara}
                  onChange={handleChange('batas_utara')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Batas Selatan"
                  value={identitas.batas_selatan}
                  onChange={handleChange('batas_selatan')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Batas Timur"
                  value={identitas.batas_timur}
                  onChange={handleChange('batas_timur')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Batas Barat"
                  value={identitas.batas_barat}
                  onChange={handleChange('batas_barat')}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Statistik Wilayah
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><People /></ListItemIcon>
                <ListItemText 
                  primary="Jumlah Penduduk" 
                  secondary={identitas.jumlah_penduduk.toLocaleString() + ' jiwa'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Business /></ListItemIcon>
                <ListItemText 
                  primary="Jumlah Keluarga (KK)" 
                  secondary={identitas.jumlah_kk.toLocaleString() + ' KK'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><AccountBalance /></ListItemIcon>
                <ListItemText 
                  primary="Jumlah RTM" 
                  secondary={identitas.jumlah_rtm.toLocaleString() + ' RTM'} 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon><LocationOn /></ListItemIcon>
                <ListItemText 
                  primary="Jumlah Dusun" 
                  secondary={identitas.jumlah_dusun + ' Dusun'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationOn /></ListItemIcon>
                <ListItemText 
                  primary="Jumlah RW" 
                  secondary={identitas.jumlah_rw + ' RW'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationOn /></ListItemIcon>
                <ListItemText 
                  primary="Jumlah RT" 
                  secondary={identitas.jumlah_rt + ' RT'} 
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Map placeholder */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Peta Wilayah
            </Typography>
            <Box 
              sx={{ 
                height: 200, 
                bgcolor: 'grey.100', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 1 
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Map sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Peta wilayah akan ditampilkan di sini
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderKepalaDesaTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Kepala Desa
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Kepala Desa"
                  value={identitas.nama_kepala_desa}
                  onChange={handleChange('nama_kepala_desa')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="NIP"
                  value={identitas.nip_kepala_desa}
                  onChange={handleChange('nip_kepala_desa')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Periode Jabatan"
                  value={identitas.periode_jabatan}
                  onChange={handleChange('periode_jabatan')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mulai Jabatan"
                  type="date"
                  value={identitas.mulai_jabatan}
                  onChange={handleChange('mulai_jabatan')}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Akhir Jabatan"
                  type="date"
                  value={identitas.akhir_jabatan}
                  onChange={handleChange('akhir_jabatan')}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar 
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              src="/placeholder-avatar.jpg"
            >
              <People sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {identitas.nama_kepala_desa}
            </Typography>
            <Chip 
              label="Kepala Desa" 
              color="primary" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="textSecondary">
              Periode: {identitas.periode_jabatan}
            </Typography>
            {isEditing && (
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Upload />}
                sx={{ mt: 2 }}
                onClick={() => handleFileUpload('foto_kepala_desa')}
              >
                Upload Foto
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderVisiMisiTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Visi Desa
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={identitas.visi}
              onChange={handleChange('visi')}
              disabled={!isEditing}
              placeholder="Masukkan visi desa..."
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Misi Desa
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={identitas.misi}
              onChange={handleChange('misi')}
              disabled={!isEditing}
              placeholder="Masukkan misi desa..."
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sejarah Desa
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={identitas.sejarah_desa}
              onChange={handleChange('sejarah_desa')}
              disabled={!isEditing}
              placeholder="Masukkan sejarah desa..."
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dasar Hukum Pembentukan
            </Typography>
            <TextField
              fullWidth
              value={identitas.dasar_hukum_pembentukan}
              onChange={handleChange('dasar_hukum_pembentukan')}
              disabled={!isEditing}
              placeholder="Masukkan dasar hukum pembentukan desa..."
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Identitas Desa
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Kelola data identitas dan profil desa secara lengkap. Data ini akan digunakan dalam dokumen resmi dan website desa.
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Informasi Umum" icon={<Info />} />
          <Tab label="Geografis" icon={<Map />} />
          <Tab label="Kepala Desa" icon={<People />} />
          <Tab label="Visi & Misi" icon={<EmojiFlags />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderInfoTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderGeografiTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderKepalaDesaTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {renderVisiMisiTab()}
      </TabPanel>
    </Box>
  );
};

export default IdentitasDesa;