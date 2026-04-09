import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  viewAllHref?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2 w-[415px]">
        <h2 className="font-serif text-[32px] font-bold leading-[1.2] text-slate-900">
          {title}
        </h2>
        {subtitle && <p className="text-base text-slate-500">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm text-indigo-600 hover:underline px-4 py-2"
        >
          View All
        </Link>
      )}
    </div>
  );
}
