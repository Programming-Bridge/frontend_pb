import apiClient from "./apiClient";

export interface InquiryPayload {
  name: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  phone?: string;
  company?: string;
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
