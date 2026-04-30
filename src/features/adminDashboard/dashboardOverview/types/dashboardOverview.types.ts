export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalReviews: number;
  totalRevenue: number;
}

export interface RecentOrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RecentOrderItem {
  book: string | { title: string };
  price: number;
  quantity: number;
}

export interface RecentOrder {
  _id: string;
  userId: RecentOrderUser;
  items: RecentOrderItem[];
  totalAmount: number;
  paymentStatus: string;
  orderType: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardOverviewMeta {
  page: number;
  limit: number;
  totalOrders: number;
}

export interface DashboardOverviewData {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  meta: DashboardOverviewMeta;
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: DashboardOverviewData;
}
