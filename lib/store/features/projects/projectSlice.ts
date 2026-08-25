import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Project } from "@/app/services/projectService";

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export const fallbackProjects: Project[] = [
  {
    _id: "p-fallback-1",
    title: "FinTech Next-Gen Banking Suite",
    description:
      "Enterprise digital banking core featuring sub-100ms multi-currency ledger processing, biometric transaction verification, and ISO-20022 compliance.",
    category: "Web Development",
    badge: "ENTERPRISE BANKING",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    gitLink: "https://github.com",
    liveLink: "https://fintech-demo.programmingbridge.com",
    technologies: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    client: "Global Financial Corp",
    featured: true,
    order: 1,
    isActive: true,
  },
  {
    _id: "p-fallback-2",
    title: "Enterprise E-Commerce & Inventory Matrix",
    description:
      "High-throughput headless e-commerce engine handling 50,000+ real-time SKUs with automated ERP sync and sub-second global checkout.",
    category: "Web Development",
    badge: "HEADLESS COMMERCE",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    gitLink: "https://github.com",
    liveLink: "https://ecommerce-demo.programmingbridge.com",
    technologies: ["React 19", "Next.js", "Stripe API", "GraphQL", "Redis"],
    client: "Retail Dynamics Global",
    featured: true,
    order: 2,
    isActive: true,
  },
  {
    _id: "p-fallback-3",
    title: "OmniFit AI Native Mobile Ecosystem",
    description:
      "Cross-platform mobile application utilizing Jetpack Compose and CoreML computer vision for real-time human posture correction and workout analytics.",
    category: "Mobile Development",
    badge: "MOBILE & COMPUTER VISION",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    gitLink: "https://github.com",
    liveLink: "https://omnifit.programmingbridge.com",
    technologies: ["Kotlin", "Jetpack Compose", "Flutter", "CoreML", "FastAPI"],
    client: "OmniFit Technologies",
    featured: true,
    order: 3,
    isActive: true,
  },
  {
    _id: "p-fallback-4",
    title: "NeuroRAG Enterprise Knowledge Intelligence",
    description:
      "Production-grade Retrieval-Augmented Generation agentic framework querying 500k+ enterprise PDFs with sub-500ms multi-hop neural reasoning.",
    category: "AI & Automation",
    badge: "ENTERPRISE LLM / RAG",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    gitLink: "https://github.com",
    liveLink: "https://neurorag.programmingbridge.com",
    technologies: ["PyTorch", "Python", "FastAPI", "OpenAI", "Qdrant", "Docker"],
    client: "Nexus AI Labs",
    featured: true,
    order: 5,
    isActive: true,
  },
];

const initialState: ProjectState = {
  projects: fallbackProjects,
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setProjectsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProjectsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProjects, setProjectsLoading, setProjectsError } =
  projectSlice.actions;

// Selectors strictly returning data with fallback for SSR hydration stability
export const selectProjects = (state: RootState) =>
  state?.projects?.projects?.length ? state.projects.projects : fallbackProjects;
export const selectProjectsLoading = (state: RootState) =>
  state?.projects?.loading || false;
export const selectProjectsError = (state: RootState) =>
  state?.projects?.error || null;

export default projectSlice.reducer;
