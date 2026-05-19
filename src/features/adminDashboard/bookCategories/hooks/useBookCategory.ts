import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBookCategories,
  createBookCategory,
  updateBookCategory,
  deleteBookCategory,
} from "../api/bookCategory.api";

export const useGetAllBookCategories = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["all-bookcategories", page, limit],
    queryFn: () => getAllBookCategories(page, limit),
  });
};

export const useCreateBookCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBookCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-bookcategories"] });
    },
  });
};

export const useUpdateBookCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateBookCategory(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-bookcategories"] });
    },
  });
};

export const useDeleteBookCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-bookcategories"] });
    },
  });
};
