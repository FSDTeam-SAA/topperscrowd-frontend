import { api } from "@/lib/api";
import { OrdersParams, OrdersResponse } from "../types/ordersManagement.types";

export async function fetchOrders(
  params: OrdersParams = {},
): Promise<OrdersResponse> {
  const {
    page = 1,
    limit = 10,
    search,
    paymentStatus,
    sort,
    from,
    to,
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));
  if (search) queryParams.set("search", search);
  if (paymentStatus && paymentStatus !== "all")
    queryParams.set("paymentStatus", paymentStatus);
  if (sort) queryParams.set("sort", sort);
  if (from) queryParams.set("from", from);
  if (to) queryParams.set("to", to);

  const { data } = await api.get<OrdersResponse>(
    `/order/get-all-orders?${queryParams.toString()}`,
  );
  return data;
}
