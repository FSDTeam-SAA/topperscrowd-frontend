"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit,
  Loader2,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useDeleteEBookCategory,
  useGetAllEBookCategories,
} from "../hooks/useEBookCategory";
import type { EBookCategory } from "../api/eBookCategory.api";
import EBookCategoryForm from "./EBookCategoryForm";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const getErrorMessage = (error: unknown, fallback: string) => {
  const err = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };
  return err?.response?.data?.message || err?.message || fallback;
};

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          {Array.from({ length: 6 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-6 py-4">
              <div className="h-4 rounded bg-slate-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CategoryModal({
  categories,
  category,
  open,
  onOpenChange,
}: {
  categories: EBookCategory[];
  category?: EBookCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[92vh] overflow-y-auto border-0 bg-transparent p-0 shadow-none sm:max-w-2xl"
        showCloseButton={false}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-400 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="size-5" />
        </button>
        <EBookCategoryForm
          categories={categories}
          category={category}
          onSuccessAction={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function DeleteCategoryModal({
  category,
  open,
  onOpenChange,
}: {
  category: EBookCategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const deleteMutation = useDeleteEBookCategory();

  const handleDelete = () => {
    if (!category) {
      return;
    }

    deleteMutation.mutate(category._id, {
      onSuccess: (data) => {
        const response = data as { message?: string };
        toast.success(
          response?.message || "E-book category deleted successfully",
        );
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Failed to delete e-book category"));
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-rose-100">
            <Trash2 className="size-6 text-rose-600" />
          </div>
          <DialogTitle className="text-center text-lg font-bold text-slate-900">
            Delete E-Book Category
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete this category?
          </DialogDescription>
        </DialogHeader>

        {category && (
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700">
            {category.name}
          </p>
        )}

        <DialogFooter className="gap-3 pt-2 sm:justify-center">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
          >
            {deleteMutation.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function EBookCategoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] =
    useState<EBookCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] =
    useState<EBookCategory | null>(null);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllEBookCategories();

  const categories = useMemo(() => data?.data || [], [data?.data]);
  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return categories;
    }

    return categories.filter((category) =>
      category.name.toLowerCase().includes(term),
    );
  }, [categories, searchTerm]);

  return (
    <div className="space-y-6 p-0 sm:p-2">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 font-serif text-3xl font-bold text-slate-900">
            E-Book Categories
          </h1>
          <p className="mt-1 text-slate-500">
            Manage e-book categories, slugs, descriptions, and active status.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 active:scale-95"
        >
          <Plus className="size-5" />
          Add Category
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by category name"
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCcw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-rose-50">
              <AlertCircle className="size-6 text-rose-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Failed to load e-book categories
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {getErrorMessage(error, "Please try again.")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <TableSkeleton />
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      {searchTerm
                        ? "No categories match your search."
                        : "No e-book categories found."}
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <BookOpen className="size-5" />
                          </div>
                          <span className="font-bold text-slate-900">
                            {category.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                          {category.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="max-w-xs line-clamp-2 text-sm text-slate-600">
                          {category.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {category.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="size-3.5" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                            <XCircle className="size-3.5" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Calendar className="size-4 text-slate-400" />
                          {formatDate(category.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setCategoryToUpdate(category)}
                            className="rounded-lg p-1.5 text-indigo-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                            title="Edit Category"
                          >
                            <Edit className="size-5" />
                          </button>
                          <button
                            onClick={() => setCategoryToDelete(category)}
                            className="rounded-lg p-1.5 text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
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
        )}
      </div>

      <CategoryModal
        categories={categories}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />

      <CategoryModal
        categories={categories}
        category={categoryToUpdate || undefined}
        open={Boolean(categoryToUpdate)}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToUpdate(null);
          }
        }}
      />

      <DeleteCategoryModal
        category={categoryToDelete}
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setCategoryToDelete(null);
          }
        }}
      />
    </div>
  );
}
