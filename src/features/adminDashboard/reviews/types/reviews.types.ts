export interface ReviewBook {
  _id: string;
  title: string;
}

export interface ReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Review {
  _id: string;
  bookId: ReviewBook;
  userId: ReviewUser;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface ReviewsData {
  data: Review[];
  meta: ReviewsMeta;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: ReviewsData;
}
