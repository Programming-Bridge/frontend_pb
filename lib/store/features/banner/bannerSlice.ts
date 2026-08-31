import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Banner } from "@/app/services/bannerService";

export interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  loading: true,
  error: null,
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<Banner[]>) => {
      state.banners = action.payload;
    },
    setBannerLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBannerError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setBanners, setBannerLoading, setBannerError } = bannerSlice.actions;

export const selectBanners = (state: RootState) => state?.banner?.banners ?? [];
export const selectBannerLoading = (state: RootState) => state?.banner?.loading ?? false;
export const selectBannerError = (state: RootState) => state?.banner?.error ?? null;

export default bannerSlice.reducer;
