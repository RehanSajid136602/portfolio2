"use client";

import { useEffect, useState, useMemo } from "react";
import { m } from "framer-motion";

export function StatusBar() {
  const [uptime, setUptime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Generate a stable "Session Hash"
  const sessionHash = useMemo(() => {
    return Math.random().toString(16).substring(2, 8).toUpperCase();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <m.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 w-full h-8 z-[100] bg-black/80 backdrop-blur-md border-t border-white/5 px-6 flex items-center justify-between font-mono text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest pointer-events-none"
    >
      {/* Left: System Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-zinc-400">System_Healthy</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-zinc-600">UPTIME:</span>
          <span className="text-zinc-300">{uptime}S</span>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-zinc-600">MEM_LOAD:</span>
          <span className="text-zinc-300">{(24 + (uptime % 5)).toFixed(1)}MB</span>
        </div>
      </div>

      {/* Center: Branding / Version */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
        <span className="text-zinc-700">PRTCL_V.2026.1 // MUHAMMAD_REHAN</span>
      </div>

      {/* Right: Dev Data */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">BRNCH:</span>
          <span className="text-zinc-300">MAIN</span>
        </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-600">HASH:</span>
            <span className="text-zinc-300">{sessionHash}</span>
          </div>
        </div>
      </m.footer>
  );
}

