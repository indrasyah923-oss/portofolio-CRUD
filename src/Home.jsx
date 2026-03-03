import React, { useState, useEffect, useRef } from 'react';
import { content } from './data/content';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';

const Home = () => {
  const [language, setLanguage] = useState('id');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState({});
  const [activeNav, setActiveNav] = useState('home');

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    blog: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: '0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          setActiveNav(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-x-hidden">
      {/* Fixed background to prevent white on overscroll */}
      <div className="fixed inset-0 bg-gray-950 -z-10"></div>
      
      {/* Background blur dengan delay sedang */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl transition-all duration-300 ease-out" style={{ left: `${mousePosition.x - 192}px`, top: `${mousePosition.y - 192}px` }} />
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 pb-20 md:pb-0">
        <Navbar
          language={language}
          setLanguage={setLanguage}
          activeNav={activeNav}
          scrollToSection={scrollToSection}
          t={t}
        />

        <HeroSection
          t={t}
          scrollToSection={scrollToSection}
          sectionRef={sectionRefs.hero}
        />

        <AboutSection
          t={t}
          visibleSections={visibleSections}
          sectionRef={sectionRefs.about}
        />

        <SkillsSection
          t={t}
          visibleSections={visibleSections}
          sectionRef={sectionRefs.skills}
        />

        <ProjectsSection
          t={t}
          language={language}
          visibleSections={visibleSections}
          sectionRef={sectionRefs.projects}
        />

        <BlogSection
          t={t}
          language={language}
          visibleSections={visibleSections}
          sectionRef={sectionRefs.blog}
        />

        <ContactSection
          t={t}
          language={language}
          sectionRef={sectionRefs.contact}
        />
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 1.2s ease-out; }
        .animate-slideInUp { animation: slideInUp 1.2s ease-out 0.4s both; }
        .animate-fadeIn { animation: fadeIn 1s ease-out both; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out both; }
        
        /* Prevent white background on overscroll */
        html, body {
          background-color: #030712;
          overscroll-behavior: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
