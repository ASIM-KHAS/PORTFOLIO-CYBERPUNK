import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building, 
  MapPin, 
  Calendar, 
  CheckCircle2,
  Briefcase,
  Terminal,
  Radio,
  Database,
  Shield
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    category: 'REAL_ESTATE_FINTECH',
    icon: Building,
    color: '#00f5ff',
    items: [
      'Architected "Trustee" Escrow System with strict REGA compliance',
      'Engineered fund distribution logic for Master-to-Sub Account flows',
      'Designed REC system architecture for secure investment contributions',
    ],
  },
  {
    category: 'VIRTUAL_ACCOUNTS',
    icon: Database,
    color: '#ff00ff',
    items: [
      'Built high-volume Corporate Wallet Engine atop Core Banking layer',
      'Integrated Apache Kafka for async Credit/Debit transaction alerts',
      'Engineered COBO/POBO modules for fully functional Virtual IBANs',
      'Designed REST APIs for external ERP integration',
    ],
  },
  {
    category: 'LEADERSHIP_OPS',
    icon: Shield,
    color: '#00ff88',
    items: [
      'Acting Technical Team Lead for 8+ developers',
      'Implemented Denodo data virtualization patterns',
      'Trusted with L3 Production Support and DR Switch execution',
      'Executed MS SQL to Oracle migration with 100% integrity',
    ],
  },
];

const techStack = [
  { name: 'Spring Boot', level: 95 },
  { name: 'Microservices', level: 92 },
  { name: 'Angular', level: 90 },
  { name: 'SQL', level: 94 },
  { name: 'GitHub', level: 88 },
  { name: 'Java', level: 96 },
  { name: 'TypeScript', level: 87 },
  { name: 'OpenShift', level: 82 },
  { name: 'IBM MQ', level: 80 },
  { name: 'Data Migration', level: 90 },
  { name: 'Core Banking', level: 88 },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Main card
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Achievement items
      if (achievementsRef.current) {
        const items = achievementsRef.current.querySelectorAll('.achievement-block');
        gsap.fromTo(items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Tech stack tags
      if (techStackRef.current) {
        const tags = techStackRef.current.querySelectorAll('.tech-tag');
        gsap.fromTo(tags,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: techStackRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ff00ff]/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 hex-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <Radio className="w-6 h-6 text-[#00f5ff]" />
            <span className="text-[#00f5ff] font-mono text-sm tracking-wider">MISSION_LOG</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-white to-[#ff00ff]">
              PROFESSIONAL_JOURNEY
            </span>
          </h2>
          <p className="text-gray-400 font-mono">
            Building the future of banking, one system at a time
          </p>
        </div>

        {/* Experience Card */}
        <div
          ref={cardRef}
          className="card-cyber rounded-lg overflow-hidden perspective-1000"
        >
          {/* Card Header */}
          <div className="p-8 border-b border-[#00f5ff]/20 relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#00f5ff]" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#00f5ff]/20 to-[#ff00ff]/20 border border-[#00f5ff]/30 flex items-center justify-center relative overflow-hidden">
                  <Building className="w-10 h-10 text-[#00f5ff]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f5ff]/20 to-transparent -translate-x-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-['Orbitron'] text-white">ARAB_NATIONAL_BANK</h3>
                  <p className="text-[#ff00ff] font-mono text-sm tracking-wider">TECHNICAL_INTEGRATION_SPECIALIST</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-mono">
                <div className="flex items-center gap-2 glass-cyber px-3 py-2 rounded">
                  <Calendar className="w-4 h-4 text-[#00f5ff]" />
                  <span className="text-gray-300">2023.11 - PRESENT</span>
                </div>
                <div className="flex items-center gap-2 glass-cyber px-3 py-2 rounded">
                  <MapPin className="w-4 h-4 text-[#ff00ff]" />
                  <span className="text-gray-300">RIYADH.SA</span>
                </div>
                <div className="flex items-center gap-2 glass-cyber px-3 py-2 rounded">
                  <Briefcase className="w-4 h-4 text-[#00ff88]" />
                  <span className="text-gray-300">ON_SITE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <div ref={achievementsRef} className="grid md:grid-cols-3 gap-6">
              {achievements.map((section, index) => (
                <div
                  key={index}
                  className="achievement-block space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <section.icon 
                      className="w-5 h-5" 
                      style={{ color: section.color }}
                    />
                    <h4 
                      className="text-xs font-bold font-['Orbitron'] tracking-wider"
                      style={{ color: section.color }}
                    >
                      {section.category}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed group"
                      >
                        <CheckCircle2 
                          className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" 
                          style={{ color: section.color }}
                        />
                        <span className="group-hover:text-gray-300 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-10 pt-8 border-t border-[#00f5ff]/10">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-[#00f5ff]" />
                <h4 className="text-xs font-bold font-['Orbitron'] text-gray-500 tracking-wider">
                  TECH_STACK
                </h4>
              </div>
              <div ref={techStackRef} className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="tech-tag group relative"
                  >
                    <span className="px-3 py-1.5 rounded text-xs font-mono border border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] transition-all cursor-default">
                      {tech.name}
                    </span>
                    {/* Level indicator on hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0a0f1a] border border-[#00f5ff]/30 rounded text-xs font-mono text-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      PROFICIENCY: {tech.level}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contract Badge */}
        <div className="mt-6 flex justify-center">
          <div className="glass-cyber px-6 py-3 rounded-lg flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-mono">CONTRACT_ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <span className="text-sm text-[#00f5ff] font-mono">
              VIA: INTERLAND_TECHNOLOGY_SERVICES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
