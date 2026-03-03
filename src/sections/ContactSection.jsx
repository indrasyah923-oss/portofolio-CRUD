import { useState } from 'react';
import { Github, Mail, Send, User, MessageSquare, CheckCircle } from 'lucide-react';
import profile from '../img/generated1.png';

const ContactSection = ({ t, language, sectionRef }) => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('messages', JSON.stringify(messages));
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ username: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className=" flex scroll-mt-12 md:scroll-mt-20 items-center px-4 md:px-6 py-2 md:py-0 mb-4">
      <div className="md:px-14 px-0 w-full mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.contact.title}</h2>
          <p className="text-gray-400 text-base md:text-xl">{t.contact.subtitle}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 group-hover:border-purple-500 transition-all duration-700">
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                  <img src={profile} alt="Profile" className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-gray-700 group-hover:border-purple-500 transition-all duration-700 object-cover object-top" />
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-1">{t.hero.name}</h3>
                    <p className="text-gray-400 text-sm md:text-base">{t.hero.title}</p>
                    <div className="flex items-center gap-2 mt-1 md:mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs md:text-sm text-green-400">{t.contact.availability}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {[{ icon: Mail, label: t.contact.email, value: 'indrasyah923@gmail.com', href: 'mailto:indrasyah923@gmail.com', color: 'purple' }, { icon: 'phone', label: t.contact.phone, value: '+62 85732489554', href: 'tel:+6285732489554', color: 'green' }, { icon: 'location', label: t.contact.address, value: 'Mojokerto, Jawa Timur, Indonesia', color: 'blue' }].map((item, i) => (
                    <a key={i} href={item.href || '#'} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all duration-700 group/item">
                      <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-${item.color}-600/20 rounded-lg group-hover/item:bg-${item.color}-600 transition-all duration-700`}>
                        {item.icon === 'phone' ? (
                          <svg className={`w-5 h-5 md:w-6 md:h-6 text-${item.color}-400 group-hover/item:text-white transition-colors duration-700`} fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        ) : item.icon === 'location' ? (
                          <svg className={`w-5 h-5 md:w-6 md:h-6 text-${item.color}-400 transition-colors duration-700`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        ) : <item.icon size={20} className={`md:w-6 md:h-6 text-${item.color}-400 group-hover/item:text-white transition-colors duration-700`} />}
                      </div>
                      <div>
                        <div className="text-xs md:text-sm text-gray-400">{item.label}</div>
                        <div className="text-white font-medium text-sm md:text-base">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-800">
              <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">{language === 'id' ? 'Temukan Saya Di' : 'Find Me On'}</h4>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[{ href: 'https://github.com/indrasyah923-oss', icon: Github, name: 'GitHub', hoverColor: 'gray' }, { href: 'https://www.tiktok.com/@isp.ygy?_r=1&_t=ZS-92cdqIXXI29', icon: 'tiktok', name: 'TikTok', hoverColor: 'pink' }, { href: 'https://www.instagram.com/isp_indra?igsh=c2lkZGtjN2h1M2Jz', icon: 'instagram', name: 'Instagram', hoverColor: 'pink' }].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center gap-2 p-3 md:p-4 bg-gray-800/50 hover:bg-${social.hoverColor}-600 rounded-xl transition-all duration-700 group transform hover:scale-105`}>
                    {social.icon === 'instagram' ? (
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-400 group-hover:text-white transition-colors duration-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                    ) : social.icon === 'tiktok' ? (
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-400 group-hover:text-white transition-colors duration-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    ) : <social.icon size={24} className="md:w-7 md:h-7 text-gray-400 group-hover:text-white transition-colors duration-700" />}
                    <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-white transition-colors duration-700">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Message Form */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 border border-purple-500">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{t.contact.message.title}</h3>
                <p className="text-purple-100 mb-4 md:mb-6 text-sm md:text-base">{t.contact.message.subtitle}</p>
                {formSubmitted ? (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <CheckCircle size={40} className="md:w-12 md:h-12 mx-auto mb-4 text-white" />
                    <p className="text-white text-base md:text-lg font-semibold">{t.contact.message.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                        <User size={18} className="md:w-5 md:h-5 text-white" />
                        <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder={t.contact.message.usernamePlaceholder} className="flex-1 bg-transparent text-white placeholder-purple-200 outline-none text-sm md:text-base" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                        <Mail size={18} className="md:w-5 md:h-5 text-white" />
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder={t.contact.message.emailPlaceholder} className="flex-1 bg-transparent text-white placeholder-purple-200 outline-none text-sm md:text-base" />
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                        <MessageSquare size={18} className="md:w-5 md:h-5 text-white mt-1" />
                        <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder={t.contact.message.messagePlaceholder} rows="4" className="flex-1 bg-transparent text-white placeholder-purple-200 outline-none resize-none text-sm md:text-base"></textarea>
                      </div>
                    </div>
                    <button type="submit" className="w-full px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-xl text-base md:text-lg font-semibold transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-2">
                      {t.contact.message.submit}
                      <Send size={18} className="md:w-5 md:h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
