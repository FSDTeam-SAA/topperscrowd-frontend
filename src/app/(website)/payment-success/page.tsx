"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function Page() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="my-70 flex items-center justify-center bg-[#e8e3df]">
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-2xl p-8 shadow-xl text-center w-[90%] max-w-md">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              {/* × */}
            </button>

            {/* Success UI */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-green-200 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-[6px] border-green-600 flex items-center justify-center bg-white">
                  <Check className="text-green-600 w-12 h-12 stroke-[3]" />
                </div>
              </div>

              <h1 className="mt-6 text-3xl font-serif font-semibold text-green-600">
                Payment Successful!
              </h1>

              {/* Home Button */}
              <button
                onClick={() => router.push("/")}
                className="mt-6 px-5 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
