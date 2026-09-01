import apiClient, { cachedGet } from "./apiClient";

export interface Career {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  department: string;
  location?: string;
  type?: string;
  experience?: string;
  salaryRange?: string;
  badge?: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  skills?: string[];
  benefits?: string[];
  order?: number;
  isOpen?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export const getCareers = async (department?: string): Promise<Career[]> => {
  try {
    const params = department && department !== "All" ? { department } : undefined;
    const response = await cachedGet<any>("/careers", params);

    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  } catch (error) {
    console.warn("Could not fetch careers from API, using fallback:", error);
    return [];
  }
};

export const createCareer = async (data: Partial<Career>): Promise<Career> => {
  try {
    const response = await apiClient.post<any>("/careers", data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create career";
    throw new Error(message);
  }
};

export const updateCareer = async (id: string, data: Partial<Career>): Promise<Career> => {
  try {
    const response = await apiClient.put<any>(`/careers/${id}`, data);
    return (response as any)?.data || response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update career";
    throw new Error(message);
  }
};

export const deleteCareer = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/careers/${id}`);
    return response as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete career";
    throw new Error(message);
  }
};

export interface JobApplication {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  roleApplied: string;
  experienceYears?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
  status?: "Pending" | "Reviewing" | "Shortlisted" | "Rejected" | "Hired";
  createdAt?: string;
}

export interface JobApplicationData {
  fullName: string;
  email: string;
  phone?: string;
  roleApplied: string;
  experienceYears?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  resumeFile?: File | null;
  coverLetter?: string;
}

export const submitJobApplication = async (
  data: JobApplicationData | FormData
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    let payload: any = data;
    let headers: any = {};

    if (!(data instanceof FormData)) {
      if (data.resumeFile) {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        if (data.phone) formData.append("phone", data.phone);
        formData.append("roleApplied", data.roleApplied);
        if (data.experienceYears) formData.append("experienceYears", data.experienceYears);
        if (data.portfolioUrl) formData.append("portfolioUrl", data.portfolioUrl);
        if (data.githubUrl) formData.append("githubUrl", data.githubUrl);
        if (data.linkedinUrl) formData.append("linkedinUrl", data.linkedinUrl);
        if (data.resumeUrl) formData.append("resumeUrl", data.resumeUrl);
        if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
        formData.append("resume", data.resumeFile);
        payload = formData;
        headers["Content-Type"] = "multipart/form-data";
      }
    }

    const response = await apiClient.post<any>("/applications/apply", payload, {
      headers,
    });
    return response as any;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit job application";
    throw new Error(message);
  }
};

export const getApplications = async (): Promise<JobApplication[]> => {
  try {
    const response = await cachedGet<any>("/applications");
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  } catch (error) {
    console.warn("Could not fetch applications:", error);
    return [];
  }
};

export const updateApplicationStatus = async (
  id: string,
  status: string
): Promise<JobApplication> => {
  try {
    const response = await apiClient.put<any>(`/applications/${id}`, { status });
    return (response as any)?.data || response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update application status";
    throw new Error(message);
  }
};

export const deleteApplication = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/applications/${id}`);
    return response as any;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete application";
    throw new Error(message);
  }
};
