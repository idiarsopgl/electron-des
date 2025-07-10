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
  TableSortLabel,
  Alert,
  Checkbox
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  Search,
  Visibility,
  GetApp,
  Print,
  FilterList
} from '@mui/icons-material';

const SuratMasuk = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tahunFilter, setTahunFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('tanggal_penerimaan');
  const [order, setOrder] = useState('desc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Mock data untuk surat masuk
  const mockDocuments = [
    {
      id: 1,
      nomor_urut: 1,
      tanggal_penerimaan: '2024-01-20',
      nomor_surat: '005/KEC/2024',
      tanggal_surat: '2024-01-19',
      pengirim: 'Kantor Kecamatan',
      isi_singkat: 'Surat Edaran tentang Pemeliharaan Kebersihan Lingkungan',
      status: 'Baru',
      disposisi: 'Belum'
    },
    {
      id: 2,
      nomor_urut: 2,
      tanggal_penerimaan: '2024-01-18',
      nomor_surat: '010/DISKES/2024',
      tanggal_surat: '2024-01-17',
      pengirim: 'Dinas Kesehatan',
      isi_singkat: 'Undangan Sosialisasi Program Kesehatan Ibu dan Anak',
      status: 'Proses',
      disposisi: 'Sudah'
    },
    {
      id: 3,
      nomor_urut: 3,
      tanggal_penerimaan: '2024-01-15',
      nomor_surat: '007/KOMINFO/2024',
      tanggal_surat: '2024-01-14',
      pengirim: 'Dinas Komunikasi dan Informatika',
      isi_singkat: 'Permohonan Data Penduduk untuk Updating Website',
      status: 'Selesai',
      disposisi: 'Sudah'
    },
    {
      id: 4,
      nomor_urut: 4,
      tanggal_penerimaan: '2024-01-12',
      nomor_surat: '015/DPRD/2024',
      tanggal_surat: '2024-01-11',
      pengirim: 'DPRD Kabupaten',
      isi_singkat: 'Undangan Rapat Koordinasi Pembangunan Daerah',
      status: 'Proses',
      disposisi: 'Sudah'
    },
    {
      id: 5,
      nomor_urut: 5,
      tanggal_penerimaan: '2024-01-10',
      nomor_surat: '020/POLSEK/2024',
      tanggal_surat: '2024-01-09',
      pengirim: 'Kepolisian Sektor',
      isi_singkat: 'Pemberitahuan Kegiatan Operasi Keamanan',
      status: 'Selesai',
      disposisi: 'Sudah'
    }
  ];

  const tahunOptions = ['2024', '2023', '2022', '2021', '2020'];

  useEffect(() => {
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  useEffect(() => {
    let filtered = documents;
    
    if (tahunFilter) {
      filtered = filtered.filter(doc => 
        doc.tanggal_penerimaan.includes(tahunFilter)
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.pengirim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.isi_singkat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDocuments(filtered);
    setPage(0);
  }, [documents, searchTerm, tahunFilter]);

  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoc(null);
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedDoc(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectDocument = (docId) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedDocuments.length > 0) {
      handleDialogOpen('bulkDelete');
    }
  };

  const sortedDocuments = React.useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      if (orderBy === 'tanggal_penerimaan') {
        return order === 'desc' 
          ? new Date(b.tanggal_penerimaan) - new Date(a.tanggal_penerimaan)
          : new Date(a.tanggal_penerimaan) - new Date(b.tanggal_penerimaan);
      }
      if (orderBy === 'pengirim') {
        return order === 'asc' 
          ? a.pengirim.localeCompare(b.pengirim)
          : b.pengirim.localeCompare(a.pengirim);
      }
      return 0;
    });
  }, [filteredDocuments, order, orderBy]);

  const paginatedDocuments = sortedDocuments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Baru': return 'info';
      case 'Proses': return 'warning';
      case 'Selesai': return 'success';
      default: return 'default';
    }
  };

  const renderAddDialog = () => (
    <Dialog open={openDialog && dialogType === 'add'} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Surat Masuk</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tanggal Penerimaan"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nomor Surat"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tanggal Surat"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pengirim"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Isi Singkat"
                multiline
                rows={4}
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

  const renderDeleteDialog = () => (
    <Dialog open={openDialog && (dialogType === 'delete' || dialogType === 'bulkDelete')} onClose={handleDialogClose}>
      <DialogTitle>
        {dialogType === 'bulkDelete' ? 'Hapus Surat Masuk Terpilih' : 'Hapus Surat Masuk'}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {dialogType === 'bulkDelete' 
            ? `Apakah Anda yakin ingin menghapus ${selectedDocuments.length} surat masuk yang dipilih?`
            : `Apakah Anda yakin ingin menghapus surat masuk dari "${selectedDoc?.pengirim}"?`
          }
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
        Surat Masuk
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Kelola surat masuk dari berbagai instansi dan organisasi.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleDialogOpen('add')}
            >
              Tambah
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={handleBulkDelete}
              disabled={selectedDocuments.length === 0}
              color="error"
            >
              Hapus
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Print />}
            >
              Cetak
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<GetApp />}
            >
              Unduh
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Pilih Tahun</InputLabel>
              <Select
                value={tahunFilter}
                onChange={(e) => setTahunFilter(e.target.value)}
                label="Pilih Tahun"
              >
                <MenuItem value="">Semua Tahun</MenuItem>
                {tahunOptions.map(tahun => (
                  <MenuItem key={tahun} value={tahun}>{tahun}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              size="small"
              placeholder="Cari pengirim, isi singkat, atau nomor surat..."
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
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                  indeterminate={selectedDocuments.length > 0 && selectedDocuments.length < filteredDocuments.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>No. Urut</TableCell>
              <TableCell width="120">Aksi</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'tanggal_penerimaan'}
                  direction={orderBy === 'tanggal_penerimaan' ? order : 'desc'}
                  onClick={() => handleRequestSort('tanggal_penerimaan')}
                >
                  Tanggal Penerimaan
                </TableSortLabel>
              </TableCell>
              <TableCell>Nomor Surat</TableCell>
              <TableCell>Tanggal Surat</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'pengirim'}
                  direction={orderBy === 'pengirim' ? order : 'asc'}
                  onClick={() => handleRequestSort('pengirim')}
                >
                  Pengirim
                </TableSortLabel>
              </TableCell>
              <TableCell>Isi Singkat</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Disposisi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleSelectDocument(doc.id)}
                  />
                </TableCell>
                <TableCell>{doc.nomor_urut}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, doc)}
                    size="small"
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
                <TableCell>{doc.tanggal_penerimaan}</TableCell>
                <TableCell>{doc.nomor_surat}</TableCell>
                <TableCell>{doc.tanggal_surat}</TableCell>
                <TableCell>{doc.pengirim}</TableCell>
                <TableCell>{doc.isi_singkat}</TableCell>
                <TableCell>
                  <Chip
                    label={doc.status}
                    color={getStatusColor(doc.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={doc.disposisi}
                    color={doc.disposisi === 'Sudah' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredDocuments.length}
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
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ mr: 1 }} /> Lihat
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('delete')}>
          <Delete sx={{ mr: 1 }} /> Hapus
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Print sx={{ mr: 1 }} /> Cetak
        </MenuItem>
      </Menu>

      {renderAddDialog()}
      {renderDeleteDialog()}
    </Box>
  );
};

export default SuratMasuk;