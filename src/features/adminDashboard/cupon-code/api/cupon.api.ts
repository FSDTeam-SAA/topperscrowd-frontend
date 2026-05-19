import { api } from "@/lib/api";

export interface CouponUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Coupon {
  _id: string;
  codeName: string;
  assignedTo: CouponUser | null;
  expiryDate: string;
  usesLimit: number;
  usedCount: number;
  discountType: "percentage" | "fixed";
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id?: string;
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

export const getAllCoupons = async (
  page = 1,
  limit = 10,
): Promise<GetAllCouponsResponse> => {
  const { data } = await api.get<GetAllCouponsResponse>(
    `/coupon/all-coupons?page=${page}&limit=${limit}`,
  );
  return data;
};

export const deleteCoupon = async (couponId: string) => {
  const { data } = await api.delete(`/coupon/${couponId}`);
  return data;
};
