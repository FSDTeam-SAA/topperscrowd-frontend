"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getPublicEBookById,
  getPublicEBooks,
  type PublicEBooksParams,
} from "../api/e-book.api";

export function useEBooks(params: PublicEBooksParams = {}) {
  return useQuery({
    queryKey: ["public-ebooks", params],
    queryFn: () => getPublicEBooks(params),
  });
}

export function useEBook(id: string) {
  return useQuery({
    queryKey: ["public-ebook", id],
    queryFn: () => getPublicEBookById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}
