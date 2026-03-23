import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Agenda from './components/Agenda';
import WhatIsGenAI from './components/WhatIsGenAI';
import LLMDemo from './components/LLMDemo';
import Demos from './components/Demos';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import PanamaMap from './components/PanamaMap';
import Cases from './components/Cases';
import Takeaways from './components/Takeaways';
import CoursesCTA from './components/CoursesCTA';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
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
    <div className="relative min-h-screen bg-bg overflow-x-hidden">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Agenda />
          <WhatIsGenAI />
          <Stats />
          <LLMDemo />
          <Demos />
          <Timeline />
          <PanamaMap />
          <Cases />
          <Takeaways />
          <CoursesCTA />
          <Resources />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
