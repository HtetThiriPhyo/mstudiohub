import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileMenuRow({
  icon: Icon,
  label,
  description,
  to,
}: {
  icon: LucideIcon;
  label: string;
  description?: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-white/70 focus-visible:bg-white/70"
    >
      <span className="rounded-xl bg-teal/10 p-2.5 text-teal">
        <Icon size={18} />
      </span>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      <ChevronRight size={18} className="text-muted" />
    </Link>
  );
}
