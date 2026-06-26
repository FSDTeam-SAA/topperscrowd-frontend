import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLibraryStats,
  fetchContinueListening,
  fetchRecentPurchases,
  fetchMyBooks,
  fetchMyPurchasedEBooks,
  updateListenerProgress,
} from "../api/library.api";

export function useLibraryStats() {
  return useQuery({
    queryKey: ["libraryStats"],
    queryFn: fetchLibraryStats,
  });
}

export function useContinueListening() {
  return useQuery({
    queryKey: ["continueListening"],
    queryFn: fetchContinueListening,
  });
}

export function useRecentPurchases() {
  return useQuery({
    queryKey: ["recentPurchases"],
    queryFn: fetchRecentPurchases,
  });
}

export function useMyBooks(
  page: number = 1,
  limit: number = 10,
  search?: string,
) {
  return useQuery({
    queryKey: ["myBooks", page, limit, search],
    queryFn: () => fetchMyBooks(page, limit, search),
  });
}

export function useMyPurchasedEBooks(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ["myPurchasedEBooks", page, limit],
    queryFn: () => fetchMyPurchasedEBooks(page, limit),
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateListenerProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["continueListening"] });
      queryClient.invalidateQueries({ queryKey: ["libraryStats"] });
    },
  });
}
