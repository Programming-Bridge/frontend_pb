import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface UIState {
  isMobileMenuOpen: boolean;
  activeTab: string;
  notificationCount: number;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  activeTab: "overview",
  notificationCount: 3,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    incrementNotifications: (state) => {
      state.notificationCount += 1;
    },
    clearNotifications: (state) => {
      state.notificationCount = 0;
    },
  },
});

// Export actions
export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  setActiveTab,
  incrementNotifications,
  clearNotifications,
} = uiSlice.actions;

// Selectors
export const selectIsMobileMenuOpen = (state: RootState) =>
  state.ui.isMobileMenuOpen;
export const selectActiveTab = (state: RootState) => state.ui.activeTab;
export const selectNotificationCount = (state: RootState) =>
  state.ui.notificationCount;

// Memoized Selector
export const selectHasUnreadNotifications = createSelector(
  [selectNotificationCount],
  (count) => count > 0
);

// Export reducer
export default uiSlice.reducer;
