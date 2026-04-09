export default function BookCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl animate-pulse">
      <div className="h-64 w-full bg-slate-200" />
      <div className="flex flex-col gap-4 rounded-b-2xl border border-t-0 border-[#e2e8f0] bg-white p-6">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-slate-200" />
          <div className="h-3 w-1/2 rounded bg-slate-200" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-4 w-10 rounded bg-slate-200" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-7 w-16 rounded bg-slate-200" />
          <div className="h-9 w-24 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
