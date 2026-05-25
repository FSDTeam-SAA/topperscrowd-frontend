import { api } from "@/lib/api";

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

export interface GetAllCoversResponse {
  success: boolean;
  message: string;
  statusCode: number;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Cover[];
}

export const getAllCovers = async (
  page = 1,
  limit = 10,
): Promise<GetAllCoversResponse> => {
  const { data } = await api.get<GetAllCoversResponse>(
    `/cover/get-all-covers?page=${page}&limit=${limit}`,
  );
  return data;
};

export const createCover = async (formData: FormData) => {
  const { data } = await api.post(`/cover/create-cover`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateCover = async (coverId: string, formData: FormData) => {
  const { data } = await api.patch(`/cover/update-cover/${coverId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteCover = async (coverId: string) => {
  const { data } = await api.delete(`/cover/delete-cover/${coverId}`);
  return data;
};
