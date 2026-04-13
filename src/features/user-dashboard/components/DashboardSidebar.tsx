"use client";

import { useState } from "react";
import { Settings, LogOut, Star, BookOpenCheck } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DashboardSidebar({
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const { data: session } = useSession();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = session?.user;

  const menuItems = [
    { id: "library", label: "My Library", icon: BookOpenCheck },
    { id: "reviews", label: "My Reviews", icon: Star },
  ];

  return (
    <aside className="w-full md:w-[280px] border-r border-gray-200 bg-white p-4 md:p-6">
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
          onClick={() => onTabChange("settings")}
          className={`w-full rounded-lg px-4 py-3 flex items-center gap-3 transition-colors ${
            activeTab === "settings"
              ? "bg-indigo-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>

      {/* User Card */}
      <div className="mt-10 rounded-lg p-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-300">
            {user?.image ? (
              <Image
                src={user.image}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-600">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-600 truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="mt-2 w-full rounded-lg bg-red-50 px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-100 transition-colors cups-pointer"
      >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Confirm Logout
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
