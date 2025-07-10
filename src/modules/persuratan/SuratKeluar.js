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
  Send
} from '@mui/icons-material';

const SuratKeluar = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tahunFilter, setTahunFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('tanggal_surat');
  const [order, setOrder] = useState('desc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Mock data untuk surat keluar
  const mockDocuments = [
    {
      id: 1,
      nomor_urut: 1,
      nomor_surat: '001/KD/2024',
      tanggal_surat: '2024-01-20',
      tujuan: 'Kantor Kecamatan',
      isi_singkat: 'Laporan Pelaksanaan Kegiatan Gotong Royong',
      status: 'Terkirim',
      created_at: '2024-01-20'
    },
    {
      id: 2,
      nomor_urut: 2,
      nomor_surat: '002/KD/2024',
      tanggal_surat: '2024-01-18',
      tujuan: 'Dinas Kesehatan',
      isi_singkat: 'Permohonan Bantuan Obat-obatan untuk Posyandu',
      status: 'Draf',
      created_at: '2024-01-18'
    },
    {
      id: 3,
      nomor_urut: 3,
      nomor_surat: '003/KD/2024',
      tanggal_surat: '2024-01-15',
      tujuan: 'Dinas Pendidikan',
      isi_singkat: 'Usulan Rehabilitasi Gedung Sekolah',
      status: 'Terkirim',
      created_at: '2024-01-15'
    },
    {
      id: 4,
      nomor_urut: 4,
      nomor_surat: '004/KD/2024',
      tanggal_surat: '2024-01-12',
      tujuan: 'DPRD Kabupaten',
      isi_singkat: 'Undangan Rapat Koordinasi Pembangunan',
      status: 'Proses',
      created_at: '2024-01-12'
    },
    {
      id: 5,
      nomor_urut: 5,
      nomor_surat: '005/KD/2024',
      tanggal_surat: '2024-01-10',
      tujuan: 'Kantor Camat',
      isi_singkat: 'Laporan Keuangan Bulanan',
      status: 'Terkirim',
      created_at: '2024-01-10'
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
        doc.tanggal_surat.includes(tahunFilter)
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      if (orderBy === 'tanggal_surat') {
        return order === 'desc' 
          ? new Date(b.tanggal_surat) - new Date(a.tanggal_surat)
          : new Date(a.tanggal_surat) - new Date(b.tanggal_surat);
      }
      if (orderBy === 'tujuan') {
        return order === 'asc' 
          ? a.tujuan.localeCompare(b.tujuan)
          : b.tujuan.localeCompare(a.tujuan);
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
      case 'Draf': return 'default';
      case 'Proses': return 'warning';
      case 'Terkirim': return 'success';
      default: return 'default';
    }
  };

  const renderAddDialog = () => (
    <Dialog open={openDialog && dialogType === 'add'} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Tambah Surat Keluar</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ditujukan Kepada"
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue="Draf"
                >
                  <MenuItem value="Draf">Draf</MenuItem>
                  <MenuItem value="Proses">Proses</MenuItem>
                  <MenuItem value="Terkirim">Terkirim</MenuItem>
                </Select>
              </FormControl>
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
        {dialogType === 'bulkDelete' ? 'Hapus Surat Keluar Terpilih' : 'Hapus Surat Keluar'}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {dialogType === 'bulkDelete' 
            ? `Apakah Anda yakin ingin menghapus ${selectedDocuments.length} surat keluar yang dipilih?`
            : `Apakah Anda yakin ingin menghapus surat keluar kepada "${selectedDoc?.tujuan}"?`
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
        Surat Keluar
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Kelola surat keluar yang dikirim ke berbagai instansi dan organisasi.
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
              placeholder="Cari tujuan, isi singkat, atau nomor surat..."
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
              <TableCell>Nomor Surat</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'tanggal_surat'}
                  direction={orderBy === 'tanggal_surat' ? order : 'desc'}
                  onClick={() => handleRequestSort('tanggal_surat')}
                >
                  Tanggal Surat
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'tujuan'}
                  direction={orderBy === 'tujuan' ? order : 'asc'}
                  onClick={() => handleRequestSort('tujuan')}
                >
                  Ditujukan Kepada
                </TableSortLabel>
              </TableCell>
              <TableCell>Isi Singkat</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>{doc.nomor_surat}</TableCell>
                <TableCell>{doc.tanggal_surat}</TableCell>
                <TableCell>{doc.tujuan}</TableCell>
                <TableCell>{doc.isi_singkat}</TableCell>
                <TableCell>
                  <Chip
                    label={doc.status}
                    color={getStatusColor(doc.status)}
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
        <MenuItem onClick={handleMenuClose}>
          <Send sx={{ mr: 1 }} /> Kirim
        </MenuItem>
      </Menu>

      {renderAddDialog()}
      {renderDeleteDialog()}
    </Box>
  );
};

export default SuratKeluar;