import apiClient from "./apiClient";

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "superadmin" | "editor";
  avatar?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

const TOKEN_KEY = "pb_token";
const USER_KEY = "pb_user";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setUser = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<any>("/auth/login", credentials);
    const data: AuthResponse = response as any;

    if (data.token) {
      setToken(data.token);
    }
    if (data.user) {
      setUser(data.user);
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to sign in";
    throw new Error(message);
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await apiClient.get<any>("/auth/me");
    const user = (response as any)?.user || response;
    if (user) {
      setUser(user);
    }
    return user;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to verify session";
    throw new Error(message);
  }
};

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.put<any>("/auth/change-password", payload);
    return response as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to change password";
    throw new Error(message);
  }
};

// ===================== SUPERADMIN USER MANAGEMENT API =====================

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<any>("/auth/users");
    const users = (response as any)?.users || [];
    return Array.isArray(users) ? users : [];
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch users";
    throw new Error(message);
  }
};

export const createNewUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "editor";
  isActive?: boolean;
}): Promise<User> => {
  try {
    const response = await apiClient.post<any>("/auth/users", payload);
    return (response as any)?.user || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create user";
    throw new Error(message);
  }
};

export const updateUserRecord = async (
  id: string,
  payload: {
    name?: string;
    role?: "superadmin" | "admin" | "editor";
    isActive?: boolean;
    password?: string;
  }
): Promise<User> => {
  try {
    const response = await apiClient.put<any>(`/auth/users/${id}`, payload);
    return (response as any)?.user || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update user";
    throw new Error(message);
  }
};

export const deleteUserRecord = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/auth/users/${id}`);
    return response as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete user";
    throw new Error(message);
  }
};

export const logout = (): void => {
  removeToken();
  removeUser();
};
