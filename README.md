<div align="center">
  <img src="./public/strawberry.svg" alt="Poison Pixel Logo" width="120" />
  <h1>🍓 Poison Pixel Hub</h1>
  <p><em>Curated Cozy Shopee Deals & RPG-Themed Affiliate Storefront</em></p>

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

## 🎮 Tentang Proyek Ini

**Poison Pixel** adalah *web application* bergaya *pixel-art* dan *vintage-cozy* yang dirancang sebagai etalase toko afiliasi (Shopee Affiliate). Dengan antarmuka yang terinspirasi dari permainan RPG retro (menggunakan avatar "NPC Shopkeeper"), web ini menawarkan pengalaman berbelanja dan rekomendasi barang yang unik dan menarik secara visual dengan balutan palet warna *Rosy Espresso*.

Selain berfungsi sebagai etalase (*Storefront*), Poison Pixel juga dilengkapi dengan sistem **Manajemen (Dashboard) Internal** untuk mengelola inventaris produk dan kategori secara *real-time* langsung terhubung dengan *database* Supabase.

## ✨ Fitur Utama

- **🏪 RPG-Themed Storefront:** Tampilan *grid* katalog produk yang estetik lengkap dengan teks dialog khas NPC dan indikator *stat boost* (Status) layaknya di dalam *game* RPG.
- **⚡ Server-Side Pagination & Filtering:** Pemrosesan beban berat (Pencarian Produk, Filter Kategori, *Load More*) dilakukan sepenuhnya di sisi *backend* (Supabase). Memastikan kecepatan memuat *(loading)* tetap *ngebut* bahkan untuk ribuan barang.
- **🔒 Secure Management Dashboard:** Panel admin terproteksi fitur *Authentication* untuk manajemen CRUD (*Create, Read, Update, Delete*) Produk dan Kategori dengan mulus.
- **📱 Fully Responsive:** Tata letak yang disesuaikan secara dinamis agar terlihat sempurna, rapi, dan padat di layar *desktop*, *tablet*, maupun *mobile*.
- **🔔 Interactive Notifications:** Peringatan dan sistem notifikasi tindakan *(Toast & Dialogs)* menggunakan komponen UI *custom* yang selaras dengan tema visual yang ceria.

## 🛠️ Teknologi yang Digunakan

| Teknologi | Fungsi dalam Aplikasi |
| --- | --- |
| **Next.js (App Router)** | *Framework* utama berbasis React untuk *routing* dan SSR. |
| **Tailwind CSS** | Pembuatan desain UI, palet warna *custom*, dan *micro-animations*. |
| **Supabase** | Bertindak sebagai PostgreSQL *Database* as a Service dan Sistem Autentikasi. |
| **TypeScript** | Memastikan struktur data seperti relasi produk-kategori aman dari kesalahan *runtime*. |

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
   Salin *template* `.env.example` ke file `.env.local` lalu isi konfigurasi API Supabase Anda.
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat etalase toko. Akses [http://localhost:3000/management](http://localhost:3000/management) untuk masuk ke panel administrasi.

## 🎨 Konsep Desain UI/UX

Di **Poison Pixel**, kami sangat memperhatikan *psikologi antarmuka pengguna (UI/UX)*. 

Palet warna khusus yang dijuluki **Rosy Espresso** memadukan warna merah stroberi ceria (`#D9455B`), gradasi gelap kopi *plum* (`#4E3C44`), dan latar belakang *off-white/cream* pastel (`#FDF7F5`). Kombinasi ini bertujuan untuk menghadirkan kesan antarmuka yang hangat, *cozy*, namun tetap mencolok secara interaktif. Ditambah detail *border rounded*, efek bayangan *(drop-shadow)*, serta gaya tipografi modern, ini dirancang secara khusus untuk memandu mata pengguna ke arah konversi (*click-through rate* afiliasi).

---
<div align="center">
  <p>Dikembangkan oleh <strong>Zia</strong> • Dirancang untuk Konversi Estetik</p>
</div>
