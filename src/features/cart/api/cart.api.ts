import { api } from "@/lib/api";
import type { ApiResponse, ApiCart } from "@/types/shared";

export async function getCart() {
  const { data } = await api.get<ApiResponse<ApiCart>>("/cart/get-cart");
  return data;
}

export async function addToCart(items: { bookId: string; quantity: number }[]) {
  const { data } = await api.post<ApiResponse<ApiCart>>("/cart/add-to-cart", {
    items,
  });
  return data;
}

export async function updateCartQuantity(bookId: string, quantity: number) {
  const { data } = await api.patch<ApiResponse<ApiCart>>(
    "/cart/update-quantity",
    { bookId, quantity },
  );
  return data;
}

export async function removeCartItem(bookId: string) {
  const { data } = await api.delete<ApiResponse<ApiCart>>(
    `/cart/remove-item/${bookId}`,
  );
  return data;
}

export async function clearCart() {
  const { data } = await api.delete<ApiResponse<ApiCart>>("/cart/clear-cart");
  return data;
}
