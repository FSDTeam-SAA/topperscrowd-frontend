import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEBookCategory,
  deleteEBookCategory,
  getAllEBookCategories,
  updateEBookCategory,
  type EBookCategoryPayload,
} from "../api/eBookCategory.api";

export const E_BOOK_CATEGORIES_QUERY_KEY = ["all-ebook-categories"];

export const useGetAllEBookCategories = () => {
  return useQuery({
    queryKey: E_BOOK_CATEGORIES_QUERY_KEY,
    queryFn: getAllEBookCategories,
  });
};

export const useCreateEBookCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEBookCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: E_BOOK_CATEGORIES_QUERY_KEY,
      });
    },
  });
};

export const useUpdateEBookCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: EBookCategoryPayload | FormData;
    }) => updateEBookCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: E_BOOK_CATEGORIES_QUERY_KEY,
      });
    },
  });
};

export const useDeleteEBookCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEBookCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: E_BOOK_CATEGORIES_QUERY_KEY,
      });
    },
  });
};
