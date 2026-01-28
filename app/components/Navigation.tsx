// components/Navigation.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Experiência' },
  { id: 'contact', label: 'Contato' }
];

// Seções com fundo branco
const whiteBackgroundSections = ['about', 'projects'];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };

    document.addEventListener('sectionChange', handleSectionChange as EventListener);

    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('sectionChange', handleSectionChange as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determina a cor baseada na seção atual
  const getTextColor = (sectionId: string) => {
    const isWhiteBg = whiteBackgroundSections.includes(sectionId);
    return isWhiteBg ? 'text-black' : 'text-white';
  };

  const getDotColor = (sectionId: string, isActive: boolean) => {
    const isWhiteBg = whiteBackgroundSections.includes(sectionId);
    
    if (isActive) {
      return isWhiteBg ? 'bg-black' : 'bg-white';
    }
    
    return isWhiteBg ? 'bg-gray-400 group-hover:bg-gray-600' : 'bg-gray-400 group-hover:bg-gray-200';
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-end space-y-6">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const textColor = getTextColor(section.id);
          const dotColor = getDotColor(section.id, isActive);

          return (
            <div key={section.id} className="relative">
              <button
                onClick={() => scrollToSection(section.id)}
                className="relative flex items-center justify-center group"
                aria-label={`Ir para ${section.label}`}
              >
                <motion.div
                  className={`h-0.5 rounded-full transition-all duration-300 cursor-pointer ${dotColor} ${
                    isActive ? 'w-6' : 'w-2'
                  }`}
                  animate={{
                    scale: isActive ? 1 : 1
                  }}
                />
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-4 pr-4"
                    >
                      <span className={`font-dm-sans text-md whitespace-nowrap ${textColor}`}>
                        {section.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;