import apiClient, { cachedGet } from "./apiClient";
import {
  enrichedTechStack,
  enrichedAiMlStack,
  enrichedMobileStack,
  type TechStackItem,
} from "@/app/data/techStackData";

export interface TechnologyPayload {
  name: string;
  svgUrl: string;
  domain: "software" | "ai-ml" | "mobile";
  category?: string;
  categoryLabel?: string;
  badge?: string;
  shortDesc?: string;
  highlight?: string;
  invertInDark?: boolean;
  order?: number;
  isActive?: boolean;
}

export interface TechnologyResponse {
  success: boolean;
  count?: number;
  data: TechStackItem[];
  message?: string;
}

const fallbackAll: TechStackItem[] = [
  ...enrichedTechStack,
  ...enrichedAiMlStack,
  ...enrichedMobileStack,
];

export const getTechnologies = async (
  domain?: "software" | "ai-ml" | "mobile" | "all"
): Promise<TechStackItem[]> => {
  try {
    const url = domain && domain !== "all" ? `/tech-stack?domain=${domain}` : "/tech-stack";
    const response = await cachedGet<any>(url);

    // Case 1: Backend returns { success: true, count: N, data: TechStackItem[] }
    if (response && Array.isArray((response as any).data) && (response as any).data.length > 0) {
      return (response as any).data;
    }

    // Case 2: Backend returns direct array
    if (Array.isArray(response) && response.length > 0) {
      return response;
    }

    // Fallback if empty database
    return getFallbackByDomain(domain);
  } catch (error) {
    console.warn("Could not fetch technologies from API, using fallback data:", error);
    return getFallbackByDomain(domain);
  }
};

export const getFallbackByDomain = (
  domain?: "software" | "ai-ml" | "mobile" | "all"
): TechStackItem[] => {
  if (domain === "software") return enrichedTechStack;
  if (domain === "ai-ml") return enrichedAiMlStack;
  if (domain === "mobile") return enrichedMobileStack;
  return fallbackAll;
};

export const createTechnology = async (
  payload: TechnologyPayload
): Promise<TechStackItem> => {
  try {
    const response = await apiClient.post<any>("/tech-stack", payload);
    return (response as any)?.data || response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add technology";
    throw new Error(message);
  }
};

export const updateTechnology = async (
  id: string,
  payload: Partial<TechnologyPayload>
): Promise<TechStackItem> => {
  try {
    const response = await apiClient.put<any>(`/tech-stack/${id}`, payload);
    return (response as any)?.data || response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update technology";
    throw new Error(message);
  }
};

export const deleteTechnology = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/tech-stack/${id}`);
    return response as any;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete technology";
    throw new Error(message);
  }
};

export const seedTechnologies = async (): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    const response = await apiClient.post<any>("/tech-stack/seed");
    return response as any;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to seed technologies";
    throw new Error(message);
  }
};
