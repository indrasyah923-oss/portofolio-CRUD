import { projects } from '../data/content';

const ProjectsSection = ({ t, language, visibleSections, sectionRef }) => {
  return (
    <section id="projects" ref={sectionRef} className="md:scroll-mt-20 scroll-mt-12 min-h-screen px-4 md:px-6 py-2 md:py-0 mb-4 md:mb-0">
      <div className="md:px-14 px-0 w-full mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.projects.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, i) => (
            <div key={project.id} className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 ${visibleSections.projects ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s`, transition: 'all 0.5s ease-in-out' }}>
              <div className="relative h-40 md:h-64 overflow-hidden">
                <img src={project.image} alt={project.name[language]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 md:p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-semibold mb-1 md:mb-2 ${project.status === 'finished' ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500'}`}>
                      {t.projects.status[project.status]}
                    </span>
                    <h3 className="text-sm md:text-xl font-bold text-white">{project.name[language]}</h3>
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-6">
                <p className="text-gray-400 mb-2 md:mb-4 text-xs md:text-base line-clamp-2">{project.description[language]}</p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {project.tech.map((tech, j) => (<span key={j} className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-800 text-gray-300 rounded-md text-[10px] md:text-sm">{tech}</span>))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
