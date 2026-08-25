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
