export interface LibraryStats {
  totalAudiobooks: number;
  totalListeningTime: number;
  favorites: number;
}

export interface BookImage {
  public_id: string;
  secure_url: string;
}

export interface BookAudio {
  public_id: string;
  secure_url: string;
}

export interface EBookFile {
  public_id: string;
  url: string;
  fileSize?: string;
}

export interface PurchasedEBook {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  coverImage?: {
    public_id: string;
    url: string;
  };
  file?: EBookFile;
  formatType: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  price: number;
  isPremium: boolean;
  status: string;
  saleCount: number;
  downloadCount: number;
  hasFile: boolean;
  purchaseInfo?: {
    orderId: string;
    purchasedAt: string;
    price: number;
    quantity: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LibraryBook {
  _id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  price: number;
  language: string;
  publisher: string;
  publicationYear: number;
  status: string;
  image?: BookImage;
  audio?: BookAudio;
  averageRating: number;
  totalReviews: number;
  myRating?: number;
  myReview?: {
    _id: string;
    rating: number;
    comment: string;
  };
  saleCount: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContinueListeningData {
  _id: string;
  user: string;
  book: LibraryBook;
  progress: number;
  totalDuration: number;
  lastListenedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}
