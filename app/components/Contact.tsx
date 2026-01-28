// components/Contact.tsx
"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.dispatchEvent(new CustomEvent('sectionChange', { detail: 'contact' }));
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="h-screen snap-start bg-black text-white flex items-center"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="mb-16">
            <h2 className="font-fira-code text-5xl md:text-6xl font-light mb-6">
              Contact
            </h2>
            <div className="w-24 h-px bg-white"></div>
          </motion.div>

          <motion.div variants={item} className="mb-12">
            <h3 className="font-fira-code text-3xl font-light mb-8">
              Matheus Berghahn
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={item} className="space-y-6">
              <div>
                
                <a
                  href="www.linkedin.com/in/matheus-berghahn-098049206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-xl hover:opacity-70 transition-opacity inline-block"
                >
                  LinkedIn
                </a>
              </div>
              
              <div>
                <a
                  href="https://github.com/Matheus-Berghahn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-xl hover:opacity-70 transition-opacity inline-block"
                >
                  GitHub
                </a>
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-6">
              <div>
                <a
                  href="mailto:matheus.berghahn3k@gmail.com"
                  className="font-dm-sans text-xl hover:opacity-70 transition-opacity inline-block"
                >
                  matheus.berghahn3k@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="mt-24 pt-8 border-t border-white/20">
            <p className="font-dm-sans text-sm opacity-70">
              © {new Date().getFullYear()} Matheus Berghahn. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;