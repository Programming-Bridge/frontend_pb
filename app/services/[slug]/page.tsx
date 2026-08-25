import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { StatsStrip } from "@/app/components/StatsStrip";
import { TechStackSection } from "@/app/components/TechStackSection";
import { ServiceTechMarquee } from "@/app/components/ServiceTechMarquee";
import { ContactSection } from "@/app/components/ContactSection";
import { SectionWrapper, SectionHeader, CalloutBanner } from "@/app/components/common";
import {
  Code2,
  Smartphone,
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface ServiceConfig {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  icon: typeof Code2;
  deliverables: string[];
  technologies: string[];
  categoryFilter: string;
}

const serviceConfigs: Record<string, ServiceConfig> = {
  "web-development": {
    title: "Custom Web & Cloud Engineering",
    subtitle: "High-Scale Modern Web Applications",
    badge: "Web & Cloud",
    description:
      "We design and build bespoke web platforms, full-stack enterprise applications, and distributed cloud microservices engineered for velocity, sub-100ms response times, and extreme scalability.",
    icon: Code2,
    deliverables: [
      "Server-Side Rendered (SSR) Next.js 15 & React 19 Apps",
      "High-Throughput Node.js & Express REST/GraphQL APIs",
      "Enterprise Database Schema & Query Optimization",
      "Automated Zero-Downtime CI/CD Cloud Deployments",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    categoryFilter: "Web",
  },
  "app-mobile-development": {
    title: "Native Android & Mobile App Engineering",
    subtitle: "Fluid 120 FPS Cross-Platform & Native Apps",
    badge: "Mobile Engineering",
    description:
      "Engineering native Android applications (Kotlin & Jetpack Compose) and cross-platform mobile experiences (Flutter & React Native) optimized for fluid performance, reactive state, and offline persistence.",
    icon: Smartphone,
    deliverables: [
      "Native Android Apps with Jetpack Compose & Kotlin",
      "Cross-Platform Flutter & React Native Solutions",
      "Unidirectional MVI/MVVM Clean Architecture",
      "Offline-First Local Room DB & Background Sync",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Java", "Flutter", "React Native", "Coroutines", "Room DB"],
    categoryFilter: "Mobile",
  },
  "wordpress-development": {
    title: "Headless & Custom WordPress Architecture",
    subtitle: "Enterprise CMS & High-Speed E-Commerce",
    badge: "CMS & E-Commerce",
    description:
      "Custom WordPress themes, bespoke plugin engineering, WooCommerce e-commerce scalability, and modern Headless WordPress integrations with Next.js frontends.",
    icon: Layers,
    deliverables: [
      "Headless WordPress with Next.js Decoupled Frontend",
      "Custom Plugin & REST API Custom Endpoints",
      "High-Volume WooCommerce Performance Tuning",
      "Core Web Vitals & Sub-Second Page Load Optimization",
    ],
    technologies: ["WordPress", "PHP", "MySQL", "Next.js", "REST API", "WooCommerce", "Tailwind CSS"],
    categoryFilter: "Web",
  },
  "ai-automation": {
    title: "AI, Machine Learning & LLM Workflows",
    subtitle: "Intelligent Autonomous Systems & Analytics",
    badge: "AI & Automation",
    description:
      "Integrating cutting-edge foundation models, Retrieval-Augmented Generation (RAG) pipelines, computer vision systems, and autonomous agentic workflows directly into production applications.",
    icon: Sparkles,
    deliverables: [
      "Custom Retrieval-Augmented Generation (RAG) Pipelines",
      "Frontier LLM Integration (OpenAI, Hugging Face, Claude)",
      "High-Performance Python FastAPI Inference Microservices",
      "Computer Vision (OpenCV/YOLO) & Predictive ML Models",
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "FastAPI", "TensorFlow", "Hugging Face", "Docker"],
    categoryFilter: "AI",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = serviceConfigs[slug] || {
    title: "Specialized Engineering Service",
    subtitle: "Programming Bridge",
    description: "Custom digital engineering and software architecture services.",
  };

  return {
    title: `${config.title} | Programming Bridge`,
    description: config.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = serviceConfigs[slug] || {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    subtitle: "Specialized Engineering",
    badge: "Custom Capability",
    description:
      "Enterprise digital engineering, scalable architecture, and full-stack software development tailored to your technical roadmap.",
    icon: Code2,
    deliverables: [
      "Senior-Led Architectural Feasibility & Design",
      "Modular, Clean TypeScript & Python Codebases",
      "Full API & Unit Test Coverage with CI/CD",
      "Complete IP Ownership & Deployment Handover",
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker"],
    categoryFilter: "All",
  };

  const Icon = config.icon;

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      {/* Service Hero Header */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-surface border-b border-border overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs">
              <Icon className="h-3.5 w-3.5 text-brand" />
              <span>{config.badge}</span>
              <span className="text-border">|</span>
              <span className="font-mono text-[11px] text-brand">Specialized Service</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.15]">
              {config.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg font-semibold text-brand">
              {config.subtitle}
            </p>

            <p className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              {config.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer"
              >
                <span>Request Scope Estimation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-surface-hover active:scale-95 cursor-pointer"
              >
                <span>All Capabilities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Technology Matrix */}
      <SectionWrapper variant="background" border="bottom" ariaLabel="Deliverables">
        <SectionHeader
          icon={ShieldCheck}
          badge="Scope & Standards"
          subBadge="Production Ready"
          title={
            <>
              What We Deliver for <span className="text-brand">{config.title}</span>
            </>
          }
          description="Every sprint includes senior architect oversight, strict type safety, zero technical debt, and continuous automated testing."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {config.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-6 shadow-xs transition-all hover:border-brand/40"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand font-bold text-xs">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{item}</h3>
                <p className="mt-1 text-xs text-foreground-muted">
                  Fully documented, tested, and handed over with 100% intellectual property ownership.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Moving Technology Marquee */}
        <ServiceTechMarquee technologies={config.technologies} />
      </SectionWrapper>

      {/* Technology Stack Animation */}
      <TechStackSection />

      {/* Stats Strip */}
      <StatsStrip />

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </main>
  );
}
