import React from 'react';
import { getConfigValue, getData } from '../../lib/useData';

const ProjectsChannel: React.FC = () => {
  const projects = getData<string>("projects");

  return (
    <div className="w-full h-full bg-[#11001c] text-white overflow-y-auto relative font-sans scroll-smooth no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Show Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#11001c] to-[#11001c]/0 pt-6 pb-8 px-6">
        <div className="flex justify-between items-end border-b-2 border-fuchsia-500 pb-2">
            <div>
                <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]">
                    NEXT<span className="text-white">GEN</span> SHOWCASE
                </h1>
                <p className="text-fuchsia-300 text-xs font-mono tracking-widest mt-1">EPISODE 402: INDIE BREAKTHROUGHS</p>
            </div>
            <div className="animate-bounce text-fuchsia-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="px-6 pb-20 flex flex-col gap-8">
        {projects.map((project, index) => (
          <a 
            key={project.id} 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-[#2a0a38] rounded-xl overflow-hidden shadow-lg border border-fuchsia-900/50 hover:border-fuchsia-400 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Project Image */}
            <div className="relative h-40 overflow-hidden">
                <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a38] via-transparent to-transparent"></div>
                
                {/* Tech Icon Overlay */}
                <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 shadow-xl group-hover:rotate-12 transition-transform duration-300">
                    <img src={project.techIcon} alt="Tech" className="w-6 h-6" />
                </div>
            </div>

            {/* Content */}
            <div className="p-5 relative">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold font-mono text-white group-hover:text-fuchsia-300 transition-colors">
                        {project.name}
                    </h2>
                    <span className="text-xs bg-fuchsia-600 text-white px-2 py-1 rounded font-bold">#{index + 1}</span>
                </div>
                
                <p className="text-sm text-purple-200 leading-relaxed mb-4">
                    {project.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-fuchsia-400 font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                    <span>View Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
          </a>
        ))}
      </div>
      
      {/* Footer / Ad area */}
      <div className="text-center pb-8 pt-4 opacity-50">
        <p className="text-[10px] font-mono text-fuchsia-300/50">SPONSORED BY CYBERDYNE SYSTEMS</p>
      </div>
    </div>
  );
};

export default ProjectsChannel;