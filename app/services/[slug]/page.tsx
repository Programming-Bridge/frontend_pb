import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { StatsStrip } from "@/app/components/StatsStrip";
import { TechStackSection } from "@/app/components/TechStackSection";
import { ServiceTechMarquee } from "@/app/components/ServiceTechMarquee";
import { ContactSection } from "@/app/components/ContactSection";
import { SectionWrapper, SectionHeader } from "@/app/components/common";
import {
  Code2,
  Smartphone,
  Sparkles,
  Layers,
  Cloud,
  Palette,
  Terminal,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface ServiceConfig {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
  technologies: string[];
  categoryFilter: string;
}

const serviceConfigs: Record<string, ServiceConfig> = {
  "web-development": {
    slug: "web-development",
    title: "Custom Web & Cloud Engineering",
    subtitle: "High-Scale Modern Web Applications",
    badge: "Web & Cloud",
    description:
      "We design and build bespoke web platforms, full-stack enterprise applications, and distributed cloud microservices engineered for velocity, sub-100ms response times, and extreme scalability.",
    icon: Code2,
    deliverables: [
      "Server-Side Rendered (SSR) Next.js 15 & React 19 Architectures",
      "High-Throughput Node.js & Express REST/GraphQL APIs",
      "Enterprise Database Schema Design & SQL Query Optimization",
      "Automated Zero-Downtime CI/CD Cloud Deployments on AWS & Vercel",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    categoryFilter: "Web",
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "Cross-Platform Mobile App Engineering",
    subtitle: "Fluid 120 FPS iOS & Android Solutions",
    badge: "Mobile Engineering",
    description:
      "Engineering robust cross-platform mobile experiences using Flutter and React Native, tailored for seamless performance, native platform bridge integrations, offline persistence, and synchronized cloud backends.",
    icon: Smartphone,
    deliverables: [
      "Cross-Platform Flutter & React Native Production Apps",
      "Unidirectional Reactive State Management (Bloc / Redux)",
      "Offline-First SQLite / Hive Local Storage & Background Sync",
      "Automated App Store & Google Play Fastlane Deployments",
    ],
    technologies: ["Flutter", "Dart", "React Native", "TypeScript", "Firebase", "SQLite", "Fastlane"],
    categoryFilter: "Mobile",
  },
  "android-development": {
    slug: "android-development",
    title: "Native Android App Engineering",
    subtitle: "Modern Kotlin & Jetpack Compose Architectures",
    badge: "Native Android",
    description:
      "Crafting high-performance native Android applications with Kotlin, declarative Jetpack Compose UI, unidirectional MVI architecture, and background task scheduling optimized for hardware efficiency.",
    icon: Smartphone,
    deliverables: [
      "Native Android Apps with Declarative Jetpack Compose UI",
      "Robust Kotlin Coroutines & Asynchronous Flow Concurrency",
      "Enterprise MVI / MVVM Architecture with Hilt Dependency Injection",
      "Encrypted Local Room DB Persistence & Hardware Sensor Integrations",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "Hilt", "Retrofit", "Material 3"],
    categoryFilter: "Mobile",
  },
  "api-cloud": {
    slug: "api-cloud",
    title: "API Microservices & Cloud Infrastructure",
    subtitle: "Distributed Systems & Resilient Backend Engineering",
    badge: "Cloud & APIs",
    description:
      "Architecting distributed microservice ecosystems, resilient REST/GraphQL APIs, Kubernetes container orchestration, and automated infrastructure as code built to process millions of concurrent requests.",
    icon: Cloud,
    deliverables: [
      "High-Throughput Node.js, Express & FastAPI Microservices",
      "Docker Containerization & Kubernetes Multi-Region Orchestration",
      "Redis Caching, Message Queues (RabbitMQ/Kafka) & Rate Limiting",
      "Terraform Infrastructure as Code with Zero-Trust Security",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Node.js", "FastAPI", "PostgreSQL", "Redis", "Terraform"],
    categoryFilter: "Cloud",
  },
  "wordpress-cms": {
    slug: "wordpress-cms",
    title: "Headless & Enterprise WordPress Architecture",
    subtitle: "Decoupled CMS & High-Speed E-Commerce",
    badge: "CMS & E-Commerce",
    description:
      "Next-generation headless WordPress systems with Next.js frontends, bespoke plugin development, high-volume WooCommerce scaling, and sub-second Core Web Vitals optimization.",
    icon: Layers,
    deliverables: [
      "Decoupled Headless WordPress with Next.js 15 Frontend",
      "Bespoke Custom Plugin & WPGraphQL Custom Schema Extensions",
      "High-Volume WooCommerce Performance Tuning & Checkout Optimization",
      "Sub-Second Page Load Optimization & 95+ Google Lighthouse Scores",
    ],
    technologies: ["WordPress", "PHP", "MySQL", "Next.js", "GraphQL", "WooCommerce", "Tailwind CSS"],
    categoryFilter: "Web",
  },
  "ai-automation": {
    slug: "ai-automation",
    title: "AI, LLM Workflows & Machine Learning",
    subtitle: "Intelligent Autonomous Systems & Analytics",
    badge: "AI & Automation",
    description:
      "Integrating cutting-edge foundation models, Retrieval-Augmented Generation (RAG) pipelines, vector database search, and autonomous multi-agent systems directly into production business workflows.",
    icon: Sparkles,
    deliverables: [
      "Custom Enterprise Retrieval-Augmented Generation (RAG) Pipelines",
      "Frontier LLM Integration (OpenAI GPT-4, Claude 3.5, Hugging Face)",
      "High-Performance Python FastAPI Inference Microservices",
      "Vector Search (Qdrant/Pinecone) & Predictive ML Pipelines",
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "FastAPI", "Qdrant", "LangChain", "Docker", "Hugging Face"],
    categoryFilter: "AI",
  },
  "ui-ux-design": {
    slug: "ui-ux-design",
    title: "Product Strategy & UI/UX Design Systems",
    subtitle: "Conversion-Focused Interfaces & Design Systems",
    badge: "Product & UI/UX",
    description:
      "Designing accessible, conversion-driven product experiences and comprehensive multi-platform design systems in Figma, ensuring seamless design-to-code parity for engineering teams.",
    icon: Palette,
    deliverables: [
      "End-to-End User Research, Wireframing & Interactive Prototypes",
      "Scalable Multi-Brand Design Systems with Tokenized Components",
      "WCAG 2.1 AA Accessibility Audits & Usability Testing",
      "Production Design Specs & Pixel-Perfect Developer Handoff",
    ],
    technologies: ["Figma", "Design Systems", "Prototyping", "Design Tokens", "Tailwind CSS", "Storybook"],
    categoryFilter: "Design",
  },
  "custom-software": {
    slug: "custom-software",
    title: "Custom Enterprise Software Engineering",
    subtitle: "Tailored Architecture for Complex Domain Workflows",
    badge: "Enterprise Software",
    description:
      "End-to-end custom software architecture engineered to streamline complex operational workflows, integrate legacy infrastructure, and scale enterprise operational velocity.",
    icon: Terminal,
    deliverables: [
      "Domain-Driven Architecture (DDD) & Modular System Design",
      "Legacy System Modernization & Microservice Decomposition",
      "Comprehensive Automated Unit, Integration & E2E Test Suites",
      "Full Intellectual Property Ownership & Technical Documentation",
    ],
    technologies: ["TypeScript", "Python", "Go", "Next.js", "Node.js", "PostgreSQL", "Docker", "Kubernetes"],
    categoryFilter: "All",
  },
};

// Aliases mapping alternative slugs to canonical service configurations
const serviceAliases: Record<string, string> = {
  "app-mobile-development": "mobile-app-development",
  "mobile-development": "mobile-app-development",
  "app-development": "mobile-app-development",
  "native-android-development": "android-development",
  "native-android": "android-development",
  "android-apps": "android-development",
  "cloud-engineering": "api-cloud",
  "cloud-devops": "api-cloud",
  "api-cloud-solutions": "api-cloud",
  "cloud-solutions": "api-cloud",
  "wordpress-development": "wordpress-cms",
  "cms-development": "wordpress-cms",
  "ai-engineering": "ai-automation",
  "machine-learning": "ai-automation",
  "ai-ml": "ai-automation",
  "product-design": "ui-ux-design",
  "ui-ux": "ui-ux-design",
  "software-architecture": "custom-software",
  "custom-software-development": "custom-software",
};

/**
 * Resolves a service slug to its canonical configuration, or null if invalid.
 */
function getServiceConfig(rawSlug: string): ServiceConfig | null {
  if (!rawSlug) return null;
  const normalized = rawSlug.toLowerCase().trim();

  if (serviceConfigs[normalized]) {
    return serviceConfigs[normalized];
  }

  const aliasTarget = serviceAliases[normalized];
  if (aliasTarget && serviceConfigs[aliasTarget]) {
    return serviceConfigs[aliasTarget];
  }

  return null;
}

export async function generateStaticParams() {
  const canonicalSlugs = Object.keys(serviceConfigs);
  const aliasSlugs = Object.keys(serviceAliases);
  const allSlugs = Array.from(new Set([...canonicalSlugs, ...aliasSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getServiceConfig(slug);

  if (!config) {
    return {
      title: "Service Not Found | Programming Bridge",
      description: "The requested engineering service capability could not be found.",
    };
  }

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
  const config = getServiceConfig(slug);

  // If slug is not a valid service or alias, trigger HTTP 404 (Fixes C-02)
  if (!config) {
    notFound();
  }

  const Icon = config.icon;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": config.title,
        "serviceType": config.badge,
        "description": config.description,
        "provider": {
          "@type": "Organization",
          "name": "Programming Bridge",
          "url": "https://www.programmingbridge.org",
        },
        "areaServed": "Global",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.programmingbridge.org",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.programmingbridge.org/services",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": config.title,
            "item": `https://www.programmingbridge.org/services/${config.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
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
              <span className="font-mono text-xs text-brand">Specialized Service</span>
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

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto sm:max-w-none">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer text-center"
              >
                <span>Request Scope Estimation</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-surface-hover active:scale-95 cursor-pointer text-center"
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
