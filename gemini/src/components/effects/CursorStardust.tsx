"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const MAX_PARTICLES = 6;
const PARTICLE_LIFETIME = 600; // ms

export function CursorStardust() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || shouldReduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let particlesCount = 0;

    const createParticle = (x: number, y: number) => {
      if (!container) return;
      particlesCount = Math.min(particlesCount + 1, MAX_PARTICLES);

      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.left = `${x - 2}px`;
      el.style.top = `${y - 2}px`;
      el.style.width = "6px";
      el.style.height = "6px";
      el.style.borderRadius = "50%";
      el.style.background = "white";
      el.style.pointerEvents = "none";
      el.style.boxShadow = "0 0 8px rgba(255,255,255,0.9)";
      el.style.transform = `translate(0px, 0px) scale(1)`;
      el.style.opacity = "1";
      el.style.transition = `transform ${PARTICLE_LIFETIME}ms ease-out, opacity ${PARTICLE_LIFETIME}ms ease-out`;

      container.appendChild(el);

      // Trigger movement on next frame
      requestAnimationFrame(() => {
        const tx = (Math.random() - 0.5) * 40;
        const ty = (Math.random() - 0.5) * 40;
        const scale = 0.1 + Math.random() * 0.9;
        el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        el.style.opacity = "0";
      });

      // Remove after lifetime
      setTimeout(() => {
        el.remove();
        particlesCount = Math.max(0, particlesCount - 1);
      }, PARTICLE_LIFETIME + 50);
    };

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      // throttle to ~24fps
      if (now - lastTime < 40) return;
      lastTime = now;
      lastX = e.clientX;
      lastY = e.clientY;
      // create particle
      createParticle(lastX, lastY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" />;
}
