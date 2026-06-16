import EBookCategoryManagement from "@/features/adminDashboard/eBookCategories/components/EBookCategoryManagement";

export const metadata = {
  title: "E-Book Categories Management | Admin Dashboard",
  description: "Manage e-book categories for the platform.",
};

export default function EBookCategoriesPage() {
  return <EBookCategoryManagement />;
}
