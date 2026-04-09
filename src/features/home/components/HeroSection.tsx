import Image from "next/image";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/shared/RatingStars";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 py-10 md:py-16 container mx-auto px-4 md:px-6">
      {/* Left */}
      <div className="flex w-full lg:w-[573px] flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-6">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-[72px] font-bold leading-[1.2] text-slate-900">
            The <span className="text-indigo-600">Midnight</span> Archivist
          </h1>
          <p className="text-xl leading-[1.2] text-slate-500">
            Journey into the heart of a forgotten city where memories are traded
            like currency. A cinematic audio experience narrated by Julian Vane.
          </p>
          <div className="flex gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded px-6 py-3 text-sm text-[#fff8f5]">
              Start Listening
            </Button>
            <Link href="/category" className="block w-full h-full">
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded px-6 py-3 text-sm"
              >
                Browse Library
              </Button>
            </Link>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center">
          <div className="flex pr-2">
            <div className="relative size-10 overflow-hidden rounded-full border-2 border-[#fbf9f4]">
              <Image
                src="/images/home/listener1.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="-ml-2 relative size-10 overflow-hidden rounded-full border-2 border-[#fbf9f4]">
              <Image
                src="/images/home/listener2.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-[#fbf9f4] bg-[#f0eee9] text-[10px] text-[#464555]">
              +50k
            </div>
          </div>
          <div className="flex flex-col pl-6">
            <div className="flex items-center gap-2">
              <RatingStars rating={4.8} size="sm" />
              <span className="text-base text-[#1b1c19]">4.8 Rating</span>
            </div>
            <span className="text-xs text-[#464555]">from 50K+ listeners</span>
          </div>
        </div>
      </div>

      {/* Right — Book cover */}
      <div className="relative">
        <div className="relative h-[300px] w-[260px] md:h-[400px] md:w-[350px] lg:h-[500px] lg:w-[450px] -skew-x-1 rounded-xl overflow-hidden">
          <Image
            src="/images/home/hero-book.png"
            alt="The Midnight Archivist"
            fill
            className="object-cover"
          />
        </div>
        <div className="-rotate-[10deg] absolute -bottom-4 -left-8 flex flex-col items-center justify-center rounded-xl border border-white/40 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm">
          <span className="text-lg text-indigo-600">12th</span>
          <span className="text-[10px] font-semibold uppercase text-[#464555]">
            Edition
          </span>
        </div>
      </div>
    </section>
  );
}
