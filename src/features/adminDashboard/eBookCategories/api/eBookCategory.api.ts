import { api } from "@/lib/api";
import type {
  EBookCategoriesResponse,
  EBookCategoryPayload,
  EBookCategoryResponse,
} from "@/features/e-book-category/types/e-book-category.types";
export type {
  EBookCategoriesResponse,
  EBookCategory,
  EBookCategoryPayload,
  EBookCategoryResponse,
} from "@/features/e-book-category/types/e-book-category.types";

export const getAllEBookCategories =
  async (): Promise<EBookCategoriesResponse> => {
    const { data } =
      await api.get<EBookCategoriesResponse>("/ecategory/get-all");
    return data;
  };

export const createEBookCategory = async (
  payload: FormData,
): Promise<EBookCategoryResponse> => {
  const { data } = await api.post<EBookCategoryResponse>(
    "/ecategory/create-ecategory",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const updateEBookCategory = async (
  categoryId: string,
  payload: EBookCategoryPayload | FormData,
): Promise<EBookCategoryResponse> => {
  const config =
    payload instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : undefined;

  const { data } = await api.patch<EBookCategoryResponse>(
    `/ecategory/update/${categoryId}`,
    payload,
    config,
  );
  return data;
};

export const deleteEBookCategory = async (categoryId: string) => {
  const { data } = await api.delete(`/ecategory/delete/${categoryId}`);
  return data;
};
