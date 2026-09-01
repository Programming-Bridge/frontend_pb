"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImg from "@/public/logo.png";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import {
  Home,
  ArrowLeft,
  Briefcase,
  Layers,
  PhoneCall,
  Search,
  Compass,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8 text-foreground selection:bg-brand selection:text-white">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[550px] w-[650px] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px] dark:bg-brand/25" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 -z-10 h-[450px] w-[550px] rounded-full bg-cyan-500/15 blur-[140px] dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute top-1/3 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/15" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Top Header Bar */}
      <header className="absolute top-6 inset-x-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-colors hover:text-brand"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-xs ring-1 ring-border/50 transition-all group-hover:shadow-md group-hover:ring-brand/40">
            <Image
              src={logoImg}
              alt="Programming Bridge"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold leading-none text-foreground group-hover:text-brand transition-colors">
              Programming
            </span>
            <span className="text-xs font-bold leading-none text-brand mt-0.5">
              Bridge
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main 404 Visual Content */}
      <main className="w-full max-w-2xl text-center space-y-8 mt-12 sm:mt-0">
        {/* Animated Glow 404 Header */}
        <div className="relative inline-block">
          {/* Subtle Backlight */}
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-brand/30 blur-2xl dark:bg-brand/40 animate-pulse" />
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              <span>Error 404 • Page Not Found</span>
            </span>
          </div>

          <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-foreground/30 dark:from-white dark:via-white/90 dark:to-white/20 select-none drop-shadow-sm">
            404
          </h1>
        </div>

        {/* Message Card */}
        <div className="rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Lost in <span className="text-brand">Digital Cyberspace</span>?
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted max-w-lg mx-auto leading-relaxed">
            The page or asset you are looking for might have been moved, deleted, or never existed in this realm. Don't worry, let's get you back on track!
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand-hover active:scale-95 transition-all cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>Back to Homepage</span>
            </Link>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-surface-hover hover:border-brand/40 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Helpful Navigation Shortcuts */}
          <div className="border-t border-border/70 pt-6 mt-6">
            <div className="text-[11px] font-bold text-foreground-muted uppercase tracking-wider mb-3">
              Explore Popular Destinations
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <Link
                href="/services"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/70 px-3 py-2.5 text-xs font-semibold text-foreground hover:border-brand/50 hover:bg-brand/10 hover:text-brand transition-all"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Our Services</span>
              </Link>

              <Link
                href="/portfolio"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/70 px-3 py-2.5 text-xs font-semibold text-foreground hover:border-brand/50 hover:bg-brand/10 hover:text-brand transition-all"
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>Portfolio</span>
              </Link>

              <Link
                href="/contact"
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/70 px-3 py-2.5 text-xs font-semibold text-foreground hover:border-brand/50 hover:bg-brand/10 hover:text-brand transition-all"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-foreground-muted">
          Need direct assistance? Email our support at{" "}
          <a href="mailto:official@programmingbridge.org" className="text-brand font-semibold hover:underline">
            official@programmingbridge.org
          </a>
        </p>
      </main>
    </div>
  );
}
