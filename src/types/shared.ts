// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

// Book category from API
export interface BookCategory {
  _id: string;
  title: string;
  description: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Book from API
export interface ApiBook {
  _id: string;
  title: string;
  description: string;
  author: string;
  genre: string | BookCategory;
  price: number;
  language: string;
  publisher: string;
  publicationYear?: number;
  status: string;
  saleCount: number;
  averageRating: number;
  totalReviews: number;
  reviews: ApiReview[];
  image: {
    public_id: string;
    secure_url: string;
  };
  audio?: {
    public_id: string;
    secure_url: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Review from API
export interface ApiReview {
  _id: string;
  bookId: string | { _id: string; title: string };
  userId:
    | string
    | {
        _id: string;
        firstName: string;
        lastName: string;
        image?: { secure_url: string };
      };
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart from API
export interface ApiCart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  book: ApiBook;
  quantity: number;
  _id: string;
}

// Order
export interface CheckoutResponse {
  checkoutUrl: string;
}

// Favorite toggle
export interface FavoriteToggleResponse {
  added: boolean;
}

// Coupon
export interface Coupon {
  _id: string;
  codeName: string;
  assignedTo: string;
  expiryDate: string;
  usesLimit: number;
  usedCount: number;
  discountType: "percentage" | "fixed";
  discountAmount: number;
}

// ---- Legacy types for existing UI components (mapped from API data) ----
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

// Mappers: API → UI
export function mapApiBookToBook(b: ApiBook): Book {
  return {
    id: b._id,
    title: b.title,
    author: b.author,
    price: `$${b.price.toFixed(2)}`,
    rating: b.averageRating,
    ratingCount: b.totalReviews,
    image: b.image?.secure_url || "/images/home/book1.png",
    description: b.description,
    language: b.language,
    publisher: b.publisher,
  };
}

export function mapApiCategoryToCategory(c: BookCategory): Category {
  return {
    slug: c._id,
    title: c.title.trim(),
    subtitle: c.description.trim(),
    image: c.image?.secure_url || "/images/home/category-scifi.png",
  };
}

export function mapApiReviewToReview(r: ApiReview): Review {
  const user = typeof r.userId === "object" ? r.userId : null;
  return {
    id: r._id,
    text: r.comment,
    author: user ? `${user.firstName} ${user.lastName}` : "Anonymous",
    avatar: user?.image?.secure_url || "/images/home/avatar.png",
    rating: r.rating,
  };
}
