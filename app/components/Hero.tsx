// components/Hero.tsx
"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.dispatchEvent(new CustomEvent('sectionChange', { detail: 'hero' }));
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen snap-start flex items-center justify-center bg-black overflow-hidden z-50"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-fira-code text-white text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4"
          >
            Matheus Berghahn
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="overflow-hidden"
          >
            <h2 className="font-dm-sans text-white text-xl md:text-2xl tracking-widest uppercase mb-12">
              Front-end Developer
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="inline-block"
          >
            <a
              href="#projects"
              className="group text-white relative inline-flex items-center justify-center px-8 py-4 border-2 border-white bg-transparent overflow-hidden transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span className="font-dm-sans text-sm tracking-widest uppercase transition-all duration-300 group-hover:translate-x-1">
                Projetos
              </span>
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.7 }}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Seta animada */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;