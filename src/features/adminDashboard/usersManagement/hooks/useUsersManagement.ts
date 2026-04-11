import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/usersManagement.api";

export const useUsersManagement = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["usersManagement", page, limit],
    queryFn: () => fetchUsers(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
