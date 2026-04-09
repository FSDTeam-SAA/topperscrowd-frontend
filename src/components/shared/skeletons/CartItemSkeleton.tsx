export default function CartItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-6">
        <div className="h-[140px] w-[120px] shrink-0 rounded bg-slate-200" />
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-3">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200" />
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="h-5 w-16 rounded bg-slate-200" />
            <div className="h-9 w-24 rounded bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="mt-8 h-px bg-slate-200" />
    </div>
  );
}
