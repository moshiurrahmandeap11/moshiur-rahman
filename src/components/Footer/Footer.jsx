import React, { useEffect, useState } from "react";
import { Mail, Send, X, User, MessageSquare, Sparkles, Heart, Code, Coffee } from "lucide-react";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate email sending - replace with actual emailjs implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success - replace with actual emailjs.send()
      console.log("Email data:", {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      });
      
      // Success notification
      showToast("Message sent successfully! 🎉", "success");
      setForm({ name: "", email: "", message: "" });
      setIsOpen(false);
    } catch (err) {
      console.error("Email send error:", err);
      showToast("Something went wrong. Try again! ❌", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message, type) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tr from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons (Hidden on Mobile) */}
      <div className="absolute inset-0 hidden sm:block">
        {[
          { Icon: Code, delay: 0 },
          { Icon: Coffee, delay: 1 },
          { Icon: Heart, delay: 2 },
          { Icon: Sparkles, delay: 3 },
          { Icon: Mail, delay: 4 }
        ].map(({ Icon, delay }, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${15 + i * 20}%`,
              top: `${10 + (i % 2) * 80}%`,
              animationDelay: `${delay}s`,
              animationDuration: '4s'
            }}
          >
            <Icon className="w-4 sm:w-6 h-4 sm:h-6 text-white/10" />
          </div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <div className="animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 shadow-xl sm:shadow-2xl">
              <Mail className="w-6 sm:w-8 h-6 sm:h-8 text-orange-400" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <Send className="w-6 sm:w-8 h-6 sm:h-8 text-purple-400" />
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            Let's Work Together
          </h2>

          {/* Description */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-400">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl sm:shadow-2xl mb-8 sm:mb-12">
              <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                I'm open for new opportunities – especially ambitious or large projects. However, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                {['Quick Response', 'Professional Service', '24/7 Available'].map((feature, index) => (
                  <span 
                    key={index}
                    className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm backdrop-blur-md bg-gradient-to-r from-slate-600/50 to-slate-700/50 border border-white/20 rounded-full text-slate-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-600">
            <button
              onClick={() => setIsOpen(true)}
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3 sm:py-4 backdrop-blur-xl bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 border-2 border-orange-400/50 text-orange-400 font-semibold text-sm sm:text-lg rounded-xl sm:rounded-2xl overflow-hidden hover:border-orange-400 hover:text-white transition-all duration-500 hover:scale-105 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-orange-500/25"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                Say Hello World!
                <Send className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Contact Stats */}
          <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-800">
            {[
              { number: "24h", label: "Response Time", icon: "⚡" },
              { number: "5★", label: "Rating", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="p-4 sm:p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg sm:rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">{stat.icon}</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 mb-1">{stat.number}</div>
                <div className="text-slate-300 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-3xl bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 transform transition-all duration-300">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center">
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Say Hello 👋</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-3 sm:space-y-4">
                {/* Name Input */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm bg-white/80"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm bg-white/80"
                  />
                </div>

                {/* Message Input */}
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 sm:top-4 w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                  <textarea
                    placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    required
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm bg-white/80 resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-600 text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg sm:rounded-xl text-sm sm:text-base hover:from-orange-500 hover:to-pink-500 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3 sm:w-4 h-3 sm:h-4" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;