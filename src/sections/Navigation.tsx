import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Terminal } from 'lucide-react';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERTISE', href: '#expertise' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'expo.out' }
      );

      gsap.fromTo(logoRef.current,
        { scale: 0, rotateY: 180 },
        { scale: 1, rotateY: 0, duration: 0.6, delay: 0.7, ease: 'back.out(1.7)' }
      );

      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.9, ease: 'expo.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    setActiveLink(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-cyber py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scanline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            ref={logoRef}
            className="perspective-1000 cursor-pointer group"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#00f5ff] flex items-center justify-center relative overflow-hidden group-hover:bg-[#00f5ff]/10 transition-colors">
                <Terminal className="w-5 h-5 text-[#00f5ff]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#00f5ff] font-['Orbitron'] tracking-widest">
                  ASIM
                </div>
                <div className="text-[10px] text-[#ff00ff] font-mono tracking-wider">
                  SYSTEM.ARCHITECT
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-4 py-2 text-sm font-['Orbitron'] tracking-wider transition-all duration-300 group ${
                  activeLink === link.href 
                    ? 'text-[#00f5ff]' 
                    : 'text-gray-400 hover:text-[#00f5ff]'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Hover box */}
                <div className="absolute inset-0 border border-[#00f5ff]/0 group-hover:border-[#00f5ff]/50 transition-colors" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Active indicator */}
                {activeLink === link.href && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]" />
                )}
              </button>
            ))}
            
            {/* Moving indicator */}
            <div 
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] transition-all duration-300"
              style={{ opacity: 0 }}
            />
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden md:block px-6 py-2 border border-[#ff00ff] text-[#ff00ff] font-['Orbitron'] text-sm tracking-wider relative overflow-hidden group hover:bg-[#ff00ff] hover:text-black transition-all duration-300"
          >
            <span className="relative z-10">INITIATE_CONTACT</span>
            <div className="absolute inset-0 bg-[#ff00ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#00f5ff] p-2 border border-[#00f5ff]/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#00f5ff]/20 glass-cyber">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-gray-300 hover:text-[#00f5ff] transition-colors py-3 px-4 border-l-2 border-transparent hover:border-[#00f5ff] font-['Orbitron'] text-sm tracking-wider"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 mx-4 px-6 py-3 border border-[#ff00ff] text-[#ff00ff] font-['Orbitron'] text-sm tracking-wider"
              >
                INITIATE_CONTACT
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
