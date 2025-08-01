import React, { useEffect, useState, Fragment } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    Aos.init({ duration: 900, easing: "ease-in-out", once: false });
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await emailjs.send(
      "service_woroemc",
      "template_9dylp4r",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "cN285d0udWmtvrcLx"
    );
    toast.success("Message sent successfully! 🎉");
    setForm({ name: "", email: "", message: "" });
    setIsOpen(false);
  } catch (err) {
    console.error("Email send error:", err);
    toast.error("Something went wrong. Try again! ❌");
  }
};


  return (
    <footer className="pb-40 bg-[#0f172a] text-white flex flex-col justify-center items-center px-6 text-center">
      <h3 className="text-4xl font-bold text-orange-400 mb-4" data-aos="fade-down">
        Get In Touch
      </h3>
      <h2 className="text-2xl font-semibold mb-6" data-aos="fade-up" data-aos-delay="150">
        Let's Work Together
      </h2>
      <p className="max-w-xl text-gray-300 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
        I’m open for new opportunities – especially ambitious or large projects. However, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative inline-block px-8 py-3 border-2 border-orange-400 text-orange-400 font-semibold rounded-full overflow-hidden group hover:text-white transition-colors duration-300"
        data-aos="zoom-in"
        data-aos-delay="450"
      >
        <span className="relative z-10">Say Hello World!</span>
        <span
          className="absolute inset-0 bg-orange-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
        ></span>
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-transparent backdrop-blur-3xl bg-opacity-25 flex justify-center items-center px-4">
              <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
                <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
                  Say Hello 👋
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full border rounded p-2 text-sm text-gray-700"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full border rounded p-2 text-sm text-gray-700"
                  />
                  <textarea
                    placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    required
                    className="w-full border rounded p-2 text-sm text-gray-700"
                  ></textarea>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </footer>
  );
};

export default Footer;
