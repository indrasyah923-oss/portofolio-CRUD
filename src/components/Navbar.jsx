// src/components/Navbar.jsx
import { Globe, Home as HomeIcon, Award, Briefcase, Phone, BookOpen, Settings, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ language, setLanguage, activeNav, scrollToSection, t }) => {
  const { user, isAdmin } = useAuth();

  return (
    <>
      {/* Mobile Top Nav */}
      <nav className="md:hidden fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-none" style={{ paddingTop: '2px', paddingBottom: '2px' }}>Portfolio</div>
          <div className="flex items-center gap-2">
            {isAdmin() && (
              <Link to="/setting" className="flex items-center justify-center w-9 h-9 bg-gray-800/90 hover:bg-purple-600 rounded-lg transition-colors duration-300">
                <Settings size={16} />
              </Link>
            )}
            {!user && (
              <Link to="/login" className="flex items-center justify-center w-9 h-9 bg-gray-800/90 hover:bg-purple-600 rounded-lg transition-colors duration-300">
                <LogIn size={16} />
              </Link>
            )}
            <button
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/90 hover:bg-gray-700 rounded-lg transition-colors duration-500"
            >
              <Globe size={16} />
              <span className="uppercase font-semibold text-sm">{language}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Nav */}
      <nav className="hidden md:block fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="mx-auto px-20 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ lineHeight: '2' }}>Portfolio</div>
          <div className="flex items-center gap-8">
            {['home', 'about', 'skills', 'projects', 'blog', 'contact'].map(section => (
              <button key={section} onClick={() => scrollToSection(section)} className="hover:text-purple-400 transition-colors duration-500 capitalize py-2" style={{ lineHeight: '2' }}>
                {t.nav[section]}
              </button>
            ))}
            {isAdmin() && (
              <Link to="/setting" className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-purple-600 rounded-lg transition-colors duration-300">
                <Settings size={16} />
                <span className="font-semibold text-sm">Setting</span>
              </Link>
            )}
            {!user && (
              <Link to="/login" className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-purple-600 rounded-lg transition-colors duration-300">
                <LogIn size={16} />
                <span className="font-semibold text-sm">Masuk</span>
              </Link>
            )}
            <button onClick={() => setLanguage(language === 'id' ? 'en' : 'id')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-500">
              <Globe size={18} />
              <span className="uppercase font-semibold">{language}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav - Tombol Setting Dihapus */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-50">
        <div className="flex justify-around items-center px-4 py-3">
          {[
            { id: 'home',     icon: HomeIcon,  label: 'Home' },
            { id: 'skills',   icon: Award,     label: 'Skills' },
            { id: 'projects', icon: Briefcase, label: 'Portfolio' },
            { id: 'blog',     icon: BookOpen,  label: 'Blog' },
            { id: 'contact',  icon: Phone,     label: 'Contact' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors duration-300 ${activeNav === item.id ? 'text-purple-400' : 'text-gray-400'}`}
            >
              <item.icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;