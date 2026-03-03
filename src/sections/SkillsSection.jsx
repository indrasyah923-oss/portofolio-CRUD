import { skills } from '../data/skill';

const SkillsSection = ({ t, visibleSections, sectionRef }) => {
  return (
    <section id="skills" ref={sectionRef} className="min-h-screen flex scroll-mt-12 items-center px-4 md:px-6 py-2 md:py-0 mb-4 md:mb-0">
      <div className="md:px-14 px-0 w-full mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.skills.title}</h2>
          <p className="text-gray-400 text-sm md:text-lg">{t.skills.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, i) => (
            <div key={i} className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-purple-500 cursor-pointer ${visibleSections.skills ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s`, transition: 'all 0.5s ease-in-out' }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                {skill.icon}
              </div>
              <div className="text-center text-white font-semibold text-xs md:text-sm" style={{ lineHeight: '1.6' }}>{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
