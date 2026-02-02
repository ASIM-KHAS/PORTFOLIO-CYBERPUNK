import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // Custom cursor effect (desktop only)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00f5ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, opacity 0.3s ease;
        mix-blend-mode: difference;
      `;
      document.body.appendChild(cursor);

      const cursorDot = document.createElement('div');
      cursorDot.className = 'custom-cursor-dot';
      cursorDot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00f5ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(cursorDot);

      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX - 2}px`;
        cursorDot.style.top = `${mouseY - 2}px`;
      };

      const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = `${cursorX - 10}px`;
        cursor.style.top = `${cursorY - 10}px`;
        requestAnimationFrame(animateCursor);
      };

      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      animateCursor();

      // Hover effects
      const interactiveElements = document.querySelectorAll('a, button, .card-cyber');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)';
          cursor.style.borderColor = '#ff00ff';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.borderColor = '#00f5ff';
        });
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        cursor.remove();
        cursorDot.remove();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#00f5ff]/3 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#ff00ff]/3 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
