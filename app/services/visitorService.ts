import apiClient from "./apiClient";

export interface VisitHistoryEntry {
  path: string;
  referrer: string;
  timestamp: string;
  ip: string;
}

export interface VisitorItem {
  _id: string;
  ip: string;
  visitorId?: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  timezone?: string;
  isp?: string;
  userAgent?: string;
  browser: string;
  os: string;
  device: "Desktop" | "Mobile" | "Tablet" | "Bot" | "Unknown";
  screenResolution?: string;
  language?: string;
  lastPath: string;
  lastReferrer: string;
  totalVisits: number;
  firstVisitAt: string;
  lastVisitAt: string;
  visitsHistory?: VisitHistoryEntry[];
  isBlocked?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorStats {
  totalUniqueVisitors: number;
  todayActiveVisitors: number;
  totalVisitsCount: number;
  topCountries: Array<{ country: string; code: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
    bot?: number;
  };
}

export interface VisitorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  period?: "all" | "today" | "7days" | "30days";
  device?: string;
  country?: string;
  sortBy?: "lastVisitAt" | "totalVisits" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface VisitorApiResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  stats: VisitorStats;
  data: VisitorItem[];
}

/**
 * Public: Track a website visit from the client
 */
export async function trackVisit(payload: {
  path: string;
  referrer?: string;
  visitorId?: string;
  screenResolution?: string;
  language?: string;
}): Promise<any> {
  try {
    const res = await apiClient.post("/visitors/track", payload);
    return res;
  } catch (error) {
    // Non-blocking error handling
    return null;
  }
}

/**
 * Admin: Get all visitors with filters and stats
 */
export async function getVisitors(
  params?: VisitorQueryParams
): Promise<VisitorApiResponse> {
  const res = (await apiClient.get("/visitors", {
    params,
  })) as unknown as VisitorApiResponse;
  return res;
}

/**
 * Admin: Get single visitor details by ID
 */
export async function getVisitorById(
  id: string
): Promise<{ success: boolean; data: VisitorItem }> {
  const res = (await apiClient.get(
    `/visitors/${id}`
  )) as unknown as { success: boolean; data: VisitorItem };
  return res;
}

/**
 * Admin: Delete a single visitor record
 */
export async function deleteVisitor(
  id: string
): Promise<{ success: boolean; message: string }> {
  const res = (await apiClient.delete(
    `/visitors/${id}`
  )) as unknown as { success: boolean; message: string };
  return res;
}

/**
 * Superadmin: Clear all visitors or older records
 */
export async function clearAllVisitors(
  olderThanDays?: number
): Promise<{ success: boolean; message: string; deletedCount: number }> {
  const res = (await apiClient.delete("/visitors", {
    params: { olderThanDays },
  })) as unknown as { success: boolean; message: string; deletedCount: number };
  return res;
}
