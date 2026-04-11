"use client";

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
            <AvatarImage src="/avatar.png" alt="Admin" />
            <AvatarFallback className="bg-[#4f46e5] text-white text-sm font-semibold">
              DN
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#111]">Demo Name</span>
            <span className="text-sm text-[#6b6b6b]">Super Admin</span>
          </div>
        </div>

        <button className="flex h-12 items-center justify-center gap-1 rounded-md border border-[#e53838] text-[#e53838] transition-colors hover:bg-[#e53838] hover:text-white">
          <LogOut className="size-5" />
          <span className="text-lg font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}
