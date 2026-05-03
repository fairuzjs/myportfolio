# Neon Brutalist Portfolio

Sebuah website portofolio modern dengan gaya desain **Neubrutalism** (Neon Brutalist). Proyek ini dirancang untuk menampilkan karya, proyek, dan informasi profil dengan antarmuka yang tebal, kontras tinggi, dan interaktif. Proyek ini juga dilengkapi dengan halaman admin untuk mengelola konten portofolio secara dinamis.

## ✨ Fitur Utama

- **Desain Neubrutalism:** Menggunakan border tebal, warna cerah (neon), dan bayangan (*hard shadows*) yang khas.
- **Responsif:** Tampilan yang dioptimalkan untuk perangkat mobile maupun desktop.
- **Admin Dashboard:** Panel khusus untuk menambah, mengedit, dan menghapus proyek serta mengatur *tech stack*.
- **Animasi Dinamis:** Dilengkapi dengan transisi dan *micro-animations* yang halus untuk meningkatkan pengalaman pengguna.
- **Integrasi Database:** Menyimpan data proyek dan portofolio secara aman menggunakan Supabase.

## 🛠️ Tech Stack

Proyek ini dibangun menggunakan teknologi modern berikut:

### Frontend
- **[React 19](https://react.dev/)** - Library JavaScript utama untuk membangun antarmuka pengguna.
- **[TypeScript](https://www.typescriptlang.org/)** - Untuk pengetikan statis (static typing) yang lebih aman dan terstruktur.
- **[Vite](https://vitejs.dev/)** - *Build tool* dan *dev server* yang sangat cepat.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS *utility-first* untuk styling komponen.
- **[React Router DOM](https://reactrouter.com/)** - Untuk navigasi dan routing antar halaman.
- **[Motion](https://motion.dev/)** - Library untuk animasi UI yang *smooth* dan dinamis.
- **[Lucide React](https://lucide.dev/)** - Kumpulan ikon minimalis dan modern.

### Backend & Layanan
- **[Supabase](https://supabase.com/)** - Sebagai Backend-as-a-Service (BaaS) untuk database PostgreSQL, autentikasi, dan penyimpanan (*storage*).
- **[Google GenAI](https://ai.google.dev/)** - Integrasi kecerdasan buatan (opsional/ekstra fitur).

## 🚀 Cara Menjalankan Secara Lokal

**Prasyarat:** Pastikan Anda telah menginstal Node.js di komputer Anda.

1. **Clone repository ini** (jika belum):
   ```bash
   git clone https://github.com/fairuzjs/myportfolio.git
   cd myportfolio
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   - Duplikat file `.env.example` dan ubah namanya menjadi `.env` atau `.env.local`.
   - Isi kredensial yang diperlukan, seperti `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, dan `GEMINI_API_KEY` (jika ada).

4. **Jalankan *development server*:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan dan dapat diakses melalui browser di `http://localhost:3000` (atau port lain yang ditampilkan di terminal).

## 📄 Lisensi

Proyek ini bersifat *open-source* dan tersedia di bawah Lisensi MIT.
