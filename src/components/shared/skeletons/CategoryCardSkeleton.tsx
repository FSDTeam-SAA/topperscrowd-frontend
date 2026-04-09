export default function CategoryCardSkeleton() {
  return (
    <div className="w-[220px] shrink-0 animate-pulse overflow-hidden rounded-2xl">
      <div className="h-[180px] w-full bg-slate-200" />
      <div className="flex flex-col gap-2 bg-white p-4">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="mt-2 h-9 w-full rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}
