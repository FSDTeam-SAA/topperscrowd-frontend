import { api } from "@/lib/api";

export interface EBookCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EBookCategoryPayload {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface EBookCategoriesResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EBookCategory[];
}

export interface EBookCategoryResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EBookCategory;
}

export const getAllEBookCategories =
  async (): Promise<EBookCategoriesResponse> => {
    const { data } =
      await api.get<EBookCategoriesResponse>("/ecategory/get-all");
    return data;
  };

export const createEBookCategory = async (
  payload: EBookCategoryPayload,
): Promise<EBookCategoryResponse> => {
  const { data } = await api.post<EBookCategoryResponse>(
    "/ecategory/create-ecategory",
    payload,
  );
  return data;
};

export const updateEBookCategory = async (
  categoryId: string,
  payload: EBookCategoryPayload,
): Promise<EBookCategoryResponse> => {
  const { data } = await api.patch<EBookCategoryResponse>(
    `/ecategory/update/${categoryId}`,
    payload,
  );
  return data;
};

export const deleteEBookCategory = async (categoryId: string) => {
  const { data } = await api.delete(`/ecategory/delete/${categoryId}`);
  return data;
};
