"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  LayoutGrid,
  Users,
  BookOpen,
  ClipboardList,
  Star,
  MessageCircle,
  Settings,
  LogOut,
  Tag,
  Library,
  Image as ImageIcon,
  List,
  type LucideIcon,
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

interface NavChild {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavChild[];
}

const navItems: NavItem[] = [
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
    label: "E-Books",
    href: "/admin-dashboard/e-books",
    icon: BookOpen,
    children: [
      {
        label: "Categories",
        href: "/admin-dashboard/e-books/categories",
        icon: Library,
      },
      {
        label: "E-Book List",
        href: "/admin-dashboard/e-books/list",
        icon: List,
      },
    ],
  },
  {
    label: "Book Categories",
    href: "/admin-dashboard/book-categories",
    icon: Library,
  },
  {
    label: "Cover Management",
    href: "/admin-dashboard/cover-management",
    icon: ImageIcon,
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
    label: "Coupon Code",
    href: "/admin-dashboard/cupon-code",
    icon: Tag,
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "/admin-dashboard/e-books": true, // expanded by default
  });

  // Automatically expand if pathname starts with the parent href
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children && pathname.startsWith(item.href)) {
        setExpandedItems((prev) => ({
          ...prev,
          [item.href]: true,
        }));
      }
    });
  }, [pathname]);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col justify-between bg-[#f1f5f9] pb-6">
      {/* Logo + Nav */}
      <div className="flex flex-col gap-8 pt-4">
        {/* Logo */}
        <Link href="/">
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
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin-dashboard"
                ? pathname === "/admin-dashboard"
                : pathname.startsWith(item.href);
            const isParentWithChildren = Boolean(item.children?.length);

            if (isParentWithChildren) {
              const isExpanded = expandedItems[item.href] ?? isActive;
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedItems((prev) => ({
                        ...prev,
                        [item.href]: !prev[item.href],
                      }))
                    }
                    className={cn(
                      "flex w-full items-center gap-2 px-6 py-3 text-base transition-colors",
                      isActive
                        ? "bg-[#4f46e5] text-white"
                        : "text-[#0f172a] hover:bg-[#e2e8f0]",
                    )}
                  >
                    <item.icon className="size-5 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="bg-[#e2e8f0]/60 py-1">
                      {item.children?.map((child) => {
                        const childIsActive = pathname.startsWith(child.href);

                        if (child.disabled) {
                          return (
                            <div
                              key={child.href}
                              className="flex cursor-not-allowed items-center gap-2 py-2.5 pl-12 pr-6 text-sm text-[#64748b] opacity-70"
                            >
                              <child.icon className="size-4 shrink-0" />
                              <span>{child.label}</span>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 py-2.5 pl-12 pr-6 text-sm transition-colors",
                              childIsActive
                                ? "font-semibold text-[#4f46e5]"
                                : "text-[#334155] hover:text-[#0f172a]",
                            )}
                          >
                            <child.icon className="size-4 shrink-0" />
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

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
              className="flex-1 rounded-lg bg-[#e53838] cursor-pointer px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#dc2626]"
            >
              Yes, Log out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
