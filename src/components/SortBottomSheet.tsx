import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type SortValue = "default" | "asc" | "desc";

const options: { value: SortValue; label: string }[] = [
  { value: "default", label: "Sort: Default" },
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
];

export default function SortBottomSheet({
  open,
  value,
  onChange,
  onClose,
}: {
  open: boolean;
  value: SortValue;
  onChange: (v: SortValue) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1100]">
          <motion.button
            aria-label="Close sort options"
            className="absolute inset-0 bg-[#05314A]/30 backdrop-blur-md"
            style={{ WebkitBackdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Sort products"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-x-3 bottom-3 mx-auto max-w-md rounded-[30px] border border-white/70 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            style={{
              background: "linear-gradient(160deg, #FDFBF7 0%, #F7F3EA 100%)",
              boxShadow:
                "0 30px 80px rgba(5,49,74,0.35), 0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div
              aria-hidden
              className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-[#05314A]/15"
            />
            <h3 className="mb-2 text-lg font-extrabold tracking-tight text-[#05314A]">
              Sort by
            </h3>
            <ul className="divide-y divide-[#05314A]/[0.07]">
              {options.map((o) => {
                const selected = value === o.value;
                return (
                  <li key={o.value}>
                    <button
                      onClick={() => {
                        onChange(o.value);
                        onClose();
                      }}
                      aria-pressed={selected}
                      className="flex w-full items-center gap-4 py-4 text-left transition hover:bg-[#05314A]/[0.03]"
                    >
                      <span
                        aria-hidden
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${selected ? "border-[#B08D3E]" : "border-[#05314A]/25"}`}
                      >
                        <motion.span
                          initial={false}
                          animate={{ scale: selected ? 1 : 0 }}
                          transition={{ duration: 0.18 }}
                          className="h-2.5 w-2.5 rounded-full bg-[#B08D3E]"
                        />
                      </span>
                      <span
                        className={`text-[15px] ${selected ? "font-extrabold text-[#05314A]" : "font-medium text-[#05314A]/70"}`}
                      >
                        {o.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
