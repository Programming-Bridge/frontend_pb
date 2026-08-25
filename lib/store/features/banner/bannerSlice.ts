import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Banner } from "@/app/services/bannerService";

export interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const fallbackBanners: Banner[] = [
  {
    _id: "fallback-banner-1",
    pageType: "home",
    badge: "Scale Your Digital Vision",
    title: "Next-Gen Software & Digital Engineering",
    subTitle: "Empowering modern brands with cutting-edge web, mobile, and AI solutions.",
    description:
      "We architect and engineer resilient full-stack web platforms, high-performance APIs, and custom enterprise software tailored for exponential growth.",
    primaryBtnText: "Start a Project",
    primaryBtnLink: "#contact",
    secondaryBtnText: "Explore Services",
    secondaryBtnLink: "#services",
    features: [
      "Modern Web & Cloud Architecture",
      "High-Velocity Agile Development",
      "Tailored Enterprise Solutions",
    ],
    order: 1,
    isActive: true,
  },
];

const initialState: BannerState = {
  banners: fallbackBanners,
  loading: false,
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

// Export Actions
export const { setBanners, setBannerLoading, setBannerError } = bannerSlice.actions;

// Export Selectors
export const selectBanners = (state: RootState) => state?.banner?.banners ?? [];
export const selectBannerLoading = (state: RootState) => state?.banner?.loading ?? false;
export const selectBannerError = (state: RootState) => state?.banner?.error ?? null;

// Export Reducer
export default bannerSlice.reducer;
