// src/data/staticBlogs.js
// Sesuaikan title, description, image, category dengan isi Blog0/1/2.jsx kamu

export const staticBlogs = [
  {
    id: 'static-0',
    isStatic: true,
    url: '/blog/0',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200',
    title: {
      id: 'Apakah AI Akan Menggantikan Web Developer? Inilah Pendapatku',
      en: "Will AI Replace Web Developers? Here's My Take",
    },
    description: {
      id: 'Perkembangan AI semakin pesat. Apakah web developer masih relevan di era ini?',
      en: 'AI is growing rapidly. Are web developers still relevant in this era?',
    },
    category: { id: 'Teknologi', en: 'Technology' },
    read_time: '5 min',
    show_home: true,
  },
  {
    id: 'static-1',
    isStatic: true,
    url: '/blog/1',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200',
    title: {
      id: 'Judul Blog Statis 2',
      en: 'Static Blog Title 2',
    },
    description: {
      id: 'Deskripsi singkat blog statis kedua.',
      en: 'Short description of the second static blog.',
    },
    category: { id: 'Tutorial', en: 'Tutorial' },
    read_time: '4 min',
    show_home: true,
  },
  {
    id: 'static-2',
    isStatic: true,
    url: '/blog/2',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    title: {
      id: 'Judul Blog Statis 3',
      en: 'Static Blog Title 3',
    },
    description: {
      id: 'Deskripsi singkat blog statis ketiga.',
      en: 'Short description of the third static blog.',
    },
    category: { id: 'Tips', en: 'Tips' },
    read_time: '3 min',
    show_home: true,
  },
];