import apiClient, { cachedGet } from "./apiClient";

export interface InquiryPayload {
  name: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  phone?: string;
  company?: string;
}

export interface InquiryItem {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
  phone?: string;
  company?: string;
  status?: "New" | "In Review" | "Contacted" | "Closed";
  createdAt?: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitInquiry = async (
  payload: InquiryPayload
): Promise<InquiryResponse> => {
  try {
    const response = await apiClient.post<any>("/inquiries", payload);
    return {
      success: true,
      message:
        (response as any)?.message ||
        "Thank you! Your inquiry has been submitted successfully.",
      data: (response as any)?.data,
    };
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Failed to submit inquiry. Please try again or email us directly.";
    console.error("Submit Inquiry Error:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const getInquiries = async (): Promise<InquiryItem[]> => {
  try {
    const response = await cachedGet<any>("/inquiries");
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  } catch (error) {
    console.warn("Could not fetch inquiries:", error);
    return [];
  }
};

export const updateInquiryStatus = async (
  id: string,
  status: string
): Promise<InquiryItem> => {
  try {
    const response = await apiClient.patch<any>(`/inquiries/${id}/status`, { status });
    return (response as any)?.data || response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update inquiry status";
    throw new Error(message);
  }
};

export const deleteInquiry = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete<any>(`/inquiries/${id}`);
    return response as any;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete inquiry";
    throw new Error(message);
  }
};
