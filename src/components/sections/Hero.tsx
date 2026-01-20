"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { RocketButton } from "@/components/ui/RocketButton";
import { GlitchText } from "@/components/effects/GlitchText";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function HeroComponent() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 py-12 md:px-12 md:py-16 bg-black text-white">
      {/* Abstract Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      {/* Top Bar */}
      <motion.div 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 flex w-full justify-between items-start font-mono text-xs md:text-sm tracking-widest text-zinc-500 uppercase mix-blend-difference"
      >
        <motion.span variants={fadeUp}>Portfolio_2026</motion.span>
        <motion.span variants={fadeUp} className="hidden md:block">System: Online</motion.span>
        <motion.span variants={fadeUp} className="text-right">
          Loc: Earth<br />
          Lat: 33.6844° N
        </motion.span>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row h-full items-center md:items-end justify-center md:justify-between gap-12 mt-12 md:mt-0">
        
        {/* Massive Typography - Left Aligned */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="flex flex-col z-20"
        >
          <h1 className="font-mono text-[15vw] leading-[0.85] font-black tracking-tighter select-none text-white mix-blend-overlay opacity-90">
            MUHAMMAD
          </h1>
          <h1 className="font-mono text-[15vw] leading-[0.85] font-black tracking-tighter select-none text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">
            <GlitchText text="REHAN" />
          </h1>
        </motion.div>

        {/* Info Column - Right Aligned (Desktop) or Bottom (Mobile) */}
        <motion.div 
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col items-start md:items-end gap-8 max-w-md"
        >
          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed md:text-right"
          >
            Engineering <span className="text-white font-medium">high-performance</span> digital interfaces with precision and motion.
          </motion.p>
          
          <motion.div variants={fadeUp}>
             <RocketButton email="rehan@example.com" />
          </motion.div>

          <motion.div 
             variants={fadeUp}
             className="flex gap-4 text-xs font-mono text-zinc-600 mt-4"
          >
             <span>REACT 19</span>
             <span>NEXT 16</span>
             <span>MOTION</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-0 h-[1px] w-full bg-zinc-800"
      />
    </section>
  );
}

export const Hero = memo(HeroComponent);
