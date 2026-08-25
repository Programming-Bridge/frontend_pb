import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import uiReducer from "./features/ui/uiSlice";
import navbarReducer from "./features/navbar/navbarSlice";
import bannerReducer from "./features/banner/bannerSlice";
import serviceCardReducer from "./features/services/serviceCardSlice";
import projectReducer from "./features/projects/projectSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      ui: uiReducer,
      navbar: navbarReducer,
      banner: bannerReducer,
      serviceCards: serviceCardReducer,
      projects: projectReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
