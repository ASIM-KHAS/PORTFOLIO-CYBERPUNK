import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = {
  core: {
    name: 'CORE_STACK',
    icon: Cpu,
    color: '#00f5ff',
    skills: [
      { name: 'Java Spring Boot', level: 95 },
      { name: 'Angular', level: 90 },
      { name: 'Microservices', level: 92 },
      { name: 'TypeScript', level: 88 },
    ],
  },
  data: {
    name: 'DATA_INFRASTRUCTURE',
    icon: Zap,
    color: '#ff00ff',
    skills: [
      { name: 'Oracle Database', level: 90 },
      { name: 'Apache Kafka', level: 85 },
      { name: 'Denodo', level: 80 },
      { name: 'SQL / PL-SQL', level: 92 },
    ],
  },
  devops: {
    name: 'DEVOPS_TOOLS',
    icon: Shield,
    color: '#00ff88',
    skills: [
      { name: 'GitHub', level: 88 },
      { name: 'OpenShift', level: 82 },
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 80 },
      { name: 'IBM MQ', level: 78 },
    ],
  },
};



export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Category cards
      if (categoriesRef.current) {
        const cards = categoriesRef.current.querySelectorAll('.skill-category');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Progress bars
        cards.forEach((card) => {
          const bars = card.querySelectorAll('.skill-progress');
          bars.forEach((bar) => {
            const target = bar.getAttribute('data-level') || '0';
            gsap.fromTo(bar,
              { width: '0%' },
              {
                width: `${target}%`,
                duration: 1.5,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        });
      }

      // Orbital animation
      if (orbitRef.current) {
        const orbits = orbitRef.current.querySelectorAll('.orbit-ring');
        orbits.forEach((orbit, i) => {
          gsap.to(orbit, {
            rotation: i % 2 === 0 ? 360 : -360,
            duration: 30 + i * 10,
            repeat: -1,
            ease: 'none',
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#0a0f1a] to-[#02040a]" />
      
      {/* Orbital Rings Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
        <div className="absolute inset-0 border border-[#00f5ff]/20 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute inset-12 border border-[#ff00ff]/20 rounded-full animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        <div className="absolute inset-24 border border-[#00ff88]/20 rounded-full animate-spin" style={{ animationDuration: '90s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Cpu className="w-6 h-6 text-[#00f5ff]" />
            <span className="text-[#00f5ff] font-mono text-sm tracking-wider">TECHNICAL_ARSENAL</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-white to-[#ff00ff]">
              SYSTEM_CAPABILITIES
            </span>
          </h2>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            The tools and technologies I wield to build financial infrastructure
          </p>
        </div>

        {/* Skills Categories */}
        <div ref={categoriesRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div
              key={key}
              className="skill-category card-cyber rounded-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center border"
                  style={{ borderColor: category.color, background: `${category.color}10` }}
                >
                  <category.icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <h3 
                  className="text-lg font-bold font-['Orbitron']"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300 font-mono">{skill.name}</span>
                      <span 
                        className="text-sm font-mono"
                        style={{ color: category.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="skill-progress h-full rounded-full relative"
                        data-level={skill.level}
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          boxShadow: `0 0 10px ${category.color}50`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Orbital Visualization */}
        <div ref={orbitRef} className="relative h-64 flex items-center justify-center">
          {/* Central Core */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#ff00ff] flex items-center justify-center z-10 animate-pulse">
            <Cpu className="w-10 h-10 text-black" />
          </div>
          
          {/* Orbital Rings */}
          <div className="orbit-ring absolute w-48 h-48 rounded-full border border-[#00f5ff]/30">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#02040a] border border-[#00f5ff]/50 rounded text-xs font-mono text-[#00f5ff]">
              Java
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#02040a] border border-[#00f5ff]/50 rounded text-xs font-mono text-[#00f5ff]">
              Spring
            </div>
          </div>
          
          <div className="orbit-ring absolute w-72 h-72 rounded-full border border-[#ff00ff]/30">
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 px-2 py-1 bg-[#02040a] border border-[#ff00ff]/50 rounded text-xs font-mono text-[#ff00ff]">
              Angular
            </div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 px-2 py-1 bg-[#02040a] border border-[#ff00ff]/50 rounded text-xs font-mono text-[#ff00ff]">
              Kafka
            </div>
          </div>
          
          <div className="orbit-ring absolute w-96 h-96 rounded-full border border-[#00ff88]/30">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#02040a] border border-[#00ff88]/50 rounded text-xs font-mono text-[#00ff88]">
              Oracle
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#02040a] border border-[#00ff88]/50 rounded text-xs font-mono text-[#00ff88]">
              Docker
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
