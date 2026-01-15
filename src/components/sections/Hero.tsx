"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { variants } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { GlitchText } from "@/components/effects/GlitchText";

function HeroComponent() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Glow - Using CSS instead of absolute positioning for better performance */}
      <div 
        className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" 
        style={{ transform: "translate(-50%, -50%)" }}
      />
      
      <motion.div
        variants={variants.staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center gap-6"
      >
        <motion.span
          variants={variants.fadeInUp}
          className="text-sm font-medium tracking-widest uppercase text-secondary"
        >
          Available for new projects
        </motion.span>

        <motion.h1
          variants={variants.fadeInUp}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          I am <GlitchText text="Muhammad Rehan" className="text-white" />
        </motion.h1>

        <motion.p
          variants={variants.fadeInUp}
          className="max-w-xl text-lg text-secondary sm:text-xl"
        >
          A software engineer specializing in building high-performance 
          web applications with a focus on motion design and user experience.
        </motion.p>

        <motion.div variants={variants.fadeInUp} className="mt-4">
          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            View My Work
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2"
        style={{ transform: "translateX(-50%)" }}
      >
        <div className="h-12 w-[2px] bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
