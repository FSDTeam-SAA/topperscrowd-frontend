import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "../api/usersManagement.api";
import { toast } from "sonner";

export const useUsersManagement = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["usersManagement", page, limit],
    queryFn: () => fetchUsers(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (res: { success: boolean; message: string }) => {
      toast.success(res?.message || "User deleted successfully");
      qc.invalidateQueries({ queryKey: ["usersManagement"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete user");
    },
  });
};
