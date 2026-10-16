import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import NotificationPanel from "./NotificationPanel";

export default function NotificationBell() {
  const notifications = useAppStore((s) => s.notifications);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        const panel = document.querySelector('[aria-label="Notifications"]');
        if (panel && panel.contains(e.target as Node)) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        aria-label={`Notifications, ${unread} unread`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative min-h-[44px] min-w-[44px] rounded-full border border-[#005278]/10 bg-white/70 p-2.5 backdrop-blur hover:bg-white"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#D64545]" />
        )}
      </button>
      <NotificationPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
