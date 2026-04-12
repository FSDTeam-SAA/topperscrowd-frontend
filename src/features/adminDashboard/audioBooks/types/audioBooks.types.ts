export interface AudioBookImage {
  public_id: string;
  secure_url: string;
}

export interface AudioBookAudio {
  public_id: string;
  secure_url: string;
}

export interface AudioBookGenre {
  _id: string;
  title: string;
}

export interface AudioBook {
  _id: string;
  title: string;
  description: string;
  author: string;
  genre: AudioBookGenre;
  price: number;
  language: string;
  publisher: string;
  publicationYear: number;
  status: string;
  image: AudioBookImage;
  audio: AudioBookAudio;
  averageRating: number;
  totalReviews: number;
  saleCount: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AudioBooksMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface AudioBooksData {
  data: AudioBook[];
  meta: AudioBooksMeta;
}

export interface AudioBooksResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: AudioBook[];
  meta: AudioBooksMeta;
}
