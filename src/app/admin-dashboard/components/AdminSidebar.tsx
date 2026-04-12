"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  BookOpen,
  ClipboardList,
  Star,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  {
    label: "Dashboard Overview",
    href: "/admin-dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Users Management",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Audio Books",
    href: "/admin-dashboard/audio-books",
    icon: BookOpen,
  },
  {
    label: "Orders Management",
    href: "/admin-dashboard/orders",
    icon: ClipboardList,
  },
  {
    label: "Reviews",
    href: "/admin-dashboard/reviews",
    icon: Star,
  },
  {
    label: "Chat Room",
    href: "/admin-dashboard/chat",
    icon: MessageCircle,
  },
  {
    label: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col justify-between bg-[#f1f5f9] pb-6">
      {/* Logo + Nav */}
      <div className="flex flex-col gap-8 pt-4">
        {/* Logo */}
        <div className="flex items-center justify-center px-6">
          <Image
            src="/images/logo.png"
            alt="Ka Thorian"
            width={180}
            height={70}
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin-dashboard"
                ? pathname === "/admin-dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 text-base transition-colors",
                  isActive
                    ? "bg-[#4f46e5] text-white"
                    : "text-[#0f172a] hover:bg-[#e2e8f0]",
                )}
              >
                <item.icon className="size-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info + Logout */}
      <div className="flex flex-col gap-6 px-6">
        <div className="flex items-center gap-2">
          <Avatar className="size-11">
            <AvatarImage
              src={user?.image || "/avatar.png"}
              alt={user?.name || "Admin"}
            />
            <AvatarFallback className="bg-[#4f46e5] text-white text-sm font-semibold">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#111]">
              {user?.name || "Admin"}
            </span>
            <span className="text-sm text-[#6b6b6b] capitalize">
              {user?.role || "Admin"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex h-12 items-center justify-center gap-1 rounded-md border border-[#e53838] text-[#e53838] transition-colors hover:bg-[#e53838] hover:text-white"
        >
          <LogOut className="size-5" />
          <span className="text-lg font-medium">Log out</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-100">
              <LogOut className="size-6 text-[#e53838]" />
            </div>
            <DialogTitle className="text-center">Confirm Logout</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to log out? You will need to sign in again
              to access the dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 flex gap-3 sm:justify-center">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 rounded-lg border border-[#e2e8f0] px-5 py-2.5 text-sm font-medium text-[#0f172a] transition-colors hover:bg-[#f1f5f9]"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 rounded-lg bg-[#e53838] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#dc2626]"
            >
              Yes, Log out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
