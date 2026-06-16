import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchEBooks,
  createEBook,
  updateEBook,
  deleteEBook,
  type EBooksParams,
} from "../api/eBooks.api";
import { toast } from "sonner";

export const useEBooks = (params: EBooksParams = {}) => {
  return useQuery({
    queryKey: ["eBooks", params],
    queryFn: () => fetchEBooks(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateEBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createEBook(formData),
    onSuccess: () => {
      toast.success("E-book created successfully");
      queryClient.invalidateQueries({ queryKey: ["eBooks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create e-book");
    },
  });
};

export const useUpdateEBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      ebookId,
      formData,
    }: {
      ebookId: string;
      formData: FormData;
    }) => updateEBook(ebookId, formData),
    onSuccess: () => {
      toast.success("E-book updated successfully");
      queryClient.invalidateQueries({ queryKey: ["eBooks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update e-book");
    },
  });
};

export const useDeleteEBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ebookId: string) => deleteEBook(ebookId),
    onSuccess: () => {
      toast.success("E-book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["eBooks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete e-book");
    },
  });
};
