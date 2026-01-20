"use client";

import { useEffect, useState, memo, useCallback, useRef } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GLYPHS = "01_/-!?X#[]{}<>";

function GlitchTextComponent({ text, className }: GlitchTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [isDecoding, setIsDecoding] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    stopAnimation();

    const scramble = async () => {
      let iteration = 0;
      const maxIterations = text.length * 5;

      intervalRef.current = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration / 5) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );

        if (iteration >= maxIterations) {
          setIsDecoding(false);
          setDisplayText(text);
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }

        iteration += 1;
      }, 45);
    };

    scramble();

    // Only start loop if in view
    if (isInView.current) {
      loopRef.current = setInterval(() => {
        if (isInView.current) {
          setIsDecoding(true);
          scramble();
        }
      }, 8000);
    }
  }, [text, stopAnimation]);

  useEffect(() => {
    // Intersection Observer to pause when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  // Very rare, singular shift instead of constant flicker
  const glitchTransition = {
    duration: 0.8,
    repeat: Infinity,
    repeatDelay: 15, // Extremely rare occurrence
  };

  const glitchVariants: Variants = {
    initial: { x: 0, opacity: 1 },
    glitch: {
      x: [0, -1, 1, 0],
      opacity: 1, // Removed flicker
      transition: {
        ...glitchTransition,
        ease: "easeInOut",
      },
    },
  };

  const shadowVariants: Variants = {
    glitch: {
      opacity: [0, 0.2, 0], // Muted shadow
      x: [-1, 1, -1],
      transition: glitchTransition,
    },
  };

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Glitch Shadows */}
      {!isDecoding && !shouldReduceMotion && (
        <>
          <m.span
            className="absolute top-0 left-0 -z-10 text-zinc-700/50"
            variants={shadowVariants}
            animate="glitch"
            aria-hidden="true"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            {text}
          </m.span>
        </>
      )}

      <m.span
        animate={!isDecoding && !shouldReduceMotion ? "glitch" : "initial"}
        variants={glitchVariants}
        className="font-mono text-zinc-200"
      >
        {displayText}
      </m.span>

      {isDecoding && (
        <m.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="ml-1 inline-block h-[0.8em] w-[2px] bg-zinc-600 align-middle"
        />
      )}
    </span>
  );
}

export const GlitchText = memo(GlitchTextComponent);