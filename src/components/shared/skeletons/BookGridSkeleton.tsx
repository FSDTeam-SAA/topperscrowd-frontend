import BookCardSkeleton from "./BookCardSkeleton";

interface BookGridSkeletonProps {
  count?: number;
}

export default function BookGridSkeleton({ count = 4 }: BookGridSkeletonProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="animate-pulse">
        <div className="h-8 w-64 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-96 rounded bg-slate-200" />
      </div>
      <div className="flex gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
