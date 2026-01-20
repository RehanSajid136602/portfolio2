"use client";

import { m } from "framer-motion";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opacityRange?: number[]; 
}

export function ScrollSection({ children, className, id }: ScrollSectionProps) {
  return (
    <m.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </m.section>
  );
}