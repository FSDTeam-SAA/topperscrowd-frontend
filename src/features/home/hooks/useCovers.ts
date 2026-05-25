"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCovers } from "../api/cover.api";

export function useCovers() {
  return useQuery({
    queryKey: ["covers"],
    queryFn: getAllCovers,
    select: (res) => res.data ?? [],
  });
}
