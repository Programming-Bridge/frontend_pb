import apiClient, { cachedGet } from "./apiClient";

export interface Banner {
  _id?: string;
  id?: string;
  pageType?: string;
  badge?: string;
  title: string;
  subTitle?: string;
  description: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  image?: string;
  img?: string;
  imageUrl?: string;
  imageAlt?: string;
  cloudinaryPublicId?: string;
  features?: string[];
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await cachedGet<any>("/banner");

    // Case 1: Backend returns { success: true, count: N, data: Banner[] }
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }

    // Case 2: Backend returns direct array [Banner, ...]
    if (Array.isArray(response)) {
      return response;
    }

    // Case 3: Backend returns single object { success: true, data: Banner }
    if (response && (response as any).data && typeof (response as any).data === "object") {
      return [(response as any).data];
    }

    // Case 4: Backend returns single banner object directly
    if (response && typeof response === "object" && (response as any).title) {
      return [response as unknown as Banner];
    }

    return [];
  } catch (error) {
    console.warn("Could not fetch banners from API, fallback will be used:", error);
    throw error;
  }
};

export const createBanner = async (data: FormData | Partial<Banner>): Promise<Banner> => {
  try {
    const response = await apiClient.post<any>("/banner", data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create banner";
    throw new Error(message);
  }
};

export const updateBanner = async (id: string, data: FormData | Partial<Banner>): Promise<Banner> => {
  try {
    const response = await apiClient.put<any>(`/banner/${id}`, data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update banner";
    throw new Error(message);
  }
};

export const deleteBanner = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/banner/${id}`);
    return response as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete banner";
    throw new Error(message);
  }
};
