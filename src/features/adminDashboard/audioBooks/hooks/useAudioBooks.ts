import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAudioBooks,
  createAudioBook,
  updateAudioBook,
  deleteAudioBook,
  type AudioBooksParams,
} from "../api/audioBooks.api";
import { toast } from "sonner";

export const useAudioBooks = (params: AudioBooksParams = {}) => {
  return useQuery({
    queryKey: ["audioBooks", params],
    queryFn: () => fetchAudioBooks(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateAudioBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createAudioBook(formData),
    onSuccess: () => {
      toast.success("Audio book created successfully");
      queryClient.invalidateQueries({ queryKey: ["audioBooks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create audio book");
    },
  });
};

export const useUpdateAudioBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookId,
      formData,
    }: {
      bookId: string;
      formData: FormData;
    }) => updateAudioBook(bookId, formData),
    onSuccess: () => {
      toast.success("Audio book updated successfully");
      queryClient.invalidateQueries({ queryKey: ["audioBooks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update audio book");
    },
  });
};

export const useDeleteAudioBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => deleteAudioBook(bookId),
    onSuccess: () => {
      toast.success("Audio book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["audioBooks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete audio book");
    },
  });
};
