"use client";

import { Check } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e8e3df]">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Circle with Check */}
        <div className="relative flex items-center justify-center">
          {/* Outer soft circle */}
          <div className="w-40 h-40 rounded-full bg-green-200 flex items-center justify-center">
            {/* Inner border circle */}
            <div className="w-28 h-28 rounded-full border-[6px] border-green-600 flex items-center justify-center bg-white">
              <Check className="text-green-600 w-12 h-12 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="mt-8 text-4xl md:text-5xl font-serif font-semibold text-green-600">
          Payment Successful!
        </h1>
      </div>
    </div>
  );
}
