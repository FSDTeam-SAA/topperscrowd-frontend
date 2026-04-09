interface PaginationDotsProps {
  total: number;
  active: number;
}

export default function PaginationDots({ total, active }: PaginationDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full ${
            i === active
              ? "h-[7px] w-4 bg-indigo-600"
              : "size-[7px] border border-indigo-600 bg-white"
          }`}
        />
      ))}
    </div>
  );
}
