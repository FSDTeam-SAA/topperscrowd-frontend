"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useAudioBooks } from "../hooks/useAudioBooks";

const ITEMS_PER_PAGE = 12;

export default function AudioBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useAudioBooks(currentPage, ITEMS_PER_PAGE);

  const audioBooks = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage ?? 1;
  const total = meta?.total ?? 0;

  const filteredBooks = searchQuery
    ? audioBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : audioBooks;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const statusStyles: Record<string, string> = {
    active: "bg-[rgba(19,236,91,0.2)] text-[#004242]",
    inactive: "bg-[#fef3c7] text-[#b45309]",
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="flex-1 rounded-l-lg border border-[#727272] px-4 text-base text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:outline-none focus:border-[#4f46e5]"
            />
            <button className="flex w-[60px] items-center justify-center rounded-r-lg bg-[#4f46e5]">
              <Search className="size-5 text-white" />
            </button>
          </div>

          {/* Filter Button */}
          <button className="flex h-[52px] items-center gap-2 rounded-lg border-2 border-[#4f46e5] px-4 text-base font-bold text-[#4f46e5] transition-colors hover:bg-[#4f46e5] hover:text-white">
            <Filter className="size-5" />
            Filter
          </button>

          {/* Add Audio Books Button */}
          <button className="flex h-[52px] items-center gap-2 rounded-lg bg-[#4f46e5] px-6 text-base font-bold text-white transition-colors hover:bg-[#4338ca]">
            <Plus className="size-5" />
            Add Audio Books
          </button>
        </div>
      </div>

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
            {filteredBooks.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[#6b6b6b]"
                >
                  No audio books found.
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
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
                    <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                      <MoreVertical className="size-5 text-[#3b3b3b]" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-12 py-5">
          <p className="text-sm text-[#3b3b3b]">
            Showing {startIndex + 1} to{" "}
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
    </div>
  );
}
