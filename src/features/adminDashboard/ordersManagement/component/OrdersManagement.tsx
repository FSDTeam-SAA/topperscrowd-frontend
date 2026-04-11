"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  CheckSquare,
  Hourglass,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Order } from "../types/ordersManagement.types";

// --- Stat Cards ---

const stats = [
  { label: "Today Sales", value: "1,482", icon: TrendingUp },
  { label: "Today Revenue", value: "$4,50", icon: DollarSign },
  { label: "Paid Orders", value: "555", icon: CheckSquare },
  { label: "Pending Orders", value: "555", icon: Hourglass },
];

// --- Mock Orders Data ---

const allOrders: Order[] = [
  {
    name: "The Future of Solar Energy",
    author: "Bogdán Norbert",
    category: "Bogdán Norbert",
    price: "$24.99",
    status: "Paid",
  },
  {
    name: "Advances in AI Technology",
    author: "Maria Chen",
    category: "Maria Chen",
    price: "$19.99",
    status: "Paid",
  },
  {
    name: "Understanding Quantum Computing",
    author: "Alex Rodriguez",
    category: "Alex Rodriguez",
    price: "$29.99",
    status: "Pending",
  },
  {
    name: "The Rise of Electric Vehicles",
    author: "Lisa Tran",
    category: "Lisa Tran",
    price: "$22.50",
    status: "Paid",
  },
  {
    name: "Blockchain: Beyond Cryptocurrencies",
    author: "John Smith",
    category: "John Smith",
    price: "$30.00",
    status: "Paid",
  },
  {
    name: "Sustainable Urban Development",
    author: "Emily Davis",
    category: "Emily Davis",
    price: "$27.99",
    status: "Pending",
  },
  {
    name: "The Impact of Climate Change",
    author: "David Lee",
    category: "David Lee",
    price: "$19.99",
    status: "Paid",
  },
  {
    name: "Innovations in Agriculture",
    author: "Sophia Jackson",
    category: "Sophia Jackson",
    price: "$25.00",
    status: "Pending",
  },
  {
    name: "Exploring Renewable Resources",
    author: "Grace Wilson",
    category: "Grace Wilson",
    price: "$21.75",
    status: "Paid",
  },
];

const ITEMS_PER_PAGE = 10;

const statusStyles = {
  Paid: "bg-[rgba(19,236,91,0.2)] text-[#004242]",
  Pending: "bg-[#fef3c7] text-[#b45309]",
};

export default function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = allOrders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-4 rounded-2xl border border-[#e3eeee] bg-white p-6 shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#f0f9f8]">
              <stat.icon className="size-5 text-[#5f7d7d]" />
            </div>
            <div>
              <p className="text-sm text-[#5f7d7d]">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#0f172a]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table Card */}
      <div className="rounded-lg border border-[#cecece] bg-white p-6">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#181919]">
              Orders Management
            </h1>
            <div className="mt-3 flex items-center gap-2 text-base text-[#6c6c6c]">
              <span className="font-medium">Dashboard</span>
              <ChevronRight className="size-4" />
              <span className="font-medium">Orders Management</span>
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
                  setCurrentPage(1);
                }}
                className="flex-1 rounded-l-lg border border-[#727272] px-4 text-base text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none"
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
              {paginatedOrders.map((order, i) => (
                <tr key={i} className="border border-[#e4e4e4] bg-white">
                  <td className="max-w-[200px] truncate px-4 py-4 text-left text-lg text-[#0f172a]">
                    {order.name}
                  </td>
                  <td className="px-4 py-4 text-center text-xs font-medium text-black">
                    {order.author}
                  </td>
                  <td className="px-4 py-4 text-center text-xs font-medium text-black">
                    {order.category}
                  </td>
                  <td className="px-4 py-4 text-center text-base text-[#111]">
                    {order.price}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-bold",
                        statusStyles[order.status],
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                      <MoreVertical className="size-5 text-[#3b3b3b]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-12 py-5">
            <p className="text-sm text-[#3b3b3b]">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
              {filteredOrders.length} results
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex size-10 items-center justify-center rounded border border-[#64748b] bg-white disabled:opacity-40"
              >
                <ChevronLeft className="size-[18px]" />
              </button>

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

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex size-10 items-center justify-center rounded border border-[#0f172a] disabled:opacity-40"
              >
                <ChevronRight className="size-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
