import Image from "next/image";
import RatingStars from "./RatingStars";
import type { Review } from "@/types/shared";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-xl border border-[#e2e8f0] bg-white p-6">
      <RatingStars rating={review.rating} size="sm" />
      <p className="text-sm leading-relaxed text-slate-600">{review.text}</p>
      <div className="mt-auto flex items-center gap-3">
        <div className="relative size-8 overflow-hidden rounded-full">
          <Image
            src={review.avatar}
            alt={review.author}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-slate-900">
          {review.author}
        </span>
      </div>
    </div>
  );
}
