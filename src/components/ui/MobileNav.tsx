"use client";

import { useState, memo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "skills", label: "Skills", target: "#skills" },
  { id: "projects", label: "Projects", target: "#projects" },
  { id: "experience", label: "Experience", target: "#experience" },
  { id: "contact", label: "Contact", target: "#contact" },
];

export function MobileNavComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="xl:hidden">
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[200] p-4 bg-black border border-white/20 rounded-lg text-white shadow-lg hover:border-white/40 transition-all"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex flex-col p-8 pt-32"
          >
            {/* Background Accent */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none rounded-full" />
            
             <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-6">
               <Terminal className="text-accent" size={20} />
               <span className="font-sans text-sm text-zinc-500">Navigation</span>
             </div>

              <nav className="flex flex-col gap-8">
                {sections.map((section, idx) => (
                  <m.a
                    key={section.id}
                    href={section.target}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col"
                  >
                <span className="text-4xl font-black font-sans tracking-tight text-white group-hover:text-accent transition-colors">
                  {section.label}
                </span>
                  </m.a>
                ))}
              </nav>

            <div className="mt-auto border-t border-white/5 pt-8">
               <div className="flex items-center gap-2 mb-2">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">Available_for_Work</span>
               </div>
                 <p className="font-sans text-[10px] text-zinc-600">
                   Version 2026.1.0
                 </p>
             </div>
           </m.div>
         )}
       </AnimatePresence>
     </div>
   );
}

export const MobileNav = memo(MobileNavComponent);
