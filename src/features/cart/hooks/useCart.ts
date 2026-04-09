"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../api/cart.api";
import { toast } from "sonner";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    select: (res) => res.data,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (items: { bookId: string; quantity: number }[]) =>
      addToCart(items),
    onSuccess: (res) => {
      toast.success(res.message || "Added to cart");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to add to cart");
    },
  });
}

export function useUpdateCartQuantity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ bookId, quantity }: { bookId: string; quantity: number }) =>
      updateCartQuantity(bookId, quantity),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update quantity");
    },
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => removeCartItem(bookId),
    onSuccess: (res) => {
      toast.success(res.message || "Item removed");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to remove item");
    },
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: (res) => {
      toast.success(res.message || "Cart cleared");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to clear cart");
    },
  });
}
