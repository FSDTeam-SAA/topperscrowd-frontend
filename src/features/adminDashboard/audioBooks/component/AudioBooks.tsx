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
  Music,
  Calendar,
  Search,
  X,
  ChevronDown,
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
  useAudioBooks,
  useCreateAudioBook,
  useUpdateAudioBook,
  useDeleteAudioBook,
} from "../hooks/useAudioBooks";
import { Upload } from "lucide-react";
import { useBookCategories } from "@/features/book-category/hooks/useBookCategories";
import { AudioBook } from "../types/audioBooks.types";

const ITEMS_PER_PAGE = 12;

// ─── Add Audio Book Modal ────────────────────────────────────────────
function AddAudioBookModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genreId, setGenreId] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const { data: categories } = useBookCategories();
  const createMutation = useCreateAudioBook();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setGenreId("");
    setPrice("");
    setLanguage("");
    setPublisher("");
    setPublicationYear("");
    setImageFile(null);
    setAudioFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("genre", genreId);
    formData.append("price", price);
    formData.append("language", language);
    formData.append("publisher", publisher);
    formData.append("publicationYear", publicationYear);
    if (imageFile) formData.append("image", imageFile);
    if (audioFile) formData.append("audio", audioFile);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Add Audio Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
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
              <label className={labelClass}>Genre</label>
              <div className="relative">
                <select
                  value={genreId}
                  onChange={(e) => setGenreId(e.target.value)}
                  className={`${inputClass} appearance-none pr-10`}
                  required
                >
                  <option value="">Select genre</option>
                  {categories?.map((cat: { _id: string; title: string }) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6c6c6c]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className={labelClass}>Language</label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g. English"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Publisher</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Publisher name"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Publication Year</label>
              <input
                type="number"
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
                placeholder="e.g. 2024"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className={labelClass}>Cover Image</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <Upload className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {imageFile ? imageFile.name : "Click to upload cover image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* Audio File Upload */}
          <div>
            <label className={labelClass}>Audio File</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <Music className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {audioFile
                  ? audioFile.name
                  : "Click to upload audio file (.mp3)"}
              </span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
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
              Add Audio Book
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
  const [categoryId, setCategoryId] = useState(initialFilters.bookcategoryId);

  const { data: categories } = useBookCategories();

  const handleApply = () => {
    onApply({ status, from, to, bookcategoryId: categoryId });
    onOpenChange(false);
  };

  const handleReset = () => {
    setStatus("all");
    setFrom("");
    setTo("");
    setCategoryId("");
    onApply({ status: "all", from: "", to: "", bookcategoryId: "" });
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
                {categories?.map((cat: { _id: string; title: string }) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
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
  book: AudioBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Audio Book Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          {/* Cover + Title */}
          <div className="flex items-start gap-4">
            {book.image?.secure_url && (
              <img
                src={book.image.secure_url}
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
                Genre
              </div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.genre.title}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                <Globe className="size-4" />
                Language
              </div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.language}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                <Building2 className="size-4" />
                Publisher
              </div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.publisher}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                <CalendarDays className="size-4" />
                Publication Year
              </div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                {book.publicationYear}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8f8f8] p-4">
              <div className="text-sm text-[#6b6b6b]">Price</div>
              <p className="mt-1 text-sm font-semibold text-[#111]">
                ${book.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Star className="size-4 text-[#f59e0b]" />
              <span className="text-[#6b6b6b]">Rating:</span>
              <span className="font-semibold text-[#111]">
                {book.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="size-4 text-[#4f46e5]" />
              <span className="text-[#6b6b6b]">Reviews:</span>
              <span className="font-semibold text-[#111]">
                {book.totalReviews}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShoppingCart className="size-4 text-[#0ca22f]" />
              <span className="text-[#6b6b6b]">Sales:</span>
              <span className="font-semibold text-[#111]">
                {book.saleCount}
              </span>
            </div>
          </div>

          {/* Audio Player */}
          {book.audio?.secure_url && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-[#6b6b6b]">
                <Music className="size-4" />
                Audio Preview
              </div>
              <audio controls className="w-full">
                <source src={book.audio.secure_url} type="audio/mpeg" />
              </audio>
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
  book: AudioBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(String(book.price));
  const [language, setLanguage] = useState(book.language);
  const [publisher, setPublisher] = useState(book.publisher);
  const [publicationYear, setPublicationYear] = useState(
    String(book.publicationYear),
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const updateMutation = useUpdateAudioBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("language", language);
    formData.append("publisher", publisher);
    formData.append("publicationYear", publicationYear);
    if (imageFile) formData.append("image", imageFile);
    if (audioFile) formData.append("audio", audioFile);

    updateMutation.mutate(
      { bookId: book._id, formData },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const inputClass =
    "w-full rounded-lg border border-[#727272] px-4 py-2.5 text-sm text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#3b3b3b]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Edit Audio Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              <label className={labelClass}>Language</label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Publisher</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="w-1/2">
            <label className={labelClass}>Publication Year</label>
            <input
              type="number"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className={labelClass}>Cover Image</label>
            {book.image?.secure_url && !imageFile && (
              <div className="mb-2 flex items-center gap-3">
                <img
                  src={book.image.secure_url}
                  alt="Current cover"
                  className="size-14 rounded-lg border border-[#e4e4e4] object-cover"
                />
                <span className="text-xs text-[#6b6b6b]">Current cover</span>
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <Upload className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {imageFile ? imageFile.name : "Click to upload new cover image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* Audio File Upload */}
          <div>
            <label className={labelClass}>Audio File</label>
            {book.audio?.secure_url && !audioFile && (
              <div className="mb-2 flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-lg border border-[#e4e4e4] bg-[#f8f8f8]">
                  <Music className="size-6 text-[#4f46e5]" />
                </div>
                <span className="text-xs text-[#6b6b6b]">
                  Current audio file
                </span>
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#727272] p-4 transition-colors hover:border-[#4f46e5] hover:bg-[#f8f8ff]">
              <Music className="size-5 text-[#6c6c6c]" />
              <span className="text-sm text-[#6c6c6c]">
                {audioFile
                  ? audioFile.name
                  : "Click to upload new audio file (.mp3)"}
              </span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
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

// ─── Delete Confirmation Modal ───────────────────────────────────────
function DeleteModal({
  book,
  open,
  onOpenChange,
}: {
  book: AudioBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const deleteMutation = useDeleteAudioBook();

  const handleDelete = () => {
    deleteMutation.mutate(book._id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Delete Audio Book
          </DialogTitle>
        </DialogHeader>

        <p className="mt-2 text-sm text-[#3b3b3b]">
          Are you sure you want to delete{" "}
          <span className="font-semibold">&ldquo;{book.title}&rdquo;</span>?
          This action cannot be undone.
        </p>

        <DialogFooter className="gap-3 pt-4">
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
            className="flex items-center gap-2 rounded-lg bg-[#e53838] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c72f2f] disabled:opacity-50"
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

// ─── Filter Values Type ──────────────────────────────────────────────
interface FilterValues {
  status: string;
  from: string;
  to: string;
  bookcategoryId: string;
}

// ─── Main Component ──────────────────────────────────────────────────
export default function AudioBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    status: "all",
    from: "",
    to: "",
    bookcategoryId: "",
  });

  const [selectedBook, setSelectedBook] = useState<AudioBook | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(
    null,
  );

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, error } = useAudioBooks({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    status: filters.status !== "all" ? filters.status : undefined,
    from: filters.from || undefined,
    to: filters.to || undefined,
    bookcategoryId: filters.bookcategoryId || undefined,
  });

  const audioBooks = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage ?? 1;
  const total = meta?.total ?? 0;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const statusStyles: Record<string, string> = {
    active: "bg-[rgba(19,236,91,0.2)] text-[#004242]",
    inactive: "bg-[#fef3c7] text-[#b45309]",
  };

  const activeFilterCount = [
    filters.status !== "all",
    filters.from,
    filters.to,
    filters.bookcategoryId,
  ].filter(Boolean).length;

  const openModal = (book: AudioBook, type: "view" | "edit" | "delete") => {
    setSelectedBook(book);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalType(null);
  };

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-[#cecece] bg-white">
        <Loader2 className="size-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-[#cecece] bg-white">
        <p className="text-red-500">
          Failed to load audio books. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#cecece] bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#181919]">Audio Books</h1>
          <div className="mt-3 flex items-center gap-2 text-base text-[#6c6c6c]">
            <span className="font-medium">Dashboard</span>
            <ChevronRight className="size-4" />
            <span className="font-medium">Audio Books</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="flex h-[52px] w-[400px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-l-lg border border-[#727272] px-4 text-base text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none"
            />
            <button className="flex w-[60px] items-center justify-center rounded-r-lg bg-[#4f46e5]">
              <Search className="size-5 text-white" />
            </button>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="relative flex h-[52px] items-center gap-2 rounded-lg border-2 border-[#4f46e5] px-4 text-base font-bold text-[#4f46e5] transition-colors hover:bg-[#4f46e5] hover:text-white"
          >
            <Filter className="size-5" />
            Filter
            {activeFilterCount > 0 && (
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-[#e53838] text-xs font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Add Audio Books Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex h-[52px] items-center gap-2 rounded-lg bg-[#4f46e5] px-6 text-base font-bold text-white transition-colors hover:bg-[#4338ca]"
          >
            <Plus className="size-5" />
            Add Audio Books
          </button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#6b6b6b]">Active filters:</span>
          {filters.status !== "all" && (
            <span className="flex items-center gap-1 rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#0f172a]">
              Status: {filters.status}
              <button
                onClick={() =>
                  handleApplyFilters({ ...filters, status: "all" })
                }
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {filters.from && (
            <span className="flex items-center gap-1 rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#0f172a]">
              From: {filters.from}
              <button
                onClick={() => handleApplyFilters({ ...filters, from: "" })}
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {filters.to && (
            <span className="flex items-center gap-1 rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#0f172a]">
              To: {filters.to}
              <button
                onClick={() => handleApplyFilters({ ...filters, to: "" })}
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {filters.bookcategoryId && (
            <span className="flex items-center gap-1 rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#0f172a]">
              Category filtered
              <button
                onClick={() =>
                  handleApplyFilters({ ...filters, bookcategoryId: "" })
                }
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          <button
            onClick={() =>
              handleApplyFilters({
                status: "all",
                from: "",
                to: "",
                bookcategoryId: "",
              })
            }
            className="text-xs font-medium text-[#e53838] hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border border-[#e4e4e4] bg-white">
              <th className="px-4 py-4 text-left text-base font-bold text-black">
                Audio Book Name
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-black">
                Author / Narrator
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-black">
                Category
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-black">
                Price
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-black">
                Status
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {audioBooks.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[#6b6b6b]"
                >
                  No audio books found.
                </td>
              </tr>
            ) : (
              audioBooks.map((book) => (
                <tr key={book._id} className="border border-[#e4e4e4] bg-white">
                  <td className="max-w-[200px] truncate px-4 py-4 text-left text-lg text-[#0f172a]">
                    {book.title}
                  </td>
                  <td className="px-4 py-4 text-center text-xs font-medium text-black">
                    {book.author}
                  </td>
                  <td className="px-4 py-4 text-center text-xs font-medium text-black">
                    {book.genre.title}
                  </td>
                  <td className="px-4 py-4 text-center text-base text-[#111]">
                    ${book.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        statusStyles[book.status] ?? statusStyles.active
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                          <MoreVertical className="size-5 text-[#3b3b3b]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => openModal(book, "view")}
                          className="flex items-center gap-2"
                        >
                          <Eye className="size-4 text-[#4f46e5]" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openModal(book, "edit")}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="size-4 text-[#f59e0b]" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openModal(book, "delete")}
                          className="flex items-center gap-2 text-[#e53838]"
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-12 py-5">
          <p className="text-sm text-[#3b3b3b]">
            Showing {total === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, total)} of {total} results
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex size-10 items-center justify-center rounded border border-[#64748b] bg-white disabled:opacity-40"
            >
              <ChevronLeft className="size-[18px]" />
            </button>

            {/* Page 1 */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`flex size-10 items-center justify-center rounded text-base font-medium ${
                currentPage === 1
                  ? "bg-[#4f46e5] text-white"
                  : "border border-[#0f172a] text-[#0f172a]"
              }`}
            >
              1
            </button>

            {totalPages > 2 && (
              <span className="flex size-10 items-center justify-center rounded border border-[#0f172a] text-base font-medium text-[#0f172a]">
                ...
              </span>
            )}

            {totalPages > 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`flex size-10 items-center justify-center rounded text-base font-medium ${
                  currentPage === totalPages
                    ? "bg-[#4f46e5] text-white"
                    : "border border-[#0f172a] text-[#1e1e1e]"
                }`}
              >
                {totalPages}
              </button>
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex size-10 items-center justify-center rounded border border-[#0f172a] disabled:opacity-40"
            >
              <ChevronRight className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Audio Book Modal */}
      <AddAudioBookModal open={showAddModal} onOpenChange={setShowAddModal} />

      {/* Filter Modal */}
      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />

      {/* View/Edit/Delete Modals */}
      {selectedBook && modalType === "view" && (
        <ViewDetailModal
          book={selectedBook}
          open
          onOpenChange={(open) => {
            if (!open) closeModal();
          }}
        />
      )}

      {selectedBook && modalType === "edit" && (
        <EditModal
          key={selectedBook._id}
          book={selectedBook}
          open
          onOpenChange={(open) => {
            if (!open) closeModal();
          }}
        />
      )}

      {selectedBook && modalType === "delete" && (
        <DeleteModal
          book={selectedBook}
          open
          onOpenChange={(open) => {
            if (!open) closeModal();
          }}
        />
      )}
    </div>
  );
}
