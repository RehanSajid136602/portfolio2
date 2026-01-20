"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Rocket, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface RocketButtonProps {
  email: string;
}

export function RocketButton({ email }: RocketButtonProps) {
  const [status, setStatus] = useState<"idle" | "launching" | "success">("idle");
  const controls = useAnimation();

  const handleLaunch = async () => {
    if (status !== "idle") return;

    setStatus("launching");

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(email);

      // Rocket launch animation
      await controls.start({
        y: -100,
        x: 50,
        rotate: 45,
        opacity: 0,
        transition: { duration: 0.6, ease: "easeIn" },
      });

      // Confetti!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#3b82f6", "#60a5fa"],
        zIndex: 100,
      });

      setStatus("success");

      // Reset after delay
      setTimeout(async () => {
        await controls.start({
          y: 0,
          x: 0,
          rotate: 0,
          opacity: 1,
          transition: { duration: 0.4 },
        });
        setStatus("idle");
      }, 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
      setStatus("idle");
    }
  };

  return (
    <button
      onClick={handleLaunch}
      disabled={status === "launching"}
      className="group relative flex items-center gap-4 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed min-w-[280px] justify-center"
    >
      <span className={status === "success" ? "text-emerald-600 flex items-center gap-2" : "flex items-center gap-2"}>
        {status === "success" ? (
          <>
            <Check size={20} />
            Email Copied!
          </>
        ) : (
          email
        )}
      </span>
      
      {status !== "success" && (
        <motion.div
          animate={controls}
          className="flex items-center justify-center"
        >
          <Rocket 
            size={20} 
            className={`${status === "launching" ? "text-blue-600" : "opacity-50 group-hover:opacity-100 group-hover:text-blue-600 transition-colors"}`} 
          />
        </motion.div>
      )}

      {/* Exhaust trail during launch */}
      {status === "launching" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 2.5, 0.5], y: [0, 20, 40] }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-4 right-12 -z-10 h-4 w-4 rounded-full bg-blue-400 blur-md"
        />
      )}
    </button>
  );
}
