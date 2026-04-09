import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
}

export default function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const iconClass = size === "sm" ? "size-3" : "size-5";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={i}
          className={`${iconClass} fill-amber-400 text-amber-400`}
        />
      ))}
      {hasHalf && (
        <StarHalf className={`${iconClass} fill-amber-400 text-amber-400`} />
      )}
      {Array.from({ length: 5 - full - (hasHalf ? 1 : 0) }).map((_, i) => (
        <Star key={`e${i}`} className={`${iconClass} text-gray-300`} />
      ))}
    </div>
  );
}
