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

export const createServiceCard = async (data: Partial<ServiceCard>): Promise<ServiceCard> => {
  try {
    const response = await apiClient.post<any>("/services", data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create service card";
    throw new Error(message);
  }
};

export const updateServiceCard = async (id: string, data: Partial<ServiceCard>): Promise<ServiceCard> => {
  try {
    const response = await apiClient.put<any>(`/services/${id}`, data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update service card";
    throw new Error(message);
  }
};

export const deleteServiceCard = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/services/${id}`);
    return response as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete service card";
    throw new Error(message);
  }
};
