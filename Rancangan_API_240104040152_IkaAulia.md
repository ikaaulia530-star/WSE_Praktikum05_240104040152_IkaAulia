# RANCANGAN API WEB SERVICE KATALOG BUKU

**Nama:** Ika Aulia  
**NIM:** 240104040152
**Mata Kuliah:** Web Service Engineering  
**Praktikum:** 05

## 1. Tujuan Layanan

Web Service Katalog Buku merupakan layanan yang digunakan untuk mengelola data buku melalui API. Layanan ini menyediakan fitur untuk menampilkan daftar buku, mencari buku berdasarkan judul, melihat detail buku, menambahkan buku baru, memperbarui data buku, dan menghapus buku.

Consumer yang menggunakan layanan ini adalah program `client.cjs` untuk melakukan pengujian API. Layanan ini juga dapat digunakan oleh aplikasi lain yang membutuhkan akses terhadap data katalog buku.

## 2. Model Data

Model data buku terdiri dari tiga field utama:

| Field | Tipe Data | Aturan |
|---|---|---|
| id | Number | Bilangan bulat positif yang dibuat otomatis oleh server. |
| judul | String | Wajib diisi, tidak boleh kosong, dan maksimal 120 unit string. |
| tersedia | Boolean | Hanya menerima nilai true atau false. |

Ketentuan tambahan:
- ID tidak boleh dikirim melalui body POST atau PUT.
- Judul yang hanya berisi spasi tidak diperbolehkan.
- Field tambahan di luar ketentuan akan ditolak.
- Nilai tersedia harus berupa boolean, bukan teks.

## 3. Kontrak Operasi API

API menyediakan lima operasi utama:

| Metode | Endpoint | Fungsi |
|---|---|---|
| GET | /api/buku | Menampilkan seluruh buku dan melakukan pencarian. |
| GET | /api/buku/:id | Menampilkan detail buku berdasarkan ID. |
| POST | /api/buku | Menambahkan buku baru. |
| PUT | /api/buku/:id | Mengganti data buku berdasarkan ID. |
| DELETE | /api/buku/:id | Menghapus buku berdasarkan ID. |

### 3.1 GET /api/buku

Digunakan untuk menampilkan seluruh daftar buku atau mencari buku berdasarkan judul menggunakan parameter `q`.

Hasil berhasil: HTTP 200 dengan data berupa array buku.

Jika pencarian tidak menemukan hasil, sistem tetap memberikan HTTP 200 dengan array kosong.

### 3.2 GET /api/buku/:id

Digunakan untuk mengambil detail buku berdasarkan ID.

Hasil berhasil: HTTP 200 dengan satu objek buku.

Jika ID tidak valid, sistem memberikan HTTP 400. Jika buku tidak ditemukan, sistem memberikan HTTP 404.

### 3.3 POST /api/buku

Digunakan untuk menambahkan data buku baru.

Input berupa `judul` dan `tersedia`.

Hasil berhasil: HTTP 201, objek buku baru, dan header Location.

### 3.4 PUT /api/buku/:id

Digunakan untuk mengganti seluruh data buku yang dapat ditulis berdasarkan ID.

Input wajib berisi `judul` dan `tersedia`.

Hasil berhasil: HTTP 200 dengan objek buku setelah diperbarui.

### 3.5 DELETE /api/buku/:id

Digunakan untuk menghapus buku berdasarkan ID.

Hasil berhasil: HTTP 204 tanpa body respons.

## 4. Ketentuan Validasi dan Penanganan Kesalahan

Beberapa ketentuan yang diterapkan dalam API:

1. ID harus berupa angka desimal positif tanpa nol di depan.
2. Parameter pencarian `q` maksimal 80 unit string.
3. Pencarian tidak membedakan huruf besar dan kecil.
4. POST dan PUT harus menggunakan Content-Type application/json.
5. Ukuran body maksimal 10 KB.
6. Field tambahan yang tidak dikenal akan ditolak.
7. Endpoint yang tidak tersedia menghasilkan HTTP 404 dengan kode ROUTE_NOT_FOUND.
8. Kesalahan internal menghasilkan HTTP 500 dengan kode INTERNAL_ERROR.

Beberapa kode kesalahan utama:

| Kode Error | Keterangan |
|---|---|
| INVALID_QUERY | Parameter pencarian tidak valid. |
| INVALID_ID | ID buku tidak valid. |
| BOOK_NOT_FOUND | Buku tidak ditemukan. |
| ROUTE_NOT_FOUND | Endpoint tidak ditemukan. |
| INTERNAL_ERROR | Terjadi kesalahan internal server. |

## 5. Bentuk Respons API

Respons berhasil:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Dasar Pemrograman Kotlin",
    "tersedia": true
  }
}
```

Respons gagal:

```json
{
  "success": false,
  "error": {
    "code": "BOOK_NOT_FOUND",
    "message": "Buku tidak ditemukan."
  }
}
```

Respons daftar buku menggunakan array pada bagian `data`, sedangkan respons satu buku menggunakan objek. Untuk operasi DELETE yang berhasil, server mengembalikan HTTP 204 tanpa body JSON.

## 6. Kesimpulan

Rancangan API ini digunakan sebagai pedoman dalam membangun Web Service Katalog Buku. Dengan adanya model data, kontrak endpoint, aturan validasi, dan format respons yang jelas, proses pengembangan dan pengujian API dapat dilakukan secara lebih terstruktur dan konsisten.