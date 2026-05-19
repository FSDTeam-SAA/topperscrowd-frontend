import BookCategoryManagement from "@/features/adminDashboard/bookCategories/components/BookCategoryManagement";

export const metadata = {
  title: "Book Categories Management | Admin Dashboard",
  description: "Manage book categories for the platform.",
};

export default function BookCategoriesPage() {
  return <BookCategoryManagement />;
}
