import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const notifications = useAppStore((s) => s.notifications);
  const markAllRead = useAppStore((s) => s.markAllRead);
  const markOneRead = useAppStore((s) => s.markOneRead);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("notification-open");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("notification-open");
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="notification-layer">
          <motion.button
            aria-label="Close notifications"
            className="notification-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-title"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2 }}
            className="notification-panel"
          >
            <div className="notification-panel-content">
              <div className="flex items-center justify-between border-b border-[#005278]/10 px-4 py-4">
                <div>
                  <h3
                    id="notification-title"
                    className="text-base font-extrabold text-[#0B0F14]"
                  >
                    Notifications
                  </h3>
                  <p className="text-xs text-[#667085]">{unread} unread</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAllRead}
                    className="min-h-[40px] rounded-full bg-[#05314A] px-4 text-xs font-bold text-white hover:bg-[#005278]"
                  >
                    Mark all as read
                  </button>
                  <button
                    aria-label="Close notifications"
                    onClick={onClose}
                    className="min-h-[40px] min-w-[40px] rounded-full p-2 text-[#05314A] hover:bg-[#005278]/5"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-[#005278]/[0.06]">
                {notifications.map((n, i) => (
                  <NotificationItem
                    key={n.id}
                    n={n}
                    index={i}
                    onRead={markOneRead}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
