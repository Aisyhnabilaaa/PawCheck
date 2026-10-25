# PawCheck API 🐾😺

> *Meow meow!* Nyaa~ selamat datang di rumah kucing backend **PawCheck**. Duduk dulu, ambil camilan ikan, lalu mari kita mengendus kodenya bareng-bareng. 🐟

Purr... ini REST API yang dibangun pakai [Hapi](https://hapi.dev/) dan [Sequelize](https://sequelize.org/) (MySQL). Di dalam kardus ini ada dua kucing server, meow:

- 😺 **Kucing Artikel** (`server.js`): CRUD artikel yang tidur nyenyak di database MySQL.
- 😼 **Kucing Penjaga Pintu** (`src/server.js`): registrasi dan login pengguna. Masih anak kucing, datanya disimpan sementara di memori (alias diingat-ingat doang, nyaa).

## 🧶 Mainan (Tech Stack)

- Node.js
- [@hapi/hapi](https://hapi.dev/) v21: web framework, tempat cakar-cakaran route
- [Sequelize](https://sequelize.org/) v6 + [mysql2](https://github.com/sidorares/node-mysql2): ORM dan driver MySQL, si kucing pembawa data
- [Joi](https://joi.dev/) v17: skema validasi input, mengendus payload yang mencurigakan
- ESLint: kucing rapi yang suka menjilati kode sampai bersih

## 📦 Isi Kardus (Struktur Project)

```
PawCheck/
├── server.js                    # Server API artikel (npm start)
├── migrate.js                   # Sinkronisasi model ke database (npm run dev)
├── src/
│   ├── config/
│   │   └── database.js          # Koneksi Sequelize ke MySQL
│   ├── models/
│   │   └── articlesModels.js    # Model Article (tabel `articles`)
│   ├── routes/
│   │   ├── articles.js          # Route CRUD artikel
│   │   └── authRoutes.js        # Route register & login
│   ├── handlers/
│   │   └── authHandler.js       # Logika register & login
│   ├── utils/
│   │   └── validators.js        # Skema Joi untuk register & login
│   └── server.js                # Server API autentikasi
└── package.json
```

## 🐾 Cara Membangunkan Kucing (Menjalankan)

**Sebelum mulai, siapkan mangkuk:** Node.js, npm, dan server MySQL. Meowkay?

1. *Adopsi* repo-nya dan kasih makan dependency:

   ```bash
   git clone https://github.com/Aisyhnabilaaa/PawCheck.git
   cd PawCheck
   npm install
   ```

2. Siapkan kardus kosong (database MySQL) buat kucingnya tidur:

   ```sql
   CREATE DATABASE pawcheck;
   ```

3. Kasih tahu kucingnya alamat rumah. Nyaa, saat ini belum pakai environment variable; konfigurasinya ada langsung di `src/config/database.js`. Sesuaikan nilainya dengan MySQL di komputermu:

   ```js
   const sequelizeConnect = new Sequelize('<NAMA_DATABASE>', '<DB_USER>', '<DB_PASSWORD>', {
     host: '<DB_HOST>',
     port: <DB_PORT>,
     dialect: 'mysql',
   });
   ```

   | Placeholder       | Keterangan                    | Nilai bawaan di kode |
   | ----------------- | ----------------------------- | -------------------- |
   | `<NAMA_DATABASE>` | Nama database                 | `pawcheck`           |
   | `<DB_USER>`       | User MySQL                    | `root`               |
   | `<DB_PASSWORD>`   | Password user MySQL           | (isi milikmu)        |
   | `<DB_HOST>`       | Host MySQL                    | `localhost`          |
   | `<DB_PORT>`       | Port MySQL                    | `3309`               |

   🙀 Psst, password itu rahasia, kayak tempat persembunyian camilan. Jangan di-commit ya, meow!

4. Rapikan tempat tidur (buat/sinkronkan tabel `articles` dari model):

   ```bash
   npm run dev
   ```

   Script ini menjalankan `migrate.js` (`sequelize.sync({ alter: true })`). Kalau berhasil, terminal akan mendengkur `bisa sinkron`. Purrrr~

5. Bangunkan kucingnya:

   ```bash
   # API artikel
   npm start

   # atau API autentikasi
   node src/server.js
   ```

   Kucing menunggu di `http://localhost:3000`. ⚠️ Dua kucing ini rebutan bantal yang sama (port 3000), jadi bangunkan salah satu saja dalam satu waktu, kalau nggak nanti mereka berantem. 😾

## 🐟 Daftar Menu (Endpoint)

### 😺 API Artikel (`npm start`)

| Method   | Path             | Keterangan                        |
| -------- | ---------------- | --------------------------------- |
| `GET`    | `/articles`      | Ambil semua artikel               |
| `GET`    | `/articles/{id}` | Ambil satu artikel berdasarkan ID |
| `POST`   | `/articles`      | Tambah artikel baru               |
| `PUT`    | `/articles/{id}` | Perbarui artikel                  |
| `DELETE` | `/articles/{id}` | Hapus artikel                     |

Contoh camilan (body) untuk `POST` / `PUT`:

```json
{
  "name": "Judul artikel",
  "image": "https://contoh.com/gambar.jpg",
  "summary": "Ringkasan singkat artikel",
  "description": "Isi lengkap artikel",
  "publishDate": "2024-11-22"
}
```

Field `name`, `description`, dan `publishDate` wajib diisi (kucingnya pilih-pilih makanan); `image` dan `summary` boleh kosong.

Contoh dengkuran puas (respons sukses):

```json
{
  "status": "success",
  "data": [ { "id": 1, "name": "Judul artikel", "...": "..." } ]
}
```

Kalau ID-nya nggak ketemu (ngumpet di bawah sofa), API membalas `404` dengan `{ "status": "fail", "message": "Artikel tidak ditemukan!" }`. 🙀

### 😼 API Autentikasi (`node src/server.js`)

| Method | Path        | Body                                                              | Respons                                                          |
| ------ | ----------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| `POST` | `/register` | `username`, `email`, `password`, `confirmPassword`, `namaLengkap` | `201` Registrasi berhasil, atau `400` jika password tidak cocok |
| `POST` | `/login`    | `username` atau `email`, dan `password`                           | `200` "Selamat datang, {namaLengkap}!", atau `401` jika gagal    |

Kucing penjaga pintu ini ramah ke semua tamu: CORS sudah aktif (`origin: *`). Nyaa~

## 🧪 Status Anak Kucing (Pengembangan)

Proyek ini masih anak kucing yang lagi belajar lompat:

- 🧠 Data pengguna di API autentikasi masih disimpan di array dalam memori, jadi akan lupa semuanya setiap kali server di-restart (ingatan kucing, meow).
- 🧶 Skema validasi Joi (`registerValidator`, `loginValidator`) sudah tersedia di `src/utils/validators.js`, tapi belum dipasang ke route. Mainannya sudah dibeli, belum dibuka dari plastik.
- 🏠 API artikel dan API autentikasi masih tinggal di dua kardus (server) terpisah.

Masih banyak ruang untuk tumbuh, sama seperti anak kucing. 🐱 *purr purr*

---

<details>
<summary>🐾 Terjemahan manusia</summary>

### PawCheck API

Backend REST API untuk proyek **PawCheck**, dibangun dengan Hapi dan Sequelize (MySQL). Repo ini berisi dua bagian:

- **API Artikel** (`server.js`): CRUD artikel yang disimpan di database MySQL.
- **API Autentikasi** (`src/server.js`): registrasi dan login pengguna (masih tahap awal, data disimpan sementara di memori).

**Tech stack:** Node.js, @hapi/hapi v21, Sequelize v6 + mysql2, Joi v17, ESLint.

**Cara menjalankan** (prasyarat: Node.js, npm, server MySQL):

1. Clone repo lalu `npm install`.
2. Buat database kosong: `CREATE DATABASE pawcheck;`
3. Atur koneksi database langsung di `src/config/database.js` (belum memakai environment variable). Nilai bawaan di kode: database `pawcheck`, user `root`, host `localhost`, port `3309`; isi password dengan milikmu sendiri dan jangan di-commit.
4. Jalankan `npm run dev` untuk menjalankan `migrate.js` (`sequelize.sync({ alter: true })`) yang membuat/menyinkronkan tabel `articles`. Jika berhasil muncul `bisa sinkron`.
5. Jalankan `npm start` (API artikel) atau `node src/server.js` (API autentikasi). Keduanya berjalan di `http://localhost:3000`, jadi jalankan salah satu saja dalam satu waktu.

**Endpoint API artikel:** `GET /articles`, `GET /articles/{id}`, `POST /articles`, `PUT /articles/{id}`, `DELETE /articles/{id}`. Body `POST`/`PUT` berisi `name`, `image`, `summary`, `description`, `publishDate`; yang wajib adalah `name`, `description`, dan `publishDate`. Respons sukses berbentuk `{ "status": "success", "data": ... }`; ID yang tidak ada menghasilkan `404` dengan pesan `Artikel tidak ditemukan!`.

**Endpoint API autentikasi:** `POST /register` (body `username`, `email`, `password`, `confirmPassword`, `namaLengkap`; respons `201`, atau `400` jika password tidak cocok) dan `POST /login` (body `username` atau `email`, dan `password`; respons `200` "Selamat datang, {namaLengkap}!", atau `401` jika gagal). CORS aktif dengan `origin: *`.

**Status pengembangan:**

- Data pengguna masih disimpan di array dalam memori dan hilang setiap server di-restart.
- Skema Joi `registerValidator` dan `loginValidator` di `src/utils/validators.js` belum dipasang ke route.
- API artikel dan API autentikasi masih berjalan sebagai dua server terpisah.

</details>
