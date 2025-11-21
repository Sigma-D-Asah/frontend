# Accenture — Predictive Maintenance Copilot (Frontend)

Repositori ini berisi frontend untuk Predictive Maintenance Copilot, sebuah dashboard dan UI agen untuk mendeteksi anomali mesin, memprioritaskan peringatan, dan membimbing tindakan pemeliharaan.

Fitur utama dalam repositori ini:
- UI dashboard yang mereplikasi tampilan investigasi Accenture
- Navigasi sidebar dengan status dapat dilipat dan branding Accenture
- Halaman placeholder untuk Klaim, Pemeliharaan, dan Pelaporan (siap terhubung ke klien API)

Jalankan secara lokal:

```bash
npm install
npm run dev
```

Setelah klien API backend tersedia, frontend akan terhubung melalui Axios untuk mengambil data nyata.

Struktur proyek:
- `src/` — kode aplikasi, komponen, layout, dan halaman
- `src/assets` — logo dan aset statis
- `src/services` — placeholder data mock (gantikan dengan klien API)
