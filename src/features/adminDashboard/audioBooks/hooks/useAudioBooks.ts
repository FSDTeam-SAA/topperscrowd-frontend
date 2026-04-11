import { useQuery } from "@tanstack/react-query";
import { fetchAudioBooks } from "../api/audioBooks.api";

export const useAudioBooks = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["audioBooks", page, limit],
    queryFn: () => fetchAudioBooks(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
