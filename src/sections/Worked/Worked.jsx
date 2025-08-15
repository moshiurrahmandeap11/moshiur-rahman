import React, { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Mock project images - replace with your actual images
const projectThumb = "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop";
const projectThumb1 = "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop";
const projectThumb2 = "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop";

const projects = [
  {
    id: 1,
    featured: true,
    title: "CodeCircle - Forum for Developers",
    github: "https://github.com/moshiurrahman/codecircle",
    link: "https://codecircle5.web.app/",
    image: projectThumb2,
    description: "A modern developer community platform"
  },
  {
    id: 2,
    featured: true,
    title: "Coursion – Online Course Platform",
    github: "https://github.com/moshiurrahman/coursion",
    link: "https://coursion-9faf6.web.app/",
    image: projectThumb,
    description: "Interactive learning management system"
  },
  {
    id: 3,
    featured: true,
    title: "Miverr - A Bangladeshi Platform",
    github: "https://github.com/moshiurrahman/miverr",
    link: "https://miverr-7ac31.web.app/",
    image: projectThumb1,
    description: "Local freelancing marketplace solution"
  },
];

const Worked = () => {
  useEffect(() => {
    // Initialize animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          <div className="inline-flex items-center gap-4 mb-6 p-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with cutting-edge technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 group"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className="relative h-full">
                {/* Glassy Card Container */}
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out hover:scale-105 hover:rotate-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:border-white/30 group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:via-white/10 group-hover:to-white/5">
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="backdrop-blur-md bg-gradient-to-r from-orange-500/90 to-pink-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                        ✨ Featured
                      </div>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12"
                      >
                        <FaGithub className="text-white text-sm" />
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12"
                      >
                        <FaExternalLinkAlt className="text-white text-sm" />
                      </a>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white backdrop-blur-md bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-white/20 rounded-xl hover:from-slate-600/60 hover:to-slate-500/60 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <FaGithub className="text-lg" />
                        Code
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white backdrop-blur-md bg-gradient-to-r from-orange-500/80 to-pink-500/80 border border-white/20 rounded-xl overflow-hidden group/btn hover:from-orange-400/90 hover:to-pink-400/90 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <FaExternalLinkAlt className="text-sm" />
                          Live Demo
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-pink-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Card Reflection */}
                <div className="absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-t from-white/5 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-1000">
          <div className="inline-block p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl shadow-2xl">
            <p className="text-slate-300 mb-4">Interested in working together?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-400 hover:to-pink-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Worked;