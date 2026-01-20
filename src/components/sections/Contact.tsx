"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Terminal } from "lucide-react";
import { RocketButton } from "@/components/ui/RocketButton";

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Contact() {
  const email = "sajidnadeem2020@gmail.com";

  return (
    <section id="contact" className="w-full relative py-32 px-6 bg-black border-t border-zinc-900 overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="mb-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm mb-6">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="font-mono text-xs text-green-500 uppercase tracking-widest">Signal_Strength: 100%</span>
           </div>
           
           <h2 className="text-5xl md:text-8xl font-black font-mono tracking-tighter uppercase text-white mb-6">
             Establish<br/><span className="text-zinc-800 text-stroke">Uplink</span>
           </h2>
        </motion.div>

        <motion.p variants={fadeUp} className="font-mono text-sm md:text-base text-zinc-500 max-w-lg mb-12 leading-relaxed">
          &gt; INITIATING HANDSHAKE PROTOCOL...<br/>
          &gt; OPEN FOR COLLABORATION AND SYSTEM UPGRADES.<br/>
          &gt; TRANSMIT DATA PACKET BELOW.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-8 w-full">
          <div className="p-1 border border-dashed border-zinc-700">
             <RocketButton email={email} />
          </div>

          <div className="flex gap-4 mt-8">
            {[
              { icon: <Github size={20} />, href: "https://github.com/RehanSajid136602", label: "GIT_REPO" },
              { icon: <Linkedin size={20} />, href: "#", label: "LINK_NET" },
              { icon: <Twitter size={20} />, href: "#", label: "COMMS" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -4, backgroundColor: "#fff", color: "#000" }}
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center border border-zinc-800 bg-black text-zinc-400 transition-colors group-hover:border-white">
                  {social.icon}
                </div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider group-hover:text-white transition-colors">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.footer variants={fadeUp} className="w-full mt-32 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal size={12} />
            <span>Sys_Admin: Muhammad Rehan</span>
          </div>
          <div>
            <span>Build_Ver: 2026.1.0 // Next.js_16</span>
          </div>
          <div>
            <span>© 2026 ALL RIGHTS RESERVED</span>
          </div>
        </motion.footer>
      </motion.div>
    </section>
  );
}
