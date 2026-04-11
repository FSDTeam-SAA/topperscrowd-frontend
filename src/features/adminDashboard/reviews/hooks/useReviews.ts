import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../api/reviews.api";

export const useReviews = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["reviews", page, limit],
    queryFn: () => fetchReviews(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
