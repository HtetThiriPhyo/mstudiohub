import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export default function ToastHost() {
  const toasts = useAppStore((s) => s.toasts);
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[60] flex w-[90%] max-w-sm -translate-x-1/2 flex-col gap-2 md:bottom-8">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-navy px-4 py-3 text-sm text-white shadow-glass"
            role="status"
          >
            {t.kind === "success" && (
              <CheckCircle2 size={18} className="text-emerald-300" />
            )}
            {t.kind === "info" && <Info size={18} className="text-sky-300" />}
            {t.kind === "error" && (
              <XCircle size={18} className="text-red-300" />
            )}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
