"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useUsersManagement } from "../hooks/useUsersManagement";

const ITEMS_PER_PAGE = 10;

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useUsersManagement(
    currentPage,
    ITEMS_PER_PAGE,
  );

  const users = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage ?? 1;
  const total = meta?.total ?? 0;

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : users;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

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
        <p className="text-red-500">Failed to load users. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#cecece] bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#181919]">
            Users Management
          </h1>
          <div className="mt-3 flex items-center gap-2 text-base text-[#6c6c6c]">
            <span className="font-medium">Dashboard</span>
            <ChevronRight className="size-4" />
            <span className="font-medium">Users Management</span>
          </div>
        </div>

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
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#e4e4e4]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e4e4e4]">
              <th className="px-4 py-4 text-center text-base font-bold text-[#181919]">
                Client Name
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-[#181919]">
                Email
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-[#181919]">
                Role
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-[#181919]">
                Total Order
              </th>
              <th className="px-4 py-4 text-center text-base font-bold text-[#181919]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-[#6b6b6b]"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-[#e4e4e4]">
                  <td className="px-4 py-4 text-center text-base text-[#3b3b3b]">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-4 text-center text-base text-[#3b3b3b]">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-center text-base capitalize text-[#3b3b3b]">
                    {user.role}
                  </td>
                  <td className="px-4 py-4 text-center text-base text-[#3b3b3b]">
                    {user.totalOrders}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="rounded-full border border-[#1bb400] px-3 py-1 text-base text-[#0ca22f] transition-colors hover:bg-[#0ca22f] hover:text-white">
                      Details
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
