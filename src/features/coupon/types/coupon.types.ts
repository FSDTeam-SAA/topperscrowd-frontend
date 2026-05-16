export interface CreateCouponPayload {
  email: string;
  codeName: string;
  expiryDate: string;
  usesLimit: number;
  discountType: "percentage" | "fixed";
  discountAmount: number;
}

export interface CouponResponse {
  _id: string;
  email: string;
  codeName: string;
  expiryDate: string;
  usesLimit: number;
  discountType: string;
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}
