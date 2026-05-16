import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoupon } from "../api/coupon.api";
import { AxiosError } from "axios";
import {
  ApiResponse,
  CouponResponse,
  CreateCouponPayload,
} from "../types/coupon.types";

export function useCreateCoupon() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<CouponResponse>,
    AxiosError<{ message: string }>,
    CreateCouponPayload
  >({
    mutationFn: createCoupon,
    onSuccess: () => {
      // You can invalidate relevant queries here if you have a list of coupons
      // queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
}
