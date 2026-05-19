import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCoupons, deleteCoupon } from "../api/cupon.api";

export const useGetAllCoupons = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["all-coupons", page, limit],
    queryFn: () => getAllCoupons(page, limit),
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
    },
  });
};
