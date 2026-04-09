"use client";

import { ShoppingBag, Heart, AlertCircle, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className={`mb-4 inline-flex rounded-lg p-3 ${color}`}>{icon}</div>
      <p className="text-sm text-slate-600 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Wishlist Items",
      value: "24",
      icon: <Heart className="h-6 w-6 text-white" />,
      color: "bg-red-500",
    },
    {
      title: "Pending Orders",
      value: "2",
      icon: <AlertCircle className="h-6 w-6 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Spent",
      value: "$1,240",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Orders</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#ORD-001",
                  date: "Apr 10, 2026",
                  status: "Delivered",
                  amount: "$120.00",
                },
                {
                  id: "#ORD-002",
                  date: "Apr 8, 2026",
                  status: "In Transit",
                  amount: "$85.50",
                },
                {
                  id: "#ORD-003",
                  date: "Apr 5, 2026",
                  status: "Processing",
                  amount: "$250.00",
                },
                {
                  id: "#ORD-004",
                  date: "Apr 1, 2026",
                  status: "Delivered",
                  amount: "$95.00",
                },
              ].map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "In Transit"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
