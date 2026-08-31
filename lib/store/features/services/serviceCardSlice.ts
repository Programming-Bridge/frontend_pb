import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { ServiceCard } from "@/app/services/serviceCardService";

export interface ServiceCardState {
  cards: ServiceCard[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceCardState = {
  cards: [],
  loading: true,
  error: null,
};

export const serviceCardSlice = createSlice({
  name: "serviceCards",
  initialState,
  reducers: {
    setServiceCards: (state, action: PayloadAction<ServiceCard[]>) => {
      state.cards = action.payload;
    },
    setServiceCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setServiceCardsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setServiceCards, setServiceCardsLoading, setServiceCardsError } = serviceCardSlice.actions;

export const selectServiceCards = (state: RootState) => state?.serviceCards?.cards ?? [];
export const selectServiceCardsLoading = (state: RootState) => state?.serviceCards?.loading ?? false;
export const selectServiceCardsError = (state: RootState) => state?.serviceCards?.error ?? null;

export default serviceCardSlice.reducer;
