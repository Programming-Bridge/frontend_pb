import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { ServiceCard } from "@/app/services/serviceCardService";

export interface ServiceCardState {
  cards: ServiceCard[];
  loading: boolean;
  error: string | null;
}

const fallbackServiceCards: ServiceCard[] = [
  {
    _id: "service-1",
    icon: "Code2",
    badge: "POPULAR",
    title: "Custom Web & Cloud Software",
    description:
      "End-to-end bespoke web applications and distributed cloud systems engineered for high velocity, reliability, and enterprise-grade performance.",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
    link: "#services",
    order: 1,
    isActive: true,
  },
  {
    _id: "service-2",
    icon: "Smartphone",
    badge: "NATIVE & CROSS-PLATFORM",
    title: "Mobile App Engineering",
    description:
      "Modern native Android and cross-platform mobile experiences with Jetpack Compose, Kotlin, Flutter, and React Native for fluid 120 FPS performance.",
    tags: ["Jetpack Compose", "Kotlin", "Flutter", "React Native"],
    link: "#services",
    order: 2,
    isActive: true,
  },
  {
    _id: "service-3",
    icon: "Cloud",
    badge: "ENTERPRISE",
    title: "Cloud & DevOps Architecture",
    description:
      "Resilient cloud infrastructure, automated zero-downtime CI/CD deployment pipelines, and scalable containerized microservices architectures.",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    link: "#services",
    order: 3,
    isActive: true,
  },
  {
    _id: "service-4",
    icon: "Cpu",
    badge: "AI POWERED",
    title: "AI, Machine Learning & LLMs",
    description:
      "Integrate custom machine learning models, modern LLMs, retrieval-augmented generation (RAG), and agentic workflows to multiply business efficiency.",
    tags: ["PyTorch", "TensorFlow", "OpenAI", "Hugging Face"],
    link: "#services",
    order: 4,
    isActive: true,
  },
  {
    _id: "service-5",
    icon: "Database",
    badge: "DATA ARCHITECTURE",
    title: "Data Engineering & Pipelines",
    description:
      "High-throughput data pipelines, ETL workflows, real-time analytics streaming, and enterprise ACID database architectures.",
    tags: ["PostgreSQL", "MongoDB", "MySQL", "Pandas"],
    link: "#services",
    order: 5,
    isActive: true,
  },
  {
    _id: "service-6",
    icon: "Palette",
    badge: "DESIGN FIRST",
    title: "UI/UX & Design Systems",
    description:
      "Modern, human-centric user interface designs and comprehensive scalable component libraries tailored for rapid brand iteration and conversions.",
    tags: ["Figma", "Design Tokens", "Accessibility", "Tailwind"],
    link: "#services",
    order: 6,
    isActive: true,
  },
  {
    _id: "service-7",
    icon: "ShieldCheck",
    badge: "SECURE",
    title: "API Architecture & Security",
    description:
      "High-throughput REST and GraphQL APIs protected with zero-trust token authentication, fine-grained access control, and strict observability.",
    tags: ["GraphQL", "REST APIs", "OAuth2", "Microservices"],
    link: "#services",
    order: 7,
    isActive: true,
  },
  {
    _id: "service-8",
    icon: "Zap",
    badge: "PERFORMANCE",
    title: "Optimization & Code Audits",
    description:
      "Deep technical audits, sub-100ms latency optimizations, database index tuning, and memory profile enhancements for mission-critical systems.",
    tags: ["Core Web Vitals", "Query Tuning", "Caching", "Observability"],
    link: "#services",
    order: 8,
    isActive: true,
  },
];

const initialState: ServiceCardState = {
  cards: fallbackServiceCards,
  loading: false,
  error: null,
};

export const serviceCardSlice = createSlice({
  name: "serviceCards",
  initialState,
  reducers: {
    setServiceCards: (state, action: PayloadAction<ServiceCard[]>) => {
      state.cards = action.payload;
    },
    setServiceCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setServiceCardsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export Actions
export const {
  setServiceCards,
  setServiceCardsLoading,
  setServiceCardsError,
} = serviceCardSlice.actions;

// Export Selectors
export const selectServiceCards = (state: RootState) =>
  state?.serviceCards?.cards ?? fallbackServiceCards;
export const selectServiceCardsLoading = (state: RootState) =>
  state?.serviceCards?.loading ?? false;
export const selectServiceCardsError = (state: RootState) =>
  state?.serviceCards?.error ?? null;

// Export Reducer
export default serviceCardSlice.reducer;
