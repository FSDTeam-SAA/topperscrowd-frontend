"use client";

import {
  Users,
  ShoppingBag,
  Star,
  DollarSign,
  ChevronDown,
} from "lucide-react";
// import { useDashboardOverview } from "../hooks/useDashboardOverview";

// --- Stat Cards ---

const stats = [
  {
    label: "Total Customers",
    value: "1,482",
    icon: Users,
  },
  {
    label: "Total Orders",
    value: "150",
    icon: ShoppingBag,
  },
  {
    label: "Reviews",
    value: "555",
    icon: Star,
  },
  {
    label: "Revenue",
    value: "$42,500",
    icon: DollarSign,
  },
];

// --- Recent Orders Data ---

const recentOrders = [
  {
    customer: "Paris dimension",
    email: "example@gmail.com",
    amount: "$200",
  },
  {
    customer: "Paris dimension",
    email: "example@gmail.com",
    amount: "$200",
  },
  {
    customer: "Paris dimension",
    email: "example@gmail.com",
    amount: "$200",
  },
  {
    customer: "Paris dimension",
    email: "example@gmail.com",
    amount: "$200",
  },
  {
    customer: "Paris dimension",
    email: "example@gmail.com",
    amount: "$200",
  },
];

// --- Chart Data (months + values for the area chart) ---

const chartData = [
  { month: "Feb", value: 30 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 55 },
  { month: "May", value: 80 },
  { month: "Jun", value: 150 },
  { month: "Jul", value: 120 },
  { month: "Aug", value: 110 },
  { month: "Sep", value: 105 },
  { month: "Oct", value: 100 },
  { month: "Nov", value: 95 },
  { month: "Dec", value: 115 },
  { month: "Jan", value: 130 },
];

function OrderChart() {
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const chartHeight = 300;

  // Generate SVG path for the area chart
  const points = chartData.map((d, i) => ({
    x: (i / (chartData.length - 1)) * 100,
    y: chartHeight - (d.value / maxValue) * chartHeight * 0.85,
  }));

  const linePath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      // smooth curve
      const prev = points[i - 1];
      const cpx1 = prev.x + (p.x - prev.x) / 2;
      const cpx2 = prev.x + (p.x - prev.x) / 2;
      return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  const areaPath = `${linePath} L 100 ${chartHeight} L 0 ${chartHeight} Z`;

  // Find the tooltip point (Jun = index 4)
  const tooltipPoint = points[4];

  return (
    <div className="rounded-xl border border-[#e6e6e6] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#111]">Order Track</h3>
          <p className="text-sm text-[#6b6b6b]">
            Track total revenue, platform commission, and payouts over time.
          </p>
        </div>
        <button className="flex items-center gap-1 rounded border border-[#e6e6e6] px-2 py-1 text-sm font-medium text-[#111]">
          Yearly
          <ChevronDown className="size-4" />
        </button>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-t border-[#f0f0f0]" />
          ))}
        </div>

        <svg
          viewBox={`0 0 100 ${chartHeight}`}
          preserveAspectRatio="none"
          className="relative h-[300px] w-full"
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Tooltip */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${tooltipPoint.x}%`,
            top: `${(tooltipPoint.y / chartHeight) * 100}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="rounded-lg bg-[#0f172a] px-4 py-2 text-center text-white shadow-lg">
            <p className="text-xs text-gray-300">June 2025</p>
            <p className="text-base font-bold">150</p>
          </div>
          {/* Connector line */}
          <div className="h-16 w-px bg-[#0f172a]" />
          {/* Dot */}
          <div className="size-2.5 rounded-full border-2 border-white bg-[#4f46e5] shadow" />
        </div>
      </div>

      {/* Month labels */}
      <div className="mt-4 flex justify-between px-2 text-sm text-[#111]">
        {chartData.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // const { data, isLoading, error } = useDashboardOverview();
  // console.log(data)

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

      {/* Order Track Chart */}
      <OrderChart />

      {/* Recent Orders Table */}
      <div className="rounded-lg border border-[#cecece] bg-white p-6">
        <h3 className="mb-8 text-xl font-bold text-[#181919]">Recent Orders</h3>

        <div className="overflow-x-auto rounded-lg border border-[#e4e4e4]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e4e4e4]">
                <th className="px-4 py-3 text-center text-base font-bold text-[#181919]">
                  Customer
                </th>
                <th className="px-4 py-3 text-center text-base font-bold text-[#181919]">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-base font-bold text-[#181919]">
                  Amount
                </th>
                <th className="px-4 py-3 text-center text-base font-bold text-[#181919]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-[#e4e4e4]">
                  <td className="px-4 py-4 text-center text-base text-[#3b3b3b]">
                    {order.customer}
                  </td>
                  <td className="px-4 py-4 text-center text-base text-[#3b3b3b]">
                    {order.email}
                  </td>
                  <td className="px-4 py-4 text-center text-base text-[#3b3b3b]">
                    {order.amount}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="rounded-full border border-[#1bb400] px-3 py-1 text-base text-[#0ca22f] transition-colors hover:bg-[#0ca22f] hover:text-white">
                      Details
                    </button>
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
