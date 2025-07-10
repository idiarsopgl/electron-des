import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Paper, Toolbar, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Grid, CircularProgress, Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material';

const emptyForm = { nik: '', nama: '', no_kk: '', nama_ayah: '', nama_ibu: '', jk: 'Laki-laki', alamat: '', dusun: '', rw: '', rt: '' };

const Penduduk = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [exporting, setExporting] = useState(false);

  // State for filters
  const [filterJk, setFilterJk] = useState('');
  const [filterDusun, setFilterDusun] = useState('');
  const [filterStatusKawin, setFilterStatusKawin] = useState('');
  const [filterOptions, setFilterOptions] = useState({ dusun: [], statusKawin: [] });

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const result = await window.api.invoke('get-filter-options');
        if (result.success) {
          setFilterOptions(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error('Gagal mengambil opsi filter:', err);
        setError('Gagal memuat data filter.'); // Show error to user
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch penduduk data based on current filters
  const fetchPenduduk = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = { jk: filterJk, dusun: filterDusun, statusKawin: filterStatusKawin };
      const result = await window.api.invoke('get-penduduk', filters);
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Failed to fetch penduduk:', err);
      setError('Gagal mengambil data penduduk.');
    } finally {
      setLoading(false);
    }
  }, [filterJk, filterDusun, filterStatusKawin]);

  // Effect to re-fetch data when filters change
  useEffect(() => {
    fetchPenduduk();
  }, [fetchPenduduk]);

  const handleResetFilters = () => {
    setFilterJk('');
    setFilterDusun('');
    setFilterStatusKawin('');
  };

  const openAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (rowData) => {
    setForm(rowData);
    setIsEdit(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isEdit ? 'update-penduduk' : 'add-penduduk';
    try {
      const result = await window.api.invoke(action, form);
      if (result.success) {
        closeModal();
        fetchPenduduk(); // Refresh data
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
      console.error(`Failed to ${action}:`, err);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const result = await window.api.invoke('export-penduduk');
      if (result.success) {
        alert(result.message || 'Ekspor berhasil!');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(`Gagal mengekspor data: ${err.message}`);
      console.error('Gagal mengekspor data:', err);
    }
    setExporting(false);
  };

  const handleDelete = async (nik) => {
    if (window.confirm('Yakin hapus data penduduk dengan NIK: ' + nik + '? (Data akan diarsipkan)')) {
      try {
        const result = await window.api.invoke('delete-penduduk', nik);
        if (result.success) {
          fetchPenduduk(); // Refresh data
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
        console.error('Failed to delete penduduk:', err);
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filter Section */}
      <Paper sx={{ width: '100%', p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Filter Data</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Jenis Kelamin</InputLabel>
              <Select value={filterJk} label="Jenis Kelamin" onChange={e => setFilterJk(e.target.value)}>
                <MenuItem value=""><em>Semua</em></MenuItem>
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Dusun</InputLabel>
              <Select value={filterDusun} label="Dusun" onChange={e => setFilterDusun(e.target.value)}>
                <MenuItem value=""><em>Semua</em></MenuItem>
                {filterOptions.dusun.map(dusun => (
                  <MenuItem key={dusun} value={dusun}>{dusun}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status Perkawinan</InputLabel>
              <Select value={filterStatusKawin} label="Status Perkawinan" onChange={e => setFilterStatusKawin(e.target.value)}>
                <MenuItem value=""><em>Semua</em></MenuItem>
                {filterOptions.statusKawin.map(status => (
                  <MenuItem key={status.id} value={status.id}>{status.nama}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="outlined" onClick={handleResetFilters} fullWidth>Reset Filter</Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            Data Penduduk
          </Typography>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport} disabled={exporting} sx={{ mr: 2 }}>
            {exporting ? 'Mengekspor...' : 'Unduh Excel'}
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
            Tambah Penduduk
          </Button>
        </Toolbar>

        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
        {!loading && !error && (
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>NIK</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>No. KK</TableCell>
                  <TableCell>Dusun</TableCell>
                  <TableCell>RT/RW</TableCell>
                  <TableCell align="right">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow hover key={row.nik}>
                    <TableCell>{row.nik}</TableCell>
                    <TableCell>{row.nama}</TableCell>
                    <TableCell>{row.no_kk}</TableCell>
                    <TableCell>{row.dusun}</TableCell>
                    <TableCell>{`${row.rt}/${row.rw}`}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(row)}><EditIcon /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row.nik)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Modal Form */}
      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>{isEdit ? 'Edit' : 'Tambah'} Data Penduduk</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField autoFocus name="nik" label="NIK" fullWidth variant="standard" value={form.nik} onChange={handleChange} required disabled={isEdit} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="nama" label="Nama Lengkap" fullWidth variant="standard" value={form.nama} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="no_kk" label="No. KK" fullWidth variant="standard" value={form.no_kk} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Jenis Kelamin</InputLabel>
                <Select name="jk" value={form.jk} onChange={handleChange} label="Jenis Kelamin">
                  <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                  <MenuItem value="Perempuan">Perempuan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="nama_ayah" label="Nama Ayah" fullWidth variant="standard" value={form.nama_ayah} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="nama_ibu" label="Nama Ibu" fullWidth variant="standard" value={form.nama_ibu} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="alamat" label="Alamat" fullWidth variant="standard" value={form.alamat} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="dusun" label="Dusun" fullWidth variant="standard" value={form.dusun} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="rw" label="RW" fullWidth variant="standard" value={form.rw} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="rt" label="RT" fullWidth variant="standard" value={form.rt} onChange={handleChange} required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Batal</Button>
          <Button onClick={handleSubmit} variant="contained">Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Penduduk;
