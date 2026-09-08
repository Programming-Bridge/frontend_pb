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

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: "nav-services",
    label: "Services",
    path: "/services",
    order: 1,
    isActive: true,
    hasDropDown: true,
    dropDown: [
      { label: "Web Development", path: "/services/web-development", order: 1 },
      { label: "Mobile App Development", path: "/services/mobile-app-development", order: 2 },
      { label: "Native Android Development", path: "/services/android-development", order: 3 },
      { label: "API & Cloud Infrastructure", path: "/services/api-cloud", order: 4 },
      { label: "WordPress & CMS", path: "/services/wordpress-cms", order: 5 },
      { label: "AI & Automation", path: "/services/ai-automation", order: 6 },
    ],
  },
  {
    id: "nav-portfolio",
    label: "Portfolio",
    path: "/portfolio",
    order: 2,
    isActive: true,
    hasDropDown: false,
    dropDown: [],
  },
  {
    id: "nav-about",
    label: "About",
    path: "/about",
    order: 3,
    isActive: true,
    hasDropDown: true,
    dropDown: [
      { label: "Our Company", path: "/about/company", order: 1 },
      { label: "Engineering Team", path: "/about/team", order: 2 },
      { label: "Careers", path: "/about/careers", order: 3 },
    ],
  },
  {
    id: "nav-contact",
    label: "Contact",
    path: "/contact",
    order: 4,
    isActive: true,
    hasDropDown: false,
    dropDown: [],
  },
];

export const getNavbar = async (): Promise<NavItem[]> => {
  try {
    const response = await cachedGet<any>("/navbar");
    if (Array.isArray(response) && response.length > 0) {
      return response;
    }
    if (response && Array.isArray((response as any).data) && (response as any).data.length > 0) {
      return (response as any).data;
    }

    return DEFAULT_NAV_ITEMS;
  } catch (error) {
    console.warn("Could not fetch navbar items from API, fallback will be used:", error);
    return DEFAULT_NAV_ITEMS;
  }
};

