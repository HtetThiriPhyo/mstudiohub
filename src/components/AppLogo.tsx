import { classNames } from "../utils/format";

export default function AppLogo({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const box =
    size === "lg"
      ? "h-16 w-16 rounded-2xl text-3xl"
      : size === "sm"
        ? "h-9 w-9 rounded-xl text-base"
        : "h-12 w-12 rounded-2xl text-xl";
  return (
    <div className="flex items-center gap-3">
      <div
        className={classNames(
          "flex items-center justify-center bg-teal font-black text-white shadow-soft",
          box,
        )}
      >
        M
      </div>
      {size !== "sm" && (
        <div>
          <p className="text-lg font-extrabold leading-tight tracking-tight">
            M STUDIO Hub
          </p>
          <p className="text-[11px] text-muted">
            Get or Track Cashback &amp; Redeem
          </p>
        </div>
      )}
    </div>
  );
}
