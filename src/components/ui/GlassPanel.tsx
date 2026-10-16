import type { ReactNode } from "react";
import { classNames } from "../../utils/format";

export default function GlassPanel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames(
        "isolation-isolate rounded-3xl border shadow-glass",
        "border-white/70 bg-gradient-to-br from-white/90 to-[#F4F7FA]/80",
        "backdrop-blur-[24px] backdrop-saturate-150",
        className,
      )}
      style={{
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        boxShadow:
          "0 24px 70px rgba(5,49,74,0.22), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {children}
    </div>
  );
}
