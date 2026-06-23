<div align="center">
  <img src="./public/strawberry.svg" alt="Poison Pixel Logo" width="120" />
  <h1>🍓 Berry Poison Pixel</h1>
  <p><em>Personal Curated Collection & RPG-Themed Inventory</em></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

## 🎮 Tentang Proyek Ini

**Berry Poison Pixel** adalah *web application* bergaya *pixel-art* dan *vintage-cozy* yang dirancang sebagai etalase koleksi barang pribadi (*Personal Inventory / Wishlist Hub*). Dengan antarmuka yang terinspirasi dari permainan RPG retro (menggunakan avatar "NPC Shopkeeper"), web ini menawarkan pengalaman melihat-lihat koleksi yang unik dan menarik secara visual dengan balutan palet warna *Rosy Espresso*.

Selain berfungsi sebagai etalase (*Storefront*), Berry Poison Pixel juga dilengkapi dengan sistem **Manajemen (Dashboard) Internal** untuk mengelola inventaris produk dan kategori secara *real-time* langsung terhubung dengan *database* Supabase.

## ✨ Fitur Utama

- **🏪 Tema Mini-RPG:** Tampilan *grid* katalog koleksi dengan sentuhan elemen ala *game* RPG retro (dialog bergaya NPC dan status barang).
- **⚡ Pencarian & Filter Otomatis:** Fitur pencarian simpel dan saringan kategori untuk memudahkan menemukan barang dalam koleksi (menggunakan pemuatan bertahap/pagination dari Supabase).
- **🔒 Dashboard Pribadi:** Halaman admin sederhana dengan fitur *login* untuk menambah, mengubah, atau menghapus *item* koleksi kapan saja.
- **🤖 Integrasi Telegram Bot (Quick Capture):** Input produk dan kelola kategori langsung dari chat Telegram secara cepat dan praktis tanpa perlu membuka dashboard web:
  * **Input Cepat:** Cukup paste link Shopee dan kategori, bot akan otomatis memasukkan data.
  * **Pencarian & Hapus Interaktif:** Cari produk langsung lewat chat dan hapus dengan satu klik menggunakan tombol interaktif (*inline keyboard button*).
  * **Keamanan Ketat:** Pembatasan akses berbasis Telegram User ID pengirim untuk mencegah penyalahgunaan.
- **📱 Ramah Layar Mobile:** Tampilan yang menyesuaikan otomatis dan nyaman diakses lewat layar HP maupun laptop.
- **🔔 Notifikasi Imut:** Animasi pop-up konfirmasi yang senada dengan desain web agar interaksinya terasa hidup.

## 🤖 Fitur & Command Telegram Bot

Bot Telegram ini bertindak sebagai asisten *Quick Capture* pribadi kamu. Berikut daftar perintah (*commands*) yang tersedia:

| Perintah | Deskripsi | Format Penggunaan |
| --- | --- | --- |
| `/start` | Memulai bot dan menampilkan intro | `/start` |
| `/help` | Menampilkan panduan format lengkap untuk bantuan | `/help` |
| `/kategori` | Menambahkan kategori baru ke database | `/kategori [Nama Kategori] [Ikon]` |
| `/kategorilist` | Menampilkan daftar seluruh kategori yang ada beserta ikonnya | `/kategorilist` |
| `/hapuskategori` | Menghapus kategori beserta seluruh produk di dalamnya (*cascade*) | `/hapuskategori [slug]` |
| `/cari` | Mencari produk berdasarkan nama dengan tombol klik hapus instan | `/cari [kata kunci]` |
| `/clear` | Membersihkan antrean pesan tertunda jika bot terasa macet | `/clear` |

### Format Pengiriman Produk via Chat:
Untuk menambahkan produk secara instan, kirimkan pesan biasa dengan format:
```text
[Judul / Salinan Teks Shopee] [Link Shopee/Web]
kategori: [Nama Kategori]
review: [Ulasan singkat kamu]
video: [Link video, opsional]
statboost: [Vibes boost, opsional]
level: [Angka level boost, opsional]
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Fungsi dalam Aplikasi |
| --- | --- |
| **Next.js (App Router)** | *Framework* utama berbasis React untuk *routing* dan SSR. |
| **Tailwind CSS** | Pembuatan desain UI, palet warna *custom*, dan *micro-animations*. |
| **Supabase** | Bertindak sebagai PostgreSQL *Database* as a Service dan Sistem Autentikasi. |
| **TypeScript** | Memastikan struktur data seperti relasi produk-kategori aman dari kesalahan *runtime*. |
| **Telegram Bot API** | Penghubung input cepat berbasis chat dengan interaksi *inline buttons*. |

## 🚀 Instalasi & Menjalankan Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/zzeeyyaa/poison-pixel.git
   cd poison-pixel
   ```

2. **Instal dependensi (disarankan menggunakan npm):**
   ```bash
   npm install
   ```

3. **Atur Environment Variables:**
   Salin *template* `.env.example` ke file `.env.local` lalu isi konfigurasi API Supabase dan Telegram Bot Anda.
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_service_role_key # Wajib untuk bypass RLS via Telegram

   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_ALLOWED_USER_IDS=your_telegram_user_id # Batasi hanya ID kamu (contoh: 12345678)
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat etalase toko. Akses [http://localhost:3000/management](http://localhost:3000/management) untuk masuk ke panel administrasi. Untuk testing bot secara lokal, jalankan `ngrok http 3000` dan daftarkan URL HTTPS ngrok ke webhook Telegram.

## 🎨 Konsep Desain UI/UX

Di **Berry Poison Pixel**, kami sangat memperhatikan *psikologi antarmuka pengguna (UI/UX)*. 

Palet warna khusus yang dijuluki **Rosy Espresso** memadukan warna merah stroberi ceria (`#D9455B`), gradasi gelap kopi *plum* (`#4E3C44`), dan latar belakang *off-white/cream* pastel (`#FDF7F5`). Kombinasi ini bertujuan untuk menghadirkan kesan antarmuka yang hangat, *cozy*, namun tetap mencolok secara interaktif. Ditambah detail *border rounded*, efek bayangan *(drop-shadow)*, serta gaya tipografi modern, ini dirancang secara khusus agar siapapun yang melihat koleksi ini merasa betah berlama-lama.

---
<div align="center">
  <p>Dikembangkan oleh <strong>Zia</strong> • Dirancang sebagai Etalase Estetik</p>
</div>
