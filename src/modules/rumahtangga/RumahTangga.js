import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Paper, Toolbar, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add as AddIcon, Print as PrintIcon, Download as DownloadIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const emptyForm = { id: null, no_rumah_tangga: '', nik_kepala: '' };

const RumahTangga = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filterJk, setFilterJk] = useState('');
  const [filterDusun, setFilterDusun] = useState('');
  const [filterOptions, setFilterOptions] = useState({ dusun: [] });

  const fetchRumahTangga = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = { jk: filterJk, dusun: filterDusun };
      const result = await window.api.invoke('get-rumah-tangga', filters);
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Failed to fetch rumah tangga:', err);
      setError('Gagal mengambil data rumah tangga.');
    } finally {
      setLoading(false);
    }
  }, [filterJk, filterDusun]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const result = await window.api.invoke('get-filter-options');
      if (result.success) {
        setFilterOptions(result.data);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchRumahTangga();
  }, [fetchRumahTangga]);

  const openAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (row) => {
    setForm({ id: row.id, no_rumah_tangga: row.no_rumah_tangga, nik_kepala: row.nik });
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
    const action = isEdit ? 'update-rumah-tangga' : 'add-rumah-tangga';
    try {
      const result = await window.api.invoke(action, form);
      if (result.success) {
        closeModal();
        fetchRumahTangga();
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
      console.error(`Failed to ${action}:`, err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus data rumah tangga ini?')) {
      try {
        const result = await window.api.invoke('delete-rumah-tangga', id);
        if (result.success) {
          fetchRumahTangga();
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
        console.error('Failed to delete rumah tangga:', err);
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            Data Rumah Tangga
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1 }} onClick={openAdd}>
            Tambah Rumah Tangga
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} sx={{ mr: 1 }}>
            Cetak
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Unduh
          </Button>
        </Toolbar>

        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Pilih Jenis Kelamin</InputLabel>
            <Select value={filterJk} label="Pilih Jenis Kelamin" onChange={e => setFilterJk(e.target.value)}>
              <MenuItem value=""><em>Semua</em></MenuItem>
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Pilih Dusun</InputLabel>
            <Select value={filterDusun} label="Pilih Dusun" onChange={e => setFilterDusun(e.target.value)}>
              <MenuItem value=""><em>Semua</em></MenuItem>
              {filterOptions.dusun.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
        {!loading && !error && (
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Aksi</TableCell>
                  <TableCell>No. Rumah Tangga</TableCell>
                  <TableCell>Kepala Rumah Tangga</TableCell>
                  <TableCell>NIK</TableCell>
                  <TableCell>Jumlah Anggota</TableCell>
                  <TableCell>Jenis Kelamin</TableCell>
                  <TableCell>Alamat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => openEdit(row)}><EditIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                    <TableCell>{row.no_rumah_tangga}</TableCell>
                    <TableCell>{row.kepala_rumah_tangga}</TableCell>
                    <TableCell>{row.nik}</TableCell>
                    <TableCell>{row.jumlah_anggota}</TableCell>
                    <TableCell>{row.jenis_kelamin}</TableCell>
                    <TableCell>{`Dusun ${row.dusun}, RW ${row.rw}, RT ${row.rt}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={showModal} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? 'Edit' : 'Tambah'} Data Rumah Tangga</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField 
                name="no_rumah_tangga" 
                label="Nomor Rumah Tangga" 
                fullWidth 
                variant="standard" 
                value={form.no_rumah_tangga} 
                onChange={handleChange} 
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                name="nik_kepala" 
                label="NIK Kepala Rumah Tangga" 
                fullWidth 
                variant="standard" 
                value={form.nik_kepala} 
                onChange={handleChange} 
                required 
                disabled={isEdit}
              />
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

export default RumahTangga;
