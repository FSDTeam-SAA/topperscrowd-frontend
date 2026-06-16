"use client";

import { useMemo, useState } from "react";
import {
  AlignLeft,
  CheckCircle2,
  FileText,
  Link2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useCreateEBookCategory,
  useUpdateEBookCategory,
} from "../hooks/useEBookCategory";
import type {
  EBookCategory,
  EBookCategoryPayload,
} from "../api/eBookCategory.api";

interface EBookCategoryFormProps {
  categories: EBookCategory[];
  category?: EBookCategory;
  onSuccessAction?: () => void;
}

interface FormErrors {
  name?: string;
  slug?: string;
  description?: string;
}

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getErrorMessage = (error: unknown, fallback: string) => {
  const err = error as { response?: { data?: { message?: string } } };
  return err?.response?.data?.message || fallback;
};

export default function EBookCategoryForm({
  categories,
  category,
  onSuccessAction,
}: EBookCategoryFormProps) {
  const isEditMode = Boolean(category);
  const createMutation = useCreateEBookCategory();
  const updateMutation = useUpdateEBookCategory();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const [formData, setFormData] = useState<EBookCategoryPayload>({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    isActive: category?.isActive ?? true,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const takenSlugs = useMemo(
    () =>
      new Set(
        categories
          .filter((item) => item._id !== category?._id)
          .map((item) => item.slug.trim().toLowerCase()),
      ),
    [categories, category?._id],
  );

  const validate = () => {
    const nextErrors: FormErrors = {};
    const slug = normalizeSlug(formData.slug);

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!formData.slug.trim()) {
      nextErrors.slug = "Slug is required";
    } else if (!slug) {
      nextErrors.slug = "Slug must include letters or numbers";
    } else if (takenSlugs.has(slug)) {
      nextErrors.slug = "Slug must be unique";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Description is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload: EBookCategoryPayload = {
      name: formData.name.trim(),
      slug: normalizeSlug(formData.slug),
      description: formData.description.trim(),
      isActive: formData.isActive,
    };

    if (category) {
      updateMutation.mutate(
        { id: category._id, payload },
        {
          onSuccess: (data) => {
            toast.success(
              data.message || "E-book category updated successfully",
            );
            onSuccessAction?.();
          },
          onError: (error) => {
            toast.error(
              getErrorMessage(error, "Failed to update e-book category"),
            );
          },
        },
      );
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "E-book category created successfully");
        setFormData({
          name: "",
          slug: "",
          description: "",
          isActive: true,
        });
        onSuccessAction?.();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Failed to create e-book category"));
      },
    });
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditMode ? "Update E-Book Category" : "Create E-Book Category"}
          </h2>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            {isEditMode
              ? "Modify the category details below."
              : "Fill in the details below to add a new e-book category."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText className="size-4 text-indigo-500" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Programming"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-sm font-medium text-rose-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Link2 className="size-4 text-indigo-500" />
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              onBlur={() =>
                setFormData((prev) => ({
                  ...prev,
                  slug: normalizeSlug(prev.slug),
                }))
              }
              placeholder="programming"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.slug && (
              <p className="text-sm font-medium text-rose-600">{errors.slug}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <AlignLeft className="size-4 text-indigo-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Technical ebooks and programming guides"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="text-sm font-medium text-rose-600">
                {errors.description}
              </p>
            )}
          </div>

          {/* <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Active Status
              </p>
              <p className="text-sm text-slate-500">
                Active categories are available for use immediately.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isActive}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: !prev.isActive,
                }))
              }
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                formData.isActive ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  formData.isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div> */}

          <div className="border-t border-slate-100 pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  {isEditMode ? "Updating Category..." : "Creating Category..."}
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-5" />
                  {isEditMode ? "Save Changes" : "Create Category"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
