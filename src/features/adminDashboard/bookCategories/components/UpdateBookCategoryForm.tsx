"use client";

import { useState } from "react";
import { useUpdateBookCategory } from "../hooks/useBookCategory";
import { BookCategory } from "../api/bookCategory.api";
import {
  BookOpen,
  AlignLeft,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function UpdateBookCategoryForm({
  category,
  onSuccessAction,
}: {
  category: BookCategory;
  onSuccessAction?: () => void;
}) {
  const { mutate: update, isPending } = useUpdateBookCategory();
  const [formData, setFormData] = useState({
    title: category.title,
    description: category.description,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    category.image?.secure_url || null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    if (imageFile) {
      submitData.append("image", imageFile);
    }

    update(
      { id: category._id, formData: submitData },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Book Category updated successfully!");
          if (onSuccessAction) onSuccessAction();
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(
            err?.response?.data?.message || "Failed to update category",
          );
        },
      },
    );
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-2xl font-bold text-slate-900">
            Update Book Category
          </h2>
          <p className="text-slate-500 mt-1">
            Modify the details of this category below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <BookOpen className="size-4 text-indigo-500" />
                Category Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <AlignLeft className="size-4 text-indigo-500" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon className="size-4 text-indigo-500" />
                Update Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative size-16 rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-16 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400">
                    <ImageIcon className="size-6" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all text-sm text-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Updating Category...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
