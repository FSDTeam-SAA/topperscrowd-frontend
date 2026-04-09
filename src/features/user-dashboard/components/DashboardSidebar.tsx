"use client";

import { useState } from "react";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Heart,
  ShoppingBag,
  Clock,
} from "lucide-react";
import Image from "next/image";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DashboardSidebar({
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "history", label: "Purchase History", icon: Clock },
  ];

  return (
    <aside className="w-[280px] border-r border-gray-200 bg-white p-6">
      {/* User Card */}
      <div className="mb-8 rounded-lg bg-slate-50 p-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-300">
            <Image
              src="/images/home/avatar.png"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Marcos Alonso</p>
            <p className="text-xs text-slate-600">marcos@example.com</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mb-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full rounded-lg px-4 py-3 flex items-center gap-3 transition-colors ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings Section */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full rounded-lg px-4 py-3 flex items-center justify-between text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showDropdown && (
          <div className="mt-2 space-y-2 pl-2">
            <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 transition-colors">
              Account Settings
            </button>
            <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 transition-colors">
              Privacy & Security
            </button>
            <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 transition-colors">
              Notifications
            </button>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button className="mt-6 w-full rounded-lg bg-red-50 px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-100 transition-colors">
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </aside>
  );
}
