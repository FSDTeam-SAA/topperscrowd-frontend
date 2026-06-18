export interface EBookCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EBookCategoryPayload {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface EBookCategoriesResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EBookCategory[];
}

export interface EBookCategoryResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: EBookCategory;
}
