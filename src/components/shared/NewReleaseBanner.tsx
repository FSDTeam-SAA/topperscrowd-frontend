import { Button } from "@/components/ui/button";

export default function NewReleaseBanner() {
  return (
    <div className="bg-indigo-600 py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 md:gap-6 px-4 md:px-0 text-center">
        <h2 className="font-serif text-2xl md:text-[36px] font-bold leading-[1.2] text-white">
          {`New Release: \u201CThe Innovation Mindset\u201D`}
        </h2>
        <p className="max-w-[540px] text-base leading-relaxed text-indigo-100">
          Discover the secrets of breakthrough thinking with our latest featured
          audiobook. Limited time offer: Get 30% off your first purchase!
        </p>
        <Button
          variant="outline"
          className="border-white text-slate-900 bg-white hover:bg-slate-100 rounded-lg px-8 py-3 text-sm font-medium"
        >
          Get Premium
        </Button>
      </div>
    </div>
  );
}
