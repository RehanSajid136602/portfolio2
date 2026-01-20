import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Dynamic imports with dimension-aware skeletons to prevent CLS
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => ({ default: mod.Skills })), {
  loading: () => <div className="w-full h-[600px] bg-black border-t border-zinc-900" />,
});

const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="w-full h-[1200px] bg-[#030303] border-t border-zinc-900" />,
});

const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="w-full h-[800px] bg-black border-t border-zinc-900" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="w-full h-[600px] bg-black border-t border-zinc-900" />,
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
