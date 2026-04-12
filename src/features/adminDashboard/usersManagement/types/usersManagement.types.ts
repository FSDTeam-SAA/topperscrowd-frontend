export interface UserImage {
  public_id: string;
  url: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  image?: UserImage;
  totalOrders: number;
}

export interface UsersManagementMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface UsersManagementData {
  data: User[];
  meta: UsersManagementMeta;
}

export interface UsersManagementResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UsersManagementData;
}
