import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Project } from "@/app/services/projectService";

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: true,
  error: null,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setProjectsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProjectsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProjects, setProjectsLoading, setProjectsError } = projectSlice.actions;

export const selectProjects = (state: RootState) => state?.projects?.projects ?? [];
export const selectProjectsLoading = (state: RootState) => state?.projects?.loading ?? false;
export const selectProjectsError = (state: RootState) => state?.projects?.error ?? null;

export default projectSlice.reducer;
