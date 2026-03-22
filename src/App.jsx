import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import LLMDemo from './components/LLMDemo';
import PanamaMap from './components/PanamaMap';
import Cases from './components/Cases';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Fixed background elements */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <LLMDemo />
          <Timeline />
          <PanamaMap />
          <Stats />
          <Cases />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
