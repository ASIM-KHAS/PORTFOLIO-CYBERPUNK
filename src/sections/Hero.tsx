import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowDown, Download, Cpu, Shield, Zap } from 'lucide-react';

// Cyber Grid Floor
function CyberGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 10;
    }
  });

  return (
    <group>
      {/* Infinite Grid */}
      <gridHelper
        ref={gridRef}
        args={[100, 100, '#00f5ff', '#00f5ff']}
        position={[0, -5, 0]}
      />
      
      {/* Glowing floor plane */}
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.1, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Floating Data Particles
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const count = 300;
    const cols = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#ff00ff'),
      new THREE.Color('#b026ff'),
    ];
    
    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < 300; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
      positions[i3] += Math.cos(time * 0.5 + i * 0.05) * 0.001;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Holographic Rings
function HolographicRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {[1, 2, 3].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[i * 3, i * 3 + 0.05, 64]} />
          <meshBasicMaterial 
            color={i === 1 ? '#00f5ff' : i === 2 ? '#ff00ff' : '#b026ff'}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating Code Snippets
function CodeMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 4, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00f5ff';
      ctx.font = `${fontSize}px 'JetBrains Mono'`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
    />
  );
}

// Scanning Line Effect
function ScanLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!lineRef.current) return;
    
    gsap.to(lineRef.current, {
      top: '100%',
      duration: 4,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div
      ref={lineRef}
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent z-20 pointer-events-none"
      style={{ top: 0, boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff' }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Name glitch reveal
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(chars,
          { opacity: 0, y: 50, skewX: 20 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.1, stagger: 0.05 },
          0.5
        );
      }

      // Title decode effect
      tl.fromTo(titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        1.2
      );

      // Description
      tl.fromTo(descRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
        1.5
      );

      // Stats
      tl.fromTo(statsRef.current?.children || [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        1.8
      );

      // CTAs
      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        2.2
      );

      // Image hologram effect
      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: 45 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1 },
        0.8
      );

      // Scroll parallax
      gsap.to(nameRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Matrix Code Background */}
      <CodeMatrix />

      {/* Three.js Background */}
      <div className="absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#00f5ff" intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.5} />
          <DataParticles />
          <HolographicRings />
          <CyberGrid />
        </Canvas>
      </div>

      {/* Scanning Line */}
      <ScanLine />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-[#02040a]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,#02040a_70%)]" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-[2] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            {/* Status Bar */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="text-[#00ff88]">SYSTEM.ONLINE</span>
              </div>
              <div className="text-gray-600">|</div>
              <div className="text-[#00f5ff]">RIYADH.SA</div>
              <div className="text-gray-600">|</div>
              <div className="text-[#ff00ff]">FINTECH.ARCHITECT</div>
            </div>

            {/* Name */}
            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-['Orbitron'] leading-none"
            >
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#0080ff]" style={{ textShadow: '0 0 40px rgba(0, 245, 255, 0.5)' }}>
                A
              </span>
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#0080ff]" style={{ textShadow: '0 0 40px rgba(0, 245, 255, 0.5)' }}>
                S
              </span>
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#0080ff]" style={{ textShadow: '0 0 40px rgba(0, 245, 255, 0.5)' }}>
                I
              </span>
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#0080ff]" style={{ textShadow: '0 0 40px rgba(0, 245, 255, 0.5)' }}>
                M
              </span>
              <br />
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#b026ff]" style={{ textShadow: '0 0 40px rgba(255, 0, 255, 0.5)' }}>
                K
              </span>
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#b026ff]" style={{ textShadow: '0 0 40px rgba(255, 0, 255, 0.5)' }}>
                H
              </span>
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#b026ff]" style={{ textShadow: '0 0 40px rgba(255, 0, 255, 0.5)' }}>
                A
              </span>
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#b026ff]" style={{ textShadow: '0 0 40px rgba(255, 0, 255, 0.5)' }}>
                S
              </span>
            </h1>

            {/* Title with typing effect */}
            <div ref={titleRef} className="space-y-2">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-[#00f5ff]" />
                <span className="text-lg text-[#00f5ff] font-mono tracking-wider">
                  TECHNICAL_INTEGRATION_SPECIALIST
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#ff00ff]" />
                <span className="text-base text-[#ff00ff] font-mono tracking-wider">
                  SOLUTION_DESIGN | REAL_ESTATE_FINTECH | VIRTUAL_ACCOUNTS
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-gray-400 text-base leading-relaxed max-w-xl border-l-2 border-[#00f5ff] pl-4"
            >
              Architecting secure, compliant engines that power the Saudi digital economy. 
              From REGA-compliant Real Estate systems to high-volume Virtual Account platforms, 
              bridging business vision with technical execution.
            </p>

            {/* Quick Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-4">
              <div className="glass-cyber px-4 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00f5ff]" />
                <span className="text-sm font-mono"><span className="text-[#00f5ff]">2+</span> YEARS_EXP</span>
              </div>
              <div className="glass-cyber-pink px-4 py-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#ff00ff]" />
                <span className="text-sm font-mono"><span className="text-[#ff00ff]">8+</span> TEAM_SIZE</span>
              </div>
              <div className="glass-cyber px-4 py-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00ff88]" />
                <span className="text-sm font-mono"><span className="text-[#00ff88]">100%</span> UPTIME</span>
              </div>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToAbout}
                className="group relative px-8 py-4 bg-transparent border border-[#00f5ff] text-[#00f5ff] font-['Orbitron'] tracking-wider overflow-hidden transition-all duration-300 hover:text-black"
              >
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORE_SYSTEM
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#00f5ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              <button
                className="group relative px-8 py-4 bg-transparent border border-[#ff00ff] text-[#ff00ff] font-['Orbitron'] tracking-wider overflow-hidden transition-all duration-300 hover:text-black"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  DOWNLOAD_DATAPACK
                </span>
                <div className="absolute inset-0 bg-[#ff00ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Column - Holographic Profile */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative perspective-1000"
            >
              {/* Holographic Frame */}
              <div className="relative w-80 h-[28rem] lg:w-96 lg:h-[32rem]">
                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00f5ff]/20 via-[#ff00ff]/20 to-[#00f5ff]/20 rounded-lg blur-xl animate-pulse" />
                
                {/* Corner Brackets */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#00f5ff]" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#00f5ff]" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#ff00ff]" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#ff00ff]" />
                
                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#00f5ff]/30">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 245, 255, 0.03) 2px, rgba(0, 245, 255, 0.03) 4px)',
                    }}
                  />
                  
                  <img
                    src="/profile.jpg"
                    alt="Asim Khas"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.1) saturate(0.9)' }}
                  />
                  
                  {/* Holographic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00f5ff]/20 via-transparent to-[#ff00ff]/10" />
                  
                  {/* Data readout */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="glass-cyber p-3 rounded">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#00f5ff]">ID: ASIM.KHAS</span>
                        <span className="text-[#00ff88]">● ACTIVE</span>
                      </div>
                      <div className="mt-1 h-1 bg-[#1a1a1a] rounded overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating data points */}
                <div className="absolute -right-8 top-1/4 glass-cyber px-3 py-2 rounded text-xs font-mono text-[#00f5ff]">
                  LVL.99
                </div>
                <div className="absolute -left-8 bottom-1/3 glass-cyber-pink px-3 py-2 rounded text-xs font-mono text-[#ff00ff]">
                  ANB.CONTRACT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Data Stream */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#02040a] to-transparent z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-mono text-gray-600">
          <span>SYS.VER: 2.0.25</span>
          <span className="animate-pulse text-[#00f5ff]">AWAITING_INPUT...</span>
          <span>SECURE_CONNECTION</span>
        </div>
      </div>
    </section>
  );
}
