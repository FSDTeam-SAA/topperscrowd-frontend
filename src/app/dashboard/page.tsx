"use client";

import { useState } from "react";
import DashboardSidebar from "@/features/user-dashboard/components/DashboardSidebar";
import DashboardOverview from "@/features/user-dashboard/components/DashboardOverview";
import MyLibraryTab from "@/features/user-dashboard/components/MyLibraryTab";
import ProfileTab from "@/features/user-dashboard/components/ProfileTab";
import OrdersTab from "@/features/user-dashboard/components/OrdersTab";
import WishlistTab from "@/features/user-dashboard/components/WishlistTab";
import HistoryTab from "@/features/user-dashboard/components/HistoryTab";
import SettingsTab from "@/features/user-dashboard/components/SettingsTab";
import Image from "next/image";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("library");

  const renderContent = () => {
    switch (activeTab) {
      // case "overview":
      //   return <DashboardOverview />;
      case "library":
        return <MyLibraryTab />;
      // case "profile":
      //   return <ProfileTab />;
      // case "orders":
      //   return <OrdersTab />;
      // case "wishlist":
      //   return <WishlistTab />;
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 ml-4 ">
        <Image
          src="/images/logo.png"
          alt="BookVerse Logo"
          width={170}
          height={170}
          className="mr-2"
        />
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
