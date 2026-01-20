import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Dynamic imports for below-the-fold components
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => ({ default: mod.Skills })), {
  loading: () => <div className="w-full py-24 flex items-center justify-center"><div className="animate-pulse text-secondary">Loading...</div></div>,
});

const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="w-full py-24 flex items-center justify-center"><div className="animate-pulse text-secondary">Loading...</div></div>,
});

const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="w-full py-24 flex items-center justify-center"><div className="animate-pulse text-secondary">Loading...</div></div>,
});

const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="w-full py-24 flex items-center justify-center"><div className="animate-pulse text-secondary">Loading...</div></div>,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-background text-foreground">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
