# Portfolio – Indra Syah Putra

## 🚀 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dev server
npm run dev

# 3. Buka browser → http://localhost:5173
```

## 📁 Struktur Project

```
src/
├── main.jsx                    ← Entry point React
├── App.jsx                     ← Router (Home + Blog routes)
├── index.css                   ← Tailwind CSS global
│
├── Home.jsx                    ← Halaman utama (state + orchestrator)
│
├── data/
│   ├── content.js              ← Semua data: teks ID/EN, projects, blog, skills
│   └── skillIcons.jsx          ← Icon SVG skills sebagai JSX
│
├── components/
│   └── Navbar.jsx              ← Navbar desktop + mobile top + mobile bottom
│
├── sections/                   ← 1 file = 1 section
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── SkillsSection.jsx
│   ├── ProjectsSection.jsx
│   ├── BlogSection.jsx
│   └── ContactSection.jsx
│
└── pages/
    └── blog/
        └── BlogPost.jsx        ← Halaman detail blog
```

## 🖼️ Mengganti Foto

Foto profil saat ini menggunakan placeholder dari Unsplash.
Untuk menggantinya dengan foto asli:

1. Taruh foto di folder `src/img/`
2. Edit baris import di masing-masing file:
   - `HeroSection.jsx` → `import hero from '../img/wmremove-transformed.png'`
   - `AboutSection.jsx` → `import about from '../img/generated.png'`
   - `ContactSection.jsx` → `import profile from '../img/generated1.png'`

## ✏️ Mengubah Konten

Semua teks, data project, dan blog ada di **`src/data/content.js`**.
Cukup edit file itu tanpa perlu menyentuh komponen UI.
