import { Button } from "@/components/ui/button";

export default function SpecialOfferBanner() {
  return (
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
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-md px-6 py-3 text-sm font-semibold text-white">
          Claim Offer Now
        </Button>
      </div>
    </div>
  );
}
