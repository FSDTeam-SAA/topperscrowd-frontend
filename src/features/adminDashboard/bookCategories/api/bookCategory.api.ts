import { api } from "@/lib/api";

export interface BookCategory {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image?: {
    public_id: string;
    secure_url: string;
  };
}

export interface GetAllBookCategoriesResponse {
  success: boolean;
  message: string;
  statusCode: number;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: BookCategory[];
}

export const getAllBookCategories = async (
  page = 1,
  limit = 10,
): Promise<GetAllBookCategoriesResponse> => {
  const { data } = await api.get<GetAllBookCategoriesResponse>(
    `/bookcategory/get-all-bookcategories?page=${page}&limit=${limit}`,
  );
  return data;
};

export const createBookCategory = async (formData: FormData) => {
  const { data } = await api.post(
    `/bookcategory/create-bookcategory`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const updateBookCategory = async (
  categoryId: string,
  formData: FormData,
) => {
  const { data } = await api.patch(
    `/bookcategory/update-bookcategory/${categoryId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const deleteBookCategory = async (categoryId: string) => {
  const { data } = await api.delete(
    `/bookcategory/delete-bookcategory/${categoryId}`,
  );
  return data;
};
