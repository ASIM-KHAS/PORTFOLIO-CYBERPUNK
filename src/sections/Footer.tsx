import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote fade in
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'smooth',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Signature draw
      if (signatureRef.current) {
        const length = signatureRef.current.getTotalLength();
        gsap.set(signatureRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        
        gsap.to(signatureRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Back to top
      gsap.fromTo(backToTopRef.current,
        { y: 20, scale: 0 },
        {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 w-full overflow-hidden border-t border-[#00f5ff]/20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] to-transparent" />
      
      {/* Scanline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* System Status */}
          <div className="flex items-center gap-4 mb-8 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              <span>SYSTEM_ONLINE</span>
            </div>
            <span>|</span>
            <span>SYS.VER: 2.0.25</span>
            <span>|</span>
            <span>SECURE_CONNECTION</span>
          </div>

          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-xl sm:text-2xl font-['Orbitron'] italic text-gray-300 max-w-2xl mb-8"
          >
            "Designing the <span className="text-[#00f5ff]">secure</span>, <span className="text-[#ff00ff]">compliant</span> engines that power the Saudi digital economy."
          </p>

          {/* Signature */}
          <div className="mb-8">
            <svg
              width="250"
              height="70"
              viewBox="0 0 250 70"
              fill="none"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="50%" stopColor="#ff00ff" />
                  <stop offset="100%" stopColor="#00f5ff" />
                </linearGradient>
              </defs>
              <path
                ref={signatureRef}
                d="M10 55 Q30 15 60 35 T100 30 Q120 25 140 40 T180 35 Q200 30 220 45 T240 40"
                stroke="url(#signatureGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                filter="drop-shadow(0 0 10px rgba(0, 245, 255, 0.5))"
              />
            </svg>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] font-['Orbitron'] text-lg tracking-widest">
              ASIM_KHAS
            </p>
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent mb-8" />

          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-gray-500 text-sm font-mono mb-4">
            <span>© 2025 ASIM_KHAS</span>
            <span className="flex items-center gap-1">
              <span className="text-[#ff00ff]">BUILT_WITH</span>
              <Heart className="w-4 h-4 text-[#ff00ff] fill-[#ff00ff]" />
              <span className="text-[#00f5ff]">IN_RIYADH</span>
            </span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-2">
            {['REACT', 'TYPESCRIPT', 'TAILWIND', 'THREE.JS', 'GSAP'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded border border-[#00f5ff]/30 text-[#00f5ff]/70 text-xs font-mono hover:border-[#00f5ff] hover:text-[#00f5ff] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-lg bg-[#0a0f1a] border border-[#00f5ff]/50 text-[#00f5ff] flex items-center justify-center hover:bg-[#00f5ff] hover:text-black transition-all z-50 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        <div className="absolute inset-0 rounded-lg bg-[#00f5ff] opacity-0 group-hover:opacity-20 animate-pulse" />
      </button>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#0a0f1a] border-t border-[#00f5ff]/10 flex items-center justify-between px-4 text-[10px] font-mono text-gray-600">
        <div className="flex items-center gap-4">
          <span>CPU: 12%</span>
          <span>MEM: 4.2GB</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#00ff88]">● ONLINE</span>
          <span>LATENCY: 24ms</span>
        </div>
      </div>
    </footer>
  );
}
