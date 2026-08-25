import apiClient, { cachedGet } from "./apiClient";

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  department: string;
  bio?: string;
  avatar?: string;
  skills: string[];
  experience?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  order?: number;
  featured?: boolean;
  isActive?: boolean;
}

export interface TeamResponse {
  success: boolean;
  count?: number;
  data: TeamMember[];
  message?: string;
}

export const fallbackTeamMembers: TeamMember[] = [
  {
    name: "Usama Khan",
    role: "Lead Software Architect & Founder",
    department: "Web & Cloud",
    bio: "Specializing in distributed systems, full-stack microservices, sub-100ms API query optimization, and enterprise Next.js architectures.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    skills: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "System Architecture", "AWS"],
    experience: "7+ Years",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "usama@programmingbridge.com",
    },
    order: 1,
    featured: true,
  },
  {
    name: "Alex Rivera",
    role: "Principal Mobile Engineer",
    department: "Mobile Engineering",
    bio: "Crafting native Android architectures with Jetpack Compose, Kotlin coroutines, and high-performance Flutter / React Native solutions.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Flutter", "MVI Architecture", "Room DB"],
    experience: "6+ Years",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    order: 2,
    featured: true,
  },
  {
    name: "Dr. Marcus Chen",
    role: "Lead AI & Data Scientist",
    department: "AI & Data",
    bio: "Focusing on production LLM workflows, Retrieval-Augmented Generation (RAG), PyTorch neural models, and real-time inference microservices.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    skills: ["PyTorch", "Python", "FastAPI", "OpenAI / RAG", "Vector DBs", "Docker MLOps"],
    experience: "8+ Years",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    order: 3,
    featured: true,
  },
  {
    name: "Elena Rostova",
    role: "DevOps & Cloud Security Architect",
    department: "DevOps & Security",
    bio: "Designing zero-downtime CI/CD pipelines, Kubernetes container orchestration, and SOC-2/OWASP compliance infrastructure.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Zero-Trust Auth"],
    experience: "6+ Years",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    order: 4,
    featured: false,
  },
];

export const getTeamMembers = async (department?: string): Promise<TeamMember[]> => {
  try {
    const url = department && department !== "All" ? `/team?department=${encodeURIComponent(department)}` : "/team";
    const response = await cachedGet<any>(url);

    if (response && Array.isArray((response as any).data) && (response as any).data.length > 0) {
      return (response as any).data;
    }

    if (Array.isArray(response) && response.length > 0) {
      return response;
    }

    return fallbackTeamMembers;
  } catch (error) {
    console.warn("Could not fetch team from API, using fallback data:", error);
    return fallbackTeamMembers;
  }
};

export const createTeamMember = async (payload: Partial<TeamMember>): Promise<TeamMember> => {
  try {
    const response = await apiClient.post<any>("/team", payload);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add team member";
    throw new Error(message);
  }
};
