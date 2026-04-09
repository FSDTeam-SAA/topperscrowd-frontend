import { api } from "@/lib/api";
import type { ApiResponse, CheckoutResponse } from "@/types/shared";

export async function checkout(body: {
  orderType: "buy-now" | "cart";
  bookId?: string;
  quantity?: number;
  couponCode?: string;
}) {
  const { data } = await api.post<ApiResponse<CheckoutResponse>>(
    "/order/checkout",
    body,
  );
  return data;
}

export async function verifyPayment(sessionId: string) {
  const { data } = await api.post<ApiResponse>("/order/verify-payment", {
    sessionId,
  });
  return data;
}
