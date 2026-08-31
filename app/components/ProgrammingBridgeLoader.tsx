"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Cpu } from "lucide-react";

interface ProgrammingBridgeLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

const statusMessages = [
  "Connecting to Programming Bridge Services...",
  "Loading Full-Stack Engineering Data...",
  "Synchronizing Cloud Infrastructure...",
  "Rendering Production Workspace...",
];

export function ProgrammingBridgeLoader({
  message,
  subMessage,
  fullScreen = true,
}: ProgrammingBridgeLoaderProps) {
  const [progress, setProgress] = useState<number>(20);
  const [statusIndex, setStatusIndex] = useState<number>(0);

  useEffect(() => {
    const msgTimer = setInterval(() => setStatusIndex((p) => (p + 1) % statusMessages.length), 900);
    const progTimer = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : Math.min(95, p + Math.floor(Math.random() * 15) + 8)));
    }, 180);
    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, []);

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl transition-opacity duration-500"
          : "relative w-full py-20 flex flex-col items-center justify-center"
      }
      aria-label="Loading Programming Bridge"
      role="status"
    >
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-brand/15 blur-3xl animate-pb-pulse" />
      <div className="pointer-events-none absolute h-56 w-56 -translate-y-12 translate-x-20 rounded-full bg-brand-cyan/15 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md w-full">
        {/* Animated Glowing Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full border-2 border-dashed border-brand/30 animate-pb-spin" />
          <div className="absolute h-24 w-24 rounded-3xl bg-gradient-to-tr from-brand/30 via-brand-cyan/20 to-brand/10 blur-md animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-brand/40 bg-card shadow-2xl ring-1 ring-brand/30">
            <Image src="/logo.png" alt="Programming Bridge" width={80} height={80} className="h-full w-full object-cover" priority />
          </div>
        </div>

        {/* Subtitle Badge */}
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold text-foreground-muted shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-ping" />
          <span>Full-Stack Digital Engineering Studio</span>
        </div>

        {/* Status Text */}
        <div className="mt-6 flex flex-col items-center min-h-[44px]">
          <p className="text-xs sm:text-sm font-semibold text-foreground transition-all duration-300">
            {message || statusMessages[statusIndex]}
          </p>
          <p className="mt-1 text-[11px] text-foreground-subtle">
            {subMessage || "Please wait while we prepare the environment..."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 w-full max-w-xs">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface border border-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand via-brand-cyan to-brand transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pb-scan" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-foreground-subtle">
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3 text-brand" />
              <span>V1.0 LIVE</span>
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgrammingBridgeLoader;
