# Panduan Migrasi Bertahap CodeIgniter ke Electron Desktop

Panduan ini untuk mengadopsi aplikasi CodeIgniter (PHP) di folder desaku menjadi aplikasi desktop Electron di folder simbang, dengan pendekatan bertahap agar bisa berdiri sendiri.

---

## 1. Persiapan
- Pastikan Node.js, npm, dan PHP sudah terinstall di komputer.
- Siapkan folder simbang sebagai project Electron.

## 2. Inisialisasi Project Electron di simbang
```bash
cd /var/www/simbang
npm init -y
npm install --save-dev electron electron-builder
```

## 3. Struktur Folder
- /var/www/desaku : Source CodeIgniter (PHP)
- /var/www/simbang : Project Electron

## 4. Menjalankan Server PHP Lokal dari Electron
Buat file `/var/www/simbang/public/electron.js` dengan contoh isi berikut:
```js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let phpServer;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.loadURL('http://localhost:8080');
}

app.whenReady().then(() => {
  // Jalankan server PHP untuk CodeIgniter
  phpServer = spawn('php', ['-S', 'localhost:8080', '-t', '/var/www/desaku/public']);
  phpServer.stdout.on('data', data => console.log(`PHP: ${data}`));
  phpServer.stderr.on('data', data => console.error(`PHP ERROR: ${data}`));
  createWindow();
});

app.on('window-all-closed', () => {
  if (phpServer) phpServer.kill();
  if (process.platform !== 'darwin') app.quit();
});
```

## 5. Edit package.json di simbang
Pastikan bagian berikut:
```json
"main": "public/electron.js",
"scripts": {
  "start": "electron .",
  "electron-pack": "electron-builder"
},
```

## 6. Jalankan Electron
```bash
npm start
```
Electron akan otomatis menjalankan server PHP (CodeIgniter) dan membuka window ke aplikasi Anda.

## 7. Build Installer Desktop
```bash
npm run electron-pack
```

---

### Catatan Migrasi Bertahap
- Anda bisa mulai dengan mengemas aplikasi CodeIgniter secara utuh.
- Jika ingin mengadopsi ke React/SPA, lakukan secara bertahap di folder simbang, misal mulai dari halaman tertentu.
- Untuk benar-benar standalone (tanpa PHP terinstall), bisa menggunakan PHP portable (opsional, tingkat lanjut).

---

Panduan ini mendukung migrasi bertahap dan aplikasi desktop yang bisa berdiri sendiri di masa depan.

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "electron-dev": "concurrently \"npm:start\" \"wait-on http://localhost:3000 && electron .\"",
  "electron-pack": "npm run build && electron-builder"
},
"build": {
  "appId": "com.simbang.app",
  "files": [
    "build/**/*",
    "electron.js"
  ],
  "directories": {
    "buildResources": "assets"
  }
}
```

## 7. Jalankan Electron untuk Development
```bash
npm run build
npx electron .
```
Atau untuk mode dev (hot reload React):
```bash
npm run electron-dev
```

## 8. Build Installer Desktop
```bash
npm run electron-pack
```
Hasil build ada di folder `dist/`.

---

Jika ingin Electron selalu mengambil build terbaru dari desaku, bisa buat symlink:
```bash
ln -s /var/www/desaku/build /var/www/simbang/build
```

Panduan ini siap dipakai langsung.
