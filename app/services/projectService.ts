import apiClient, { cachedGet } from "./apiClient";

export interface Project {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  category?: string;
  badge?: string;
  image?: string;
  img?: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  gitLink?: string;
  githubUrl?: string;
  liveLink?: string;
  liveUrl?: string;
  technologies?: string[];
  client?: string;
  featured?: boolean;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await cachedGet<any>("/projects");

    // Case 1: Backend returns { success: true, count: N, data: Project[] }
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }

    // Case 2: Backend returns direct array [Project, ...]
    if (Array.isArray(response)) {
      return response;
    }

    // Case 3: Backend returns single object { success: true, data: Project }
    if (response && (response as any).data && typeof (response as any).data === "object") {
      return [(response as any).data];
    }

    return [];
  } catch (error) {
    console.warn("Could not fetch projects from API, fallback will be used:", error);
    throw error;
  }
};

export const createProject = async (data: FormData | Partial<Project>): Promise<Project> => {
  try {
    const response = await apiClient.post<any>("/projects/add", data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    throw new Error(message);
  }
};

export const updateProject = async (id: string, data: FormData | Partial<Project>): Promise<Project> => {
  try {
    const response = await apiClient.put<any>(`/projects/${id}`, data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    throw new Error(message);
  }
};

export const deleteProject = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/projects/${id}`);
    return response as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete project";
    throw new Error(message);
  }
};
