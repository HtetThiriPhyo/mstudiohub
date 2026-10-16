import { Bell, Gift, PackageCheck, TrendingUp, Megaphone } from "lucide-react";
import type { Notification } from "../types";
import { classNames } from "../utils/format";

const icons = [Bell, Gift, PackageCheck, TrendingUp, Megaphone];

export default function NotificationItem({
  n,
  index,
  onRead,
}: {
  n: Notification;
  index: number;
  onRead: (id: string) => void;
}) {
  const Icon = icons[index % icons.length];
  return (
    <button
      onClick={() => onRead(n.id)}
      className={classNames(
        "flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-[#005278]/5",
        !n.read && "border border-[#005278]/[0.08] bg-[#005278]/[0.08]",
      )}
    >
      <span className="mt-0.5 rounded-xl bg-[#005278]/10 p-2.5 text-[#005278]">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#0B0F14]">{n.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#667085]">
          {n.body}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#667085]">
          {n.time}
        </p>
      </div>
      {!n.read && (
        <span
          aria-label="Unread"
          className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#005278]"
        />
      )}
    </button>
  );
}
