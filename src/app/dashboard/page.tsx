"use client";

import { useState } from "react";
import DashboardSidebar from "@/features/user-dashboard/components/DashboardSidebar";
import DashboardOverview from "@/features/user-dashboard/components/DashboardOverview";
import MyLibraryTab from "@/features/user-dashboard/components/MyLibraryTab";
// import ProfileTab from "@/features/user-dashboard/components/ProfileTab";
// import OrdersTab from "@/features/user-dashboard/components/OrdersTab";
// import WishlistTab from "@/features/user-dashboard/components/WishlistTab";
import HistoryTab from "@/features/user-dashboard/components/HistoryTab";
import ReviewsTab from "@/features/user-dashboard/components/ReviewsTab";
import SettingsTab from "@/features/user-dashboard/components/SettingsTab";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("library");

  const renderContent = () => {
    switch (activeTab) {
      case "library":
        return <MyLibraryTab />;
      case "reviews":
        return <ReviewsTab />;
      case "history":
        return <HistoryTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back to Home */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <Link href="/" className="text-blue-600 hover:underline">
          <Image
            src="/images/logo.png"
            alt="BookVerse Logo"
            width={170}
            height={170}
            className="mr-2 cursor-pointer hover:opacity-80 transition"
          />
        </Link>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
