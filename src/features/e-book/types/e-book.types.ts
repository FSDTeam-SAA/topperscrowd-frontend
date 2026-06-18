export interface EBookImage {
  public_id: string;
  secure_url: string;
}

export interface EBookFile {
  public_id: string;
  secure_url: string;
}

export interface EBookCategoryRef {
  _id: string;
  name: string;
}

export interface EBook {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  category: EBookCategoryRef;
  formatType: string;
  price: number;
  isPremium: boolean;
  status: string;
  coverImage: EBookImage;
  file: EBookFile;
  averageRating: number;
  totalReviews: number;
  saleCount: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EBooksMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface EBooksResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EBook[];
  meta: EBooksMeta;
}
