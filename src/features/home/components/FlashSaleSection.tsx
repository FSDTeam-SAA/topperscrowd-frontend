import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { CountdownUnit } from "../types";
import Link from "next/link";

interface FlashSaleSectionProps {
  countdownUnits: CountdownUnit[];
}

export default function FlashSaleSection({
  countdownUnits,
}: FlashSaleSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mx-auto container px-4 md:px-0 py-12 md:py-24 rounded-2xl overflow-hidden">
      {/* Left */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl md:text-[32px] font-bold leading-[1.2] text-slate-900">
            Limited Archive Access
          </h2>
          <p className="text-lg leading-[1.2] text-slate-500">
            Unlock these premium titles for a fraction of the cost. The clock is
            ticking on these historical narratives.
          </p>
        </div>
        {/* Countdown */}
        <div className="flex gap-4 py-4">
          {countdownUnits.map((t) => (
            <div
              key={t.label}
              className="flex min-w-[80px] flex-col items-center rounded-lg bg-white px-4 py-4 shadow-sm"
            >
              <span className="text-2xl font-semibold text-indigo-600">
                {t.value}
              </span>
              <span className="text-xs uppercase text-slate-900">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        <Link href="/category">
          <Button className="w-fit bg-indigo-600 hover:bg-indigo-700 rounded-lg px-8 py-4 text-base font-semibold text-[#fff8f5]">
            Shop the Sale
          </Button>
        </Link>
      </div>

      {/* Right — Two book covers */}
      {/* Right — Two book covers */}
      <div className="flex flex-2 items-end justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-[540px]">
        {/* Book 1 */}
        <div className="relative w-[45%] aspect-[3/4] sm:h-[180px] sm:w-[180px] md:h-[260px] md:w-[260px] shrink-0 overflow-hidden rounded-xl shadow-xl">
          <Image
            src="/images/home/sale-book1.png"
            alt="Sale book"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, 180px"
          />
        </div>

        {/* Book 2 */}
        <div className="relative w-[45%] aspect-[3/4] sm:h-[180px] sm:w-[180px] md:h-[260px] md:w-[260px] shrink-0 overflow-hidden rounded-xl shadow-xl">
          <Image
            src="/images/home/sale-book2.png"
            alt="Sale book"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, 180px"
          />

          {/* Badge */}
          <div className="absolute right-1 top-1 rounded-md bg-red-700 px-2 py-1 sm:right-2 sm:top-2 sm:px-3 sm:py-1.5 md:px-4 md:py-2">
            <span className="text-[10px] font-semibold text-white sm:text-xs md:text-sm">
              FLASH SALE - 50% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
