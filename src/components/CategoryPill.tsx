import { classNames } from "../utils/format";

export default function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={classNames(
        "min-h-[40px] whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition",
        active
          ? "border-teal bg-teal text-white"
          : "border-navy/10 bg-white/70 text-muted hover:bg-white",
      )}
    >
      {label}
    </button>
  );
}
