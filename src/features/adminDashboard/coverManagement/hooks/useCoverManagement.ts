import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCovers,
  createCover,
  updateCover,
  deleteCover,
} from "../api/coverManagement.api";

export const useGetAllCovers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["covers-admin", page, limit],
    queryFn: () => getAllCovers(page, limit),
  });
};

export const useCreateCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCover,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["covers-admin"] });
      queryClient.invalidateQueries({ queryKey: ["covers"] });
    },
  });
};

export const useUpdateCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateCover(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["covers-admin"] });
      queryClient.invalidateQueries({ queryKey: ["covers"] });
    },
  });
};

export const useDeleteCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCover,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["covers-admin"] });
      queryClient.invalidateQueries({ queryKey: ["covers"] });
    },
  });
};
