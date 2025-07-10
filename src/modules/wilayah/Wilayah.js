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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TreeView,
  TreeItem,
  Fab,
  Tooltip
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  LocationOn,
  Business,
  Home,
  People,
  ExpandMore,
  ChevronRight,
  Map,
  Print,
  GetApp,
  Search
} from '@mui/icons-material';

const Wilayah = () => {
  const [wilayahData, setWilayahData] = useState([]);
  const [selectedWilayah, setSelectedWilayah] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'add', 'edit', 'delete'
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState(['root']);
  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    jenis: 'dusun', // dusun, rw, rt
    parent_id: null,
    kepala_wilayah: '',
    jumlah_kk: 0,
    jumlah_jiwa: 0,
    luas_wilayah: '',
    keterangan: ''
  });

  // Mock data wilayah (berdasarkan tabel tweb_wil_clusterdesa)
  const mockWilayahData = [
    {
      id: 1,
      nama: 'Dusun Simbang 1',
      kode: 'DSN001',
      jenis: 'dusun',
      parent_id: null,
      kepala_wilayah: 'Bapak Samsul',
      jumlah_kk: 156,
      jumlah_jiwa: 487,
      luas_wilayah: '3.5',
      keterangan: 'Dusun utama wilayah timur',
      level: 1,
      children: [
        {
          id: 2,
          nama: 'RW 001',
          kode: 'RW001',
          jenis: 'rw',
          parent_id: 1,
          kepala_wilayah: 'Bapak Ahmad',
          jumlah_kk: 78,
          jumlah_jiwa: 245,
          level: 2,
          children: [
            {
              id: 3,
              nama: 'RT 001',
              kode: 'RT001',
              jenis: 'rt',
              parent_id: 2,
              kepala_wilayah: 'Bapak Udin',
              jumlah_kk: 25,
              jumlah_jiwa: 78,
              level: 3
            },
            {
              id: 4,
              nama: 'RT 002',
              kode: 'RT002',
              jenis: 'rt',
              parent_id: 2,
              kepala_wilayah: 'Bapak Tono',
              jumlah_kk: 28,
              jumlah_jiwa: 85,
              level: 3
            }
          ]
        },
        {
          id: 5,
          nama: 'RW 002',
          kode: 'RW002',
          jenis: 'rw',
          parent_id: 1,
          kepala_wilayah: 'Bapak Ridwan',
          jumlah_kk: 78,
          jumlah_jiwa: 242,
          level: 2,
          children: [
            {
              id: 6,
              nama: 'RT 003',
              kode: 'RT003',
              jenis: 'rt',
              parent_id: 5,
              kepala_wilayah: 'Bapak Joko',
              jumlah_kk: 40,
              jumlah_jiwa: 124,
              level: 3
            }
          ]
        }
      ]
    },
    {
      id: 7,
      nama: 'Dusun Simbang 2',
      kode: 'DSN002',
      jenis: 'dusun',
      parent_id: null,
      kepala_wilayah: 'Bapak Karno',
      jumlah_kk: 134,
      jumlah_jiwa: 412,
      luas_wilayah: '2.8',
      keterangan: 'Dusun wilayah barat',
      level: 1,
      children: []
    }
  ];

  useEffect(() => {
    setWilayahData(mockWilayahData);
  }, []);

  const handleMenuOpen = (event, wilayah) => {
    setAnchorEl(event.currentTarget);
    setSelectedWilayah(wilayah);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWilayah(null);
  };

  const handleDialogOpen = (type, wilayah = null) => {
    setDialogType(type);
    if (wilayah) {
      setSelectedWilayah(wilayah);
      setFormData({
        nama: wilayah.nama || '',
        kode: wilayah.kode || '',
        jenis: wilayah.jenis || 'dusun',
        parent_id: wilayah.parent_id || null,
        kepala_wilayah: wilayah.kepala_wilayah || '',
        jumlah_kk: wilayah.jumlah_kk || 0,
        jumlah_jiwa: wilayah.jumlah_jiwa || 0,
        luas_wilayah: wilayah.luas_wilayah || '',
        keterangan: wilayah.keterangan || ''
      });
    } else {
      setFormData({
        nama: '',
        kode: '',
        jenis: 'dusun',
        parent_id: null,
        kepala_wilayah: '',
        jumlah_kk: 0,
        jumlah_jiwa: 0,
        luas_wilayah: '',
        keterangan: ''
      });
    }
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedWilayah(null);
    setFormData({
      nama: '',
      kode: '',
      jenis: 'dusun',
      parent_id: null,
      kepala_wilayah: '',
      jumlah_kk: 0,
      jumlah_jiwa: 0,
      luas_wilayah: '',
      keterangan: ''
    });
  };

  const handleSave = () => {
    console.log('Saving wilayah:', formData);
    // Implement save logic here
    handleDialogClose();
  };

  const handleDelete = () => {
    console.log('Deleting wilayah:', selectedWilayah);
    // Implement delete logic here
    handleDialogClose();
  };

  const handleFormChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const getJenisIcon = (jenis) => {
    switch (jenis) {
      case 'dusun': return <Business color="primary" />;
      case 'rw': return <LocationOn color="secondary" />;
      case 'rt': return <Home color="success" />;
      default: return <LocationOn />;
    }
  };

  const getJenisColor = (jenis) => {
    switch (jenis) {
      case 'dusun': return 'primary';
      case 'rw': return 'secondary';
      case 'rt': return 'success';
      default: return 'default';
    }
  };

  const renderTreeItem = (wilayah) => (
    <TreeItem
      key={wilayah.id}
      nodeId={wilayah.id.toString()}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          {getJenisIcon(wilayah.jenis)}
          <Box sx={{ ml: 1, flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
              {wilayah.nama}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {wilayah.kepala_wilayah} • {wilayah.jumlah_kk} KK • {wilayah.jumlah_jiwa} jiwa
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuOpen(e, wilayah);
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      }
    >
      {wilayah.children && wilayah.children.map(child => renderTreeItem(child))}
    </TreeItem>
  );

  const flattenWilayah = (data, result = []) => {
    data.forEach(item => {
      result.push(item);
      if (item.children && item.children.length > 0) {
        flattenWilayah(item.children, result);
      }
    });
    return result;
  };

  const filteredWilayah = flattenWilayah(wilayahData).filter(wilayah =>
    wilayah.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wilayah.kepala_wilayah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDialog = () => {
    const isEdit = dialogType === 'edit';
    const isDelete = dialogType === 'delete';

    if (isDelete) {
      return (
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Hapus Wilayah</DialogTitle>
          <DialogContent>
            <Typography>
              Apakah Anda yakin ingin menghapus wilayah "{selectedWilayah?.nama}"?
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              Menghapus wilayah akan menghapus semua data penduduk yang terkait!
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Batal</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEdit ? 'Edit Wilayah' : 'Tambah Wilayah'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nama Wilayah"
                  value={formData.nama}
                  onChange={handleFormChange('nama')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Kode Wilayah"
                  value={formData.kode}
                  onChange={handleFormChange('kode')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Jenis Wilayah</InputLabel>
                  <Select
                    value={formData.jenis}
                    onChange={handleFormChange('jenis')}
                    label="Jenis Wilayah"
                  >
                    <MenuItem value="dusun">Dusun</MenuItem>
                    <MenuItem value="rw">RW</MenuItem>
                    <MenuItem value="rt">RT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Wilayah Induk</InputLabel>
                  <Select
                    value={formData.parent_id || ''}
                    onChange={handleFormChange('parent_id')}
                    label="Wilayah Induk"
                  >
                    <MenuItem value="">Tidak Ada (Dusun)</MenuItem>
                    {flattenWilayah(wilayahData).map(w => (
                      <MenuItem key={w.id} value={w.id}>
                        {w.nama} ({w.jenis.toUpperCase()})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kepala Wilayah"
                  value={formData.kepala_wilayah}
                  onChange={handleFormChange('kepala_wilayah')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Jumlah KK"
                  type="number"
                  value={formData.jumlah_kk}
                  onChange={handleFormChange('jumlah_kk')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Jumlah Jiwa"
                  type="number"
                  value={formData.jumlah_jiwa}
                  onChange={handleFormChange('jumlah_jiwa')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Luas Wilayah (km²)"
                  value={formData.luas_wilayah}
                  onChange={handleFormChange('luas_wilayah')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keterangan"
                  multiline
                  rows={3}
                  value={formData.keterangan}
                  onChange={handleFormChange('keterangan')}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Batal</Button>
          <Button variant="contained" onClick={handleSave}>
            {isEdit ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Wilayah Administratif
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Kelola struktur wilayah administratif desa meliputi Dusun, RW, dan RT beserta data kepala wilayah dan statistik penduduk.
      </Alert>

      <Grid container spacing={3}>
        {/* Left Panel - Tree View */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Struktur Wilayah
                </Typography>
                <Box>
                  <Tooltip title="Tambah Wilayah">
                    <Fab
                      size="small"
                      color="primary"
                      onClick={() => handleDialogOpen('add')}
                    >
                      <Add />
                    </Fab>
                  </Tooltip>
                </Box>
              </Box>

              <TreeView
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                expanded={expandedNodes}
                onNodeToggle={(event, nodeIds) => setExpandedNodes(nodeIds)}
                sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                {wilayahData.map(wilayah => renderTreeItem(wilayah))}
              </TreeView>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - Table View */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Daftar Wilayah
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Print />} size="small">
                    Cetak
                  </Button>
                  <Button variant="outlined" startIcon={<GetApp />} size="small">
                    Unduh
                  </Button>
                </Box>
              </Box>

              <TextField
                fullWidth
                size="small"
                placeholder="Cari wilayah atau kepala wilayah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ mb: 2 }}
              />

              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Wilayah</TableCell>
                      <TableCell>Kepala</TableCell>
                      <TableCell align="center">KK</TableCell>
                      <TableCell align="center">Jiwa</TableCell>
                      <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredWilayah.map((wilayah) => (
                      <TableRow key={wilayah.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getJenisIcon(wilayah.jenis)}
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {wilayah.nama}
                              </Typography>
                              <Chip 
                                label={wilayah.jenis.toUpperCase()} 
                                size="small" 
                                color={getJenisColor(wilayah.jenis)}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {wilayah.kepala_wilayah}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {wilayah.jumlah_kk}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {wilayah.jumlah_jiwa}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, wilayah)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistik Wilayah
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {wilayahData.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Dusun
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">
                      {flattenWilayah(wilayahData).filter(w => w.jenis === 'rw').length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      RW
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      {flattenWilayah(wilayahData).filter(w => w.jenis === 'rt').length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      RT
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDialogOpen('edit', selectedWilayah)}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('add')}>
          <Add sx={{ mr: 1 }} /> Tambah Sub Wilayah
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('delete', selectedWilayah)}>
          <Delete sx={{ mr: 1 }} /> Hapus
        </MenuItem>
      </Menu>

      {/* Dialogs */}
      {renderDialog()}
    </Box>
  );
};

export default Wilayah;