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
}
