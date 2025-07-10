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
  Alert
} from '@mui/material';
import {
  Print,
  Edit,
  Delete,
  MoreVert,
  Search,
  Visibility,
  GetApp
} from '@mui/icons-material';

const LayananSurat = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedSurat, setSelectedSurat] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('nama');
  const [order, setOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Mock data untuk layanan surat
  const mockDocuments = [
    {
      id: 1,
      nama: 'Surat Keterangan Domisili',
      kode_surat: '474/001',
      jenis: 'Keterangan',
      lampiran: 'Ya',
      created_at: '2024-01-15',
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Surat Keterangan Usaha',
      kode_surat: '474/002',
      jenis: 'Keterangan',
      lampiran: 'Tidak',
      created_at: '2024-01-16',
      status: 'Aktif'
    },
    {
      id: 3,
      nama: 'Surat Keterangan Tidak Mampu',
      kode_surat: '474/003',
      jenis: 'Keterangan',
      lampiran: 'Ya',
      created_at: '2024-01-17',
      status: 'Aktif'
    },
    {
      id: 4,
      nama: 'Surat Keterangan Kelahiran',
      kode_surat: '474/004',
      jenis: 'Keterangan',
      lampiran: 'Tidak',
      created_at: '2024-01-18',
      status: 'Aktif'
    },
    {
      id: 5,
      nama: 'Surat Keterangan Kematian',
      kode_surat: '474/005',
      jenis: 'Keterangan',
      lampiran: 'Ya',
      created_at: '2024-01-19',
      status: 'Aktif'
    },
    {
      id: 6,
      nama: 'Surat Keterangan Pindah',
      kode_surat: '474/006',
      jenis: 'Keterangan',
      lampiran: 'Ya',
      created_at: '2024-01-20',
      status: 'Aktif'
    },
    {
      id: 7,
      nama: 'Surat Pengantar Nikah',
      kode_surat: '474/007',
      jenis: 'Pengantar',
      lampiran: 'Ya',
      created_at: '2024-01-21',
      status: 'Aktif'
    },
    {
      id: 8,
      nama: 'Surat Permohonan Akta Kelahiran',
      kode_surat: '474/008',
      jenis: 'Permohonan',
      lampiran: 'Ya',
      created_at: '2024-01-22',
      status: 'Aktif'
    }
  ];

  const availableLetters = [
    { id: 1, nama: 'Surat Keterangan Domisili', kode: '474/001' },
    { id: 2, nama: 'Surat Keterangan Usaha', kode: '474/002' },
    { id: 3, nama: 'Surat Keterangan Tidak Mampu', kode: '474/003' },
    { id: 4, nama: 'Surat Keterangan Kelahiran', kode: '474/004' },
    { id: 5, nama: 'Surat Keterangan Kematian', kode: '474/005' },
    { id: 6, nama: 'Surat Keterangan Pindah', kode: '474/006' },
    { id: 7, nama: 'Surat Pengantar Nikah', kode: '474/007' },
    { id: 8, nama: 'Surat Permohonan Akta Kelahiran', kode: '474/008' }
  ];

  useEffect(() => {
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  useEffect(() => {
    let filtered = documents;
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.kode_surat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDocuments(filtered);
    setPage(0);
  }, [documents, searchTerm]);

  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleCetakSurat = () => {
    if (selectedSurat) {
      console.log('Cetak surat:', selectedSurat);
      // Implementasi cetak surat
    }
  };

  const sortedDocuments = React.useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      if (orderBy === 'nama') {
        return order === 'asc' 
          ? a.nama.localeCompare(b.nama)
          : b.nama.localeCompare(a.nama);
      }
      if (orderBy === 'kode_surat') {
        return order === 'asc' 
          ? a.kode_surat.localeCompare(b.kode_surat)
          : b.kode_surat.localeCompare(a.kode_surat);
      }
      return 0;
    });
  }, [filteredDocuments, order, orderBy]);

  const paginatedDocuments = sortedDocuments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Cetak Layanan Surat
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Pilih jenis surat yang akan dicetak, kemudian klik tombol "Cetak Surat" untuk memulai proses pencetakan.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <FormControl fullWidth>
                <InputLabel>--- Cari Judul Surat Yang Akan Dicetak ---</InputLabel>
                <Select
                  value={selectedSurat}
                  onChange={(e) => setSelectedSurat(e.target.value)}
                  label="--- Cari Judul Surat Yang Akan Dicetak ---"
                >
                  {availableLetters.map(letter => (
                    <MenuItem key={letter.id} value={letter.id}>
                      {letter.nama} ({letter.kode})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Print />}
                onClick={handleCetakSurat}
                disabled={!selectedSurat}
                fullWidth
              >
                Cetak Surat
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Cari kata kunci pencarian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell>AKSI</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'nama'}
                      direction={orderBy === 'nama' ? order : 'asc'}
                      onClick={() => handleRequestSort('nama')}
                    >
                      NAMA SURAT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'kode_surat'}
                      direction={orderBy === 'kode_surat' ? order : 'asc'}
                      onClick={() => handleRequestSort('kode_surat')}
                    >
                      KODE / KLASIFIKASI
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>LAMPIRAN</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDocuments.map((doc, index) => (
                  <TableRow key={doc.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, doc)}
                        size="small"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                    <TableCell>{doc.nama}</TableCell>
                    <TableCell>{doc.kode_surat}</TableCell>
                    <TableCell>
                      <Chip
                        label={doc.lampiran}
                        color={doc.lampiran === 'Ya' ? 'primary' : 'default'}
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
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Print sx={{ mr: 1 }} /> Cetak
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ mr: 1 }} /> Lihat
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <GetApp sx={{ mr: 1 }} /> Unduh
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LayananSurat;