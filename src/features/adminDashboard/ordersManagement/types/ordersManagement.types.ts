export interface OrderBookGenre {
  _id: string;
  title: string;
}

export interface OrderBook {
  _id: string;
  title: string;
  description: string;
  author: string;
  genre: OrderBookGenre;
  price: number;
  language: string;
  publisher: string;
  publicationYear: number;
}

export interface OrderItem {
  book: OrderBook;
  price: number;
  quantity: number;
}

export interface OrderUser {
  _id: string;
  email: string;
  role: string;
  image?: {
    public_id: string;
    url: string;
  };
}

export interface Order {
  _id: string;
  userId: OrderUser;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "cancelled";
  stripeSessionId?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersMeta {
  page: number;
  limit: number;
  totalOrders: number;
}

export interface OrdersStats {
  totalUsers: number;
  totalOrders: number;
  totalReviews: number;
  totalRevenue: number;
}

export interface OrdersResponseData {
  stats: OrdersStats;
  recentOrders: Order[];
  meta: OrdersMeta;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: OrdersResponseData;
}

export interface OrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  paymentStatus?: "pending" | "paid" | "cancelled" | "all";
  sort?: "ascending" | "descending";
  from?: string;
  to?: string;
}
