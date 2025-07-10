import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
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
  TextField,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Checkbox,
  FormControlLabel,
  Alert,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  FileDownload,
  FileUpload,
  Settings,
  Preview,
  Search
} from '@mui/icons-material';

const Persuratan = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'add', 'edit', 'delete', 'settings'
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('nama');
  const [order, setOrder] = useState('asc');

  // Mock data - replace with actual API calls
  const mockDocuments = [
    {
      id: 1,
      nama: 'Surat Keterangan Domisili',
      kode_surat: '474/001',
      jenis: 'Keterangan',
      status: 'Aktif',
      lampiran: 'Ya',
      created_at: '2024-01-15'
    },
    {
      id: 2,
      nama: 'Surat Keterangan Usaha',
      kode_surat: '474/002',
      jenis: 'Keterangan',
      status: 'Aktif',
      lampiran: 'Tidak',
      created_at: '2024-01-16'
    },
    {
      id: 3,
      nama: 'Surat Pengantar Nikah',
      kode_surat: '474/003',
      jenis: 'Pengantar',
      status: 'Tidak Aktif',
      lampiran: 'Ya',
      created_at: '2024-01-17'
    },
    {
      id: 4,
      nama: 'Surat Keterangan Tidak Mampu',
      kode_surat: '474/004',
      jenis: 'Keterangan',
      status: 'Aktif',
      lampiran: 'Ya',
      created_at: '2024-01-18'
    },
    {
      id: 5,
      nama: 'Surat Keterangan Kelahiran',
      kode_surat: '474/005',
      jenis: 'Keterangan',
      status: 'Aktif',
      lampiran: 'Tidak',
      created_at: '2024-01-19'
    },
    {
      id: 6,
      nama: 'Surat Keterangan Kematian',
      kode_surat: '474/006',
      jenis: 'Keterangan',
      status: 'Aktif',
      lampiran: 'Ya',
      created_at: '2024-01-20'
    },
    {
      id: 7,
      nama: 'Surat Keterangan Pindah',
      kode_surat: '474/007',
      jenis: 'Keterangan',
      status: 'Aktif',
      lampiran: 'Ya',
      created_at: '2024-01-21'
    },
    {
      id: 8,
      nama: 'Surat Permohonan Akta Kelahiran',
      kode_surat: '474/008',
      jenis: 'Permohonan',
      status: 'Aktif',
      lampiran: 'Ya',
      created_at: '2024-01-22'
    }
  ];

  const documentTypes = [
    { value: 'Keterangan', label: 'Surat Keterangan' },
    { value: 'Pengantar', label: 'Surat Pengantar' },
    { value: 'Keputusan', label: 'Surat Keputusan' },
    { value: 'Edaran', label: 'Surat Edaran' }
  ];

  useEffect(() => {
    // Initialize with mock data
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);

  useEffect(() => {
    // Filter documents based on search and filters
    let filtered = documents;

    if (statusFilter) {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(doc => doc.jenis === typeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.kode_surat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  }, [documents, statusFilter, typeFilter, searchTerm]);

  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoc(null);
  };

  const handleDialogOpen = (type, doc = null) => {
    setDialogType(type);
    setSelectedDoc(doc);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType('');
    setSelectedDoc(null);
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

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting documents:', selectedDocuments);
  };

  const handleImport = () => {
    // Implement import functionality
    handleDialogOpen('import');
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

  const renderDocumentDialog = () => {
    if (!openDialog) return null;

    const isEdit = dialogType === 'edit';
    const title = isEdit ? 'Edit Surat' : 'Tambah Surat';

    return (
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Surat"
                  defaultValue={isEdit ? selectedDoc?.nama : ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Kode Surat"
                  defaultValue={isEdit ? selectedDoc?.kode_surat : ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Jenis Surat</InputLabel>
                  <Select
                    defaultValue={isEdit ? selectedDoc?.jenis : ''}
                    label="Jenis Surat"
                  >
                    {documentTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={isEdit ? selectedDoc?.status === 'Aktif' : true} />}
                  label="Status Aktif"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={isEdit ? selectedDoc?.lampiran === 'Ya' : false} />}
                  label="Memerlukan Lampiran"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Batal</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            {isEdit ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderDeleteDialog = () => {
    if (dialogType !== 'delete' && dialogType !== 'bulkDelete') return null;

    const isBulk = dialogType === 'bulkDelete';
    const title = isBulk ? 'Hapus Surat Terpilih' : 'Hapus Surat';
    const content = isBulk 
      ? `Apakah Anda yakin ingin menghapus ${selectedDocuments.length} surat yang dipilih?`
      : `Apakah Anda yakin ingin menghapus surat "${selectedDoc?.nama}"?`;

    return (
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Batal</Button>
          <Button variant="contained" color="error" onClick={handleDialogClose}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderSettingsDialog = () => {
    if (dialogType !== 'settings') return null;

    return (
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="lg" fullWidth>
        <DialogTitle>Pengaturan Surat</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Pengaturan ini akan mempengaruhi semua template surat dalam sistem
          </Alert>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Header Surat</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Template Header"
              placeholder="Masukkan template header surat..."
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" gutterBottom>Footer Surat</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Template Footer"
              placeholder="Masukkan template footer surat..."
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" gutterBottom>Pengaturan Lainnya</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Kiri (cm)"
                  type="number"
                  defaultValue="2.5"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Kanan (cm)"
                  type="number"
                  defaultValue="2.5"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Atas (cm)"
                  type="number"
                  defaultValue="3"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Margin Bawah (cm)"
                  type="number"
                  defaultValue="2.5"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Batal</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Simpan Pengaturan
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Persuratan
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleDialogOpen('add')}
            >
              Tambah Surat
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={handleBulkDelete}
              disabled={selectedDocuments.length === 0}
              color="error"
            >
              Hapus Terpilih
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={handleImport}
            >
              Impor
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<FileDownload />}
              onClick={handleExport}
              disabled={selectedDocuments.length === 0}
            >
              Ekspor
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => handleDialogOpen('settings')}
            >
              Pengaturan
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Cari surat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Semua Status</MenuItem>
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Jenis</InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Jenis"
              >
                <MenuItem value="">Semua Jenis</MenuItem>
                {documentTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              <TableCell>NO</TableCell>
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
              <TableCell>AKSI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDocuments.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleSelectDocument(doc.id)}
                  />
                </TableCell>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{doc.nama}</TableCell>
                <TableCell>{doc.kode_surat}</TableCell>
                <TableCell>
                  <Chip
                    label={doc.lampiran}
                    color={doc.lampiran === 'Ya' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, doc)}
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
        <MenuItem onClick={() => handleDialogOpen('edit', selectedDoc)}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('preview', selectedDoc)}>
          <Preview sx={{ mr: 1 }} /> Preview
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('delete', selectedDoc)}>
          <Delete sx={{ mr: 1 }} /> Hapus
        </MenuItem>
      </Menu>

      {renderDocumentDialog()}
      {renderDeleteDialog()}
      {renderSettingsDialog()}
    </Box>
  );
};

export default Persuratan;