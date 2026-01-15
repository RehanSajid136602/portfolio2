"use client";

import { useEffect, useState, memo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

function GlitchTextComponent({ text, className }: GlitchTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = "";
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setDisplayText(currentText);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [text]);

  const glitchTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatDelay: 3,
  };

  const glitchVariants: Variants = {
    initial: { x: 0, skewX: 0 },
    glitch: {
      x: [0, -2, 2, -1, 1, -2, 0],
      skewX: [0, -2, 2, -1, 1, 0],
      transition: {
        ...glitchTransition,
        ease: "linear",
      },
    },
  };

  const shadowVariants: Variants = {
    glitch: {
      opacity: [0, 0.7, 0],
      x: [-2, 2, -2],
      transition: glitchTransition,
    },
  };

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Glitch Shadows - Only render when not typing and motion is allowed */}
      {!isTyping && !shouldReduceMotion && (
        <>
          <motion.span
            className="absolute top-0 left-0 -z-10 text-red-500"
            variants={shadowVariants}
            animate="glitch"
            aria-hidden="true"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 -z-10 text-cyan-500"
            variants={shadowVariants}
            animate="glitch"
            transition={{ ...glitchTransition, delay: 0.05 }}
            aria-hidden="true"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            {text}
          </motion.span>
        </>
      )}

      <motion.span
        animate={!isTyping && !shouldReduceMotion ? "glitch" : "initial"}
        variants={glitchVariants}
      >
        {displayText}
      </motion.span>

      {isTyping && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-1 inline-block h-[0.8em] w-[2px] bg-white align-middle"
        >
          &nbsp;
        </motion.span>
      )}
    </span>
  );
}

export const GlitchText = memo(GlitchTextComponent);
