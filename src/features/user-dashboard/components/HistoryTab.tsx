"use client";

export default function HistoryTab() {
  const history = [
    {
      date: "Apr 10, 2026",
      action: "Viewed",
      item: "The Power of Habit",
      details: "Spent 5 minutes",
    },
    {
      date: "Apr 9, 2026",
      action: "Purchased",
      item: "Atomic Habits",
      details: "Order #ORD-001",
    },
    {
      date: "Apr 8, 2026",
      action: "Added to Wishlist",
      item: "Thinking, Fast and Slow",
      details: "1 item added",
    },
    {
      date: "Apr 7, 2026",
      action: "Viewed",
      item: "The Midnight Library",
      details: "Spent 10 minutes",
    },
    {
      date: "Apr 6, 2026",
      action: "Reviewed",
      item: "Sapiens",
      details: "5 star rating",
    },
    {
      date: "Apr 5, 2026",
      action: "Purchased",
      item: "Educated",
      details: "Order #ORD-002",
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "Purchased":
        return "bg-green-100 text-green-800";
      case "Added to Wishlist":
        return "bg-red-100 text-red-800";
      case "Reviewed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Purchase History
      </h2>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getActionColor(
                        entry.action,
                      )}`}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {entry.item}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {entry.details}
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
