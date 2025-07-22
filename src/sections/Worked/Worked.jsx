import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import projectThumb from "../../assets/image1.png";
import projectThumb1 from "../../assets/image2.png";
import projectThumb2 from "../../assets/image3.png";

const projects = [
  {
    id: 1,
    featured: true,
    title: "CodeCircle - Forum for Developers",
    description:
      "A community-driven forum platform built for developers. Features include real-time discussions, post upvoting, developer profiles, JWT-based authentication, and admin moderation tools. Fully responsive with smooth UI animations, designed to foster knowledge sharing among developers.",
    tech: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    image: projectThumb2,
    link: "https://codecircle5.web.app/",
  },

  {
    id: 2,
    featured: true,
    title: "Coursion – Online Course Platform",
    description:
      "A full-stack course management platform with JWT auth, role-based access, payment integration, and seat-limited enrollments.",
    tech: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    image: projectThumb,
    link: "https://coursion-9faf6.web.app/",
  },
  {
    id: 2,
    featured: true,
    title: "Miverr - A Bangladeshi Platform",
    description:
      "Inspired by Fiverr, Miverr is a full-stack freelance service marketplace with real-time messaging, secure login (JWT & Firebase), service listings, gig ordering, and admin moderation panel. Optimized for UX with mobile responsiveness and animation.",
    tech: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    image: projectThumb1,
    link: "https://miverr-7ac31.web.app/",
  },
];

const Worked = () => {
  useEffect(() => {
    Aos.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-12" data-aos="fade-right">
          <h2 className="text-3xl font-bold text-orange-400 whitespace-normal sm:whitespace-nowrap text-center sm:text-left">
            Things I've Worked on, Some of them
          </h2>

          <hr className="flex-grow border-t border-orange-600 opacity-60" />
        </div>

        {/* Projects */}
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={project.id}
              className={`flex flex-col-reverse md:flex-row items-center gap-10 mb-20 ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Info */}
              <div className="md:w-1/2 space-y-4">
                {project.featured && (
                  <span className="text-sm uppercase tracking-widest text-orange-500">
                    Featured Project
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-orange-400">
                  {project.title}
                </h3>
                <p className="bg-[#1e293b] p-4 rounded-lg text-gray-300 shadow-md leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="border-2 border-orange-600 font-semibold text-white text-xs px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block mt-4 px-5 py-2 text-sm font-semibold text-orange-400 border-2 border-orange-500 rounded-full overflow-hidden z-10 group"
                >
                  <span className="relative z-10 transition duration-300 group-hover:text-white">
                    🔗 View Website
                  </span>
                  <span
                    className="absolute inset-0 bg-orange-500 origin-bottom-left scale-x-0 scale-y-0 group-hover:scale-x-150 group-hover:scale-y-150 transition-transform duration-500 ease-out z-0"
                    style={{ transformOrigin: "bottom left" }}
                  ></span>
                </a>
              </div>

              {/* Thumbnail */}
              <div
                className="md:w-1/2"
                data-aos="zoom-in"
                data-aos-delay={idx * 150 + 200}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-xl w-full h-auto shadow-lg brightness-110 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Worked;
