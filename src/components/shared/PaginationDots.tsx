interface PaginationDotsProps {
  total: number;
  active: number;
  onDotClick?: (index: number) => void;
}

export default function PaginationDots({
  total,
  active,
  onDotClick,
}: PaginationDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick?.(i)}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? "h-[7px] w-4 bg-indigo-600"
              : "size-[7px] border border-indigo-600 bg-white hover:bg-indigo-100"
          }`}
        />
      ))}
    </div>
  );
}
