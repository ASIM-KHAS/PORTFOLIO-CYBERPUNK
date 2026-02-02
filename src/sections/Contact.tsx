import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  Send,
  ArrowUpRight,
  Terminal,
  Radio,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'LOCATION',
    value: 'RIYADH.SA',
    href: null,
    color: '#00f5ff',
  },
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'asim.khas@example.com',
    href: 'mailto:asim.khas@example.com',
    color: '#ff00ff',
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN',
    value: '/in/asimkhas',
    href: 'https://linkedin.com/in/asimkhas',
    color: '#00ff88',
  },
  {
    icon: Github,
    label: 'GITHUB',
    value: '/asimkhas',
    href: 'https://github.com/asimkhas',
    color: '#ffff00',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      // Contact info
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll('.contact-item');
        gsap.fromTo(items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Form
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(fields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'smooth',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ff00ff]/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Diagonal Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#00f5ff]/20 to-transparent transform -rotate-12 origin-top" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Radio className="w-6 h-6 text-[#00f5ff]" />
            <span className="text-[#00f5ff] font-mono text-sm tracking-wider">ESTABLISH_CONNECTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-white to-[#ff00ff]">
              INITIATE_CONTACT
            </span>
          </h2>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can architect solutions together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div ref={infoRef} className="space-y-6">
            <div className="card-cyber rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-5 h-5 text-[#00f5ff]" />
                <h3 className="text-lg font-bold font-['Orbitron'] text-[#00f5ff]">
                  CONTACT_NODES
                </h3>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="contact-item flex items-center gap-4 p-4 rounded-lg bg-[#0a0f1a] border border-[#1a1f2a] hover:border-opacity-50 transition-all group"
                    style={{ ['--hover-color' as string]: item.color }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all group-hover:scale-110"
                      style={{ 
                        borderColor: `${item.color}40`,
                        background: `${item.color}10`,
                      }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-mono tracking-wider mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-[#00f5ff] transition-colors flex items-center gap-1 font-mono"
                        >
                          {item.value}
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="text-white font-mono">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className="card-cyber rounded-lg p-6 border-l-4 border-[#00f5ff]">
              <Zap className="w-6 h-6 text-[#00f5ff] mb-3" />
              <p className="text-gray-300 italic font-mono text-sm">
                "I don't just write code; I design the secure, compliant engines that power the Saudi digital economy."
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="card-cyber rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                TRANSMIT_MESSAGE
              </h3>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div className="form-field">
                <label className="block text-xs text-gray-500 font-mono mb-2 tracking-wider">
                  IDENTIFIER
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-[#1a1f2a] text-white placeholder-gray-600 focus:border-[#00f5ff] focus:outline-none transition-all font-mono"
                    placeholder="Enter your designation"
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] transition-all duration-300 ${
                      focusedField === 'name' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-field">
                <label className="block text-xs text-gray-500 font-mono mb-2 tracking-wider">
                  COMMUNICATION_CHANNEL
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-[#1a1f2a] text-white placeholder-gray-600 focus:border-[#00f5ff] focus:outline-none transition-all font-mono"
                    placeholder="your@email.com"
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] transition-all duration-300 ${
                      focusedField === 'email' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-field">
                <label className="block text-xs text-gray-500 font-mono mb-2 tracking-wider">
                  MESSAGE_SUBJECT
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-[#1a1f2a] text-white placeholder-gray-600 focus:border-[#00f5ff] focus:outline-none transition-all font-mono"
                    placeholder="Project discussion"
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] transition-all duration-300 ${
                      focusedField === 'subject' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="form-field">
                <label className="block text-xs text-gray-500 font-mono mb-2 tracking-wider">
                  DATA_PAYLOAD
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-[#1a1f2a] text-white placeholder-gray-600 focus:border-[#00f5ff] focus:outline-none transition-all resize-none font-mono"
                    placeholder="Describe your project requirements..."
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] transition-all duration-300 ${
                      focusedField === 'message' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-lg font-bold font-['Orbitron'] tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-[#00ff88] text-black'
                    : 'bg-transparent border border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff] hover:text-black'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    TRANSMITTING...
                  </>
                ) : isSubmitted ? (
                  <>
                    MESSAGE_RECEIVED
                  </>
                ) : (
                  <>
                    TRANSMIT_MESSAGE
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
