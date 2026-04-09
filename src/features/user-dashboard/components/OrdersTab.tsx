"use client";

import Image from "next/image";

export default function OrdersTab() {
  const orders = [
    {
      id: "#ORD-001",
      date: "Apr 10, 2026",
      status: "Delivered",
      items: 3,
      total: "$120.00",
      image: "/images/home/book1.png",
    },
    {
      id: "#ORD-002",
      date: "Apr 8, 2026",
      status: "In Transit",
      items: 2,
      total: "$85.50",
      image: "/images/home/book2.png",
    },
    {
      id: "#ORD-003",
      date: "Apr 5, 2026",
      status: "Processing",
      items: 1,
      total: "$250.00",
      image: "/images/home/book3.png",
    },
    {
      id: "#ORD-004",
      date: "Apr 1, 2026",
      status: "Delivered",
      items: 4,
      total: "$95.00",
      image: "/images/home/book4.png",
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded">
                  <Image
                    src={order.image}
                    alt="Order item"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-600">{order.date}</p>
                    </div>
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
                  </div>

                  <p className="text-sm text-slate-600">
                    {order.items} items • Total:{" "}
                    <span className="font-semibold text-slate-900">
                      {order.total}
                    </span>
                  </p>
                </div>
              </div>

              <button className="ml-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
