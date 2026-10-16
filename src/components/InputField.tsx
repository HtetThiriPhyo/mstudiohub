import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, id, ...rest }: InputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </span>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full min-h-[48px] rounded-2xl border bg-white/60 px-4 text-sm backdrop-blur-md transition focus:border-teal focus:outline-none ${error ? "border-danger" : "border-white/60"}`}
        {...rest}
      />
      {error && (
        <span
          id={`${id}-err`}
          className="mt-1 block text-xs font-semibold text-danger"
        >
          {error}
        </span>
      )}
    </label>
  );
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  function PasswordInput({ label, error, id, ...rest }, ref) {
    const [show, setShow] = useState(false);
    return (
      <label className="block">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
          {label}
        </span>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={show ? "text" : "password"}
            aria-invalid={!!error}
            className={`w-full min-h-[48px] rounded-2xl border bg-white/60 px-4 pr-12 text-sm backdrop-blur-md transition focus:border-teal focus:outline-none ${error ? "border-danger" : "border-white/60"}`}
            {...rest}
          />
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted hover:bg-navy/5"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && (
          <span className="mt-1 block text-xs font-semibold text-danger">
            {error}
          </span>
        )}
      </label>
    );
  },
);
