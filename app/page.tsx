// app/page.tsx
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="relative h-screen snap-y snap-mandatory overflow-y-auto scrollbar-hide">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Navigation />
    </main>
  );
}