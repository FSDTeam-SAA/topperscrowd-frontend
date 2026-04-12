import { useQuery } from "@tanstack/react-query";
import {
  fetchLibraryStats,
  fetchContinueListening,
  fetchRecentPurchases,
  fetchMyBooks,
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

export function useMyBooks(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ["myBooks", page, limit],
    queryFn: () => fetchMyBooks(page, limit),
  });
}
