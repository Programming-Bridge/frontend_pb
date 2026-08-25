import apiClient, { cachedGet } from "./apiClient";

export interface ServiceCard {
  _id?: string;
  id?: string;
  icon?: string;
  badge?: string;
  title: string;
  description: string;
  tags?: string[];
  link?: string;
  order?: number;
  isActive?: boolean;
}

export const getServiceCards = async (): Promise<ServiceCard[]> => {
  try {
    const response = await cachedGet<any>("/services");

    // Case 1: Backend returns { success: true, count: N, data: ServiceCard[] }
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }

    // Case 2: Backend returns direct array [ServiceCard, ...]
    if (Array.isArray(response)) {
      return response;
    }

    // Case 3: Backend returns single object { success: true, data: ServiceCard }
    if (response && (response as any).data && typeof (response as any).data === "object") {
      return [(response as any).data];
    }

    return [];
  } catch (error) {
    console.warn("Could not fetch service cards from API, fallback will be used:", error);
    throw error;
  }
};
