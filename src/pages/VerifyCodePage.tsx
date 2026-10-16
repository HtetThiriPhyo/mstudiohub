import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "../components/AppLogo";
import { PrimaryButton } from "../components/ui/Buttons";
import { useAppStore } from "../store/useAppStore";

export default function VerifyCodePage() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const toast = useAppStore((s) => s.toast);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(59);
  const [error, setError] = useState("");
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const update = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => d.map((x, idx) => (idx === i ? clean : x)));
    if (clean && i < 3) refs.current[i + 1]?.focus();
  };

  const verify = () => {
    if (digits.join("").length === 4) {
      login();
      toast("Phone verified");
      navigate("/home");
    } else {
      setError("Enter the 4-digit code");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <AppLogo />
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight">
          Verify Code
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter the 4-digit code sent to your phone.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              aria-label={`Digit ${i + 1}`}
              inputMode="numeric"
              value={d}
              onChange={(e) => update(i, e.target.value)}
              className="h-14 w-14 rounded-2xl border border-navy/10 bg-white/70 text-center text-xl font-bold backdrop-blur focus:border-teal focus:outline-none"
            />
          ))}
        </div>
        {error && (
          <p className="mt-3 text-sm font-semibold text-danger">{error}</p>
        )}

        <p className="mt-6 text-sm text-muted">
          {seconds > 0 ? (
            `Resend code in 00:${String(seconds).padStart(2, "0")}`
          ) : (
            <button
              className="font-bold text-teal"
              onClick={() => {
                setSeconds(59);
                toast("Code resent", "info");
              }}
            >
              Resend code
            </button>
          )}
        </p>

        <PrimaryButton className="mt-8 w-full" onClick={verify}>
          Verify
        </PrimaryButton>
        <p className="mt-3 text-xs text-muted">Mock: any 4 digits work.</p>
      </div>
    </div>
  );
}
