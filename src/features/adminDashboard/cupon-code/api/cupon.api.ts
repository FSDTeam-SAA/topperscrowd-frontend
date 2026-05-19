import { api } from "@/lib/api";

export interface AssignedTo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Coupon {
  _id: string;
  codeName: string;
  assignedTo: AssignedTo | null;
  expiryDate: string;
  usesLimit: number;
  usedCount: number;
  discountType: "percentage" | "fixed";
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllCouponsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
  data: Coupon[];
}

export const getAllCoupons = async (page = 1, limit = 10) => {
  const { data } = await api.get<GetAllCouponsResponse>(
    `/coupon/all-coupons?page=${page}&limit=${limit}`,
  );
  return data;
};
