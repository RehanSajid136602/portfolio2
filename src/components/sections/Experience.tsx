"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code, Cpu, ChevronRight, ChevronLeft, Terminal, Zap } from "lucide-react";
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
      className="w-full py-32 px-6 overflow-hidden bg-black border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Brutalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-16 border-l-2 border-accent pl-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
              // Execution_History
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black font-mono tracking-tighter uppercase text-white mb-6">
            System_Logs
          </h2>
          <p className="font-mono text-sm text-zinc-500 max-w-xl">
            &gt; RETRIEVING CHRONOLOGICAL DATA STREAMS...<br/>
            &gt; PARSING MISSION OBJECTIVES...
          </p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 mt-8 border border-zinc-900 w-full md:w-fit"
          >
            {[
              { label: "Missions_Complete", value: completedMissions, color: "text-white" },
              { label: "Active_Threads", value: "1", color: "text-green-500" },
              { label: "Tech_Stack_Size", value: totalTech, color: "text-purple-500" },
              { label: "Runtime_Years", value: `${yearsActive}+`, color: "text-blue-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-black p-4 min-w-[140px]">
                <div className={`text-3xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="flex items-center justify-between mb-8 font-mono text-xs">
          <div className="flex items-center gap-6">
            {Object.entries(typeConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div 
                  className="w-3 h-3 border" 
                  style={{ borderColor: config.color, backgroundColor: 'transparent' }}
                />
                <span className="uppercase tracking-wider">{config.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-px bg-zinc-800 border border-zinc-800">
            <button
              onClick={() => scroll("left")}
              className="p-3 bg-black hover:bg-zinc-900 transition-colors text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 bg-black hover:bg-zinc-900 transition-colors text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Timeline */}
        <div className="relative">
          {/* SVG Lines - Simplified */}
          <svg 
            ref={svgRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            {connectionPoints.length > 1 && connectionPoints.map((point, i) => {
              if (i >= connectionPoints.length - 1) return null;
              const nextPoint = connectionPoints[i + 1];
              if (!point || !nextPoint) return null;
              
              return (
                <motion.line
                  key={i}
                  x1={point.x}
                  y1={point.y}
                  x2={nextPoint.x - 320}
                  y2={nextPoint.y}
                  stroke="#333"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide relative pl-1"
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

        {/* Timeline Progress Bar - Technical */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 border-t border-zinc-900 pt-4"
        >
          <div className="flex justify-between text-[10px] text-zinc-600 font-mono tracking-widest mb-2">
            <span>INIT_2022</span>
            <span>v2023.0</span>
            <span>v2024.0</span>
            <span>v2025.0</span>
            <span>CURRENT_STATE</span>
          </div>
          <div className="h-px bg-zinc-800 w-full relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              className="h-full bg-accent origin-left w-full absolute top-0 left-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Updated Mission Card for Brutalist look
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
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "circOut",
      }}
      className="relative flex-shrink-0 w-[320px] group"
    >
      <motion.div
        layout
        onClick={onToggle}
        className={cn(
          "relative p-6 cursor-pointer transition-all duration-300 bg-black border border-zinc-800 hover:border-zinc-600",
          isExpanded && "border-accent ring-1 ring-accent"
        )}
      >
        {/* Header Data */}
        <div className="flex items-center justify-between mb-6 font-mono border-b border-zinc-900 pb-4">
          <span className="text-xs text-zinc-500">[{mission.id}]</span>
          <div className="flex items-center gap-2">
            {mission.status === "ACTIVE" && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
            <span className={cn(
              "text-[10px] font-bold tracking-wider uppercase",
              mission.status === "ACTIVE" ? "text-green-500" : "text-zinc-600"
            )}>
              {mission.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <motion.h3 layout className="text-xl font-bold font-mono uppercase text-white leading-none mb-2">
              {mission.title}
            </motion.h3>
            <motion.p layout className="text-[10px] font-mono text-accent uppercase tracking-wider">
              {mission.period}
            </motion.p>
          </div>
          
          <motion.p layout className="text-sm text-zinc-400 font-mono leading-relaxed border-l-2 border-zinc-800 pl-3">
            {mission.description}
          </motion.p>

          <motion.div layout className="flex flex-wrap gap-2">
            {mission.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono border border-zinc-800 text-zinc-500 uppercase hover:text-white hover:border-zinc-600 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Expansion */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-dashed border-zinc-800">
                <p className="text-[10px] uppercase font-mono text-zinc-500 mb-4">
                  // Mission_Objectives
                </p>
                <ul className="space-y-3">
                  {mission.objectives.map((obj, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-xs font-mono text-zinc-400"
                    >
                      <span className="text-accent mt-px">&gt;</span>
                      {obj}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout 
          className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={14} className="text-zinc-500" />
        </motion.div>
      </motion.div>
      
      {/* Decorative corner */}
      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-zinc-700" />
    </motion.div>
  );
}