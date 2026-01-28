// components/About.tsx
"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.dispatchEvent(new CustomEvent('sectionChange', { detail: 'about' }));
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
      id="about"
      className="h-screen snap-start bg-white flex items-center p-0"
    >
      <div className="container mx-auto px-0 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Texto na esquerda */}
          <div className="flex items-center p-6 md:p-12 lg:p-24">
            <motion.div
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="max-w-xl"
            >
              <motion.div variants={item} className="mb-8">
                <h2 className="font-fira-code text-black text-5xl md:text-6xl font-light mb-6">
                  Sobre
                </h2>
                <div className="w-24 h-px bg-black"></div>
              </motion.div>

              <motion.div variants={item} className="mb-8 ">
                <p className="font-dm-sans text-lg md:text-xl leading-relaxed mb-6 text-black">
                  Desenvolvedor front-end com mais de 4 anos de experiência na criação de sites modernos, responsivos e voltados para a melhor experiência do usuário. Possuo uma base técnica sólida e criativa, utilizando tecnologias como HTML CSS JS TypeScript Next.js Angular e Node.js, além de outras ferramentas complementares que enriquecem meu conjunto de habilidades.
                </p>
              </motion.div>

              <motion.div variants={item}>
                <p className="font-dm-sans text-lg md:text-xl leading-relaxed text-black">
                 Nos últimos tempos, venho me dedicando principalmente ao desenvolvimento de páginas e interfaces web, sempre atento às boas práticas de UI/UX, acessibilidade e performance. Embora também tenha experiência com animações baseadas em código e em linha do tempo, meu foco atual está em criar soluções eficientes, funcionais e visualmente agradáveis para a web.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Imagem full-height na direita */}
          <div className="hidden md:block relative h-full">
            <motion.div
              initial={{ opacity: 0, translateY: -300 }}
              animate={isInView ? { opacity: 1, translateY: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/formatura.jpg"
                alt="Matheus Berghahn"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;