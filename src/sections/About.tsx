import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Shield, Headphones, Terminal, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 8, suffix: '+', label: 'DEVS_LED', color: '#00f5ff' },
  { icon: Clock, value: 2, suffix: '+', label: 'YEARS_ANB', color: '#ff00ff' },
  { icon: Shield, value: 100, suffix: '%', label: 'DR_SUCCESS', color: '#00ff88' },
  { icon: Headphones, value: 24, suffix: '/7', label: 'L3_SUPPORT', color: '#ffff00' },
];

const expertiseAreas = [
  { name: 'REGA_SYSTEMS', level: 95 },
  { name: 'VIRTUAL_ACCOUNTS', level: 92 },
  { name: 'MICROSERVICES', level: 90 },
  { name: 'EVENT_DRIVEN', level: 88 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading decode animation
      if (headingRef.current) {
        const text = headingRef.current;
        gsap.fromTo(text,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(cards,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Number count up
        cards.forEach((card) => {
          const numberEl = card.querySelector('.stat-number');
          if (numberEl) {
            const target = parseInt(numberEl.getAttribute('data-value') || '0');
            gsap.fromTo({ val: 0 },
              { val: 0 },
              {
                val: target,
                duration: 2,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
                onUpdate: function() {
                  numberEl.textContent = Math.floor(this.targets()[0].val).toString();
                },
              }
            );
          }
        });
      }

      // Skills progress bars
      if (skillsRef.current) {
        const bars = skillsRef.current.querySelectorAll('.skill-bar');
        bars.forEach((bar) => {
          const level = bar.getAttribute('data-level') || '0';
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: `${level}%`,
              duration: 1.5,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 hex-bg opacity-30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#ff00ff]/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-6 h-6 text-[#00f5ff]" />
          <span className="text-[#00f5ff] font-mono text-sm tracking-wider">SYSTEM_OVERVIEW</span>
        </div>

        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-white to-[#ff00ff]">
            ARCHITECTING_THE_FUTURE
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Narrative */}
          <div ref={contentRef} className="space-y-6">
            <div className="card-cyber p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-[#ff00ff]" />
                <span className="text-[#ff00ff] font-mono text-sm">MISSION_STATEMENT</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                I don't just write code; I design the <span className="text-[#00f5ff]">secure, compliant engines</span> that power 
                the Saudi digital economy. With deep expertise in REGA-compliant Real Estate 
                systems and high-volume Virtual Account platforms, I bridge the gap between 
                abstract business logic and concrete technical execution.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                From <span className="text-[#ff00ff]">Database Schema design</span> to <span className="text-[#00f5ff]">Frontend User Journeys</span>, 
                I translate complex business requirements into scalable banking architectures 
                that meet the stringent demands of modern financial systems.
              </p>
            </div>

            {/* Philosophy */}
            <div className="card-cyber p-6 rounded-lg border-l-4 border-[#00f5ff]">
              <Zap className="w-6 h-6 text-[#00f5ff] mb-3" />
              <p className="text-lg font-['Orbitron'] text-white italic">
                "Every line of code is a promise. Every architecture decision shapes the future."
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Skills */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card card-cyber p-6 rounded-lg text-center group hover:scale-105 transition-transform"
                >
                  <stat.icon 
                    className="w-8 h-8 mx-auto mb-3 transition-colors" 
                    style={{ color: stat.color }}
                  />
                  <div className="text-3xl sm:text-4xl font-bold font-['Orbitron']" style={{ color: stat.color }}>
                    <span className="stat-number" data-value={stat.value}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono mt-2 tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Core Expertise */}
            <div ref={skillsRef} className="card-cyber p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#00f5ff] rounded-full animate-pulse" />
                <span className="text-[#00f5ff] font-mono text-sm tracking-wider">CORE_COMPETENCIES</span>
              </div>
              
              <div className="space-y-4">
                {expertiseAreas.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300 font-mono">{area.name}</span>
                      <span className="text-sm text-[#00f5ff] font-mono">{area.level}%</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full rounded-full relative"
                        data-level={area.level}
                        style={{
                          background: `linear-gradient(90deg, #00f5ff, #ff00ff)`,
                          boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
