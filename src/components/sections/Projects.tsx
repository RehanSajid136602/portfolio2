"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CloudSun, Coins, Languages, Mail, Utensils, ExternalLink, Cpu, Sparkles, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Aether Weather",
    description: "Advanced atmospheric data visualization.",
    icon: <CloudSun className="text-blue-400" size={24} />,
    color: "bg-blue-500/10 border-blue-400/40 shadow-blue-500/20",
    link: "https://aether-weather-v2.vercel.app/",
  },
  {
    id: 2,
    title: "NeoExchange",
    description: "Modern currency exchange platform.",
    icon: <Coins className="text-emerald-400" size={24} />,
    color: "bg-emerald-500/10 border-emerald-400/40 shadow-emerald-500/20",
    link: "https://neoexchange-v2.vercel.app/",
  },
  {
    id: 3,
    title: "AI Translator",
    description: "Neural network translation engine.",
    icon: <Languages className="text-purple-400" size={24} />,
    color: "bg-purple-500/10 border-purple-400/40 shadow-purple-500/20",
    link: "https://ai-translator-v4.vercel.app/",
  },
  {
    id: 4,
    title: "Email Rewriter",
    description: "Tone optimization for professionals.",
    icon: <Mail className="text-orange-400" size={24} />,
    color: "bg-orange-500/10 border-orange-400/40 shadow-orange-500/20",
    link: "https://ai-email-rewriter-five.vercel.app/",
  },
  {
    id: 5,
    title: "Recipe Gen",
    description: "AI culinary assistant.",
    icon: <Utensils className="text-yellow-400" size={24} />,
    color: "bg-yellow-500/10 border-yellow-400/40 shadow-yellow-500/20",
    link: "https://ai-recipe-generator-v1.vercel.app/",
  },
  {
    id: 6,
    title: "Plan It",
    description: "Content scheduling & management.",
    icon: <Calendar className="text-pink-400" size={24} />,
    color: "bg-pink-500/10 border-pink-400/40 shadow-pink-500/20",
    link: "https://plan-it-v1.vercel.app/",
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Single orbit radius
  const ORBIT_RADIUS = 280;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 25,
      y: (e.clientY - rect.top - rect.height / 2) / 25,
    });
  };

  return (
    <section 
      id="projects" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 px-6 overflow-hidden min-h-[900px] flex flex-col items-center justify-center bg-[#030303]"
    >
      {/* 1. Deep Space Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
        {/* Animated Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 5 
            }}
            className="absolute h-1 w-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              x: mousePos.x * (Math.random() * 0.5),
              y: mousePos.y * (Math.random() * 0.5),
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center z-10 mb-20 relative"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4 backdrop-blur-md">
          <Sparkles size={14} className="text-accent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold">Project Universe</span>
        </div>
        <h2 className="text-4xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          The AI Ecosystem
        </h2>
      </motion.div>

      {!isMobile ? (
        <div 
          className="relative h-[800px] w-[800px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActiveProject(null);
          }}
        >
          {/* 2. Main Orbit Ring */}
          <div
            className={cn(
              "absolute rounded-full border border-white/5 transition-opacity duration-700 pointer-events-none",
              isPaused ? "opacity-100" : "opacity-30"
            )}
            style={{
              width: ORBIT_RADIUS * 2,
              height: ORBIT_RADIUS * 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          
          {/* Inner Decorative Ring */}
          <div className="absolute inset-[30%] rounded-full border border-white/5 opacity-20" />
          
          {/* Energy Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[10%] rounded-full border-[1px] border-dashed border-white/5 opacity-10 pointer-events-none" 
          />

          {/* 3. Central Core (The Sun) */}
          <motion.div 
            style={{ x: mousePos.x, y: mousePos.y }}
            className="absolute z-20 group cursor-pointer"
          >
            <div className="relative h-28 w-28 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all duration-500 group-hover:shadow-[0_0_80px_-10px_rgba(37,99,235,0.4)] group-hover:border-accent/50">
               {/* Pulsing Core */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
              />
              <Cpu className="text-white relative z-10" size={42} />
            </div>
          </motion.div>

          {/* 4. Orbiting Ecosystem */}
          <div className={cn(
            "absolute inset-0 w-full h-full transition-all duration-1000 animate-[spin_40s_linear_infinite]",
            isPaused && "[animation-play-state:paused]"
          )}>
            {projects.map((project, i) => {
              const angle = (i / projects.length) * 360;
              return (
                <div
                  key={project.id}
                  className="absolute top-1/2 left-1/2 -ml-10 -mt-10"
                  style={{
                    transform: `rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(-${angle}deg)`,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, y: -5 }}
                      onClick={() => window.open(project.link, "_blank")}
                      onMouseEnter={() => setActiveProject(project.id)}
                      className={cn(
                        "h-20 w-20 rounded-2xl border backdrop-blur-xl flex items-center justify-center transition-all duration-500 shadow-xl",
                        project.color,
                        activeProject === project.id ? "border-white bg-black z-50 ring-4 ring-white/10" : "bg-black/40 border-white/10"
                      )}
                    >
                      <div className="relative">
                        {activeProject === project.id && (
                          <motion.div
                            layoutId="glow"
                            className="absolute -inset-4 bg-inherit blur-xl opacity-50 -z-10"
                          />
                        )}
                        {project.icon}
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* 5. Holographic Detail Overlay */}
          <AnimatePresence>
            {activeProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute z-40 w-80 p-8 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/20 text-center shadow-2xl pointer-events-none"
              >
                {(() => {
                  const p = projects.find(p => p.id === activeProject);
                  if (!p) return null;
                  return (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex justify-center mb-4"
                      >
                        <div className={cn("p-4 rounded-2xl bg-white/5", p.color)}>
                          {p.icon}
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-sm text-secondary leading-relaxed mb-6">{p.description}</p>
                      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                        <span>Initialize Protocol</span>
                        <ExternalLink size={12} />
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Mobile View: Vertical Energy Stack */
        <div className="grid gap-6 w-full max-w-md z-10">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group flex items-center gap-5 p-6 rounded-2xl border bg-black/40 backdrop-blur-md transition-all active:scale-95 border-white/10 hover:border-white/30",
                project.color
              )}
            >
              <div className="p-4 rounded-xl bg-black/60 group-hover:scale-110 transition-transform">
                {project.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-secondary">{project.description}</p>
              </div>
              <ExternalLink className="opacity-30 group-hover:opacity-100 transition-opacity" size={20} />
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}