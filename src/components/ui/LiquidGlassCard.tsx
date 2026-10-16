import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../utils/format";

export default function LiquidGlassCard({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div className={classNames("glass p-5", className)} {...rest}>
      {children}
    </div>
  );
}
