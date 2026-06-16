import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { EBooksResponse } from "../types/eBooks.types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export interface EBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
  from?: string;
  to?: string;
  categoryId?: string;
}

export async function fetchEBooks(
  params: EBooksParams = {},
): Promise<EBooksResponse> {
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
    if (params.categoryId) searchParams.set("categoryId", params.categoryId);

    const { data } = await api.get<EBooksResponse>(
      `/ebook/get-all?${searchParams.toString()}`,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function createEBook(formData: FormData): Promise<void> {
  try {
    await api.post("/ebook/create-ebook", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function updateEBook(
  ebookId: string,
  formData: FormData,
): Promise<void> {
  try {
    await api.patch(`/ebook/update-ebook/${ebookId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function deleteEBook(ebookId: string): Promise<void> {
  try {
    await api.delete(`/ebook/delete-ebook/${ebookId}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
