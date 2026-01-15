"use client";

import { motion } from "framer-motion";
import { variants } from "@/lib/animations";
import { Github, Linkedin, Twitter } from "lucide-react";
import { RocketButton } from "@/components/ui/RocketButton";

export function Contact() {
  const email = "sajidnadeem2020@gmail.com";

  return (
    <section id="contact" className="w-full max-w-5xl py-32 px-6 mx-auto">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.staggerContainer}
        className="flex flex-col items-center text-center space-y-12"
      >
        <motion.div variants={variants.fadeInUp} className="space-y-4">
          <h2 className="text-4xl font-bold sm:text-6xl">Let&apos;s build something great.</h2>
          <p className="text-secondary max-w-xl mx-auto text-lg">
            Currently looking for new opportunities and interesting collaborations. 
            My inbox is always open.
          </p>
        </motion.div>

        <motion.div variants={variants.fadeInUp} className="flex flex-col items-center gap-6">
          <RocketButton email={email} />

          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, href: "https://github.com/RehanSajid136602" },
              { icon: <Linkedin size={20} />, href: "#" },
              { icon: <Twitter size={20} />, href: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -4 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary hover:text-white hover:border-white/20 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.footer variants={variants.fadeIn} className="pt-24 text-sm text-secondary/50">
          © 2026 Muhammad Rehan. Built with Next.js & Framer Motion.
        </motion.footer>
      </motion.div>
    </section>
  );
}
