import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, deleteOrder } from "../api/ordersManagement.api";
import { OrdersParams } from "../types/ordersManagement.types";
import { toast } from "sonner";

export function useOrders(params: OrdersParams = {}) {
  return useQuery({
    queryKey: ["adminOrders", params],
    queryFn: () => fetchOrders(params),
  });
}

export function useDeleteOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: (res: { success: boolean; message: string }) => {
      toast.success(res?.message || "Order deleted successfully");
      qc.invalidateQueries({ queryKey: ["adminOrders"] });
    },
    onError: (err: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(
        err.response?.data?.message || err.message || "Failed to delete order",
      );
    },
  });
}
