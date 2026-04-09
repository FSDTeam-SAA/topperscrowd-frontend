"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyFavorites, toggleFavorite } from "../api/favorites.api";
import { toast } from "sonner";

export function useFavorites(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["favorites", params],
    queryFn: () => getMyFavorites(params),
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => toggleFavorite(bookId),
    onSuccess: (res) => {
      const added = res.data?.added;
      toast.success(added ? "Added to wishlist" : "Removed from wishlist");
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update wishlist");
    },
  });
}
