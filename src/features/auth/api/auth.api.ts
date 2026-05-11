import { api } from "@/lib/api";
import { AxiosError } from "axios";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}

interface RegisterData {
  accessToken: string;
  refreshToken: string;
}

interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isVerified: boolean;
    profileImage?: string;
  };
}

interface ForgotPasswordData {
  accessToken: string;
}

interface VerifyOtpData {
  accessToken: string;
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiResponse;
    if (data?.message) return data.message;

    if (error.response?.status === 401) {
      return "You are not logged in. Please log in again.";
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export async function registerUser(body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<ApiResponse<RegisterData>> {
  try {
    const { data } = await api.post<ApiResponse<RegisterData>>(
      "/user/register",
      body,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function verifyEmail(
  otp: string,
  accessToken?: string,
): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>(
      "/user/verify-email",
      { otp },
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function resendOtp(accessToken?: string): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>(
      "/user/resend-otp",
      {},
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function forgotPassword(
  email: string,
): Promise<ApiResponse<ForgotPasswordData>> {
  try {
    const { data } = await api.post<ApiResponse<ForgotPasswordData>>(
      "/auth/forgot-password",
      { email },
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function resendForgotOtp(): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>("/auth/resend-forgot-otp");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function verifyForgotOtp(
  otp: string,
): Promise<ApiResponse<VerifyOtpData>> {
  try {
    const { data } = await api.post<ApiResponse<VerifyOtpData>>(
      "/auth/verify-otp",
      { otp },
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function resetPassword(newPassword: string): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>("/auth/reset-password", {
      newPassword,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
