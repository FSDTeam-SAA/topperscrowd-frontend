import { api } from "@/lib/api";
import type { ApiResponse, CheckoutResponse } from "@/types/shared";
import { AxiosError } from "axios";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = (error.response?.data as ApiResponse)?.message;
    if (message) return message;
    if (error.response?.status === 401)
      return "You are not logged in. Please log in to continue.";
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export async function checkout(body: {
  orderType: "buy-now" | "cart";
  bookId?: string;
  quantity?: number;
  couponCode?: string;
}) {
  try {
    const { data } = await api.post<ApiResponse<CheckoutResponse>>(
      "/order/checkout",
      body,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function verifyPayment(sessionId: string) {
  try {
    const { data } = await api.post<ApiResponse>("/order/verify-payment", {
      sessionId,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
