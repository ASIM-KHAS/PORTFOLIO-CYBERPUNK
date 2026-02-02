import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Wallet, 
  Lightbulb, 
  Landmark, 
  Database, 
  Users,
  ChevronRight,
  Cpu,
  Lock,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    id: 1,
    icon: Building2,
    title: 'REAL_ESTATE_FINTECH',
    subtitle: 'REGA-COMPLIANT SYSTEMS',
    description: 'Off-Plan Sales (Wafi) and Real Estate Contributions (REC)',
    details: 'Deep operational expertise in building escrow systems, fund distribution logic, and regulatory compliance frameworks that ensure strict adherence to Saudi REGA regulations.',
    image: '/real-estate-tech.jpg',
    color: '#00f5ff',
    features: ['Trustee Escrow', 'Fund Distribution', 'REGA Compliance'],
  },
  {
    id: 2,
    icon: Wallet,
    title: 'VIRTUAL_ACCOUNTS',
    subtitle: 'VAS / COBO / POBO',
    description: 'High-volume VAS, COBO/POBO engines, Digital Wallets',
    details: 'Architecting Corporate Wallet Engines with Collections/Payments On-Behalf-Of capabilities, enabling seamless liquidity management for enterprise clients.',
    image: '/virtual-accounts.jpg',
    color: '#ff00ff',
    features: ['Virtual IBANs', 'COBO/POBO', 'Liquidity Management'],
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'SOLUTION_DESIGN',
    subtitle: 'END-TO-END ARCHITECTURE',
    description: 'From requirements to deployment',
    details: 'Translating raw business requirements into fully architected solutions, defining Oracle Data Models, API Contracts, and Angular UI Workflows.',
    image: '/fintech-bg.jpg',
    color: '#00ff88',
    features: ['Data Modeling', 'API Design', 'UI/UX Flows'],
  },
  {
    id: 4,
    icon: Landmark,
    title: 'CORE_BANKING',
    subtitle: 'BANKING_INTEGRATION',
    description: 'Deep integration with banking systems and processes',
    details: 'Expert-level understanding of core banking operations, transaction processing, and financial product integration within enterprise environments.',
    image: '/fintech-bg.jpg',
    color: '#ffff00',
    features: ['Transaction Processing', 'Product Integration', 'Core Systems'],
  },
  {
    id: 5,
    icon: Database,
    title: 'DATA_MIGRATION',
    subtitle: 'ETL_PIPELINES',
    description: 'Complex ETL pipelines, MS SQL to Oracle migrations',
    details: 'Executing complex database migrations with custom ETL scripts, ensuring 100% data integrity and zero-downtime transitions.',
    image: '/fintech-bg.jpg',
    color: '#b026ff',
    features: ['MS SQL → Oracle', 'ETL Scripts', 'Data Integrity'],
  },
  {
    id: 6,
    icon: Users,
    title: 'TECH_LEADERSHIP',
    subtitle: 'TEAM_MANAGEMENT',
    description: 'Leading teams of 8+ developers',
    details: 'Acting Technical Team Lead, translating requirements into technical specs and overseeing delivery of high-stakes banking projects.',
    image: '/fintech-bg.jpg',
    color: '#ff6600',
    features: ['Team Leadership', 'Technical Specs', 'Project Delivery'],
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.expertise-card');
        gsap.fromTo(cards,
          { y: 60, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
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
      id="expertise"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#0a0f1a] to-[#02040a]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <Cpu className="w-6 h-6 text-[#ff00ff]" />
            <span className="text-[#ff00ff] font-mono text-sm tracking-wider">DOMAIN_MATRIX</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]">
              DOMAINS_OF_EXCELLENCE
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl font-mono">
            Specialized expertise forged in the demanding environment of Saudi banking
          </p>
        </div>

        {/* Expertise Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {expertiseData.map((item) => (
            <div
              key={item.id}
              className="expertise-card group relative card-cyber rounded-lg overflow-hidden cursor-pointer preserve-3d"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20 0%, transparent 50%, #02040a 100%)`,
                  }}
                />
              </div>

              {/* Holographic Overlay */}
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Content */}
              <div className="relative p-6 h-full flex flex-col min-h-[320px]">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      borderColor: item.color,
                      boxShadow: `0 0 20px ${item.color}40`,
                      background: `${item.color}10`,
                    }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  
                  {/* Module ID */}
                  <div className="text-xs font-mono text-gray-500">
                    MOD.0{item.id}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 
                    className="text-xl font-bold font-['Orbitron'] mb-1 transition-colors"
                    style={{ color: hoveredCard === item.id ? item.color : 'white' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: item.color }}>
                    {item.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {item.description}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-mono rounded border"
                      style={{ 
                        borderColor: `${item.color}40`,
                        color: item.color,
                        background: `${item.color}10`,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Expanded Details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeCard === item.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div 
                    className="pt-4 border-t text-sm leading-relaxed"
                    style={{ borderColor: `${item.color}30`, color: '#aaa' }}
                  >
                    {item.details}
                  </div>
                </div>

                {/* Action */}
                <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-mono" style={{ color: item.color }}>
                  <span>{activeCard === item.id ? 'COLLAPSE' : 'EXPAND'}</span>
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform ${activeCard === item.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                  />
                </div>
              </div>

              {/* Corner Accents */}
              <div 
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: item.color }}
              />
              <div 
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: item.color }}
              />

              {/* Status Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#00ff88]" />
            <span className="text-gray-400 font-mono text-sm">BANKING_GRADE_SECURITY</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#00f5ff]" />
            <span className="text-gray-400 font-mono text-sm">SAUDI_REGA_COMPLIANT</span>
          </div>
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#ff00ff]" />
            <span className="text-gray-400 font-mono text-sm">ENTERPRISE_SCALE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
