import { useQuery } from "@tanstack/react-query";
import { fetchMyPaymentHistory } from "../api/payment-history.api";
import type { PaymentHistoryParams } from "../types/payment-history.types";

export function useMyPaymentHistory(params: PaymentHistoryParams = {}) {
  return useQuery({
    queryKey: ["myPaymentHistory", params],
    queryFn: () => fetchMyPaymentHistory(params),
  });
}
