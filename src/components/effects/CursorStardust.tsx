"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

const MAX_PARTICLES = 6; // Reduced from 12
const THROTTLE_MS = 32; // ~30fps for particle generation

export function CursorStardust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouch, setIsTouch] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lastUpdateRef = useRef<number>(0);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    
    // Throttle particle generation
    if (now - lastUpdateRef.current < THROTTLE_MS) {
      return;
    }
    
    lastUpdateRef.current = now;
    
    const newParticle: Particle = {
      id: now,
      x: e.clientX,
      y: e.clientY,
    };
    
    setParticles((prev) => {
      const updated = [...prev, newParticle];
      return updated.slice(-MAX_PARTICLES);
    });
  }, []);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    
    if (!isTouch && !shouldReduceMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch, shouldReduceMotion, handleMouseMove]);

  if (isTouch || shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence mode="popLayout">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_white]"
            style={{
              left: p.x - 2,
              top: p.y - 2,
              transform: `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
