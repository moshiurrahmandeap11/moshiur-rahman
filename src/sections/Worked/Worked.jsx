import { useEffect } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// Mock project images - replace with your actual images
const projectThumb =
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop";
const projectThumb1 =
  "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop";
const projectThumb2 =
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop";
const projectThumb4 =
  "https://i.postimg.cc/pLLPHfbZ/Screenshot-from-2025-11-08-00-05-47.png";
const projectThumb5 =
  "https://thumbs.dreamstime.com/z/inventory-management-concept-cell-background-d-illustration-138441533.jpg";
const projectThumb6 =
  "https://i.postimg.cc/dtcKKpPp/Screenshot-2026-02-15-180840.png";
const projectThumb7 =
  "https://market-resized.envatousercontent.com/previews/files/226852993/preview_version/02_main_home.png?w=590&h=300&cf_fit=crop&crop=top&format=auto&q=85&s=edc154cde4a4c35779779c9922f84c1f0625839f007a5d7ae6d28e946bf89521";
const projectThumb8 =
  "https://i.postimg.cc/N0nj8DyV/Screenshot-2026-02-15-182012.png";
const projectThumb9 =
  "https://i.postimg.cc/Dy5Fd6R7/Screenshot-2026-02-15-182410.png";
  const projectThumb10 = "https://i.postimg.cc/N0t8Jqd2/image2.webp";

const projects = [
  {
    id: 4,
    featured: true,
    title: "Career Crafter - AI powered Job Seeking platform",
    github: "https://github.com/moshiurrahmandeap11/careerCrafter-client",
    link: "https://careercrafter5.web.app/",
    image: projectThumb4,
    description:
      "● AI-Powered Live Interview – Real-time candidate evaluation through adaptive AI analysis.● AI-Driven Job Matching – AI fetches and matches jobs based on users’ skills and profiles.● AI-Based Career Mentor – Personalized career guidance with data-driven insights.",
  },
  {
    id: 4,
    featured: true,
    title: "Inventory Pro - one inventory of all solutions",
    github: "https://github.com/moshiurrahmandeap11/super-inventory",
    link: "https://inventory.moshiurrahman.online",
    image: projectThumb5,
    description:
      "Inventory Pro is a modern inventory management system built for speed and simplicity. It lets businesses track products, manage stock levels, monitor sales, and generate real-time reports effortlessly. With secure authentication and role-based access, it streamlines operations, reduces errors, and keeps your entire inventory workflow organized and efficient.",
  },
  {
    id: 5,
    featured: true,
    title: "Portfolio for business solutions ltd.",
    github: "https://github.com/moshiurrahmandeap11/backbencherCoder.git",
    link: "https://backbencher.moshiurrahman.online/",
    image: projectThumb6,
    description:
      "A modern portfolio website designed for service providers to showcase expertise, projects, and client testimonials in a professional way. It highlights services, pricing, and contact options, helping businesses build credibility, attract clients, and convert visitors into long-term customers effortlessly.",
  },
  {
    id: 6,
    featured: true,
    title: "School and college management software for all kind of institute",
    github:
      "https://github.com/moshiurrahmandeap11/schoolmanagement-client.git",
    link: "https://school.moshiurrahman.online/",
    image: projectThumb7,
    description:
      "A comprehensive school management website designed to streamline academic and administrative operations. It enables student enrollment, attendance tracking, class scheduling, result management, and fee monitoring in one secure platform. With dedicated dashboards for admins, teachers, students, and parents, it improves communication, organization, and overall institutional efficiency.",
  },
  {
    id: 7,
    featured: true,
    title: "Pressclub website for netrakona",
    github:
      "https://github.com/moshiurrahmandeap11/pressclub-netrakona-client.git",
    link: "https://pressclub-netrakona-client.vercel.app/",
    image: projectThumb8,
    description:
      "A dynamic press club website designed to connect journalists, share news updates, and manage events efficiently. It features member registration, news publishing, event announcements, and media galleries. With a clean, professional interface, it strengthens communication, promotes transparency, and enhances collaboration within the press community.",
  },
  {
    id: 8,
    featured: true,
    title: "Projukti Sheba service provider website",
    github: "https://github.com/moshiurrahmandeap11/projukti-sheba-client.git",
    link: "https://projuktisheba.moshiurrahman.online/",
    image: projectThumb9,
    description:
      "Projuktisheba is a professional service provider website built to showcase technical solutions and client-focused services. It highlights offered services, completed projects, customer testimonials, and easy contact options. Designed with a clean interface and smooth user experience, it helps businesses build trust, attract new clients, and manage service inquiries efficiently.",
  },
  {
    id: 9,
    featured: true,
    title: "Modern personal blog website for client",
    github: "https://github.com/moshiurrahmandeap11/elmul-furqaan.git",
    link: "https://elmulforqaan.com/",
    image: "https://i.postimg.cc/tCcvjVxN/image1.png",
    description:
      "A modern personal blog designed for sharing ideas, experiences, and insights in a clean, engaging format. It features categorized posts, a comment system, and a responsive layout for seamless reading across devices. With a minimalist design and smooth navigation, it creates a personal brand and meaningful reader connection.",
  },
  {
    id: 10,
    featured: true,
    title: "Modern Blog - ready comfortably",
    github: "https://github.com/moshiurrahmandeap11/modern-blog",
    link: "https://modern-blog-one-alpha.vercel.app/",
    image: projectThumb10,
    description: "Modern Blog is a sleek, full-featured blogging platform built with React, Node.js, Express, and PostgreSQL. It allows users to create, edit, and manage blogs securely, with advanced search, user authentication, and responsive design for all devices."
  },
  {
    id: 1,
    featured: true,
    title: "CodeCircle - Forum for Developers",
    github: "https://github.com/moshiurrahman/codecircle",
    link: "https://codecircle5.web.app/",
    image: projectThumb2,
    description: "A modern developer community platform",
  },
  {
    id: 2,
    featured: true,
    title: "Coursion – Online Course Platform",
    github: "https://github.com/moshiurrahman/coursion",
    link: "https://coursion-9faf6.web.app/",
    image: projectThumb,
    description: "Interactive learning management system",
  },
  {
    id: 3,
    featured: true,
    title: "Miverr - A Bangladeshi Platform",
    github: "https://github.com/moshiurrahman/miverr",
    link: "https://miverr-7ac31.web.app/",
    image: projectThumb1,
    description: "Local freelancing marketplace solution",
  },
];

const Worked = () => {
  useEffect(() => {
    // Initialize animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
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
              animationDuration: `${2 + Math.random() * 3}s`,
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
            <p className="text-slate-300 mb-4">
              Interested in working together?
            </p>
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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Worked;
