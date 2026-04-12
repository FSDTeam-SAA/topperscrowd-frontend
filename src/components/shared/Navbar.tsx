"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  X,
  ChevronDown,
  Loader2,
  Menu,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useBooks } from "@/features/book/hooks/useBooks";
import { useBookCategories } from "@/features/book-category/hooks/useBookCategories";
import { mapApiCategoryToCategory } from "@/types/shared";

export default function Navbar() {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: booksRes, isLoading: searchLoading } = useBooks(
    debouncedQuery ? { search: debouncedQuery, limit: 6 } : undefined,
  );
  const { data: categories } = useBookCategories();
  const searchResults = booksRes?.data ?? [];
  const mappedCategories = useMemo(
    () => (categories ?? []).map(mapApiCategoryToCategory).slice(0, 6),
    [categories],
  );

  useEffect(() => {
    if (!searchOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="sticky top-0 z-50 border-b bg-[#fff8f5] px-4 md:px-6">
      <nav className="container mx-auto flex h-[70px] md:h-[90px] items-center justify-between">
        <Link
          href="/"
          className="relative h-[50px] w-[130px] md:h-[70px] md:w-[180px] overflow-hidden"
        >
          <Image
            src="/images/logo.png"
            alt="ToppersCrowd Logo"
            fill
            className="object-cover"
          />
        </Link>

        {/* Desktop search bar */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden lg:flex w-[500px] cursor-text items-center border justify-between rounded-full bg-slate-100 py-1.5 pl-6 pr-1.5 transition-shadow hover:ring-2 hover:ring-indigo-200"
        >
          <span className="text-lg text-neutral-400">Search Your Product</span>
          <span className="flex items-center justify-center rounded-full bg-indigo-600 p-3">
            <Search className="size-6 text-white" />
          </span>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex lg:hidden items-center justify-center rounded-full bg-indigo-600 p-2"
        >
          <Search className="size-5 text-white" />
        </button>

        {/* Desktop right section */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/wishlist">
              <Heart className="size-7 lg:size-9 cursor-pointer text-slate-700 transition-colors hover:text-red-500" />
            </Link>
            <Link href="/cart">
              <ShoppingBag className="size-7 lg:size-9 cursor-pointer text-slate-700 transition-colors hover:text-indigo-600" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3 pl-2">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-lg px-2 lg:px-4 py-2 transition-colors hover:bg-slate-100"
                >
                  <span className="hidden lg:inline text-base font-medium text-indigo-600">
                    {session.user.name || session.user.email}
                  </span>
                  <div className="relative size-8 lg:size-10 overflow-hidden rounded-full bg-indigo-100">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center text-sm font-semibold text-indigo-600">
                        {(session.user.name || session.user.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`size-4 text-slate-600 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                    <Link
                      href={
                        session.user.role === "admin"
                          ? "/admin-dashboard"
                          : "/dashboard"
                      }
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-t-lg px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/dashboard?tab=profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard?tab=orders"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut({ callbackUrl: "/auth/login" });
                      }}
                      className="w-full rounded-b-lg border-t border-slate-200 px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="rounded-lg bg-indigo-600 px-4 lg:px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden lg:block rounded-lg border-2 border-indigo-600 px-6 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden items-center justify-center p-2"
        >
          {mobileMenuOpen ? (
            <X className="size-6 text-slate-700" />
          ) : (
            <Menu className="size-6 text-slate-700" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-[#fff8f5] px-4 pb-4">
          <div className="flex flex-col gap-4 py-4">
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm font-medium text-slate-700"
            >
              <Heart className="size-5" /> Wishlist
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm font-medium text-slate-700"
            >
              <ShoppingBag className="size-5" /> Cart
            </Link>
            {session?.user ? (
              <>
                <Link
                  href={
                    session.user.role === "admin"
                      ? "/admin-dashboard"
                      : "/dashboard"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700"
                >
                  My Dashboard
                </Link>
                <Link
                  href="/dashboard?tab=profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700"
                >
                  My Profile
                </Link>
                <Link
                  href="/dashboard?tab=orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/auth/login" });
                  }}
                  className="text-left text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border-2 border-indigo-600 px-6 py-2 text-sm font-semibold text-indigo-600"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-start justify-center transition-all duration-300 ${
          searchOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        />

        {/* Modal Content */}
        <div
          className={`relative mt-16 md:mt-24 mx-4 md:mx-0 w-full max-w-[640px] rounded-2xl bg-white p-4 md:p-6 shadow-2xl transition-all duration-300 ${
            searchOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-8 scale-95 opacity-0"
          }`}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3">
            <Search className="size-5 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search books, authors, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus={searchOpen}
              className="flex-1 bg-transparent text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="my-4 h-px bg-slate-100" />

          {/* Search Results or Quick Links */}
          <div className="max-h-[400px] overflow-y-auto">
            {debouncedQuery ? (
              <div className="flex flex-col gap-2">
                {searchLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-6 animate-spin text-indigo-600" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((book) => (
                    <Link
                      key={book._id}
                      href={`/category/${typeof book.genre === "object" ? book.genre._id : book.genre}/${book._id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50"
                    >
                      <div className="relative size-12 shrink-0 overflow-hidden rounded">
                        <Image
                          src={
                            book.image?.secure_url || "/images/home/book1.png"
                          }
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {book.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {book.author} · ${book.price}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-slate-400">
                    No books found for &ldquo;{debouncedQuery}&rdquo;
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Browse Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {mappedCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="mt-4 flex items-center justify-end gap-1 text-xs text-slate-400">
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px]">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </section>
  );
}
