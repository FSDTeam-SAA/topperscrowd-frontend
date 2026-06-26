import { api } from "@/lib/api";
import type {
  PaymentHistoryParams,
  PaymentHistoryResponse,
} from "../types/payment-history.types";

export async function fetchMyPaymentHistory(
  params: PaymentHistoryParams = {},
): Promise<PaymentHistoryResponse> {
  const { page = 1, limit = 10, paymentStatus } = params;
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (paymentStatus && paymentStatus !== "all") {
    searchParams.set("paymentStatus", paymentStatus);
  }

  const { data } = await api.get<PaymentHistoryResponse>(
    `/order/my-payment-history?${searchParams.toString()}`,
  );

  return data;
}
