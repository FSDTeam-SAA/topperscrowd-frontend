"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";

export default function NewReleaseBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-indigo-600 py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 text-center md:gap-6 md:px-0">
          {/* Badge */}
          <div className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-100 backdrop-blur-sm">
            Limited Time Offer
          </div>

          {/* Heading */}
          <h2 className="font-serif text-2xl font-bold leading-[1.2] text-white md:text-[38px]">
            Unlock Premium Audiobooks with 30% OFF
          </h2>

          {/* Description */}
          <p className="max-w-[620px] text-base leading-relaxed text-indigo-100 md:text-lg">
            Experience a world of inspiring stories, business insights, and
            premium audiobook collections at an exclusive discounted price.
            Claim your{" "}
            <span className="font-semibold text-white">
              30% special discount
            </span>{" "}
            today before this limited-time offer ends.
          </p>

          {/* Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="rounded-xl border-white bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-100"
          >
            Get 30% Discount
          </Button>
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
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center gap-5 px-8 py-8 text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-100 bg-indigo-50">
                <span className="text-3xl">✨</span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-slate-900">
                  Claim Your 30% Premium Discount
                </h2>

                <p className="text-sm leading-relaxed text-slate-500">
                  Enjoy exclusive access to premium audiobooks and unlock your{" "}
                  <span className="font-semibold text-indigo-600">
                    30% special offer
                  </span>{" "}
                  today. To receive your discount coupon and activation details,
                  please contact our admin team directly.
                </p>

                <p className="text-sm leading-relaxed text-slate-500">
                  Our team will guide you through the process and help you get
                  started with your premium access quickly and securely.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-slate-100" />

              {/* Email */}
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
                  Contact Admin
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
