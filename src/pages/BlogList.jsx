// src/pages/BlogList.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';
import { content } from '../data/content';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const BlogList = () => {
  const [language, setLanguage] = useState('id');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const t = content[language];

  useEffect(() => {
    fetch(`${API}/blogs`)
      .then(r => r.json())
      .then(data => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const BlogCard = ({ post, i }) => {
    const title       = language === 'en' && post.title_en    ? post.title_en    : post.title;
    const description = language === 'en' && post.desc_en     ? post.desc_en     : post.description;
    const category    = language === 'en' && post.category_en ? post.category_en : post.category;
    const url         = `/blog/${post.slug || post.id}`;

    return (
      <div
        className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-500"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        <div className="relative h-32 sm:h-40 md:h-64 overflow-hidden">
          <img
            src={post.image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-110"
            onError={e => { e.target.src = 'https://placehold.co/600x400/1f2937/9ca3af?text=No+Image'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 md:p-6">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-purple-600/80 text-white backdrop-blur-sm">
                {category}
              </span>
              <h3 className="hidden md:block text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
            </div>
          </div>
        </div>

        <div className="p-3 md:p-6">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold bg-gray-800 text-purple-400">
              {category}
            </span>
            <span className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {post.read_time}
            </span>
          </div>

          <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-3 leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>

          <p className="hidden md:block text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
            {description}
          </p>

          <Link
            to={url}
            className="flex items-center text-purple-400 text-[11px] md:text-sm font-semibold gap-1 md:gap-2 hover:gap-3 transition-all duration-300"
          >
            <span>{t.blog.readMore}</span>
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-gray-950 -z-10" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 pt-16 pb-16 px-4 md:px-20">
        <div className="flex items-center justify-between mb-12 md:mb-16 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
          >
            <ArrowLeft size={18} />
            <span className="text-sm md:text-base">{language === 'id' ? 'Kembali' : 'Back'}</span>
          </button>

          <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
            {t.blog.title}
          </h1>

          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
          >
            <Globe size={16} />
            <span className="uppercase font-semibold text-sm">{language}</span>
          </button>
        </div>

        <p className="text-center text-gray-400 text-base md:text-xl -mt-8 mb-12 md:mb-16">
          {t.blog.subtitle}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800">
                <div className="h-32 sm:h-40 md:h-64 bg-gray-800" />
                <div className="p-3 md:p-6 space-y-3">
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="hidden md:block h-3 bg-gray-800 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">Belum ada artikel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {blogs.map((post, i) => (
              <BlogCard key={post.id} post={post} i={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        html, body { background-color: #030712; overscroll-behavior: none; }
      `}</style>
    </div>
  );
};

export default BlogList;