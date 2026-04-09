export type { Book, Category } from "@/types/shared";

export interface CategoryWithBooks {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  books: import("@/types/shared").Book[];
}
