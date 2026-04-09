"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, X } from "lucide-react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  return (
    <section className="sticky top-0 z-50 border-b bg-[#fff8f5] px-6">
      <nav className="container mx-auto flex h-[90px]  items-center justify-between ">
        <Link href="/" className="relative h-[70px] w-[180px] overflow-hidden">
          <Image
            src="/images/logo.svg"
            alt="ToppersCrowd Logo"
            fill
            className="object-cover"
          />
        </Link>
        <button
          onClick={() => setSearchOpen(true)}
          className="flex w-[500px] cursor-text items-center border justify-between rounded-full bg-slate-100 py-1.5 pl-6 pr-1.5 transition-shadow hover:ring-2 hover:ring-indigo-200"
        >
          <span className="text-lg text-neutral-400">Search Your Product</span>
          <span className="flex items-center justify-center rounded-full bg-indigo-600 p-3">
            <Search className="size-6 text-white" />
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <Link href="/wishlist">
              <Heart className="size-9 cursor-pointer text-slate-700 transition-colors hover:text-red-500" />
            </Link>
            <Link href="/cart">
              <ShoppingBag className="size-9 cursor-pointer text-slate-700 transition-colors hover:text-indigo-600" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3 pl-2">
            <span className="text-base font-medium text-indigo-600">
              Marcos Alonso
            </span>
            <div className="relative size-12 overflow-hidden rounded-full">
              <Image
                src="/images/home/avatar.png"
                alt="User"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

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
          className={`relative mt-24 w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 ${
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

          {/* Quick Links / Suggestions */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Quick Links
            </p>
            <div className="flex flex-wrap gap-2">
              {["Sci-Fi", "Classic Literature", "Mystery", "Horror"].map(
                (tag) => (
                  <Link
                    key={tag}
                    href={`/category/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setSearchOpen(false)}
                    className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {tag}
                  </Link>
                ),
              )}
            </div>
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
