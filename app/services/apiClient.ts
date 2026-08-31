import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const rawUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").trim().replace(/\/+$/, "");
const resolvedBaseUrl = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl}/api`;

const apiClient: AxiosInstance = axios.create({
  baseURL: resolvedBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Client-side in-memory cache and promise deduplication map
const clientCache = new Map<string, { data: any; timestamp: number }>();
const inFlightRequests = new Map<string, Promise<any>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

// Custom cached GET helper for lightning-fast repeated loads
export const cachedGet = async <T = any>(
  url: string,
  params?: any,
  ttlMs = CACHE_TTL_MS
): Promise<T> => {
  const cacheKey = `GET:${url}:${JSON.stringify(params || {})}`;

  // 1. Return from memory cache if fresh
  const cached = clientCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data as T;
  }

  // 2. Deduplicate identical concurrent requests in flight
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey) as Promise<T>;
  }

  const requestPromise = apiClient
    .get<T>(url, { params })
    .then((data) => {
      clientCache.set(cacheKey, { data, timestamp: Date.now() });
      inFlightRequests.delete(cacheKey);
      return data as unknown as T;
    })
    .catch((err) => {
      inFlightRequests.delete(cacheKey);
      throw err;
    });

  inFlightRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

// Invalidate client cache on mutations
export const invalidateClientCache = (prefix?: string) => {
  if (!prefix) {
    clientCache.clear();
    return;
  }
  for (const key of clientCache.keys()) {
    if (key.includes(prefix)) {
      clientCache.delete(key);
    }
  }
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Clear cache if this was a mutation
    if (["post", "put", "delete", "patch"].includes(response.config.method?.toLowerCase() || "")) {
      invalidateClientCache();
    }
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong with the API request";
    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
