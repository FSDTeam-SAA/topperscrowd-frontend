export type PaymentStatus = "paid" | "pending" | "cancelled";

export interface PaymentHistoryProduct {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: {
    public_id?: string;
    url?: string;
    secure_url?: string;
  };
  formatType?: string;
  price?: number;
}

export interface PaymentHistoryItem {
  productType: "book" | "ebook";
  book?: PaymentHistoryProduct | null;
  ebook?: PaymentHistoryProduct | null;
  price: number;
  quantity: number;
}

export interface PaymentHistoryOrder {
  orderId: string;
  paymentStatus: PaymentStatus;
  statusLabel: string;
  totalAmount: number;
  paypalOrderId?: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: PaymentHistoryItem[];
}

export interface PaymentHistoryMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaymentHistoryResponse {
  success: boolean;
  message: string;
  statusCode: number;
  meta: PaymentHistoryMeta;
  data: PaymentHistoryOrder[];
}

export interface PaymentHistoryParams {
  page?: number;
  limit?: number;
  paymentStatus?: PaymentStatus | "all";
}
