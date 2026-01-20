"use client";

import { useEffect, useState, memo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: "skills", label: "Skills", target: "#skills" },
  { id: "projects", label: "Projects", target: "#projects" },
  { id: "experience", label: "Experience", target: "#experience" },
  { id: "contact", label: "Contact", target: "#contact" },
];

export function FixedNavComponent() {
  const [activeSection, setActiveSection] = useState("skills");
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
        if (intersectingEntries.length > 0) {
          // Find the most visible section (highest intersection ratio)
          const mostVisible = intersectingEntries.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveSection(mostVisible.target.id || "skills");
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8 items-center">
      {/* Availability Indicator */}
      <m.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute -top-24 left-0 flex items-center gap-3 whitespace-nowrap rotate-[-90deg] origin-left"
      >
        <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] text-green-500 uppercase tracking-[0.2em]">
            Available for Work
          </span>
        </m.div>

      {/* Nav Items */}
      <div className="flex flex-col gap-6 items-center border-l border-zinc-900 pl-4 py-8 relative">
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.target}
            onMouseEnter={() => setIsHovered(section.id)}
            onMouseLeave={() => setIsHovered(null)}
            className="group relative flex items-center"
          >
            {/* Number / Dot */}
            <div className={cn(
              "h-1 transition-all duration-300",
              activeSection === section.id 
                ? "w-8 bg-white" 
                : "w-4 bg-zinc-800 group-hover:bg-zinc-500"
            )} />

            {/* Label (Slide out) */}
            <AnimatePresence>
              {(isHovered === section.id || activeSection === section.id) && (
                <m.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 10 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={cn(
                    "absolute left-full ml-4 font-mono text-[10px] tracking-[0.3em] whitespace-nowrap",
                    activeSection === section.id ? "text-white font-bold" : "text-zinc-600"
                  )}
                >
                  {section.label}
                </m.span>
              )}
            </AnimatePresence>
          </a>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="h-24 w-px bg-gradient-to-b from-zinc-800 to-transparent mt-4" />
    </nav>
  );
}

export const FixedNav = memo(FixedNavComponent);
