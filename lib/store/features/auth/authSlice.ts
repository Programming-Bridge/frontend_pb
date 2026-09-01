import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { User } from "@/app/services/authService";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    setUserState: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCredentials,
  setUserState,
  logoutUser,
  setAuthLoading,
  setAuthError,
} = authSlice.actions;

export const selectAuthUser = (state: RootState) => state?.auth?.user ?? null;
export const selectAuthToken = (state: RootState) => state?.auth?.token ?? null;
export const selectIsAuthenticated = (state: RootState) =>
  state?.auth?.isAuthenticated ?? false;
export const selectAuthLoading = (state: RootState) =>
  state?.auth?.isLoading ?? false;
export const selectAuthError = (state: RootState) =>
  state?.auth?.error ?? null;

export default authSlice.reducer;
