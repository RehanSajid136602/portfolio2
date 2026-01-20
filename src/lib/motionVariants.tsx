import { LazyMotion, domAnimation, m } from "framer-motion";

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

export const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// Optimized motion components using LazyMotion
export const MotionDiv = m.div;
export const MotionSpan = m.span;
export const MotionP = m.p;
export const MotionA = m.a;

// LazyMotion wrapper for components that need it
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
