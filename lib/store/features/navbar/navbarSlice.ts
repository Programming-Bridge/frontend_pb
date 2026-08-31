import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { NavItem } from "@/app/services/navbarService";

export interface NavbarState {
  items: NavItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NavbarState = {
  items: [],
  loading: true,
  error: null,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavItems: (state, action: PayloadAction<NavItem[]>) => {
      state.items = action.payload;
    },
    setNavbarLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNavbarError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setNavItems, setNavbarLoading, setNavbarError } = navbarSlice.actions;

export const selectNavItems = (state: RootState) => state?.navbar?.items ?? [];
export const selectNavbarLoading = (state: RootState) => state?.navbar?.loading ?? false;
export const selectNavbarError = (state: RootState) => state?.navbar?.error ?? null;

export default navbarSlice.reducer;
