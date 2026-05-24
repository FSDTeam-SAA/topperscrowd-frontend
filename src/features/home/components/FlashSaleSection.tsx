"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CountdownUnit } from "../types";

interface FlashSaleSectionProps {
  countdownUnits: CountdownUnit[];
}

export default function FlashSaleSection({
  countdownUnits,
}: FlashSaleSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mx-auto container overflow-hidden rounded-2xl px-4 py-12 md:px-0 md:py-24">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Left */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl font-bold leading-[1.2] text-slate-900 md:text-[32px]">
                Limited Archive Access
              </h2>

              <p className="text-lg leading-[1.2] text-slate-500">
                Unlock these premium titles for a fraction of the cost. The
                clock is ticking on these historical narratives.
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

            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-fit rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-[#fff8f5] hover:bg-indigo-700"
            >
              Claim 50% Discount
            </Button>
          </div>

          {/* Right */}
          <div className="flex w-full max-w-[540px] flex-2 items-end justify-center gap-3 sm:gap-4 md:gap-6">
            {/* Book 1 */}
            <div className="relative aspect-[3/4] w-[45%] shrink-0 overflow-hidden rounded-xl shadow-xl sm:h-[180px] sm:w-[180px] md:h-[260px] md:w-[260px]">
              <Image
                src="/images/home/sale-book1.png"
                alt="Sale book"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 45vw, 180px"
              />
            </div>

            {/* Book 2 */}
            <div className="relative aspect-[3/4] w-[45%] shrink-0 overflow-hidden rounded-xl shadow-xl sm:h-[180px] sm:w-[180px] md:h-[260px] md:w-[260px]">
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient */}
            <div className="h-2 w-full bg-gradient-to-r from-red-500 via-pink-500 to-indigo-500" />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center gap-5 px-8 py-8 text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-100 bg-red-50">
                <span className="text-3xl">🔥</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-slate-900">
                  Claim Your 50% Flash Sale Offer
                </h2>

                <p className="text-sm leading-relaxed text-slate-500">
                  This limited-time flash sale gives you exclusive access to
                  premium audiobook titles at{" "}
                  <span className="font-semibold text-red-600">50% OFF</span>.
                  To activate your discount and receive your special coupon,
                  please contact our admin team directly.
                </p>

                <p className="text-sm leading-relaxed text-slate-500">
                  Once contacted, our team will guide you through the offer and
                  help you complete your discounted purchase quickly and
                  securely.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-slate-100" />

              {/* Email Section */}
              <div className="w-full flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Contact Email
                </p>

                <div className="flex items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <Mail size={22} className="text-indigo-600" />
                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                      Email Address
                    </span>

                    <a
                      href="mailto:stevegroff@kathorianpublishingllc.com"
                      className="break-all text-sm text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
                    >
                      stevegroff@kathorianpublishingllc.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="w-full flex flex-col gap-3 pt-2">
                <Button
                  onClick={() =>
                    window.open("mailto:stevegroff@kathorianpublishingllc.com")
                  }
                  className="w-full rounded-xl bg-indigo-600 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-indigo-700"
                >
                  Contact Admin Now
                </Button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm text-slate-400 transition-colors hover:text-slate-600"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
