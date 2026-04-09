import ReviewCard from "@/components/shared/ReviewCard";
import type { Review } from "@/types/shared";

interface ListenerReviewsProps {
  reviews: Review[];
}

export default function ListenerReviews({ reviews }: ListenerReviewsProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-[120px] py-12">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="font-serif text-[28px] font-bold leading-[1.2] text-slate-900">
          Listener Reviews
        </h2>
        <p className="text-sm text-slate-500">See the testimonials</p>
      </div>
      <div className="flex gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
