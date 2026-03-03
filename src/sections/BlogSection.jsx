// src/components/BlogSection.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const BlogSection = ({ t, language, visibleSections, sectionRef }) => {
  const [homeBlogs, setHomeBlogs] = useState([]);

  useEffect(() => {
    fetch(`${API}/blogs/home`)
      .then(r => r.json())
      .then(data => {
        const apiHomeBlogs = Array.isArray(data)
          ? data.map(b => ({
              id: b.id,
              url: `/blog/${b.slug && b.slug !== '' ? b.slug : b.id}`,
              image: b.image,
              title: { id: b.title, en: b.title_en || b.title },
              description: { id: b.description, en: b.desc_en || b.description },
              category: { id: b.category, en: b.category_en || b.category },
              readTime: b.read_time,
            }))
          : [];
        setHomeBlogs(apiHomeBlogs.slice(0, 3));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setHomeBlogs([]);
      });
  }, []);

  return (
    // FIX SCROLL PUTIH: tambah bg-gray-950 di section agar tidak ada area kosong
    <section id="blog" ref={sectionRef} className="min-h-screen bg-gray-950 px-4 scroll-mt-12 md:scroll-mt-8 md:px-6 py-2 md:pt-14 mb-4 md:mb-0">
      <div className="md:px-14 px-0 w-full mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.blog.title}
          </h2>
          <p className="text-gray-400 text-base md:text-xl">{t.blog.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {homeBlogs.map((post, i) => (
            <Link
              key={post.id}
              to={post.url}
              className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 cursor-pointer ${visibleSections.blog ? 'animate-fadeIn' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s`, transition: 'all 0.5s ease-in-out' }}
            >
              {/* FIX FOTO: pakai aspect-ratio agar proporsional, object-cover tapi tidak terpotong paksa */}
              <div className="relative w-full overflow-hidden bg-gray-800" style={{ aspectRatio: '16/10' }}>
                <img
                  src={post.image}
                  alt={post.title[language]}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-purple-600/80 text-white backdrop-blur-sm">
                      {post.category[language]}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{post.title[language]}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-purple-400">
                    {post.category[language]}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                  {post.title[language]}
                </h3>

                <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
                  {post.description[language]}
                </p>

                <div className="flex items-center text-purple-400 text-sm font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>{t.blog.readMore}</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-xl font-semibold transition-all duration-300 text-sm md:text-base"
          >
            {language === 'id' ? 'Lihat Semua Artikel' : 'View All Articles'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;