const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const mysql = require('mysql2/promise');
const xlsx = require('xlsx');
const fs = require('fs');

// Database connection pool
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // As discussed
  database: 'desa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Bridge between main and renderer processes
      preload: path.join(__dirname, 'preload.js'),
      // Security best practices
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL('http://localhost:3000');
  // Optional: Open DevTools for debugging
  // win.webContents.openDevTools();
}

// --- IPC Handlers for Database Operations ---

// GET FILTER OPTIONS
ipcMain.handle('get-filter-options', async () => {
  try {
    const [dusun] = await dbPool.query('SELECT DISTINCT dusun FROM tweb_wil_clusterdesa WHERE dusun IS NOT NULL AND dusun != "" ORDER BY dusun ASC');
    const [statusKawin] = await dbPool.query('SELECT id, nama FROM tweb_kawin ORDER BY id ASC');
    return {
      success: true,
      data: {
        dusun: dusun.map(item => item.dusun),
        statusKawin: statusKawin
      }
    };
  } catch (error) {
    console.error('Gagal mengambil opsi filter:', error);
    return { success: false, message: error.message };
  }
});

// READ all penduduk
ipcMain.handle('get-penduduk', async (event, filters = {}) => {
  try {
    const whereClause = ['p.status_dasar = 1'];
    const queryParams = [];

    if (filters.jk) {
      whereClause.push('p.sex = ?');
      queryParams.push(filters.jk === 'Laki-laki' ? 1 : 2);
    }
    if (filters.dusun) {
      whereClause.push('w.dusun = ?');
      queryParams.push(filters.dusun);
    }
    if (filters.statusKawin) {
      whereClause.push('p.status_kawin = ?');
      queryParams.push(filters.statusKawin);
    }

    const query = `
      SELECT 
        p.nik, 
        p.nama, 
        p.id_kk as no_kk, 
        p.nama_ayah, 
        p.nama_ibu, 
        CASE WHEN p.sex = 1 THEN 'Laki-laki' ELSE 'Perempuan' END as jk, 
        p.alamat_sekarang as alamat, 
        w.dusun, 
        w.rw, 
        w.rt 
      FROM tweb_penduduk p
      LEFT JOIN tweb_wil_clusterdesa w ON p.id_cluster = w.id
      WHERE ${whereClause.join(' AND ')}
      ORDER BY p.nama ASC
    `;

    const [rows] = await dbPool.query(query, queryParams);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Failed to get penduduk:', error);
    return { success: false, message: error.message };
  }
});

// READ all rumah tangga
ipcMain.handle('get-rumah-tangga', async (event, filters = {}) => {
  try {
    const whereClause = ['p.status_dasar = 1'];
    const queryParams = [];

    if (filters.jk) {
      whereClause.push('p.sex = ?');
      queryParams.push(filters.jk === 'Laki-laki' ? 1 : 2);
    }
    if (filters.dusun) {
      whereClause.push('w.dusun = ?');
      queryParams.push(filters.dusun);
    }

    const query = `
      SELECT 
        rt.id, 
        rt.no_rumah_tangga, 
        p.nama AS kepala_rumah_tangga, 
        p.nik, 
        (SELECT COUNT(id) FROM tweb_penduduk WHERE id_rt = rt.id AND status_dasar = 1) AS jumlah_anggota,
        CASE WHEN p.sex = 1 THEN 'Laki-laki' ELSE 'Perempuan' END AS jenis_kelamin, 
        w.dusun, 
        w.rw, 
        w.rt
      FROM tweb_rumah_tangga rt
      LEFT JOIN tweb_penduduk p ON rt.nik_kepala = p.id
      LEFT JOIN tweb_wil_clusterdesa w ON p.id_cluster = w.id
      WHERE ${whereClause.join(' AND ')}
      ORDER BY rt.tgl_daftar DESC
    `;

    const [rows] = await dbPool.query(query, queryParams);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Failed to get rumah tangga:', error);
    return { success: false, message: error.message };
  }
});

// CREATE rumah tangga
ipcMain.handle('add-rumah-tangga', async (event, rumahTangga) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();
    const { no_rumah_tangga, nik_kepala } = rumahTangga;

    // 1. Find resident id from NIK
    const [pendudukRows] = await connection.execute('SELECT id FROM tweb_penduduk WHERE nik = ?', [nik_kepala]);
    if (pendudukRows.length === 0) {
      throw new Error(`Penduduk dengan NIK ${nik_kepala} tidak ditemukan.`);
    }
    const pendudukId = pendudukRows[0].id;

    // 2. Insert into tweb_rumah_tangga
    const [result] = await connection.execute(
      'INSERT INTO tweb_rumah_tangga (no_rumah_tangga, nik_kepala, tgl_daftar) VALUES (?, ?, NOW())',
      [no_rumah_tangga, pendudukId]
    );
    const rumahTanggaId = result.insertId;

    // 3. Update resident's id_rt
    await connection.execute('UPDATE tweb_penduduk SET id_rt = ? WHERE id = ?', [rumahTanggaId, pendudukId]);

    await connection.commit();
    return { success: true, id: rumahTanggaId };
  } catch (error) {
    await connection.rollback();
    console.error('Failed to add rumah tangga:', error);
    return { success: false, message: error.message };
  } finally {
    connection.release();
  }
});

// UPDATE rumah tangga
ipcMain.handle('update-rumah-tangga', async (event, rumahTangga) => {
  try {
    const { id, no_rumah_tangga } = rumahTangga;
    await dbPool.execute('UPDATE tweb_rumah_tangga SET no_rumah_tangga = ? WHERE id = ?', 
      [no_rumah_tangga, id]);
    return { success: true };
  } catch (error) {
    console.error('Failed to update rumah tangga:', error);
    return { success: false, message: error.message };
  }
});

// DELETE rumah tangga
ipcMain.handle('delete-rumah-tangga', async (event, id) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();
    
    // 1. Remove reference from tweb_penduduk
    await connection.execute('UPDATE tweb_penduduk SET id_rt = NULL WHERE id_rt = ?', [id]);
    
    // 2. Delete from tweb_rumah_tangga
    await connection.execute('DELETE FROM tweb_rumah_tangga WHERE id = ?', [id]);
    
    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error('Failed to delete rumah tangga:', error);
    return { success: false, message: error.message };
  } finally {
    connection.release();
  }
});

// READ all keluarga
ipcMain.handle('get-keluarga', async (event, filters = {}) => {
  try {
    const whereClause = ['p.status_dasar = 1'];
    const queryParams = [];

    if (filters.jk) {
      whereClause.push('p.sex = ?');
      queryParams.push(filters.jk === 'Laki-laki' ? 1 : 2);
    }
    if (filters.dusun) {
      whereClause.push('w.dusun = ?');
      queryParams.push(filters.dusun);
    }

    const query = `
      SELECT 
        k.id, 
        k.no_kk, 
        p.nama AS kepala_keluarga, 
        p.nik, 
        (SELECT COUNT(id) FROM tweb_penduduk WHERE id_kk = k.id AND status_dasar = 1) AS jumlah_anggota,
        CASE WHEN p.sex = 1 THEN 'Laki-laki' ELSE 'Perempuan' END AS jenis_kelamin, 
        w.dusun, 
        w.rw, 
        w.rt
      FROM tweb_keluarga k
      LEFT JOIN tweb_penduduk p ON k.nik_kepala = p.id
      LEFT JOIN tweb_wil_clusterdesa w ON p.id_cluster = w.id
      WHERE ${whereClause.join(' AND ')}
      ORDER BY k.tgl_daftar DESC
    `;

    const [rows] = await dbPool.query(query, queryParams);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Failed to get keluarga:', error);
    return { success: false, message: error.message };
  }
});

// CREATE a new keluarga
ipcMain.handle('add-keluarga', async (event, keluarga) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();
    const { no_kk, nik_kepala } = keluarga;

    // 1. Find resident id from NIK
    const [pendudukRows] = await connection.execute('SELECT id FROM tweb_penduduk WHERE nik = ?', [nik_kepala]);
    if (pendudukRows.length === 0) {
      throw new Error(`Penduduk dengan NIK ${nik_kepala} tidak ditemukan.`);
    }
    const pendudukId = pendudukRows[0].id;

    // 2. Insert into tweb_keluarga
    const [result] = await connection.execute(
      'INSERT INTO tweb_keluarga (no_kk, nik_kepala, tgl_daftar) VALUES (?, ?, NOW())',
      [no_kk, pendudukId]
    );
    const keluargaId = result.insertId;

    // 3. Update resident's id_kk and kk_level
    await connection.execute('UPDATE tweb_penduduk SET id_kk = ?, kk_level = 1 WHERE id = ?', [keluargaId, pendudukId]);

    await connection.commit();
    return { success: true, id: keluargaId };
  } catch (error) {
    await connection.rollback();
    console.error('Failed to add keluarga:', error);
    return { success: false, message: error.message };
  } finally {
    connection.release();
  }
});

// UPDATE a keluarga
ipcMain.handle('update-keluarga', async (event, keluarga) => {
  try {
    const { id, no_kk } = keluarga;
    // For now, only allows updating no_kk. Changing the head is more complex.
    await dbPool.execute('UPDATE tweb_keluarga SET no_kk = ? WHERE id = ?', [no_kk, id]);
    return { success: true };
  } catch (error) {
    console.error('Failed to update keluarga:', error);
    return { success: false, message: error.message };
  }
});

// DELETE a keluarga (soft delete)
ipcMain.handle('delete-keluarga', async (event, id) => {
  try {
    // Soft delete by setting a flag, assuming there's a `status` column or similar.
    // For this example, we'll just delete it. In a real scenario, you'd update a status field.
    // First, check if there are other members. For simplicity, we skip this check.
    await dbPool.execute('DELETE FROM tweb_keluarga WHERE id = ?', [id]);
    // You would also need to update the `id_kk` for all members of this family.
    return { success: true };
  } catch (error) {
    console.error('Failed to delete keluarga:', error);
    return { success: false, message: error.message };
  }
});

// CREATE a new penduduk
ipcMain.handle('add-penduduk', async (event, penduduk) => {
  try {
    // This is a simplified insert. You need to handle id_cluster, sex (integer), etc.
    const { nik, nama, no_kk, nama_ayah, nama_ibu, jk, alamat, dusun, rw, rt } = penduduk;
    const sex = jk === 'Laki-laki' ? 1 : 2;
    // TODO: Need to find id_cluster based on dusun/rw/rt
    const [result] = await dbPool.execute(
      'INSERT INTO tweb_penduduk (nik, nama, id_kk, nama_ayah, nama_ibu, sex, alamat_sekarang, status_dasar) VALUES (?, ?, ?, ?, ?, ?, ?, 1)',
      [nik, nama, no_kk, nama_ayah, nama_ibu, sex, alamat]
    );
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error('Failed to add penduduk:', error);
    return { success: false, message: error.message };
  }
});

// UPDATE a penduduk
ipcMain.handle('update-penduduk', async (event, penduduk) => {
  try {
    const { nik, nama, no_kk, nama_ayah, nama_ibu, jk, alamat, dusun, rw, rt } = penduduk;
    const sex = jk === 'Laki-laki' ? 1 : 2;
    // TODO: Update id_cluster if dusun/rw/rt changes
    await dbPool.execute(
      'UPDATE tweb_penduduk SET nama = ?, id_kk = ?, nama_ayah = ?, nama_ibu = ?, sex = ?, alamat_sekarang = ? WHERE nik = ?',
      [nama, no_kk, nama_ayah, nama_ibu, sex, alamat, nik]
    );
    return { success: true };
  } catch (error) {
    console.error('Failed to update penduduk:', error);
    return { success: false, message: error.message };
  }
});

// EXPORT penduduk to Excel
ipcMain.handle('export-penduduk', async () => {
  try {
    // 1. Show save dialog to get file path from user
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Simpan Data Penduduk ke Excel',
      defaultPath: `data-penduduk-${new Date().toISOString().split('T')[0]}.xlsx`,
      filters: [{ name: 'Excel Files', extensions: ['xlsx'] }]
    });

    if (canceled || !filePath) {
      return { success: true, message: 'Export dibatalkan oleh pengguna.' };
    }

    // 2. Fetch the complete data from the database
    // This query includes all the fields you requested.
    const [rows] = await dbPool.query(`
      SELECT 
        p.alamat_sekarang AS alamat, w.dusun, w.rw, w.rt, p.nama, p.id_kk AS no_kk, p.nik, p.sex, p.tempatlahir, 
        p.tanggallahir, p.agama_id, p.pendidikan_kk_id, p.pendidikan_sedang_id, p.pekerjaan_id, p.status_kawin, 
        p.kk_level, p.warganegara_id, p.ayah_nik, p.nama_ayah, p.ibu_nik, p.nama_ibu, p.golongan_darah_id, 
        p.akta_lahir, p.dokumen_pasport, p.tanggal_akhir_paspor, p.dokumen_kitas, p.akta_perkawinan, 
        p.tanggalperkawinan, p.akta_perceraian, p.tanggalperceraian, p.cacat_id, p.cara_kb_id, p.hamil, 
        p.ktp_el, p.status_rekam, p.alamat_sekarang, p.status_dasar, p.suku, p.tag_id_card, p.id_asuransi, 
        p.no_asuransi, p.lat, p.lng
      FROM tweb_penduduk p
      LEFT JOIN tweb_wil_clusterdesa w ON p.id_cluster = w.id
      WHERE p.status_dasar = 1
    `);

    // 3. Create worksheet and workbook
    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data Penduduk');

    // 4. Write file to the chosen path
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    fs.writeFileSync(filePath, buffer);

    return { success: true, message: `Data berhasil diekspor ke ${filePath}` };
  } catch (error) {
    console.error('Gagal mengekspor data penduduk:', error);
    return { success: false, message: error.message };
  }
});

// DELETE a penduduk (set status to non-active)
ipcMain.handle('delete-penduduk', async (event, nik) => {
  try {
    // OpenSID typically uses a soft delete (changing status_dasar) instead of hard delete
    await dbPool.execute('UPDATE tweb_penduduk SET status_dasar = 4 WHERE nik = ?', [nik]); // 4 = HILANG/MATI/PINDAH
    return { success: true };
  } catch (error) {
    console.error('Failed to delete penduduk:', error);
    return { success: false, message: error.message };
  }
});


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
