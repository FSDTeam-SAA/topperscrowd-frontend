"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getPublicEBookCategories,
  isActiveEBookCategory,
} from "../api/e-book-category.api";

export function useEBookCategories() {
  return useQuery({
    queryKey: ["public-ebook-categories"],
    queryFn: getPublicEBookCategories,
    select: (res) => (res.data ?? []).filter(isActiveEBookCategory),
  });
}

export function useEBookCategory(id: string) {
  return useQuery({
    queryKey: ["public-ebook-category", id],
    queryFn: getPublicEBookCategories,
    select: (res) =>
      (res.data ?? []).find(
        (category) => category._id === id || category.slug === id,
      ),
    enabled: !!id,
  });
}
