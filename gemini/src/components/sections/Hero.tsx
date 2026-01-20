"use client";

import { memo } from "react";
import dynamic from "next/dynamic";

import { GlitchText } from "@/components/effects/GlitchText";

import { ScrollSection } from "@/components/ui/ScrollSection";

const DecorativeGrid = dynamic(() => import("@/components/effects/DecorativeGrid").then((mod) => mod.DecorativeGrid), { ssr: false, loading: () => null });

import { fadeUp, stagger, MotionDiv, MotionSpan, MotionProvider } from "@/lib/motionVariants";

function HeroComponent() {
  return (
    <MotionProvider>
      <ScrollSection id="hero" className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-section-x py-section-y bg-black text-white" opacityRange={[1, 1, 1, 0]}>
        {/* Abstract Grid Background (lazy) */}
        <DecorativeGrid />

        {/* Top Bar */}
        <MotionDiv
          variants={stagger}
          initial="initial"
          animate="animate"
          className="relative z-10 flex w-full justify-between items-start font-mono text-[10px] md:text-sm tracking-widest text-zinc-500 uppercase mix-blend-difference overflow-hidden"
        >
<MotionSpan variants={fadeUp} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-500/80">Available for Work</span>
          </MotionSpan>
          <MotionSpan variants={fadeUp} className="hidden md:block text-center">Portfolio 2026</MotionSpan>
          <MotionSpan variants={fadeUp} className="text-right">
            Earth
          </MotionSpan>
          <MotionSpan variants={fadeUp} className="hidden md:block text-center">Portfolio_2026<br/>System: Online</MotionSpan>
          <MotionSpan variants={fadeUp} className="text-right">
            Loc: Earth<br />
            Lat: 33.6844° N
          </MotionSpan>
        </MotionDiv>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row h-full items-center md:items-end justify-center md:justify-between gap-8 md:gap-12 mt-8 md:mt-0 w-full max-w-screen-xl mx-auto overflow-hidden">
        
        {/* Massive Typography - Left Aligned */}
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="flex flex-col z-20 w-full md:w-auto will-change-transform hero-typography shrink-0"
        >
          <h1 className="font-mono text-[18vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter select-none text-white opacity-40 text-center md:text-left">
            MUHAMMAD
          </h1>
          <h1 className="font-mono text-[18vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter select-none text-white text-center md:text-left">
            <GlitchText text="REHAN" />
          </h1>
        </MotionDiv>


      </div>

        {/* Decorative Elements */}
        <MotionDiv
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          className="absolute bottom-16 left-0 h-[px] w-full bg-zinc-800 opacity-50"
        />
      </ScrollSection>
    </MotionProvider>
  );
}

export const Hero = memo(HeroComponent);
