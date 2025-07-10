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
  Select,
  FormControl,
  InputLabel,
  Grid,
  TablePagination,
  TableSortLabel,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Print,
  Edit,
  Delete,
  MoreVert,
  Search,
  Visibility,
  GetApp,
  Add,
  Settings,
  Archive
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

const SuratDinas = () => {
  const [tabValue, setTabValue] = useState(0);
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

  // Mock data untuk surat dinas
  const mockDocuments = [
    {
      id: 1,
      nama: 'Surat Edaran Gotong Royong',
      kode_surat: '005/SE/2024',
      jenis: 'Surat Edaran',
      lampiran: 'Tidak',
      created_at: '2024-01-15',
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Surat Keputusan Pembentukan Panitia',
      kode_surat: '010/SK/2024',
      jenis: 'Surat Keputusan',
      lampiran: 'Ya',
      created_at: '2024-01-16',
      status: 'Aktif'
    },
    {
      id: 3,
      nama: 'Surat Undangan Rapat Koordinasi',
      kode_surat: '015/UND/2024',
      jenis: 'Surat Undangan',
      lampiran: 'Tidak',
      created_at: '2024-01-17',
      status: 'Aktif'
    },
    {
      id: 4,
      nama: 'Surat Pemberitahuan Kegiatan',
      kode_surat: '020/PBR/2024',
      jenis: 'Surat Pemberitahuan',
      lampiran: 'Ya',
      created_at: '2024-01-18',
      status: 'Aktif'
    }
  ];

  const availableLetters = [
    { id: 1, nama: 'Surat Edaran Gotong Royong', kode: '005/SE/2024' },
    { id: 2, nama: 'Surat Keputusan Pembentukan Panitia', kode: '010/SK/2024' },
    { id: 3, nama: 'Surat Undangan Rapat Koordinasi', kode: '015/UND/2024' },
    { id: 4, nama: 'Surat Pemberitahuan Kegiatan', kode: '020/PBR/2024' }
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
      console.log('Cetak surat dinas:', selectedSurat);
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

  const renderCetakTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cetak Surat Dinas
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Pilih template surat dinas yang akan dicetak, kemudian isi data yang diperlukan.
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
    </Box>
  );

  const renderPengaturanTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Pengaturan Surat Dinas
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Kelola template dan format surat dinas yang akan digunakan.
      </Alert>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Template Surat Dinas
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{ mb: 2 }}
                fullWidth
              >
                Tambah Template
              </Button>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                fullWidth
              >
                Pengaturan Format
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistik Surat Dinas
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Total Template:</Typography>
                <Typography fontWeight="bold">{mockDocuments.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Template Aktif:</Typography>
                <Typography fontWeight="bold">
                  {mockDocuments.filter(doc => doc.status === 'Aktif').length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Surat Dicetak Bulan Ini:</Typography>
                <Typography fontWeight="bold">15</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderArsipTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Arsip Surat Dinas
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Arsip surat dinas yang telah dicetak dan dikirim.
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            Fitur arsip surat dinas akan menampilkan riwayat surat yang telah dicetak.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Surat Dinas
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Cetak" icon={<Print />} />
          <Tab label="Pengaturan" icon={<Settings />} />
          <Tab label="Arsip" icon={<Archive />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderCetakTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderPengaturanTab()}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderArsipTab()}
      </TabPanel>

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

export default SuratDinas;