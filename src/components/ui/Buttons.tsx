import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";
import { motion } from "framer-motion";
import { classNames } from "../../utils/format";

const base =
  "inline-flex items-center justify-center gap-2 min-h-[44px] rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-teal disabled:opacity-50 disabled:cursor-not-allowed";

export function PrimaryButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={classNames(
        base,
        "border border-white/15 bg-[#05314A] text-white shadow-soft transition-all hover:bg-[#005278] hover:shadow-[0_8px_24px_rgba(0,82,120,0.24)] focus-visible:ring-4 focus-visible:ring-[#005278]/40",
        className,
      )}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

export function SecondaryButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classNames(
        base,
        "border border-white/50 bg-white/60 text-navy shadow-glass backdrop-blur-md hover:bg-white/80",
        className,
      )}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

export function GlassButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={classNames(
        base,
        "glass !rounded-2xl hover:bg-white/90",
        className,
      )}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
