"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Rocket, Code, Cpu, ChevronRight, ChevronLeft, Terminal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Mission data types
interface Mission {
  id: string;
  title: string;
  period: string;
  status: "COMPLETED" | "ACTIVE" | "UPCOMING";
  type: "training" | "development" | "innovation";
  description: string;
  objectives: string[];
  technologies: string[];
}

// Realistic learning journey data
const missions: Mission[] = [
  {
    id: "MSN-001",
    title: "Foundation Protocol",
    period: "Jan 2022 - Jun 2022",
    status: "COMPLETED",
    type: "training",
    description: "Initial systems training and core web fundamentals",
    objectives: [
      "HTML5 semantic structure mastery",
      "CSS3 layouts and responsive design",
      "JavaScript fundamentals and DOM",
      "Version control with Git/GitHub",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    id: "MSN-002",
    title: "Python Exploration",
    period: "Jul 2022 - Dec 2022",
    status: "COMPLETED",
    type: "training",
    description: "Backend systems and automation protocols",
    objectives: [
      "Python syntax and data structures",
      "File handling and automation",
      "Basic API interactions",
      "Problem-solving algorithms",
    ],
    technologies: ["Python", "APIs", "Automation"],
  },
  {
    id: "MSN-003",
    title: "Framework Integration",
    period: "Jan 2023 - Aug 2023",
    status: "COMPLETED",
    type: "development",
    description: "Advanced frontend architecture deployment",
    objectives: [
      "React component architecture",
      "State management patterns",
      "Modern build tools workflow",
      "Responsive UI/UX design",
    ],
    technologies: ["React", "Tailwind CSS", "Vite"],
  },
  {
    id: "MSN-004",
    title: "Full-Stack Operations",
    period: "Sep 2023 - Apr 2024",
    status: "COMPLETED",
    type: "development",
    description: "End-to-end application deployment",
    objectives: [
      "Next.js App Router mastery",
      "Database design integration",
      "Authentication systems",
      "Production deployment",
    ],
    technologies: ["Next.js", "PostgreSQL", "Vercel"],
  },
  {
    id: "MSN-005",
    title: "AI Integration Protocol",
    period: "May 2024 - Dec 2024",
    status: "COMPLETED",
    type: "innovation",
    description: "Artificial intelligence system integration",
    objectives: [
      "AI API integration",
      "Prompt engineering",
      "Real-time data processing",
      "AI-enhanced UX patterns",
    ],
    technologies: ["OpenAI", "Gemini", "AI Tools"],
  },
  {
    id: "MSN-006",
    title: "Motion Systems",
    period: "Jan 2025 - Present",
    status: "ACTIVE",
    type: "innovation",
    description: "High-performance animation architecture",
    objectives: [
      "Framer Motion patterns",
      "Performance optimization",
      "3D-like CSS effects",
      "Accessibility animations",
    ],
    technologies: ["Framer Motion", "Canvas", "GSAP"],
  },
];

const typeConfig = {
  training: { color: "#3b82f6", icon: Terminal, label: "Training" },
  development: { color: "#10b981", icon: Code, label: "Development" },
  innovation: { color: "#a855f7", icon: Cpu, label: "Innovation" },
};

// Straight Connection Line Component
function StraightConnection({
  startX,
  startY,
  endX,
  endY,
  isInView,
  delay,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke={`url(#gradient-${delay})`}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.15 + 0.3,
        ease: "easeInOut"
      }}
    />
  );
}

// Mission Card Component
function MissionCard({ 
  mission, 
  index, 
  isInView,
  isExpanded,
  onToggle,
  cardRef,
}: { 
  mission: Mission; 
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const config = typeConfig[mission.type];
  const Icon = config.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      className="relative flex-shrink-0 w-[320px] group"
    >
      <motion.div
        layout
        whileHover={{ y: -8 }}
        onClick={onToggle}
        className={cn(
          "relative p-6 rounded-2xl cursor-pointer transition-colors duration-300",
          "bg-white/[0.03] backdrop-blur-xl border border-white/10",
          "hover:border-white/20 hover:bg-white/[0.05]",
          isExpanded && "border-white/30 bg-white/[0.06]",
          mission.status === "ACTIVE" && "border-green-500/30 bg-green-500/[0.03]"
        )}
        style={{
          boxShadow: mission.status === "ACTIVE" 
            ? `0 0 40px -10px ${config.color}40` 
            : isExpanded 
              ? `0 0 30px -10px ${config.color}30`
              : "none",
        }}
      >
        {/* Status indicator */}
        <div className="flex items-center justify-between mb-4">
          <span 
            className="font-mono text-[10px] tracking-wider px-2 py-1 rounded bg-white/5"
            style={{ color: config.color }}
          >
            {mission.id}
          </span>
          <div className="flex items-center gap-2">
            {mission.status === "ACTIVE" && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-500"
              />
            )}
            <span className={cn(
              "text-[10px] font-bold tracking-wider",
              mission.status === "ACTIVE" ? "text-green-400" : "text-secondary"
            )}>
              {mission.status}
            </span>
          </div>
        </div>

        {/* Mission type icon */}
        <motion.div 
          layout
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon size={20} style={{ color: config.color }} />
        </motion.div>

        {/* Title and period */}
        <motion.h3 layout className="text-lg font-bold mb-1">{mission.title}</motion.h3>
        <motion.p layout className="text-xs text-secondary mb-3 font-mono">{mission.period}</motion.p>
        
        {/* Description */}
        <motion.p layout className="text-sm text-secondary/80 mb-4 leading-relaxed">
          {mission.description}
        </motion.p>

        {/* Technologies */}
        <motion.div layout className="flex flex-wrap gap-2 mb-4">
          {mission.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-[10px] font-medium rounded-full bg-white/5 text-secondary"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Expandable objectives */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-secondary mb-3">
                  Mission Objectives
                </p>
                <ul className="space-y-2">
                  {mission.objectives.map((obj, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-xs text-secondary/70"
                    >
                      <Zap size={12} className="mt-0.5 text-accent flex-shrink-0" />
                      {obj}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <motion.div layout className="flex items-center justify-center mt-4 text-secondary/50">
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [connectionPoints, setConnectionPoints] = useState<{x: number; y: number}[]>([]);

  // Calculate connection points based on card positions
  const updateConnectionPoints = useCallback(() => {
    if (!scrollRef.current) return;
    
    const scrollRect = scrollRef.current.getBoundingClientRect();
    const scrollLeft = scrollRef.current.scrollLeft;
    
    const points = cardRefs.current.map((card) => {
      if (!card) return { x: 0, y: 0 };
      const rect = card.getBoundingClientRect();
      return {
        x: rect.right - scrollRect.left + scrollLeft,
        y: rect.top - scrollRect.top + rect.height / 2,
      };
    });
    
    setConnectionPoints(points);
  }, []);

  // Trigger update on scroll with requestAnimationFrame for smooth updates
  const handleScroll = useCallback(() => {
    requestAnimationFrame(updateConnectionPoints);
  }, [updateConnectionPoints]);

  // Update connection points on mount, scroll, and expand
  useEffect(() => {
    updateConnectionPoints();
    
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
    }
    
    window.addEventListener("resize", updateConnectionPoints);
    
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", updateConnectionPoints);
    };
  }, [updateConnectionPoints, handleScroll]);

  // Update when expanded state changes
  useEffect(() => {
    const timer = setTimeout(updateConnectionPoints, 350);
    return () => clearTimeout(timer);
  }, [expandedIndex, updateConnectionPoints]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Calculate stats
  const completedMissions = missions.filter(m => m.status === "COMPLETED").length;
  const totalTech = [...new Set(missions.flatMap(m => m.technologies))].length;
  const yearsActive = new Date().getFullYear() - 2022;

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="w-full py-24 px-6 overflow-hidden bg-[#030303]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mission Control Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <Rocket className="text-accent" size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold">
              Mission Control
            </span>
          </div>
          
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Learning Journey</h2>
          <p className="text-secondary max-w-xl">
            A chronological log of missions completed in the pursuit of full-stack mastery.
          </p>

          {/* Stats Panel */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-8 mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 w-fit"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{completedMissions}</div>
              <div className="text-[10px] uppercase tracking-wider text-secondary">Completed</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">1</div>
              <div className="text-[10px] uppercase tracking-wider text-secondary">Active</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{totalTech}</div>
              <div className="text-[10px] uppercase tracking-wider text-secondary">Technologies</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{yearsActive}+</div>
              <div className="text-[10px] uppercase tracking-wider text-secondary">Years</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {Object.entries(typeConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-secondary">{config.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Timeline with SVG Connections */}
        <div className="relative">
          {/* SVG Connection Lines */}
          <svg 
            ref={svgRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            <defs>
              {missions.map((_, i) => (
                <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={typeConfig[missions[i].type].color} stopOpacity="0.6" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor={typeConfig[missions[Math.min(i + 1, missions.length - 1)].type].color} stopOpacity="0.6" />
                </linearGradient>
              ))}
            </defs>
            
            {connectionPoints.length > 1 && connectionPoints.map((point, i) => {
              if (i >= connectionPoints.length - 1) return null;
              const nextPoint = connectionPoints[i + 1];
              if (!point || !nextPoint) return null;
              
              // Calculate start and end points
              const startX = point.x;
              const startY = point.y;
              const endX = nextPoint.x - 320; // Start of next card
              const endY = nextPoint.y;
              
              return (
                <StraightConnection
                  key={i}
                  startX={startX}
                  startY={startY}
                  endX={endX}
                  endY={endY}
                  isInView={isInView}
                  delay={i}
                />
              );
            })}
          </svg>

          {/* Cards Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide relative"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {missions.map((mission, index) => (
              <MissionCard 
                key={mission.id} 
                mission={mission} 
                index={index}
                isInView={isInView}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
                cardRef={(el) => { cardRefs.current[index] = el; }}
              />
            ))}
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="flex justify-between text-[10px] text-secondary mb-2 font-mono">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
            <span>PRESENT</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "90%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
