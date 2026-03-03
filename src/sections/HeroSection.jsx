import { Github, ExternalLink } from 'lucide-react';
import hero from '../img/wmremove-transformed.png';

const HeroSection = ({ t, scrollToSection, sectionRef }) => {
  return (
    <section id="home" ref={sectionRef} className="md:min-h-screen flex items-center px-4 md:px-6 pt-20 md:pt-20 mb-4 md:mb-0">
      <div className="md:px-14 px-0 w-full mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
          {/* Mobile: 2 Kolom Vertikal (Teks 3/4 | Foto 1/4) | Desktop: Text only */}
          <div className="w-full lg:space-y-8 animate-slideInLeft">
            <div className="flex justify-between items-center lg:block items-start gap-2 lg:gap-0">
              {/* Teks (3/4 lebar pada mobile) */}
              <div className="w-3/5 lg:w-full space-y-3 md:space-y-6">
                <div>
                  <p className="text-base md:text-sm text-gray-400 mb-0 md:mb-4 tracking-widest uppercase">{t.hero.greeting}</p>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-1 md:mb-6 text-white leading-tight">{t.hero.name}</h1>
                  <p className="text-gray-400 text-base md:text-lg mb-1 md:mb-4">{t.hero.location}</p>
                  <h2 className="text-base md:text-2xl lg:text-3xl text-white font-semibold mb-3 md:mb-6">{t.hero.title}</h2>
                </div>
                <div className="flex gap-2 md:gap-4">
                  {[{ href: 'https://github.com/indrasyah923-oss', Icon: Github }, { href: 'https://www.instagram.com/isp_indra?igsh=c2lkZGtjN2h1M2Jz', Icon: 'instagram' }, { href: 'https://www.tiktok.com/@isp.ygy?_r=1&_t=ZS-92cdqIXXI29', Icon: 'tiktok' }].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gray-800/50 hover:bg-purple-600 rounded-lg transition-all duration-500 hover:scale-110">
                      {social.Icon === 'instagram' ? (
                        <svg width="18" height="18" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                        </svg>
                      ) : social.Icon === 'tiktok' ? (
                        <svg width="18" height="18" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                      ) : <social.Icon size={18} className="md:w-[18px] md:h-[18px]" />}
                    </a>
                  ))}
                </div>
                <p className="text-gray-300 text-xs   md:text-lg leading-relaxed hidden md:block">{t.hero.description}</p>
              </div>
              
              {/* Foto (1/4 lebar pada mobile) */}
              <div className="w-40 lg:hidden relative flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl"></div>
                <div className="relative group cursor-pointer">
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-800">
                    <img 
                      src={hero} 
                      alt="Profile" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description & Buttons */}
            <div className="space-y-3 mt-3 lg:mt-0">
              <p className="text-gray-300 text-xs md:text-lg leading-relaxed md:hidden">{t.hero.description}</p>
              <div className="flex flex-col gap-3 md:gap-4">
                <button onClick={() => scrollToSection('projects')} className="px-4 md:px-8 py-2.5 md:py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-950 rounded-lg font-semibold transition-all duration-500 flex items-center justify-center gap-2 text-sm md:text-base">
                  {t.hero.viewProjects}<ExternalLink size={14} className="md:w-4 md:h-4" />
                </button>
                <button onClick={() => scrollToSection('contact')} className="px-4 md:px-8 py-2.5 md:py-3 bg-white text-gray-950 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-500 text-sm md:text-base">
                  {t.hero.contactMe}
                </button>
              </div>
            </div>
          </div>
          
          {/* Desktop foto besar (hidden di mobile) */}
          <div className="hidden lg:flex relative justify-end animate-slideInUp">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative group cursor-pointer">
                <div className="relative w-96 h-[500px] rounded-2xl overflow-hidden border-4 border-gray-800">
                  <img 
                    src={hero} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Instagram link */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-950/90 backdrop-blur-md p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <a 
                      href="https://www.instagram.com/isp_indra?igsh=c2lkZGtjN2h1M2Jz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                      <span className="text-lg font-semibold">{t.hero.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
