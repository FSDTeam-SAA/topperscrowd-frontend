"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";

export default function SpecialOfferBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mx-auto container py-12 md:py-20 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-lg border border-[#e2e8f0] bg-white p-6 md:p-9">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-bold text-indigo-600">
              Special Offer
            </span>

            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Get 50% off your first audiobook
              </h3>

              <p className="text-base text-slate-500">
                Join Ka Thorian today and unlock a world of knowledge and
                entertainment at half the price.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-md px-6 py-3 text-sm font-semibold text-white"
          >
            Claim Offer Now
          </Button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center gap-5 px-8 py-8 text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-100 bg-indigo-50">
                <span className="text-3xl">🎁</span>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Contact Admin to Claim This Offer
                </h2>

                <p className="text-sm leading-relaxed text-slate-500">
                  If you would like to take advantage of this exclusive offer,
                  please contact our{" "}
                  <span className="font-semibold text-indigo-600">Admin</span>{" "}
                  directly. Our team will assist you with all the necessary{" "}
                  <span className="font-semibold text-indigo-600">coupon</span>{" "}
                  and discount arrangements.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-slate-100" />

              {/* Contact Information */}
              <div className="w-full flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Contact Information
                </p>

                <div className="flex items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-5">
                  <div className="flex flex-col items-center gap-2 text-center">
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

              {/* Action buttons */}
              <div className="w-full flex flex-col gap-3 pt-1">
                <Button
                  className="w-full rounded-xl bg-indigo-600 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-indigo-700"
                  onClick={() =>
                    window.open("mailto:stevegroff@kathorianpublishingllc.com")
                  }
                >
                  Contact Now
                </Button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm text-slate-400 transition-colors hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
