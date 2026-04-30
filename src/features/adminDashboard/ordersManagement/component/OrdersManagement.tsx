"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  CheckSquare,
  Hourglass,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Hash,
  Calendar,
  User,
  Package,
  CreditCard,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrders } from "../hooks/useOrdersManagement";
import type { Order, OrdersParams } from "../types/ordersManagement.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 10;

const statusStyles: Record<string, string> = {
  paid: "bg-[rgba(19,236,91,0.2)] text-[#004242]",
  pending: "bg-[#fef3c7] text-[#b45309]",
  cancelled: "bg-[#fee2e2] text-[#dc2626]",
};

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function OrderDetailModal({
  order,
  open,
  onOpenChange,
}: {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 sm:rounded-2xl">
        <DialogHeader className="border-b border-[#f0f0f0] bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#111]">
              Order Details
            </DialogTitle>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                order.paymentStatus === "paid"
                  ? "bg-green-100 text-[#0ca22f]"
                  : order.paymentStatus === "pending"
                    ? "bg-amber-100 text-[#b45309]"
                    : "bg-red-100 text-[#dc2626]"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column: Customer & Order Info */}
            <div className="space-y-6">
              {/* Order Info */}
              <div className="rounded-xl border border-[#e6e6e6] bg-white p-4">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#6b6b6b] uppercase tracking-wider">
                  <Hash className="size-4" /> Order Info
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6b6b6b]">Order ID</span>
                    <span className="text-sm font-mono font-medium text-[#111]">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6b6b6b]">Date</span>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-[#111]">
                      <Calendar className="size-3.5 text-[#6b6b6b]" />
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6b6b6b]">
                      Transaction ID
                    </span>
                    <span className="text-sm font-medium text-[#111] truncate max-w-[120px]">
                      {order.transactionId || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="rounded-xl border border-[#e6e6e6] bg-white p-4">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#6b6b6b] uppercase tracking-wider">
                  <User className="size-4" /> Customer Details
                </h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#4f46e5] text-sm font-bold text-white">
                    {order.userId.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#111] truncate max-w-[180px]">
                      {order.userId.email}
                    </p>
                    <p className="text-sm capitalize text-[#6b6b6b]">
                      {order.userId.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="space-y-6">
              <div className="rounded-xl border border-[#e6e6e6] bg-white p-4">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#6b6b6b] uppercase tracking-wider">
                  <Package className="size-4" /> Order Summary
                </h4>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between gap-4 border-b border-[#f0f0f0] pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#111] line-clamp-2">
                          {item.book?.title || "Unknown Book"}
                        </p>
                        <p className="text-xs text-[#6b6b6b]">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#111]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-[#e6e6e6] pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6b6b6b]">Subtotal</span>
                    <span className="text-sm font-medium text-[#111]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#f0f0f0] pt-2">
                    <span className="text-base font-bold text-[#111]">
                      Total
                    </span>
                    <span className="text-lg font-bold text-[#4f46e5]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#e6e6e6] bg-[#fcfcfc] p-4">
                <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                  <CreditCard className="size-4" />
                  <span>Payment Status: {order.paymentStatus}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#6b6b6b]">
                  <Clock className="size-3.5" />
                  <span>
                    Last Updated: {new Date(order.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] =
    useState<OrdersParams["paymentStatus"]>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data, isLoading } = useOrders({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
    paymentStatus: statusFilter,
    sort: "descending",
  });

  const orders = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  // Compute stats from meta
  const totalOrders = meta?.total || 0;
  const paidCount = orders.filter((o) => o.paymentStatus === "paid").length;
  const pendingCount = orders.filter(
    (o) => o.paymentStatus === "pending",
  ).length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    { label: "Total Orders", value: String(totalOrders), icon: TrendingUp },
    {
      label: "Page Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
    },
    { label: "Paid (this page)", value: String(paidCount), icon: CheckSquare },
    {
      label: "Pending (this page)",
      value: String(pendingCount),
      icon: Hourglass,
    },
  ];

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

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
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                ) : (
                  stat.value
                )}
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

          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            {/* <div className="flex h-[52px] w-full sm:w-[400px]">
              <input
                type="text"
                placeholder="Search by transaction ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-l-lg border border-[#727272] px-4 text-base text-[#3b3b3b] placeholder:text-[#6c6c6c] focus:border-[#4f46e5] focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="flex w-[60px] items-center justify-center rounded-r-lg bg-[#4f46e5]"
              >
                <Search className="size-5 text-white" />
              </button>
            </div> */}

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["all", "paid", "pending", "cancelled"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-colors",
                      statusFilter === status
                        ? "bg-[#4f46e5] text-white"
                        : "border border-[#4f46e5] text-[#4f46e5] hover:bg-[#4f46e5]/5",
                    )}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#4f46e5]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center text-[#6c6c6c]">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border border-[#e4e4e4] bg-white">
                  <th className="px-4 py-4 text-left text-base font-bold text-black">
                    Order ID
                  </th>
                  <th className="px-4 py-4 text-left text-base font-bold text-black">
                    Customer
                  </th>
                  <th className="px-4 py-4 text-left text-base font-bold text-black">
                    Items
                  </th>
                  <th className="px-4 py-4 text-center text-base font-bold text-black">
                    Total
                  </th>
                  <th className="px-4 py-4 text-center text-base font-bold text-black">
                    Status
                  </th>
                  <th className="px-4 py-4 text-center text-base font-bold text-black">
                    Date
                  </th>
                  <th className="px-4 py-4 text-center text-base font-bold text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order._id} className="border border-[#e4e4e4]">
                    <td className="px-4 py-4 text-sm font-medium text-[#0f172a]">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-[#0f172a]">
                        {order.userId.email}
                      </p>
                      <p className="text-xs capitalize text-[#6c6c6c]">
                        {order.userId.role}
                      </p>
                    </td>
                    <td className="max-w-[250px] px-4 py-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-[#0f172a]">
                          {item.book?.title || "Unknown Book"}{" "}
                          <span className="text-xs text-[#6c6c6c]">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-center text-base font-medium text-[#111]">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={cn(
                          "inline-block rounded-full px-3 py-1 text-xs font-bold capitalize",
                          statusStyles[order.paymentStatus],
                        )}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-[#3b3b3b]">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-full border border-[#1bb400] px-3 py-1 text-base text-[#0ca22f] transition-colors hover:bg-[#0ca22f] hover:text-white"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-5 sm:px-12">
              <p className="text-sm text-[#3b3b3b]">
                Page {meta?.page || 1} of {totalPages} ({meta?.total || 0}{" "}
                results)
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex size-10 items-center justify-center rounded border border-[#64748b] bg-white disabled:opacity-40"
                >
                  <ChevronLeft className="size-[18px]" />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "flex size-10 items-center justify-center rounded text-base font-medium",
                        currentPage === pageNum
                          ? "bg-[#4f46e5] text-white"
                          : "border border-[#0f172a] text-[#0f172a]",
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}

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
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          open={!!selectedOrder}
          onOpenChange={(open) => {
            if (!open) setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}
