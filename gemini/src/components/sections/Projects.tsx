"use client";

import { m } from "framer-motion";
import { ExternalLink, Code2, Layers } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollSection } from "@/components/ui/ScrollSection";

// Custom Tactical SVGs
const Icons = {
  Weather: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white/20">
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3" />
      <path d="M17.5 19a3 3 0 0 0 3-3c0-1.3-.8-2.4-2-2.8" />
      <path d="M12.5 13.2a4 4 0 1 0-5 0" />
      <path d="M12 12v-2" strokeDasharray="2 2" />
      <circle cx="12" cy="6" r="2" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
    </svg>
  ),
  Exchange: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white/20">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      <path d="M18.7 8h-4" />
      <path d="M18.7 8v4" />
      <rect x="10" y="3" width="4" height="4" strokeDasharray="2 2" />
      <rect x="5" y="16" width="4" height="4" strokeDasharray="2 2" />
    </svg>
  ),
  Translator: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white/20">
      <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
      <path d="M9 9l6 6" />
      <path d="M15 9l-6 6" />
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white/20">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="M7 15l-3 3" />
      <path d="M17 15l3 3" />
      <circle cx="12" cy="12" r="3" strokeDasharray="2 2" />
    </svg>
  ),
  PlanIt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white/20">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="14" r="2" strokeDasharray="2 2" />
    </svg>
  ),
  CodeFlowchart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white/20">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4" />
      <path d="M17 10v4" />
      <path d="M10 14v4" />
      <path d="M7 17.5h4" />
    </svg>
  ),
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  metrics: string;
  theme: string;
  accent: string;
  icon: React.ElementType;
  link: string;
  github: string;
  span: string;
}

const projects: Project[] = [
  {
    title: "Code2Flowchart",
    description: "Bidirectional code to flowchart converter. Transform your code into visual flowcharts and convert flowcharts back to code seamlessly.",
    tags: ["React", "TypeScript", "Algorithm"],
    metrics: "Bidirectional",
    theme: "from-indigo-600/20 to-cyan-600/5",
    accent: "bg-indigo-500",
    icon: Icons.CodeFlowchart,
    link: "https://code2flowchart.vercel.app/",
    github: "#",
    span: "md:col-span-4",
  },
  {
    title: "Aether Weather",
    description: "Real-time weather visualization with stunning interactive graphics. Shows accurate forecasts with beautiful animated effects.",
    tags: ["React 19", "Three.js", "API"],
    metrics: "99% accurate",
    theme: "from-blue-600/20 to-cyan-600/5",
    accent: "bg-blue-500",
    icon: Icons.Weather,
    link: "https://aether-weather-v2.vercel.app/",
    github: "#",
    span: "md:col-span-8",
  },
  {
    title: "Plan It",
    description: "AI-powered content personalization for optimized social media engagement.",
    tags: ["AI", "Personalization", "Social"],
    metrics: "85% engagement",
    theme: "from-violet-600/20 to-pink-600/5",
    accent: "bg-violet-500",
    icon: Icons.PlanIt,
    link: "https://plan-it-v1.vercel.app/#",
    github: "#",
    span: "md:col-span-4",
  },
  {
    title: "Neo Exchange",
    description: "Currency exchange dashboard with real-time rates and smooth animations.",
    tags: ["Next.js", "Zustand"],
    metrics: "Real-time",
    theme: "from-emerald-600/20 to-teal-600/5",
    accent: "bg-emerald-500",
    icon: Icons.Exchange,
    link: "https://neoexchange-v2.vercel.app/",
    github: "#",
    span: "md:col-span-4",
  },
  {
    title: "AI Translator",
    description: "AI-powered translation app supporting 95 languages with instant results.",
    tags: ["Python", "OpenAI"],
    metrics: "95 languages",
    theme: "from-purple-600/20 to-pink-600/5",
    accent: "bg-purple-500",
    icon: Icons.Translator,
    link: "https://ai-translator-v4.vercel.app/",
    github: "#",
    span: "md:col-span-4",
  },
  {
    title: "Email Optimizer",
    description: "AI email assistant that helps you write better, more professional emails.",
    tags: ["LLM", "Tailwind"],
    metrics: "4.8 rating",
    theme: "from-orange-600/20 to-amber-600/5",
    accent: "bg-orange-500",
    icon: Icons.Email,
    link: "https://ai-email-rewriter-five.vercel.app/",
    github: "#",
    span: "md:col-span-8",
  },
];

export function Projects() {
  return (
    <ScrollSection id="projects" className="relative w-full py-section-y px-section-x bg-[#030303] overflow-hidden border-t border-zinc-900">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 border-l-2 border-accent pl-8"
        >
          <div className="flex items-center gap-3 mb-4">
           <span className="text-sm font-sans text-accent">
             Featured Projects
           </span>
          </div>
          
           <h2 className="text-5xl md:text-8xl font-black font-sans tracking-tight text-white mb-8">
             Projects <span className="text-zinc-700 text-stroke">Portfolio</span>
           </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 w-full md:w-fit mb-12">
            {[
              { label: "Projects Built", value: "07", color: "text-white" },
              { label: "Live Now", value: "5", color: "text-blue-500" },
              { label: "Happy Users", value: "10K+", color: "text-green-500" },
              { label: "Stack", value: "v2.0", color: "text-zinc-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-black p-4 min-w-[140px]">
                <div className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-xl leading-relaxed">
            A collection of projects showcasing modern web development, from interactive data visualizations to AI-powered applications.
          </p>
        </m.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col bg-zinc-950 border border-zinc-900 overflow-hidden",
        project.span
      )}
    >
      {/* Visual Artifact (CSS Pattern) */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-zinc-900 bg-black">
        {/* Animated Gradient Background */}
        <m.div 
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-500",
            project.theme,
            isHovered ? "opacity-60" : "opacity-40"
          )}
        />
        
        {/* Technical Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        />

        {/* Center Glyph */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("w-32 h-32 rounded-full blur-[80px] opacity-40 transition-all duration-700", project.accent, isHovered && "opacity-60 scale-125")} />
          <div className="w-24 h-24 relative z-10 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
             <Icon />
          </div>
        </div>
        
        {/* Scanline & Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
        
{/* Status Tags */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="px-2 py-1 bg-accent/10 border border-accent/20 font-mono text-[6px] text-accent/60">
              {project.metrics}
            </div>
          </div>

        {/* Hover Decoding Effect */}
        <div className={cn(
          "absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 transition-all duration-500",
          isHovered ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        )}>
           <a
             href={project.link}
             target="_blank"
             className="px-6 py-2 bg-white text-black font-sans text-sm font-semibold hover:bg-accent hover:text-white transition-all"
           >
             View Project
           </a>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-3xl font-black font-sans tracking-tight text-white mb-3 group-hover:text-accent transition-colors">
             {project.title}
           </h3>
           <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">
             {project.description}
           </p>
        </div>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-900">
           {project.tags.map((tag: string) => (
             <span key={tag} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-400">
               <Code2 size={10} />
               {tag}
             </span>
           ))}
         </div>
      </div>

      {/* Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
        <Layers size={16} className="text-white" />
      </div>
    </m.div>
  );
}
