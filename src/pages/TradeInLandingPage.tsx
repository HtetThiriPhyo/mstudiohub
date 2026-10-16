import { Link } from "react-router-dom";
import { ChevronRight, Smartphone } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";

export default function TradeInLandingPage() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6">
      <div className="glass-dark p-8 text-center">
        <Smartphone size={40} className="mx-auto text-sky-200" />
        <h1 className="mt-4 text-3xl font-extrabold">
          Trade in your old device
        </h1>
        <p className="mt-2 text-white/70">
          Get an estimated value for your device.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/trade-in/device">
            <PrimaryButton className="w-full sm:w-auto">
              Start Trade-in
            </PrimaryButton>
          </Link>
          <Link to="/trade-in/history">
            <SecondaryButton className="w-full sm:w-auto">
              View Trade-in History
            </SecondaryButton>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          "Choose your device",
          "Tell us about its condition",
          "Get an estimated value",
        ].map((step, i) => (
          <div key={step} className="glass p-5 text-center">
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#005278] font-bold text-white">
              {i + 1}
            </span>
            <p className="mt-3 text-sm font-bold">{step}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted">
        Estimated value only. Final value may change after physical inspection.
      </p>

      <Link
        to="/trade-in/device"
        className="mx-auto flex items-center gap-1 text-sm font-bold text-[#005278]"
      >
        Get started <ChevronRight size={16} />
      </Link>
    </div>
  );
}
