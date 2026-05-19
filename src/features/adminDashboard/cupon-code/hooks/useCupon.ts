import { useQuery } from "@tanstack/react-query";
import { getAllCoupons } from "../api/cupon.api";

export const useGetAllCoupons = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["all-coupons", page, limit],
    queryFn: () => getAllCoupons(page, limit),
  });
};
