// components/Projects.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "NOV Agência",
    description: "Landing page desenvolvida em Next.js para a NOV Agência, com foco em visual limpo e experiência leve. A estrutura é direta, responsiva e traz uma pegada mais descontraída sem perder a clareza.",
    imageDesktop: "/images/nov_img_01.png",
    imageMobile: "/images/nov_img_02.png",
    url: "https://www.agencianov.com.br/"
  },
  {
    id: 2,
    title: "SK Estruturas",
    description: "Site desenvolvido em Next.js e Tailwind para empresa de estruturas metálicas, com foco em performance, visual limpo e navegação fluida. Apresenta os serviços da marca com experiência leve e responsiva.",
    imageDesktop: "/images/sk_img_01.png",
    imageMobile: "/images/sk_img_02.png",
    url: "https://sk-estruturas-metalicas.vercel.app/"
  },
  {
    id: 3,
    title: "SGEE",
    description: "Sistema de Gestão de Equipamentos de Escritório desenvolvido como projeto acadêmico, utilizando Next.js no front-end, Node.js no back-end e Prisma para o banco de dados.",
    imageDesktop: "/images/sgee_img_01.png",
    imageMobile: "/images/sgee_img_02.png",
    url: "https://sgee.vercel.app/"
  },
  {
    id: 4,
    title: "Sina",
    description: "Página profissional e serviços de design para banners desenvolvidos com foco visual e responsividade. Design moderno e clean para apresentação de serviços criativos.",
    imageDesktop: "/images/sina_img_01.png",
    imageMobile: "/images/sina_img_02.png",
    url: "https://sina-collab.vercel.app/"
  },
  {
    id: 5,
    title: "Template Personal Trainer",
    description: "Template moderno e responsivo criado para personal trainers, desenvolvido com Next.js e foco em performance. Layout otimizado para conversão e engajamento.",
    imageDesktop: "/images/personal_img_01.png",
    imageMobile: "/images/personal_img_02.png",
    url: "https://template-personal-trainer.vercel.app/"
  },
  {
    id: 6,
    title: "Lorem",
    description: "Página simples em estilo preto e branco, com foco minimalista e responsividade. Design clean que prioriza tipografia e espaçamento.",
    imageDesktop: "/images/lorem_img_01.png",
    imageMobile: "/images/lorem_img_02.png",
    url: "https://lorem-page.vercel.app/"
  },
  {
    id: 7,
    title: "Berghahn E-commerce",
    description: "E-commerce criado para a empresa da minha família, com estrutura de catálogo e foco em usabilidade. Interface intuitiva para experiência de compra otimizada.",
    imageDesktop: "/images/berghahn_img_01.png",
    imageMobile: "/images/berghahn_img_02.png",
    url: "https://berghahn-e-commerce.vercel.app/"
  },
  {
    id: 8,
    title: "Chess",
    description: "Uma das primeiras páginas que desenvolvi ao começar a estudar desenvolvimento web. Projeto em Angular com foco em aprender fundamentos de front-end.",
    imageDesktop: "/images/chess_img_01.png",
    imageMobile: "/images/chess_img_02.png",
    url: "https://chess-page-lemon.vercel.app/"
  }
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.dispatchEvent(new CustomEvent('sectionChange', { detail: 'projects' }));
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || isAnimating) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [autoplay, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const imageAspectRatio = 598 / 381; // 1.57:1

  const handleVisitWebsite = () => {
    window.open(projects[currentIndex].url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="h-screen snap-start bg-white text-black relative overflow-hidden"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="container h-full mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <h2 className="font-fira-code text-5xl md:text-6xl font-light">
            Projetos
          </h2>
          <div className="w-24 h-px bg-black mt-4"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          {/* Images Container - Ocupa 2/5 da largura */}
          <div className="lg:w-2/5 w-full">
            {/* Container para as imagens */}
            <div className="relative" style={{ aspectRatio: `${imageAspectRatio}` }}>
              {/* Container para as duas imagens sobrepostas */}
              <div className="absolute inset-0">
                {/* Imagem 1 - Desktop (fundo) - SEMPRE VISÍVEL */}
                <div className="absolute inset-0">
                  <Image
                    src={projects[currentIndex].imageDesktop}
                    alt={`${projects[currentIndex].title} - Desktop`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain"
                    priority={currentIndex === 0}
                  />
                </div>
                
                {/* Imagem 2 - Mobile (sobreposta) - SEMPRE VISÍVEL */}
                <div className="absolute inset-0">
                  <Image
                    src={projects[currentIndex].imageMobile}
                    alt={`${projects[currentIndex].title} - Mobile`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Container - Ocupa 3/5 da largura */}
          <div className="lg:w-3/5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 md:space-y-8"
              >
                {/* Project Number */}
                <div className="font-dm-sans text-sm tracking-widest uppercase text-gray-500">
                  Projeto {String(currentIndex + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
                </div>

                {/* Title */}
                <h3 className="font-fira-code text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                  {projects[currentIndex].title}
                </h3>

                {/* Description */}
                <p className="font-dm-sans text-base md:text-lg text-gray-700 leading-relaxed">
                  {projects[currentIndex].description}
                </p>

                {/* Tech Stack */}
                <div className="pt-2">
                  <span className="font-fira-code text-sm text-gray-500">Stack: </span>
                  <span className="font-fira-code text-sm text-gray-700">
                    {projects[currentIndex].id === 8 ? 'Angular' : 'Next.js'}
                    {projects[currentIndex].id === 2 && ', Tailwind'}
                    {projects[currentIndex].id === 3 && ', Node.js, Prisma'}
                  </span>
                </div>

                {/* Visit Button */}
                <div className="pt-2 md:pt-4">
                  <button 
                    onClick={handleVisitWebsite}
                    className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-black bg-transparent overflow-hidden transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    <span className="font-dm-sans text-sm tracking-widest uppercase transition-all duration-300 group-hover:translate-x-1">
                      Visitar Website
                    </span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mt-8 md:mt-12">
              <button
                onClick={handlePrev}
                className="p-3 border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30"
                disabled={isAnimating}
                aria-label="Previous project"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="p-3 border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30"
                disabled={isAnimating}
                aria-label="Next project"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="h-px w-6 md:w-8 bg-black/10"></div>

              {/* Project Indicators */}
              <div className="flex items-center gap-2 md:gap-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ${
                      index === currentIndex 
                        ? 'text-black' 
                        : 'text-gray-300 hover:text-gray-500'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                    disabled={isAnimating}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-black scale-125' 
                        : 'bg-gray-300 hover:bg-gray-500'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;