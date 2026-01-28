// components/Experience.tsx
"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.dispatchEvent(new CustomEvent('sectionChange', { detail: 'experience' }));
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
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      id="experience"
      className="snap-start bg-black text-white"
    >
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-12 md:py-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={item} className="mb-8 md:mb-12">
              <h2 className="font-fira-code text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                Experiência & Formação
              </h2>
              <div className="w-24 h-px bg-white"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Experience Box */}
              <motion.div variants={item}>
                <div className="mb-6 md:mb-8 p-6 md:p-8 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300">
                  <div className="inline-block px-4 py-2 bg-white text-black rounded-full text-sm font-dm-sans tracking-widest uppercase mb-4">
                    Experiência Profissional
                  </div>
                  <h3 className="font-dm-sans text-xl md:text-2xl font-semibold mb-2">
                    Digital Business – Web Design / Desenvolvedor Front-end
                  </h3>
                  <p className="font-dm-sans text-gray-300 mb-4 md:mb-6">2020 – Atual</p>
                  <ul className="font-dm-sans space-y-2 md:space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="mr-2 md:mr-3 mt-1 text-white">•</span>
                      <span>Atuação no desenvolvimento de sites e aplicações web para empresas como Banco Safra, Tramontina e Intelbras</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 md:mr-3 mt-1 text-white">•</span>
                      <span>Participação desde a estruturação, arquitetura e layout até a implementação das interfaces</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 md:mr-3 mt-1 text-white">•</span>
                      <span>Desenvolvimento de landing pages e sistemas front-end utilizando HTML, CSS, JavaScript, Next.js e Angular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 md:mr-3 mt-1 text-white">•</span>
                      <span>Trabalhos com WordPress (Elementor)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 md:mr-3 mt-1 text-white">•</span>
                      <span>Criação de animações e motion design, banners animados em HTML/CSS e timelines, além de e-mail marketing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 md:mr-3 mt-1 text-white">•</span>
                      <span>Foco em performance, responsividade e experiência do usuário</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Education Box */}
              <motion.div variants={item} className="space-y-6 md:space-y-8">
                <div className="p-6 md:p-8 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300">
                  <div className="inline-block px-4 py-2 bg-white text-black rounded-full text-sm font-dm-sans tracking-widest uppercase mb-4">
                    Formação Acadêmica
                  </div>
                  <div className="mb-6">
                    <h3 className="font-dm-sans text-lg md:text-xl font-semibold mb-2">
                      Ensino Médio Completo + Técnico em Informática
                    </h3>
                    <p className="font-dm-sans text-gray-300 text-sm md:text-base">
                      Escola Técnica Estadual Portão (ETEP) - 4 anos
                    </p>
                  </div>

                  <div>
                    <h3 className="font-dm-sans text-lg md:text-xl font-semibold mb-2">
                      Análise e Desenvolvimento de Sistemas
                    </h3>
                    <p className="font-dm-sans text-gray-300 text-sm md:text-base">
                      Universidade Feevale (2022/02 – 2025/04) concluído
                    </p>
                  </div>
                </div>

                {/* Skills Box */}
                <div className="p-6 md:p-8 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300">
                  <div className="inline-block px-4 py-2 bg-white text-black rounded-full text-sm font-dm-sans tracking-widest uppercase mb-4">
                    Habilidades Técnicas
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Git', 'HTML/CSS', 'Node.js'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 md:px-4 md:py-2 border border-white/20 rounded-full font-fira-code text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;