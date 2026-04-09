import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="mx-auto flex h-[90px] max-w-[1440px] items-center justify-between px-[120px]">
      <div className="relative h-[70px] w-[180px] overflow-hidden">
        <Image
          src="/images/home/logo.png"
          alt="Ka Thorian"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex w-[500px] items-center justify-between rounded-full bg-slate-100 py-1.5 pl-6 pr-1.5">
        <span className="text-lg text-neutral-900">Search Your Product</span>
        <button className="flex items-center justify-center rounded-full bg-indigo-600 p-3">
          <Search className="size-6 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-6">
          <Heart className="size-9 cursor-pointer text-slate-700 transition-colors hover:text-red-500" />
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
  );
}
