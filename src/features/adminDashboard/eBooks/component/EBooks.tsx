"use client";

import { useEffect, useState } from "react";
import {
  Filter,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  User,
  Globe,
  Building2,
  CalendarDays,
  Star,
  ShoppingCart,
  MessageSquare,
  FileText,
  Calendar,
  Search,
  X,
  ChevronDown,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useEBooks,
  useCreateEBook,
  useUpdateEBook,
  useDeleteEBook,
} from "../hooks/useEBooks";
import { useGetAllEBookCategories } from "@/features/adminDashboard/eBookCategories/hooks/useEBookCategory";
import { EBook } from "../types/eBooks.types";

const ITEMS_PER_PAGE = 12;

interface FilterValues {
  status: string;
  from: string;
  to: string;
  categoryId: string;
}

// ─── Add E-Book Modal ────────────────────────────────────────────
const FORMAT_TYPES = ["PDF", "EPUB", "MOBI"] as const;

function normalizeSlug(val: string) {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function AddEBookModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [formatType, setFormatType] = useState("PDF");
  const [price, setPrice] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [status, setStatus] = useState("active");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [ebookFile, setEbookFile] = useState<File | null>(null);

  const { data: categoriesResponse } = useGetAllEBookCategories();
  const categories = categoriesResponse?.data || [];
  const createMutation = useCreateEBook();

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(normalizeSlug(val));
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setAuthor("");
    setCategoryId("");
    setFormatType("PDF");
    setPrice("");
    setIsPremium(false);
    setStatus("active");
    setCoverImage(null);
    setEbookFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("category", categoryId);
    formData.append("formatType", formatType);
    formData.append("price", price);
    formData.append("isPremium", String(isPremium));
    formData.append("status", status);
    if (coverImage) formData.append("coverImage", coverImage);
    if (ebookFile) formData.append("file", ebookFile);

    createMutation.mutate(formData, {
      onSuccess: () => {
        resetForm();
        onOpenChange(false);
      },
    });
  };

  const inputClass =
    "w-full rounded-lg border border-[#727272] px-4 py-2.5 text-sm text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#3b3b3b]";
  const selectClass = `${inputClass} appearance-none pr-10`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Add E-Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter book title"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated-slug"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter book description"
              rows={3}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Format Type</label>
              <div className="relative">
                <select
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value)}
                  className={selectClass}
                  required
                >
                  {FORMAT_TYPES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className={inputClass}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={selectClass}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Is Premium</label>
              <button
                type="button"
                onClick={() => setIsPremium((p) => !p)}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
                  isPremium
                    ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                    : "border-[#727272] bg-white text-[#3b3b3b] hover:bg-gray-50"
                }`}
              >
                {isPremium ? "Premium ✓" : "Not Premium"}
              </button>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className={labelClass}>Cover Image</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <Upload className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {coverImage ? coverImage.name : "Click to upload cover image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* E-Book Document Upload */}
          <div>
            <label className={labelClass}>E-Book File (PDF/EPUB/MOBI)</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <FileText className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {ebookFile ? ebookFile.name : "Click to upload e-book file"}
              </span>
              <input
                type="file"
                accept=".pdf,.epub,.mobi"
                className="hidden"
                onChange={(e) => setEbookFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <DialogFooter className="gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-[#727272] px-5 py-2.5 text-sm font-medium text-[#3b3b3b] transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338ca] disabled:opacity-50"
            >
              {createMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Add E-Book
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Filter Modal ────────────────────────────────────────────────────
function FilterModal({
  open,
  onOpenChange,
  onApply,
  initialFilters,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: FilterValues) => void;
  initialFilters: FilterValues;
}) {
  const [status, setStatus] = useState(initialFilters.status);
  const [from, setFrom] = useState(initialFilters.from);
  const [to, setTo] = useState(initialFilters.to);
  const [categoryId, setCategoryId] = useState(initialFilters.categoryId);

  const { data: categoriesResponse } = useGetAllEBookCategories();
  const categories = categoriesResponse?.data || [];

  const handleApply = () => {
    onApply({ status, from, to, categoryId });
    onOpenChange(false);
  };

  const handleReset = () => {
    setStatus("all");
    setFrom("");
    setTo("");
    setCategoryId("");
    onApply({ status: "all", from: "", to: "", categoryId: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-lg font-bold text-[#191c1e]">
              Filter
            </DialogTitle>
            <p className="text-xs font-medium text-[#434655]">
              Refine your results
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="space-y-5 px-5 pb-5">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#0f172a]">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg bg-[#f1f5f9] px-4 pr-10 text-sm font-medium text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
                className="h-11 w-full rounded-lg bg-[#f1f5f9] px-3 text-sm font-medium text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
              />
            </div>
            <div>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To"
                className="h-11 w-full rounded-lg bg-[#f1f5f9] px-3 text-sm font-medium text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#0f172a]">
              Category
            </label>
            <div className="relative">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg bg-[#f1f5f9] px-4 pr-10 text-sm font-medium text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-[rgba(195,198,215,0.1)] bg-[rgba(255,255,255,0.8)] px-5 pb-5 pt-3 backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleApply}
              className="h-11 w-full rounded-lg bg-[#4f46e5] text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4338ca]"
            >
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="h-11 w-full rounded-lg border border-[#e2e8f0] text-sm font-bold text-[#64748b] transition-colors hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── View Detail Modal ───────────────────────────────────────────────
function ViewDetailModal({
  book,
  open,
  onOpenChange,
}: {
  book: EBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            E-Book Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          {/* Cover + Title */}
          <div className="flex items-start gap-4">
            {book.coverImage?.url && (
              <img
                src={book.coverImage.url}
                alt={book.title}
                className="size-20 rounded-lg border border-[#e4e4e4] object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-[#111]">{book.title}</h3>
              <p className="mt-1 text-sm text-[#6b6b6b]">{book.description}</p>
            </div>
          </div>

          <hr className="border-[#e4e4e4]" />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                <User className="size-4" />
                Author
              </div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.author}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                <BookOpen className="size-4" />
                Category
              </div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.category?.name || "N/A"}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="text-sm text-[#6b6b6b]">Slug</div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.slug}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="text-sm text-[#6b6b6b]">Format Type</div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.formatType}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="text-sm text-[#6b6b6b]">Price</div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                ${book.price?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="text-sm text-[#6b6b6b]">Premium Access</div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.isPremium ? "Yes (Premium)" : "No (Free)"}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Star className="size-4 text-[#f59e0b]" />
              <span className="text-[#6b6b6b]">Rating:</span>
              <span className="font-semibold text-[#111]">
                {book.averageRating?.toFixed(1) || "0.0"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="size-4 text-[#4f46e5]" />
              <span className="text-[#6b6b6b]">Reviews:</span>
              <span className="font-semibold text-[#111]">
                {book.totalReviews || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShoppingCart className="size-4 text-[#0ca22f]" />
              <span className="text-[#6b6b6b]">Sales:</span>
              <span className="font-semibold text-[#111]">
                {book.saleCount || 0}
              </span>
            </div>
          </div>

          {/* PDF Link */}
          {book.file?.url && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-[#6b6b6b]">
                <FileText className="size-4" />
                E-Book Link
              </div>
              <a
                href={book.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-[#4f46e5] hover:bg-indigo-100 transition-colors"
              >
                <FileText className="size-4" />
                Open PDF/EPUB File
              </a>
            </div>
          )}

          {/* Status & Dates */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#6b6b6b]">Status:</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                  book.status === "active"
                    ? "bg-[rgba(19,236,91,0.2)] text-[#004242]"
                    : "bg-[#fef3c7] text-[#b45309]"
                }`}
              >
                {book.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="size-4 text-[#6b6b6b]" />
              <span className="text-[#6b6b6b]">Created:</span>
              <span className="font-medium text-[#111]">
                {new Date(book.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Modal ──────────────────────────────────────────────────────
function EditModal({
  book,
  open,
  onOpenChange,
}: {
  book: EBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState(book.title);
  const [slug, setSlug] = useState(book.slug);
  const [description, setDescription] = useState(book.description);
  const [author, setAuthor] = useState(book.author);
  const [categoryId, setCategoryId] = useState(book.category?._id || "");
  const [formatType, setFormatType] = useState(book.formatType || "PDF");
  const [price, setPrice] = useState(String(book.price || ""));
  const [isPremium, setIsPremium] = useState(book.isPremium || false);
  const [status, setStatus] = useState(book.status || "active");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [ebookFile, setEbookFile] = useState<File | null>(null);

  const { data: categoriesResponse } = useGetAllEBookCategories();
  const categories = categoriesResponse?.data || [];
  const updateMutation = useUpdateEBook();

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(normalizeSlug(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("category", categoryId);
    formData.append("formatType", formatType);
    formData.append("price", price);
    formData.append("isPremium", String(isPremium));
    formData.append("status", status);
    if (coverImage) formData.append("coverImage", coverImage);
    if (ebookFile) formData.append("file", ebookFile);

    updateMutation.mutate(
      { ebookId: book._id, formData },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const inputClass =
    "w-full rounded-lg border border-[#727272] px-4 py-2.5 text-sm text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#3b3b3b]";
  const selectClass = `${inputClass} appearance-none pr-10`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Edit E-Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Format Type</label>
              <div className="relative">
                <select
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value)}
                  className={selectClass}
                  required
                >
                  {FORMAT_TYPES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={selectClass}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Is Premium</label>
              <button
                type="button"
                onClick={() => setIsPremium((p) => !p)}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${
                  isPremium
                    ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                    : "border-[#727272] bg-white text-[#3b3b3b] hover:bg-gray-50"
                }`}
              >
                {isPremium ? "Premium ✓" : "Not Premium"}
              </button>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className={labelClass}>Cover Image</label>
            {book.coverImage?.url && !coverImage && (
              <div className="mb-2 flex items-center gap-3">
                <img
                  src={book.coverImage.url}
                  alt="Current cover"
                  className="size-14 rounded-lg border border-[#e4e4e4] object-cover"
                />
                <span className="text-xs text-[#6b6b6b]">Current cover</span>
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <Upload className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {coverImage
                  ? coverImage.name
                  : "Click to upload new cover image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* E-Book File Upload */}
          <div>
            <label className={labelClass}>E-Book File (PDF/EPUB/MOBI)</label>
            {book.file?.url && !ebookFile && (
              <div className="mb-2 flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-lg border border-[#e4e4e4] bg-[#f8f8f8]">
                  <FileText className="size-6 text-[#4f46e5]" />
                </div>
                <span className="text-xs text-[#6b6b6b]">
                  Current e-book file
                </span>
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <FileText className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {ebookFile ? ebookFile.name : "Click to upload new e-book file"}
              </span>
              <input
                type="file"
                accept=".pdf,.epub,.mobi"
                className="hidden"
                onChange={(e) => setEbookFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <DialogFooter className="gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-[#727272] px-5 py-2.5 text-sm font-medium text-[#3b3b3b] transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338ca] disabled:opacity-50"
            >
              {updateMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Modal ────────────────────────────────────────────────────
function DeleteModal({
  bookId,
  open,
  onOpenChange,
}: {
  bookId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const deleteMutation = useDeleteEBook();

  const handleDelete = () => {
    deleteMutation.mutate(bookId, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Delete E-Book
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-[#6b6b6b]">
          Are you sure you want to delete this e-book? This action cannot be
          undone.
        </p>

        <DialogFooter className="gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-[#727272] px-5 py-2.5 text-sm font-medium text-[#3b3b3b] transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
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

// ─── EBooks Main Component ───────────────────────────────────────────
export default function EBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [filters, setFilters] = useState<FilterValues>({
    status: "all",
    from: "",
    to: "",
    categoryId: "",
  });

  const [selectedBookForView, setSelectedBookForView] = useState<EBook | null>(
    null,
  );
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<EBook | null>(
    null,
  );
  const [selectedBookForDelete, setSelectedBookForDelete] = useState<
    string | null
  >(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchVal);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchVal]);

  const { data: res, isLoading } = useEBooks({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
    status: filters.status || undefined,
    from: filters.from || undefined,
    to: filters.to || undefined,
    categoryId: filters.categoryId || undefined,
  });

  const books = res?.data || [];
  const meta = res?.meta || { total: 0, totalPage: 1 };

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#181919]">E-Book List</h1>
          <p className="text-sm text-[#6c6c6c]">
            Manage all the e-books, files, and category details.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338ca]"
        >
          <Plus className="size-4" />
          Add E-Book
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search by Title, Author, Description..."
            className="w-full rounded-lg border border-[#e4e4e4] bg-white py-2.5 pl-10 pr-4 text-sm text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#e4e4e4] bg-white px-4 py-2.5 text-sm font-semibold text-[#3b3b3b] hover:bg-gray-50 transition-colors"
        >
          <Filter className="size-4 text-[#6c6c6c]" />
          Filter
        </button>
      </div>

      {/* Books Table */}
      <div className="overflow-hidden rounded-lg border border-[#e4e4e4] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
            <thead className="bg-[#fcfcfc] text-[11px] font-bold uppercase text-[#0f172a] border-b border-[#e4e4e4]">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e4]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center">
                    <Loader2 className="mx-auto size-6 animate-spin text-[#4f46e5]" />
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#6c6c6c]">
                    No e-books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id} className="hover:bg-[#fcfcfc]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {book.coverImage?.url ? (
                          <img
                            src={book.coverImage.url}
                            alt={book.title}
                            className="size-10 rounded border border-[#e4e4e4] object-cover"
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded border border-[#e4e4e4] bg-gray-50 text-gray-400">
                            <BookOpen className="size-5" />
                          </div>
                        )}
                        <span className="font-semibold text-[#111]">
                          {book.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#3b3b3b]">{book.author}</td>
                    <td className="px-6 py-4 text-[#3b3b3b]">
                      {book.category?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-[#111] font-semibold">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                          book.status === "active"
                            ? "bg-[rgba(19,236,91,0.2)] text-[#004242]"
                            : "bg-[#fef3c7] text-[#b45309]"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded p-1 hover:bg-gray-100">
                          <MoreVertical className="size-5 text-[#6c6c6c]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem
                            onClick={() => setSelectedBookForView(book)}
                            className="flex items-center gap-2"
                          >
                            <Eye className="size-4 text-[#6c6c6c]" />
                            View Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSelectedBookForEdit(book)}
                            className="flex items-center gap-2"
                          >
                            <Pencil className="size-4 text-[#6c6c6c]" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSelectedBookForDelete(book._id)}
                            className="flex items-center gap-2 text-rose-600 focus:text-rose-600"
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.totalPage > 1 && (
          <div className="flex items-center justify-between border-t border-[#e4e4e4] bg-[#fcfcfc] px-6 py-4">
            <div className="text-xs text-[#6c6c6c]">
              Showing {books.length} of {meta.total} E-Books
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded border border-[#e4e4e4] bg-white p-1.5 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="size-4 text-[#3b3b3b]" />
              </button>
              <span className="text-sm font-semibold text-[#111]">
                {currentPage} of {meta.totalPage}
              </span>
              <button
                disabled={currentPage === meta.totalPage}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded border border-[#e4e4e4] bg-white p-1.5 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="size-4 text-[#3b3b3b]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddEBookModal open={isAddOpen} onOpenChange={setIsAddOpen} />

      <FilterModal
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApply={setFilters}
        initialFilters={filters}
      />

      {selectedBookForView && (
        <ViewDetailModal
          book={selectedBookForView}
          open={Boolean(selectedBookForView)}
          onOpenChange={(open) => !open && setSelectedBookForView(null)}
        />
      )}

      {selectedBookForEdit && (
        <EditModal
          book={selectedBookForEdit}
          open={Boolean(selectedBookForEdit)}
          onOpenChange={(open) => !open && setSelectedBookForEdit(null)}
        />
      )}

      {selectedBookForDelete && (
        <DeleteModal
          bookId={selectedBookForDelete}
          open={Boolean(selectedBookForDelete)}
          onOpenChange={(open) => !open && setSelectedBookForDelete(null)}
        />
      )}
    </div>
  );
}
