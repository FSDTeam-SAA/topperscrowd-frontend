import { api } from "@/lib/api";
import {
  ApiResponse,
  CouponResponse,
  CreateCouponPayload,
} from "../types/coupon.types";

export async function createCoupon(
  payload: CreateCouponPayload,
): Promise<ApiResponse<CouponResponse>> {
  const { data } = await api.post<ApiResponse<CouponResponse>>(
    "/coupon/create-coupon",
    payload,
  );
  return data;
}

export async function getMyCoupons(): Promise<ApiResponse<CouponResponse[]>> {
  const { data } =
    await api.get<ApiResponse<CouponResponse[]>>("/coupon/my-coupons");
  return data;
}
