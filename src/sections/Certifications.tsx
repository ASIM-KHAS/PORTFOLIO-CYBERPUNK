import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Calendar, BadgeCheck, Cpu, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: 'Architecting with Google Compute Engine',
    subtitle: 'SPECIALIZATION',
    issuer: 'Coursera',
    date: '2021.08',
    credential: 'LBPWDSDHXPCQ',
    icon: Award,
    color: '#00f5ff',
    gradient: 'from-[#00f5ff] to-[#0080ff]',
  },
  {
    id: 2,
    title: 'Introduction to Data Engineering',
    subtitle: 'CERTIFICATION',
    issuer: 'Coursera',
    date: '2022.04',
    credential: 'X7UYWB28HBB2',
    icon: BadgeCheck,
    color: '#ff00ff',
    gradient: 'from-[#ff00ff] to-[#b026ff]',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

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

      // Cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.cert-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Education
      gsap.fromTo(educationRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#0a0f1a] to-[#02040a]" />
      <div className="absolute inset-0 hex-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Award className="w-6 h-6 text-[#00f5ff]" />
            <span className="text-[#00f5ff] font-mono text-sm tracking-wider">CREDENTIAL_DATABASE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-white to-[#ff00ff]">
              CERTIFICATIONS
            </span>
          </h2>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            Continuous learning, validated expertise
          </p>
        </div>

        {/* Certification Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card group relative card-cyber rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* Holographic Effect */}
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Gradient Border */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}20, transparent)`,
                }}
              />

              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  {/* Badge */}
                  <div 
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                    style={{ boxShadow: `0 0 30px ${cert.color}40` }}
                  >
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ 
                          background: `${cert.color}20`,
                          color: cert.color,
                        }}
                      >
                        {cert.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold font-['Orbitron'] text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                      style={{ 
                        ['--tw-gradient-from' as string]: cert.color,
                        ['--tw-gradient-to' as string]: `${cert.color}80`,
                      }}
                    >
                      {cert.title}
                    </h3>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="font-mono">ISSUER:</span>
                        <span style={{ color: cert.color }}>{cert.issuer}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span className="font-mono">{cert.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 font-mono text-xs">
                        <span>ID:</span>
                        <span className="tracking-wider">{cert.credential}</span>
                      </div>
                    </div>

                    {/* Verify Button */}
                    <button 
                      className="mt-4 flex items-center gap-2 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: cert.color }}
                    >
                      <span>VERIFY_CREDENTIAL</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div 
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: cert.color }}
              />
              <div 
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: cert.color }}
              />
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div 
          ref={educationRef}
          className="card-cyber rounded-lg p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-[#00ff88]" />
            <h3 className="text-xl font-bold font-['Orbitron'] text-[#00ff88]">
              EDUCATION_RECORD
            </h3>
          </div>
          
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-7 h-7 text-[#00ff88]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-['Orbitron'] mb-1">
                BACHELOR_OF_TECHNOLOGY
              </h4>
              <p className="text-[#00ff88] font-mono text-sm mb-2">
                COMPUTER_SCIENCE
              </p>
              <p className="text-gray-400 text-sm">
                Rajadhani Institute of Engineering and Technology
              </p>
              <p className="text-gray-600 font-mono text-sm mt-1">
                2018 - 2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
