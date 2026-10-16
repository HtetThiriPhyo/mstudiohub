import { Check } from "lucide-react";
import { classNames } from "../../utils/format";

export default function StepIndicator({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="flex items-center gap-2" aria-label="Checkout steps">
      {steps.map((s, i) => (
        <li key={s} className="flex flex-1 items-center gap-2">
          <div
            className={classNames(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
              i <= current ? "bg-teal text-white" : "bg-navy/10 text-muted",
            )}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span
            className={classNames(
              "hidden text-xs font-semibold sm:inline",
              i <= current ? "text-ink" : "text-muted",
            )}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <div
              className={classNames(
                "h-px flex-1",
                i < current ? "bg-teal" : "bg-navy/10",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
