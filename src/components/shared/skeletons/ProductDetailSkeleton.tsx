export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-[120px] py-12 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="h-[280px] w-full md:h-[340px] md:w-[280px] shrink-0 rounded-xl bg-slate-200" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-8 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-1/3 rounded bg-slate-200" />
          <div className="h-7 w-20 rounded bg-slate-200" />
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-4 w-48 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <div className="h-12 w-32 rounded-lg bg-slate-200" />
            <div className="h-12 w-32 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
