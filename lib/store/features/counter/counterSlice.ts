import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface CounterState {
  value: number;
  step: number;
  history: number[];
}

const initialState: CounterState = {
  value: 0,
  step: 1,
  history: [0],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.step;
      state.history.push(state.value);
    },
    decrement: (state) => {
      state.value -= state.step;
      state.history.push(state.value);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: (state) => {
      state.value = 0;
      state.history = [0];
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount, setStep, reset } =
  counterSlice.actions;

// Basic Selectors
export const selectCount = (state: RootState) => state.counter.value;
export const selectStep = (state: RootState) => state.counter.step;
export const selectHistory = (state: RootState) => state.counter.history;

// Memoized Selectors using createSelector
export const selectCountDouble = createSelector(
  [selectCount],
  (count) => count * 2
);

export const selectCountStats = createSelector(
  [selectCount, selectHistory],
  (count, history) => ({
    isEven: count % 2 === 0,
    isPositive: count > 0,
    isNegative: count < 0,
    operationsCount: history.length - 1,
    maxValue: Math.max(...history),
    minValue: Math.min(...history),
  })
);

// Export reducer
export default counterSlice.reducer;
