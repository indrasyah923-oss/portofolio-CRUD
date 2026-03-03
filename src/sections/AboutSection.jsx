import about from '../img/generated.png';

const AboutSection = ({ t, visibleSections, sectionRef }) => {
  return (
    <section id="about" ref={sectionRef} className={`md:scroll-mt-24 flex items-center px-4 md:px-6 py-2 md:py-0 mb-4 md:mb-0 transition-all duration-1000 ${visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="md:px-14 px-0 w-full mx-auto">
        
        {/* Container Utama: flex-col (mobile) | flex-row (desktop) */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-20 items-start lg:items-center">
          
          {/* BAGIAN FOTO & TEKS MOBILE */}
          <div className="w-full lg:w-[400px] flex-shrink-0 relative order-1">
            <div className="flex lg:block items-start gap-4 lg:gap-0">
              
              {/* Foto: Tetap w-40 di mobile, tetap 400px di desktop */}
              <div className="w-36 lg:w-full flex-shrink-0 relative">
                <div className="absolute -inset-1 lg:-inset-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden border-2 lg:border-4 border-gray-800">
                  <img src={about} alt="Profile" className="w-full aspect-[3/4] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-50"></div>
                </div>
              </div>
              
              {/* Teks Mobile: 3/4 lebar, hanya muncul di mobile samping foto */}
              <div className="w-3/4 lg:hidden space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.about.title}</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Sebagai full-stack developer, saya menikmati proses mengubah ide menjadi produk digital yang cepat, rapi, dan mudah digunakan. Dengan React, TypeScript, dan Tailwind CSS, saya menciptakan solusi yang tidak hanya berfungsi dengan baik, tetapi juga nyaman dan menyenangkan bagi pengguna.
                </p>
              </div>
            </div>
          </div>

          {/* BAGIAN TEKS DESKTOP & QUOTE: Mengambil sisa layar */}
          <div className="flex-grow space-y-4 md:space-y-8 order-2 w-full">
            
            {/* Judul & Deskripsi: Hanya muncul di Desktop */}
            <h2 className="hidden lg:block text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              {t.about.title}
            </h2>
            <p className="hidden lg:block text-xl text-gray-300 leading-relaxed max-w-4xl">
              {t.about.description}
            </p>
            
            {/* Quote: Muncul di mobile (bawah foto) dan desktop (bawah deskripsi) */}
            <div className="flex items-center gap-3 md:gap-6 text-gray-400 italic pt-2 md:pt-4">
              <div className="w-1 h-8 md:w-1.5 md:h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <p className="text-xs md:text-2xl font-light leading-snug">
                "{t.about.tagline}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
