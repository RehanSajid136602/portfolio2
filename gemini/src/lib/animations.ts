export const transitions = {
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  smooth: {
    type: "tween",
    ease: "circOut",
    duration: 0.5,
  },
} as const;

export const variants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: transitions.smooth
    },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: transitions.smooth
    },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  hoverScale: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
} as const;