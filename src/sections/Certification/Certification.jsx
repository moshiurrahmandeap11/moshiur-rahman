import React, { useEffect } from "react";
import { ExternalLink, Award, Calendar, MapPin, Zap } from "lucide-react";

// Mock certificate image - replace with your actual image
import progHeroImg from "../../assets/programminghero_logo.jpeg"

const certificates = [
  {
    id: 1,
    title: "Full Stack Developer",
    image: progHeroImg,
    website: "https://programming-hero.com",
    country: "Bangladesh",
    issued: "June 2025",
    description: "Complete web development with React, Node.js, MongoDB",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    verified: true
  },
  {
    id: 2,
    title: "MERN Stack Developer",
    image: progHeroImg,
    website: "https://programming-hero.com",
    country: "Bangladesh",
    issued: "August 2025",
    description: "Advanced MERN stack development and deployment",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    verified: true
  },
];

const Certification = () => {
  useEffect(() => {
    // Initialize scroll animations
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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-56 sm:w-72 h-56 sm:h-72 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Achievement Icons (Hidden on Mobile) */}
      <div className="absolute inset-0 hidden sm:block">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Award 
              className="w-3 sm:w-4 h-3 sm:h-4 text-white/10 rotate-12" 
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          <div className="inline-flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <Award className="w-8 sm:w-10 h-8 sm:h-10 text-orange-400" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Certifications
              </h2>
              <Zap className="w-8 sm:w-10 h-8 sm:h-10 text-emerald-400" />
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 group"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <div className="relative h-full">
                {/* Glassy Certificate Card */}
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-700 hover:scale-105 hover:border-white/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:via-white/10 group-hover:to-white/5">
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Verified Badge */}
                  {cert.verified && (
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                      <div className="backdrop-blur-md bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Verified
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    {/* Certificate Header */}
                    <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                      {/* Certificate Logo */}
                      <div className="relative group/logo">
                        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-orange-400/30 shadow-lg sm:shadow-xl backdrop-blur-sm bg-white/10 p-2 group-hover/logo:border-orange-400/50 transition-all duration-300">
                          <img
                            src={cert.image}
                            alt="Programming Hero Logo"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Certificate Info */}
                      <div className="flex-grow">
                        <a
                          href={cert.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 mb-1 sm:mb-2 group/link"
                        >
                          <span className="text-sm sm:text-base font-medium">Programming Hero</span>
                          <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                        </a>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                          {cert.title}
                        </h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 sm:px-3 py-1 text-xs font-medium text-white backdrop-blur-md bg-gradient-to-r from-slate-600/50 to-slate-700/50 border border-white/20 rounded-full hover:from-orange-500/30 hover:to-pink-500/30 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Certificate Details */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3 text-slate-300">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm">Issued in {cert.country}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-slate-300">
                        <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
                        <span className="text-xs sm:text-sm">Completed in {cert.issued}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 sm:mt-6">
                      <a
                        href={cert.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md bg-gradient-to-r from-orange-500/80 to-emerald-500/80 border border-white/20 rounded-lg sm:rounded-xl text-white font-medium text-sm sm:text-base hover:from-orange-400/90 hover:to-emerald-400/90 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group/btn"
                      >
                        <span>View Certificate</span>
                        <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-emerald-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Card Reflection */}
                <div className="absolute inset-x-0 -bottom-6 sm:-bottom-8 h-6 sm:h-8 bg-gradient-to-t from-white/5 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl sm:rounded-b-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="mt-12 sm:mt-16 md:mt-20 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-1000">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { number: "2+", label: "Professional Certificates", icon: "🏆" },
              { number: "100%", label: "Course Completion Rate", icon: "📈" },
              { number: "2025", label: "Latest Certification Year", icon: "🎓" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg sm:rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold text-orange-400 mb-1">{stat.number}</div>
                <div className="text-slate-300 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12 sm:mt-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-1200">
          <div className="inline-block p-4 sm:p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg sm:rounded-2xl shadow-xl sm:shadow-2xl">
            <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">Want to see more of my credentials?</p>
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-emerald-500 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base hover:from-orange-400 hover:to-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              View All Achievements
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Certification;