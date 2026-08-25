import apiClient, { cachedGet } from "./apiClient";

export interface NavDropdownItem {
  label: string;
  path?: string;
  href?: string;
  order?: number;
}

export interface NavItem {
  _id?: string;
  id?: string | number;
  label?: string;
  name?: string;
  title?: string;
  path?: string;
  href?: string;
  url?: string;
  link?: string;
  order?: number;
  isActive?: boolean;
  hasDropDown?: boolean;
  dropDown?: NavDropdownItem[];
}

export const getNavbar = async (): Promise<NavItem[]> => {
  try {
    const response = await cachedGet<any>("/navbar");
    if (Array.isArray(response)) {
      return response;
    }
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }

    return [];
  } catch (error) {
    console.warn("Could not fetch navbar items from API, fallback will be used:", error);
    throw error;
  }
};
