"use client";

import { memo } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools";
  proficiency: number;
  connections: string[];
}

const skills: Skill[] = [
  { id: "react", name: "React", category: "frontend", proficiency: 5, connections: ["nextjs", "typescript", "tailwind", "framer"] },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 5, connections: ["react", "typescript", "nodejs"] },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 4, connections: ["react", "nextjs", "nodejs"] },
  { id: "tailwind", name: "Tailwind", category: "frontend", proficiency: 5, connections: ["react", "framer"] },
  { id: "framer", name: "Framer Motion", category: "frontend", proficiency: 4, connections: ["react", "tailwind"] },
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 4, connections: ["nextjs", "typescript", "postgres", "redis"] },
  { id: "postgres", name: "PostgreSQL", category: "backend", proficiency: 4, connections: ["nodejs", "prisma"] },
  { id: "prisma", name: "Prisma", category: "backend", proficiency: 4, connections: ["postgres", "nodejs"] },
  { id: "redis", name: "Redis", category: "backend", proficiency: 3, connections: ["nodejs"] },
  { id: "fastapi", name: "FastAPI", category: "backend", proficiency: 3, connections: ["postgres"] },
  { id: "git", name: "Git", category: "tools", proficiency: 5, connections: ["cicd", "docker"] },
  { id: "docker", name: "Docker", category: "tools", proficiency: 4, connections: ["git", "aws", "cicd"] },
  { id: "cicd", name: "CI/CD", category: "tools", proficiency: 4, connections: ["git", "docker", "aws"] },
  { id: "aws", name: "AWS", category: "tools", proficiency: 3, connections: ["docker", "cicd", "linux"] },
  { id: "linux", name: "Linux", category: "tools", proficiency: 4, connections: ["aws", "docker"] },
];

function SkillNode({ 
  skill, 
  isHovered, 
  isRelated, 
  onHover, 
  color,
  layout = "grid" 
}: { 
  skill: Skill; 
  isHovered: boolean; 
  isRelated: boolean; 
  onHover: (id: string | null) => void; 
  color: string;
  layout?: "grid" | "list";
}) {
  return (
    <m.div
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "relative transition-all duration-300",
        layout === "list" ? "flex items-center justify-between group/item" : "flex flex-col gap-2",
        (isHovered || isRelated) ? "opacity-100" : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100"
      )}
    >
      <div className="flex flex-col">
        <span className={cn(
          "font-mono font-bold tracking-tight text-white",
          layout === "list" ? "text-base" : "text-sm"
        )}>
          {skill.name}
        </span>
        {isHovered && (
          <m.span 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[8px] font-mono text-zinc-500 uppercase mt-1"
          >
            {skill.connections.length} Links Found
          </m.span>
        )}
      </div>

      <div className={cn(
        "flex gap-1",
        layout === "list" ? "items-center" : "mt-1"
      )}>
        {[1, 2, 3, 4, 5].map((lvl) => (
          <div
            key={lvl}
            className="h-1 w-4 transition-all duration-500"
            style={{ 
              backgroundColor: lvl <= skill.proficiency ? color : "rgba(255,255,255,0.05)",
              boxShadow: (isHovered && lvl <= skill.proficiency) ? `0 0 10px ${color}` : "none"
            }}
          />
        ))}
      </div>
    </m.div>
  );
}

import { ScrollSection } from "@/components/ui/ScrollSection";

// ... imports

function SkillsComponent() {
  // ... existing code

  return (
    <ScrollSection id="skills" className="w-full py-section-y px-section-x bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* ... content */}
      </div>
    </ScrollSection>
  );
}

export const Skills = memo(SkillsComponent);