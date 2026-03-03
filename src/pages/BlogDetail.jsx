// src/pages/BlogDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const IMG_GRADIENTS = [
  'from-purple-600 to-pink-600',
  'from-green-600 to-emerald-600',
  'from-blue-600 to-indigo-600',
  'from-red-600 to-orange-600',
  'from-yellow-600 to-amber-600',
];

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('id');
  let imgCount = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API}/blogs/${slug}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Blog tidak ditemukan');
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const parseContent = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    try { return JSON.parse(raw); } catch { return []; }
  };

  const title      = lang === 'en' && blog?.title_en    ? blog.title_en    : blog?.title;
  const category   = lang === 'en' && blog?.category_en ? blog.category_en : blog?.category;
  const rawContent = lang === 'en' ? (blog?.content_en || blog?.content) : blog?.content;
  const blocks     = parseContent(rawContent);

  const renderBlock = (block, i) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={i} className="text-gray-300 text-sm md:text-lg leading-relaxed">
            {block.text}
          </p>
        );
      case 'heading':
        return (
          <h3 key={i} className="text-lg md:text-2xl font-semibold text-white mt-12">
            {block.text}
          </h3>
        );
      case 'subheading':
        return (
          <h4 key={i} className="text-base md:text-xl font-semibold text-gray-200 mt-8">
            {block.text}
          </h4>
        );
      case 'image': {
        const grad = IMG_GRADIENTS[imgCount % IMG_GRADIENTS.length];
        imgCount++;
        return (
          <div key={i} className="relative group my-8">
            <div className={`absolute -inset-1 bg-gradient-to-r ${grad} rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-700`}></div>
            <img
              src={block.url}
              alt={block.caption || ''}
              className="relative w-full h-[250px] md:h-[350px] object-cover rounded-xl border border-gray-800"
              onError={e => { e.target.parentElement.style.display = 'none'; }}
            />
            {block.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-transparent p-4">
                <p className="text-xs md:text-sm text-gray-300 font-medium">{block.caption}</p>
              </div>
            )}
          </div>
        );
      }
      case 'quote':
        return (
          <blockquote key={i} className="border-l-2 border-purple-500 pl-5 py-1 my-4">
            <p className="text-gray-300 italic text-sm md:text-lg leading-relaxed">{block.text}</p>
            {block.author && (
              <cite className="block mt-2 text-sm text-purple-400 not-italic">— {block.author}</cite>
            )}
          </blockquote>
        );
      case 'list':
        return (
          <ul key={i} className="space-y-2 my-2">
            {(block.items || []).map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-gray-300 text-sm md:text-lg leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
      case 'divider':
        return (
          <div key={i} className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-950 text-gray-100 selection:bg-purple-500/30 min-h-screen font-sans">
      <style>{`
        html, body, #root { background-color: #030712; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gray-950">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="relative z-20 border-b border-gray-800 bg-gray-900/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            BLOG
          </h1>
          <nav className="flex justify-center items-center gap-3 text-gray-400 font-medium">
            <HashLink to="/#blog" smooth
              className="hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Blog
            </HashLink>
            <span className="text-gray-700">/</span>
            <span className="text-pink-400/90">Artikel Detail</span>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">

        {loading && (
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded-xl w-3/4" />
            <div className="h-4 bg-gray-800 rounded-xl w-1/3" />
            <div className="h-80 bg-gray-800 rounded-2xl" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-800 rounded-xl" style={{ width: `${65 + Math.random() * 35}%` }} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-400 text-lg mb-2">Blog tidak ditemukan</p>
            <p className="text-gray-600 text-sm mb-8">
              Pastikan link yang Anda akses sudah benar, atau blog mungkin sudah dihapus.
            </p>
            <button onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm transition-colors">
              ← Kembali
            </button>
          </div>
        )}

        {!loading && blog && (
          <article>
            <header className="mb-12">
              {blog.title_en && (
                <div className="flex gap-1 mb-6 w-fit">
                  {['id', 'en'].map(l => (
                    <button key={l} onClick={() => setLang(l)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${lang === l ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                      {l === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
                    </button>
                  ))}
                </div>
              )}

              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-6">
                {title}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                {category && (
                  <span className="px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-purple-400">
                    {category}
                  </span>
                )}
                {blog.read_time && <span>🕐 {blog.read_time}</span>}
                {blog.created_at && (
                  <span>
                    {new Date(blog.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </header>

            
            {blog.image && (
              <div className="relative group mb-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <img
                  src={blog.image}
                  alt={title}
                  className="relative w-full h-[250px] md:h-[350px] object-cover rounded-2xl border border-gray-800"
                  onError={e => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
            )}

            <div className="space-y-4 md:space-y-8">
              {blocks.length > 0
                ? blocks.map((block, i) => renderBlock(block, i))
                : (
                  <div
                    className="text-gray-300 text-sm md:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: rawContent || '<p>Konten tidak tersedia.</p>' }}
                  />
                )
              }
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default BlogDetailPage;