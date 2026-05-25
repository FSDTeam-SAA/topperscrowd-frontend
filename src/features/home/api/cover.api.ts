import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/shared";

export interface Cover {
  _id: string;
  title: string;
  description: string;
  edition: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export async function getAllCovers() {
  const { data } = await api.get<ApiResponse<Cover[]>>("/cover/get-all-covers");
  return data;
}
