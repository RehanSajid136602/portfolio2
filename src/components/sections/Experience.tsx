"use client";

import { useRef, useCallback, memo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Code, Cpu, ChevronRight, Terminal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Optimized spring configurations for smooth performance
const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  snappy: { type: "spring", stiffness: 300, damping: 25 },
  smooth: { type: "spring", stiffness: 100, damping: 20 },
};

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
  link?: string;
  theme?: string;
}

// Learning journey data
const missions: Mission[] = [
  {
    id: "001",
    title: "Web Development Basics",
    period: "Jan 2022 - Jun 2022",
    status: "COMPLETED",
    type: "training",
    description: "Learned core web technologies and development fundamentals",
    objectives: [
      "HTML5 and semantic markup",
      "CSS layouts and responsive design",
      "JavaScript fundamentals and DOM manipulation",
      "Version control with Git and GitHub",
    ],
    technologies: ["HTML", "CSS", "JS"],
    link: "https://github.com",
    theme: "from-blue-600/20 to-indigo-600/5",
  },
  {
    id: "002",
    title: "Python & Backend Development",
    period: "Jul 2022 - Dec 2022",
    status: "COMPLETED",
    type: "training",
    description: "Learned Python programming and backend development",
    objectives: [
      "Python syntax and data structures",
      "File handling and automation",
      "Basic API interactions",
      "Problem-solving algorithms",
    ],
    technologies: ["Python", "APIs", "CLI"],
    link: "https://github.com",
    theme: "from-yellow-600/20 to-orange-600/5",
  },
  {
    id: "003",
    title: "Frontend Framework Mastery",
    period: "Jan 2023 - Aug 2023",
    status: "COMPLETED",
    type: "development",
    description: "Mastered React and modern frontend development",
    objectives: [
      "React component architecture",
      "State management patterns",
      "Modern build tools workflow",
      "Responsive UI/UX design",
    ],
    technologies: ["React", "Tailwind", "Vite"],
    link: "https://github.com",
    theme: "from-cyan-600/20 to-blue-600/5",
  },
  {
    id: "004",
    title: "Full-Stack Development",
    period: "Sep 2023 - Apr 2024",
    status: "COMPLETED",
    type: "development",
    description: "Built complete web applications with databases and authentication",
    objectives: [
      "Next.js App Router mastery",
      "Database design and integration",
      "Authentication systems",
      "Production deployment",
    ],
    technologies: ["Next.js", "PGSQL", "Vercel"],
    link: "https://github.com",
    theme: "from-emerald-600/20 to-teal-600/5",
  },
  {
    id: "005",
    title: "AI-Powered Applications",
    period: "May 2024 - Dec 2024",
    status: "COMPLETED",
    type: "innovation",
    description: "Built applications with AI capabilities using OpenAI and Gemini",
    objectives: [
      "AI API integration",
      "Prompt engineering",
      "Real-time data processing",
      "AI-enhanced user experiences",
    ],
    technologies: ["OpenAI", "Gemini", "LLMs"],
    link: "https://github.com",
    theme: "from-purple-600/20 to-pink-600/5",
  },
  {
    id: "006",
    title: "Advanced Animations & Motion",
    period: "Jan 2025 - Present",
    status: "ACTIVE",
    type: "innovation",
    description: "Creating smooth, high-performance animations for web interfaces",
    objectives: [
      "Framer Motion patterns",
      "Performance optimization",
      "3D-like CSS effects",
      "Accessible animations",
    ],
    technologies: ["Framer", "GSAP", "Three"],
    link: "https://github.com",
    theme: "from-red-600/20 to-rose-600/5",
  },
];

const typeConfig = {
  training: { color: "#3b82f6", icon: Terminal, label: "Training" },
  development: { color: "#10b981", icon: Code, label: "Development" },
  innovation: { color: "#a855f7", icon: Cpu, label: "Innovation" },
};

import { ScrollSection } from "@/components/ui/ScrollSection";

// Optimized Experience Section with better performance
export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleMission = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  return (
    <ScrollSection
      id="experience"
      className="w-full py-section-y px-section-x overflow-hidden bg-[#030303] border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        {/* Section Header */}
        <m.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 border-l-2 border-accent pl-6"
        >
          <div className="flex items-center gap-2.5 mb-3">
           <span className="text-xs font-sans text-accent">
             Mission Log
           </span>
          </div>
          
           <h2 className="text-4xl md:text-6xl font-black font-sans tracking-tight text-white mb-6">
             Experience <span className="text-zinc-800 text-stroke">Timeline</span>
           </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 w-full md:w-fit mb-10">
            {[
              { label: "Missions", value: missions.length.toString().padStart(2, '0'), color: "text-white" },
              { label: "Active", value: missions.filter(m => m.status === "ACTIVE").length.toString(), color: "text-green-500" },
              { label: "Completed", value: missions.filter(m => m.status === "COMPLETED").length.toString(), color: "text-blue-500" },
              { label: "Years", value: "4+", color: "text-zinc-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#030303] p-3.5 min-w-[120px]">
                <div className={`text-xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[8px] font-mono uppercase tracking-wider text-zinc-600 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="font-sans text-xs text-zinc-500 max-w-lg leading-relaxed">
            A chronological record of technical milestones, training programs, and innovation sprints.
          </p>
        </m.div>

        {/* Mission Cards - Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-8 -mx-section-x px-section-x will-change-scroll scrollbar-hide">
          {missions.map((mission, i) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              index={i}
              isExpanded={expandedId === mission.id}
              onToggle={() => toggleMission(mission.id)}
            />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

// Optimized Mission Card with memoization
const MissionCard = memo(function MissionCard({ 
  mission, 
  index, 
  isExpanded,
  onToggle,
}: { 
  mission: Mission; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const config = typeConfig[mission.type];
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.08, 0.3),
        ease: "easeOut",
      }}
      className="relative flex-shrink-0 w-[340px] will-change-transform"
    >
      <div
        className={cn(
          "relative flex flex-col bg-zinc-950 border border-zinc-900 overflow-hidden transition-colors duration-300",
          isExpanded && "border-accent/60"
        )}
      >
        {/* Visual Aperture (Optimized) */}
        <div 
          className="relative h-44 w-full overflow-hidden border-b border-zinc-900 cursor-pointer bg-zinc-950"
          onClick={onToggle}
        >
          {/* Gradient Background */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-25 transition-opacity duration-500",
              mission.theme,
              "group-hover:opacity-35"
            )} 
          />
          
          {/* Simplified Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Pulsing Center - Optimized */}
          <m.div 
            className="absolute inset-0 flex items-center justify-center opacity-20"
            animate={{ scale: [0.95, 1.05], opacity: [0.15, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <div className="w-20 h-20 border border-white/15 rounded-full flex items-center justify-center" />
          </m.div>
          
          {/* Data Overlay */}
          <div className="absolute top-2 left-2">
            <div className="px-1.5 py-0.5 bg-black/60 border border-white/10 text-[8px] text-white/40 font-sans">
              {mission.type}
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-50" />
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
           <div className="flex items-center justify-between font-sans">
             <span className="text-[10px] text-zinc-500">{mission.id}</span>
            <div className="flex items-center gap-2">
              {mission.status === "ACTIVE" && (
                <div className="w-1.5 h-1.5 bg-green-500/80 rounded-full" />
              )}
            </div>
           </div>

           <div>
             <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-none mb-1 transition-colors duration-300">
               {mission.title}
             </h3>
             <p className="text-[9px] font-sans text-zinc-600">
               {mission.period}
             </p>
           </div>
           
           <p className="text-xs text-zinc-500 font-sans leading-relaxed line-clamp-2">
             {mission.description}
           </p>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
             <div className="flex gap-1">
                 {mission.technologies.slice(0, 3).map(tech => (
                   <span key={tech} className="text-[8px] font-mono text-zinc-600 border border-zinc-900 px-1.5 py-0.5">
                     {tech}
                   </span>
                 ))}
             </div>
             
             <div className="flex items-center gap-2">
               {mission.link && (
                 <a 
                   href={mission.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="p-1.5 bg-white/10 text-white/70 hover:bg-white hover:text-black transition-colors rounded-sm"
                 >
                   <Zap size={12} />
                 </a>
               )}
               <button 
                 onClick={onToggle}
                 className="p-1.5 border border-zinc-800 hover:border-zinc-600 transition-colors"
               >
                 <ChevronRight className={cn("transition-transform duration-300", isExpanded && "rotate-90")} size={12} />
               </button>
             </div>
          </div>
        </div>

        {/* Expansion Details - Optimized max-height animation */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 300 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5">
                <div className="pt-3 mt-2 border-t border-zinc-900 border-dashed">
                  <ul className="space-y-2">
                     {mission.objectives.map((obj, i) => (
                       <m.li
                         key={i}
                         initial={{ opacity: 0, x: -3 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.03 }}
                         className="flex items-start gap-2.5 text-[9px] font-sans text-zinc-500"
                       >
                         <span className="text-accent/60 mt-0.5">•</span>
                         {obj}
                       </m.li>
                     ))}
                  </ul>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
});