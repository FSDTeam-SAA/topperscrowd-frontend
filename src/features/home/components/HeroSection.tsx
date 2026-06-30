"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/shared/RatingStars";
import Link from "next/link";
import { useCovers } from "../hooks/useCovers";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HeroSection() {
  const { data: covers } = useCovers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("covers", covers);
  const cover = covers?.[0];

  const title = cover?.title || "Coming soon...";
  const description = cover?.description || "Coming soon...";
  const edition = cover?.edition || "12th Edition";
  const imageUrl = cover?.image?.url || "";

  // Format edition string (e.g. "2nd Edition" -> "2nd", "Edition" -> "1st")
  const displayEdition = edition.toLowerCase().includes("edition")
    ? edition.replace(/\s*edition\s*/gi, "").trim()
    : edition;

  const truncateText = (text: string, type: "word" | "letter", max: number) => {
    if (type === "word") {
      const words = text.split(" ");
      if (words.length > max) {
        return {
          truncated: words.slice(0, max).join(" ") + "...",
          isTruncated: true,
        };
      }
    } else {
      if (text.length > max) {
        return { truncated: text.slice(0, max) + "...", isTruncated: true };
      }
    }
    return { truncated: text, isTruncated: false };
  };

  // "5 ta ;etter" could mean 5 words or letters. Let's truncate by 5 words as it's more standard,
  // but if the user meant letters, they can easily change the type to "letter".
  const { truncated: shortTitle, isTruncated: isTitleTruncated } = truncateText(
    title,
    "word",
    6,
  );
  const { truncated: shortDesc, isTruncated: isDescTruncated } = truncateText(
    description,
    "word",
    20,
  );

  return (
    <section className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 py-10 md:py-16 container px-4 md:px-6">
      {/* Left */}
      <div className="flex w-full lg:w-[573px] flex-col gap-6 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-6">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-[60px] font-bold leading-[1.2] text-slate-900">
            {shortTitle}
            {isTitleTruncated && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-indigo-600 text-2xl md:text-4xl lg:text-[40px] ml-2 hover:underline focus:outline-none"
              >
                more
              </button>
            )}
          </h1>
          <p className="text-xl leading-[1.2] text-slate-500">
            {shortDesc}
            {isDescTruncated && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-indigo-600 ml-2 hover:underline focus:outline-none"
              >
                more
              </button>
            )}
          </p>
          <div className="flex gap-3">
            {/* <Link href="/dashboard" className="block  h-full">
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded px-6 py-3 text-sm text-[#fff8f5]">
                Start Listening
              </Button>
            </Link> */}

            <Link href="/category" className="block h-full">
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
            src={imageUrl || "/images/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="-rotate-[10deg] absolute -bottom-4 -left-8 flex flex-col items-center justify-center rounded-xl border border-white/40 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm">
          <span className="text-lg text-indigo-600">
            {displayEdition || "1st"}
          </span>
          <span className="text-[10px] font-semibold uppercase text-[#464555]">
            Edition
          </span>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-none md:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] max-h-[90vh] overflow-y-auto p-6 md:p-10 lg:p-16 border-none">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
            {/* Left */}
            <div className="flex w-full lg:w-[573px] flex-col gap-6 md:gap-10">
              <div className="flex flex-col gap-4 md:gap-6">
                <DialogTitle asChild>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-[50px] font-bold leading-[1.2] text-slate-900">
                    {title}
                  </h2>
                </DialogTitle>
                <p className="text-xl leading-[1.2] text-slate-500 whitespace-pre-wrap">
                  {description}
                </p>
                <div className="flex gap-3">
                  {/* <Link href="/dashboard" className="block h-full">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 rounded px-6 py-3 text-sm text-[#fff8f5]">
                      Start Listening
                    </Button>
                  </Link> */}

                  <Link href="/category" className="block h-full">
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
                  <span className="text-xs text-[#464555]">
                    from 50K+ listeners
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Book cover */}
            <div className="relative shrink-0">
              <div className="relative h-[300px] w-[260px] md:h-[400px] md:w-[350px] lg:h-[450px] lg:w-[400px] -skew-x-1 rounded-xl overflow-hidden">
                <Image
                  src={imageUrl || "/images/placeholder.jpg"}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="-rotate-[10deg] absolute -bottom-4 -left-8 flex flex-col items-center justify-center rounded-xl border border-white/40 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm">
                <span className="text-lg text-indigo-600">
                  {displayEdition || "1st"}
                </span>
                <span className="text-[10px] font-semibold uppercase text-[#464555]">
                  Edition
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
