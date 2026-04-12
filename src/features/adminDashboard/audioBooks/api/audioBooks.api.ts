import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { AudioBooksResponse } from "../types/audioBooks.types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export interface AudioBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
  from?: string;
  to?: string;
  bookcategoryId?: string;
}

export async function fetchAudioBooks(
  params: AudioBooksParams = {},
): Promise<AudioBooksResponse> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", String(params.page ?? 1));
    searchParams.set("limit", String(params.limit ?? 10));
    if (params.search) searchParams.set("search", params.search);
    if (params.status && params.status !== "all")
      searchParams.set("status", params.status);
    if (params.sort) searchParams.set("sort", params.sort);
    if (params.from) searchParams.set("from", params.from);
    if (params.to) searchParams.set("to", params.to);
    if (params.bookcategoryId)
      searchParams.set("bookcategoryId", params.bookcategoryId);

    const { data } = await api.get<AudioBooksResponse>(
      `/book/get-all-books?${searchParams.toString()}`,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function createAudioBook(formData: FormData): Promise<void> {
  try {
    await api.post("/book/create-book", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function updateAudioBook(
  bookId: string,
  formData: FormData,
): Promise<void> {
  try {
    await api.patch(`/book/update-book/${bookId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function deleteAudioBook(bookId: string): Promise<void> {
  try {
    await api.delete(`/book/delete-book/${bookId}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
