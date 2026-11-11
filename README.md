# Praktikum 05 Web Service Engineering

**Nama:** Ika Aulia  
**NIM:** 240104040152  
**Program Studi:** Teknologi Informasi  
**Universitas:** UIN Antasari Banjarmasin

## Lingkungan Pengembangan

- Node.js: 24.21.0
- npm: Sesuaikan dengan hasil `npm -v`
- Express: 5.3.0
- swagger-ui-express: 5.0.1
- Visual Studio Code

## Instalasi

Buka terminal pada folder proyek, kemudian jalankan:

```bash
npm ci
npm run docs
```

## Menjalankan Server

Pada terminal pertama:

```bash
npm start
```

## Menguji API

Pada terminal kedua:

```bash
node client.cjs GET /api/buku/1
```

## Alamat Aplikasi

- API: http://127.0.0.1:3200/api/buku
- OpenAPI JSON: http://127.0.0.1:3200/openapi.json
- Swagger UI: http://127.0.0.1:3200/docs/

## Fitur API

- GET: Membaca dan mencari data buku.
- POST: Menambahkan buku.
- PUT: Memperbarui data buku.
- DELETE: Menghapus buku.

## Batasan Aplikasi

- Aplikasi belum menggunakan sistem login.
- Data buku disimpan dalam array di memori.
- Data tambahan akan hilang setelah server dimulai ulang.
- Server berjalan secara lokal pada port 3200.

## Menghentikan Server

Tekan `Ctrl + C` pada terminal pertama untuk menghentikan server.