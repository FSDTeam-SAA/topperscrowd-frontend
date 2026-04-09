"use client";

import { useState } from "react";
import DashboardSidebar from "@/features/user-dashboard/components/DashboardSidebar";
import DashboardOverview from "@/features/user-dashboard/components/DashboardOverview";
import ProfileTab from "@/features/user-dashboard/components/ProfileTab";
import OrdersTab from "@/features/user-dashboard/components/OrdersTab";
import WishlistTab from "@/features/user-dashboard/components/WishlistTab";
import HistoryTab from "@/features/user-dashboard/components/HistoryTab";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "history":
        return <HistoryTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">User Dashboard</h1>
        <p className="text-slate-600">
          Manage your account and track your orders
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
