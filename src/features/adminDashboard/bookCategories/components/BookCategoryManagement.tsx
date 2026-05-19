"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  MoreVertical,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Plus,
  X,
  Trash2,
  Edit,
} from "lucide-react";
import {
  useGetAllBookCategories,
  useDeleteBookCategory,
} from "../hooks/useBookCategory";
import { BookCategory } from "../api/bookCategory.api";
import CreateBookCategoryForm from "./CreateBookCategoryForm";
import UpdateBookCategoryForm from "./UpdateBookCategoryForm";
import { toast } from "sonner";

export default function BookCategoryManagement() {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState<BookCategory | null>(
    null,
  );

  const { data, isLoading, error } = useGetAllBookCategories(page, 10);
  const { mutate: deleteCategory } = useDeleteBookCategory();

  const handleDelete = (id: string) => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
      },
      onError: (error: unknown) => {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(
          err?.response?.data?.message || "Failed to delete category",
        );
      },
    });
  };

  const categories = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif flex items-center gap-3">
            <BookOpen className="size-8 text-indigo-600" />
            Book Categories
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your book categories, monitor their status, and add new ones.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95"
        >
          <Plus className="size-5" />
          Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {category.image?.secure_url ? (
                        <div className="relative size-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                          <Image
                            src={category.image.secure_url}
                            alt={category.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="size-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                          <ImageIcon className="size-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">
                        {category.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                        {category.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {category.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                          <CheckCircle2 className="size-3.5" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100">
                          <XCircle className="size-3.5" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Calendar className="size-4 text-slate-400" />
                        {new Date(category.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setCategoryToUpdate(category)}
                          className="p-1.5 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <span className="text-sm text-slate-500">
              Showing page {meta.page} of {meta.totalPage}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page === meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 bg-white rounded-full shadow-sm hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="size-5" />
            </button>
            <CreateBookCategoryForm
              onSuccessAction={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Update Category Modal */}
      {categoryToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setCategoryToUpdate(null)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 bg-white rounded-full shadow-sm hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="size-5" />
            </button>
            <UpdateBookCategoryForm
              category={categoryToUpdate}
              onSuccessAction={() => setCategoryToUpdate(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
