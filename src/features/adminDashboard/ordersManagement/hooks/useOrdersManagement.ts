import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/ordersManagement.api";
import { OrdersParams } from "../types/ordersManagement.types";

export function useOrders(params: OrdersParams = {}) {
  return useQuery({
    queryKey: ["adminOrders", params],
    queryFn: () => fetchOrders(params),
  });
}
