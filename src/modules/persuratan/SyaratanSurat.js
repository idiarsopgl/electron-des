import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Grid,
  TablePagination,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  Search,
  Assignment,
  Description,
  Check
} from '@mui/icons-material';

const SyaratanSurat = () => {
  const [syaratan, setSyaratan] = useState([]);
  const [filteredSyaratan, setFilteredSyaratan] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Mock data untuk syaratan surat
  const mockSyaratan = [
    {
      id: 1,
      nama_surat: 'Surat Keterangan Domisili',
      syarat: [
        'Fotokopi KTP',
        'Fotokopi KK',
        'Surat Pengantar RT/RW',
        'Materai 10.000'
      ],
      keterangan: 'Syarat umum untuk surat keterangan domisili',
      status: 'Aktif'
    },
    {
      id: 2,
      nama_surat: 'Surat Keterangan Usaha',
      syarat: [
        'Fotokopi KTP',
        'Fotokopi KK',
        'Surat Pengantar RT/RW',
        'Foto lokasi usaha',
        'Materai 10.000'
      ],
      keterangan: 'Syarat untuk surat keterangan usaha',
      status: 'Aktif'
    },
    {
      id: 3,
      nama_surat: 'Surat Keterangan Tidak Mampu',
      syarat: [
        'Fotokopi KTP',
        'Fotokopi KK',
        'Surat Pengantar RT/RW',
        'Surat Keterangan Tidak Mampu dari RT/RW',
        'Materai 10.000'
      ],
      keterangan: 'Syarat untuk surat keterangan tidak mampu',
      status: 'Aktif'
    },
    {
      id: 4,
      nama_surat: 'Surat Pengantar Nikah',
      syarat: [
        'Fotokopi KTP',
        'Fotokopi KK',
        'Fotokopi Akta Kelahiran',
        'Surat Pengantar RT/RW',
        'Pas foto 3x4 (2 lembar)',
        'Materai 10.000'
      ],
      keterangan: 'Syarat untuk surat pengantar nikah',
      status: 'Aktif'
    }
  ];

  const commonRequirements = [
    'Fotokopi KTP',
    'Fotokopi KK',
    'Fotokopi Akta Kelahiran',
    'Surat Pengantar RT/RW',
    'Pas foto 3x4',
    'Pas foto 4x6',
    'Materai 10.000',
    'Materai 6.000',
    'Surat Keterangan Tidak Mampu',
    'Foto lokasi usaha'
  ];

  useEffect(() => {
    setSyaratan(mockSyaratan);
    setFilteredSyaratan(mockSyaratan);
  }, []);

  useEffect(() => {
    let filtered = syaratan;
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.nama_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredSyaratan(filtered);
    setPage(0);
  }, [syaratan, searchTerm]);

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedItem(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedSyaratan = filteredSyaratan.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderAddDialog = () => (
    <Dialog open={openDialog && dialogType === 'add'} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Syaratan Surat</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Surat"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Pilih Syarat yang Diperlukan
              </Typography>
              <Grid container spacing={1}>
                {commonRequirements.map((requirement, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={requirement}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Syarat Tambahan (pisahkan dengan enter)"
                multiline
                rows={4}
                variant="outlined"
                placeholder="Masukkan syarat tambahan jika ada..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Keterangan"
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Batal</Button>
        <Button variant="contained" onClick={handleDialogClose}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderEditDialog = () => (
    <Dialog open={openDialog && dialogType === 'edit'} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Syaratan Surat</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Surat"
                variant="outlined"
                defaultValue={selectedItem?.nama_surat || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Pilih Syarat yang Diperlukan
              </Typography>
              <Grid container spacing={1}>
                {commonRequirements.map((requirement, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          defaultChecked={selectedItem?.syarat.includes(requirement)}
                        />
                      }
                      label={requirement}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Syarat Tambahan"
                multiline
                rows={4}
                variant="outlined"
                defaultValue={selectedItem?.syarat.filter(s => !commonRequirements.includes(s)).join('\n')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Keterangan"
                multiline
                rows={3}
                variant="outlined"
                defaultValue={selectedItem?.keterangan || ''}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Batal</Button>
        <Button variant="contained" onClick={handleDialogClose}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDeleteDialog = () => (
    <Dialog open={openDialog && dialogType === 'delete'} onClose={handleDialogClose}>
      <DialogTitle>Hapus Syaratan Surat</DialogTitle>
      <DialogContent>
        <Typography>
          Apakah Anda yakin ingin menghapus syaratan untuk "{selectedItem?.nama_surat}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Batal</Button>
        <Button variant="contained" color="error" onClick={handleDialogClose}>
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Syaratan Surat
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Kelola syarat-syarat yang diperlukan untuk setiap jenis surat.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleDialogOpen('add')}
            >
              Tambah Syaratan
            </Button>
            
            <TextField
              size="small"
              placeholder="Cari nama surat atau keterangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ flexGrow: 1 }}
            />
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Surat</TableCell>
              <TableCell>Syarat</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSyaratan.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{item.nama_surat}</TableCell>
                <TableCell>
                  <List dense>
                    {item.syarat.map((syarat, idx) => (
                      <ListItem key={idx} sx={{ py: 0, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Check fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={syarat} 
                          primaryTypographyProps={{ fontSize: '0.875rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
                <TableCell>{item.keterangan}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    color={item.status === 'Aktif' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, item)}
                    size="small"
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredSyaratan.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Tampilkan:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
        />
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDialogOpen('edit')}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('delete')}>
          <Delete sx={{ mr: 1 }} /> Hapus
        </MenuItem>
      </Menu>

      {renderAddDialog()}
      {renderEditDialog()}
      {renderDeleteDialog()}
    </Box>
  );
};

export default SyaratanSurat;