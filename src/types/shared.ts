export interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  rating: number;
  ratingCount?: number;
  image: string;
  description?: string;
  pages?: number;
  language?: string;
  publisher?: string;
  narrator?: string;
  duration?: string;
  releaseDate?: string;
}

export interface Category {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Review {
  id: string;
  text: string;
  author: string;
  avatar: string;
  rating: number;
}
