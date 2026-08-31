"use client";

import Link from "next/link";
import Image from "next/image";
import logoImg from "@/public/logo.png";
import { ArrowUp, Mail, Globe, CheckCircle2 } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-border bg-surface text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-bold tracking-tight text-foreground transition-colors hover:text-brand"
              aria-label="Programming Bridge Home"
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-xs ring-1 ring-border/50 transition-all group-hover:shadow-md group-hover:ring-brand/40">
                <Image
                  src={logoImg}
                  alt="Programming Bridge"
                  width={44}
                  height={44}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-base font-extrabold leading-none text-foreground transition-colors group-hover:text-brand">
                  Programming
                </span>
                <span className="text-xs font-bold leading-none text-brand mt-0.5">
                  Bridge
                </span>
              </div>
            </Link>
            <p className="text-sm text-foreground-muted max-w-sm leading-relaxed">
              Full-stack digital engineering studio building bespoke web applications,
              mobile platforms, and distributed cloud systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground-muted hover:border-brand hover:text-brand transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground-muted hover:border-brand hover:text-brand transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                </svg>
              </a>
              <a
                href="mailto:contact@programmingbridge.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground-muted hover:border-brand hover:text-brand transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://programmingbridge.com"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground-muted hover:border-brand hover:text-brand transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>
                <Link
                  href="#about-us"
                  className="hover:text-brand transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-brand transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#tech-stack"
                  className="hover:text-brand transition-colors"
                >
                  Technology Stack
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-brand transition-colors"
                >
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand transition-colors"
                >
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Technologies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Tech Expertise
            </h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>React 19 & Next.js</li>
              <li>Node.js & Express</li>
              <li>Python & Django</li>
              <li>PostgreSQL & MongoDB</li>
              <li>Kotlin & Jetpack Compose</li>
            </ul>
          </div>

          {/* Engineering Standards Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Delivery Standards
            </h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                <span>99.9% Uptime SLA</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                <span>Zero-Downtime Deployments</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                <span>100% Code & IP Ownership</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 text-xs text-foreground-subtle gap-4">
          <p>
            © {new Date().getFullYear()} Programming Bridge Agency. All rights
            reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground-muted hover:border-brand hover:text-brand transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
