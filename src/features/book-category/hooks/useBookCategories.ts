"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategoryById } from "../api/book-category.api";

export function useBookCategories() {
  return useQuery({
    queryKey: ["book-categories"],
    queryFn: getAllCategories,
    select: (res) => res.data ?? [],
  });
}

export function useBookCategory(id: string) {
  return useQuery({
    queryKey: ["book-category", id],
    queryFn: () => getCategoryById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}
