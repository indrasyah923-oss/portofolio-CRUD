export const content = {
    id: {
      nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', projects: 'Proyek', blog: 'Blog', contact: 'Kontak' },
      hero: {
        greeting: 'HALO, SAYA',
        name: 'Indra Syah Putra',
        location: 'Mojokerto',
        title: 'UI/UX Designer & Web Developer',
        description: 'Saya membantu bisnis dan individu mengubah ide menjadi solusi digital yang indah dan berfungsi.',
        availability: 'Tersedia untuk project',
        viewProjects: 'Lihat Proyek',
        contactMe: 'Kontak Saya',
        instagram: '@isp_indra'
      },
      about: {
        title: 'Tentang Saya',
        description: "Saya adalah Indra Syah Putra, seorang full-stack developer yang passionate dalam membangun aplikasi modern dan berkinerja tinggi dengan pengalaman pengguna yang intuitif. Saya senang bekerja dengan teknologi terbaru seperti React, TypeScript, dan Tailwind CSS, memadukan kreativitas dengan presisi untuk memberikan solusi yang berdampak. Saya berkomitmen untuk membantu pengguna dan bisnis tumbuh di era digital melalui produk digital yang fungsional, estetis, dan skalabel.",
        hpdescription: "Sebagai full-stack developer, saya menikmati proses mengubah ide menjadi produk digital yang cepat, rapi, dan mudah digunakan. Dengan React, TypeScript, dan Tailwind CSS, saya menciptakan solusi yang tidak hanya berfungsi dengan baik, tetapi juga nyaman dan menyenangkan bagi pengguna.",
        tagline: 'Working with heart, creating with mind.'
      },
      skills: {
        title: 'Keahlian & Teknologi',
        subtitle: 'Tools dan teknologi yang saya gunakan untuk membuat solusi digital'
      },
      projects: {
        title: 'Proyek Saya',
        status: { ongoing: 'Sedang Berjalan', finished: 'Selesai' }
      },
      blog: {
      title: 'Blog & Artikel',
      subtitle: 'Berbagi pengetahuan dan pengalaman seputar development',
      readMore: 'BACA SELENGKAPNYA'
    },
      contact: {
        title: 'Mari Bekerja Sama',
        subtitle: 'Punya proyek atau ide? Saya siap membantu mewujudkannya!',
        email: 'Email',
        phone: 'Telepon',
        address: 'Alamat',
        availability: 'Tersedia untuk project freelance',
        message: {
          title: 'Kirim Pesan',
          subtitle: 'Hubungi saya untuk diskusi project atau kolaborasi',
          usernamePlaceholder: 'Username Anda',
          emailPlaceholder: 'Email Anda',
          messagePlaceholder: 'Pesan Anda...',
          submit: 'Kirim Pesan',
          success: 'Pesan berhasil terkirim!'
        }
      }
    },
    en: {
      nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', blog: 'Blog', contact: 'Contact' },
      hero: {
        greeting: 'HELLO, I AM',
        name: 'Indra Syah Putra',
        location: 'Mojokerto',
        title: 'UI/UX Designer & Web Developer',
        description: 'I help businesses and individuals transform ideas into beautiful and functional digital solutions.',
        availability: 'Available for projects',
        viewProjects: 'View Projects',
        contactMe: 'Contact Me',
        instagram: '@isp_indra'
      },
      about: {
        title: 'About Me',
        description: "I'm Indra Syah Putra, a full-stack developer passionate about building modern, high-performance applications with an intuitive user experience. I enjoy working with the latest technologies like React, TypeScript, and Tailwind CSS, blending creativity with precision to deliver impactful solutions. I'm committed to helping users and businesses grow in the digital era through functional, aesthetic, and scalable digital products.",
        tagline: 'Working with heart, creating with mind.'
      },
      skills: {
        title: 'Skills & Technologies',
        subtitle: 'Tools and technologies I use to create digital solutions'
      },
      projects: {
        title: 'My Projects',
        status: { ongoing: 'Ongoing', finished: 'Finished' }
      },
      blog: {
      title: 'Blog & Articles',
      subtitle: 'Sharing knowledge and experience about development',
      readMore: 'READ MORE'
    },
      contact: {
        title: 'Let\'s Work Together',
        subtitle: 'Have a project or idea? I\'m ready to help bring it to life!',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        availability: 'Available for freelance projects',
        message: {
          title: 'Send Message',
          subtitle: 'Contact me to discuss projects or collaborations',
          usernamePlaceholder: 'Your Username',
          emailPlaceholder: 'Your Email',
          messagePlaceholder: 'Your Message...',
          submit: 'Send Message',
          success: 'Message sent successfully!'
        }
      }
    }
  };

export const projects = [
    { id: 1, name: { id: 'Website Portfolio Personal', en: 'Personal Portfolio Website' }, description: { id: 'Portfolio interaktif dengan animasi smooth', en: 'Interactive portfolio with smooth animations' }, image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop', status: 'finished', tech: ['HTML', 'CSS', 'JavaScript'] },
    { id: 2, name: { id: 'Landing Page Restoran', en: 'Restaurant Landing Page' }, description: { id: 'Landing page modern untuk restoran', en: 'Modern landing page for restaurant' }, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', status: 'finished', tech: ['HTML', 'CSS', 'JavaScript'] },
    { id: 3, name: { id: 'Dashboard Analytics', en: 'Analytics Dashboard' }, description: { id: 'Dashboard untuk visualisasi data bisnis', en: 'Dashboard for business data visualization' }, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', status: 'ongoing', tech: ['React', 'Tailwind', 'SQL'] },
    { id: 4, name: { id: 'Website Company Profile', en: 'Company Profile Website' }, description: { id: 'Website profil perusahaan teknologi', en: 'Tech company profile website' }, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', status: 'finished', tech: ['HTML', 'CSS', 'JavaScript'] },
    { id: 5, name: { id: 'E-Commerce Platform', en: 'E-Commerce Platform' }, description: { id: 'Platform belanja online dengan cart', en: 'Online shopping platform with cart' }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', status: 'ongoing', tech: ['React', 'TypeScript', 'Tailwind'] },
    { id: 6, name: { id: 'Aplikasi Todo List', en: 'Todo List Application' }, description: { id: 'Manajemen tugas dengan fitur lengkap', en: 'Task management with full features' }, image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop', status: 'finished', tech: ['React', 'CSS', 'Git'] }
  ];

export const blogPosts = [
  {
    id: 0,
    title: { 
      id: 'Apakah AI Menggantikan Web Developer?', 
      en: 'Is AI Replacing Web Developers?' 
    },
    description: { 
      id: '"Peran web developer di tengah pesatnya AI."', 
      en: '"The role of web developers amid the rapid growth of AI."' 
    },
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200',
    url: './blog0',
    category: { id: 'Teknologi', en: 'Technology' },
    readTime: '3 min'
  },
  {
    id: 1,
    title: { 
      id: 'Kelebihan dan Kekurangan AI dalam Koding', 
      en: 'Advantages and Disadvantages of AI in Coding' 
    },
    description: { 
      id: 'Pembahasan singkat tentang peran AI dalam koding, mulai dari kelebihannya sebagai alat bantu hingga kekurangannya.', 
      en: 'A brief discussion on the role of AI in coding, from its advantages as a tool to its disadvantages.' 
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    url: './blog1',
    category: { id: 'Teknologi', en: 'Technology' },
    readTime: '3 min'
  },
  {
    id: 2,
    title: { 
      id: 'Perlu Takut Salah Saat Belajar Coding?', 
      en: 'Should We Fear Making Mistakes When Learning to Code?' 
    },
    description: { 
      id: 'Ringkasan tentang bagaimana menghadapi kesalahan saat belajar coding dengan sikap positif.', 
      en: 'A summary on how to face mistakes when learning to code with a positive attitude.' 
    },
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1200',
    url: './blog2',
    category: { id: 'Belajar coding', en: 'Learning to Code' },
    readTime: '2 min'
  }
];

export const skills = [
    { 
      name: 'HTML', 
      icon: '',
      color: 'from-orange-500 to-red-600' 
    },
    { 
      name: 'CSS', 
      icon: '',
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      name: 'JavaScript', 
      icon: '',
      color: 'from-yellow-400 to-yellow-500' 
    },
    { 
      name: 'Tailwind', 
      icon: '',
      color: 'from-cyan-400 to-cyan-500' 
    },
    { 
      name: 'SQL', 
      icon: '',
      color: 'from-blue-600 to-blue-700' 
    },
    { 
      name: 'React', 
      icon: '',
      color: 'from-cyan-500 to-cyan-600' 
    },
    { 
      name: 'TypeScript', 
      icon:'',
      color: 'from-blue-600 to-blue-700' 
    },
    { 
      name: 'Figma', 
      icon: '',
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      name: 'Git', 
      icon: '',
      color: 'from-orange-600 to-orange-700' 
    },
    { 
      name: 'VS Code', 
      icon: '',
      color: 'from-blue-500 to-blue-600' 
    }
  ];
