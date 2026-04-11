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

export async function fetchAudioBooks(
  page: number = 1,
  limit: number = 10,
): Promise<AudioBooksResponse> {
  try {
    const { data } = await api.get<AudioBooksResponse>(
      `/admin-dashboard/audio-management?page=${page}&limit=${limit}`,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
