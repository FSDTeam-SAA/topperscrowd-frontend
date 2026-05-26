import { api } from "@/lib/api";
import type { ApiResponse, ApiCart } from "@/types/shared";
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

export async function getCart() {
  try {
    const { data } = await api.get<ApiResponse<ApiCart>>("/cart/get-cart");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function addToCart(items: { bookId: string; quantity: number }[]) {
  try {
    const { data } = await api.post<ApiResponse<ApiCart>>("/cart/add-to-cart", {
      items,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function updateCartQuantity(bookId: string, quantity: number) {
  try {
    const { data } = await api.patch<ApiResponse<ApiCart>>(
      "/cart/update-quantity",
      { bookId, quantity },
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function removeCartItem(bookId: string) {
  try {
    const { data } = await api.delete<ApiResponse<ApiCart>>(
      `/cart/remove-item/${bookId}`,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function clearCart() {
  try {
    const { data } = await api.delete<ApiResponse<ApiCart>>("/cart/clear-cart");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
