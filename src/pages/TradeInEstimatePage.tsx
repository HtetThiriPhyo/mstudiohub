import { Link, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import ValuationBreakdown from "../components/tradein/ValuationBreakdown";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { useTradeInStore } from "../store/useTradeInStore";
import { estimateValue } from "../utils/valuation";
import { formatMMK } from "../utils/format";
import { useAppStore } from "../store/useAppStore";

export default function TradeInEstimatePage() {
  const navigate = useNavigate();
  const toast = useAppStore((s) => s.toast);
  const { device, options, answers, setPayout, submitRequest } =
    useTradeInStore();

  if (!device) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">No device selected.</p>
        <Link
          to="/trade-in/device"
          className="mt-3 inline-block font-bold text-[#005278]"
        >
          Choose a device
        </Link>
      </div>
    );
  }

  const result = estimateValue(device.baseValue, options, answers);

  const payoutAndGo = (method: "Store Credit" | "Wallet Credit") => {
    setPayout(method);
    submitRequest(result.value);
    toast(`Payout method set to ${method} (mock)`, "info");
    navigate("/trade-in/confirmation");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-extrabold tracking-tight">Your Estimate</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <div className="glass p-6">
            <div className="flex gap-4">
              <img
                src={device.image}
                alt={device.name}
                className="h-24 w-24 rounded-2xl bg-white/60 object-contain p-2"
              />
              <div>
                <h2 className="text-xl font-extrabold">{device.name}</h2>
                <p className="text-sm text-muted">
                  {options.storage} · {options.color} · {options.sim} · Battery{" "}
                  {options.battery}
                </p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
              {Object.entries(answers).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[#005278]/5 p-2">
                  <dt className="capitalize">{k}</dt>
                  <dd className="font-bold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ValuationBreakdown result={result} />

          <p className="text-center text-xs text-muted">
            Estimated value only. Final value may change after physical
            inspection.
          </p>
          <Link
            to="/trade-in/device"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#005278]"
          >
            <Pencil size={14} /> Edit Details
          </Link>
        </div>

        <aside className="glass-dark h-fit p-6 md:sticky md:top-24">
          <p className="text-xs uppercase tracking-widest text-white/60">
            Estimated trade-in value
          </p>
          <p className="mt-1 text-4xl font-extrabold">
            {formatMMK(result.value)}
          </p>
          <p className="text-xs text-white/60">Estimated value only</p>

          {result.ineligible ? (
            <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm">
              <p className="font-bold">Not eligible for trade-in</p>
              <p className="mt-1 text-white/70">{result.reason}</p>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-3">
              <PrimaryButton
                className="w-full"
                onClick={() => payoutAndGo("Store Credit")}
              >
                Use for Store Purchase
              </PrimaryButton>
              <SecondaryButton
                className="w-full"
                onClick={() => payoutAndGo("Wallet Credit")}
              >
                Add to M STUDIO Wallet
              </SecondaryButton>
              <PrimaryButton
                className="w-full"
                onClick={() => {
                  submitRequest(result.value);
                  navigate("/trade-in/confirmation");
                }}
              >
                Submit Trade-in Request
              </PrimaryButton>
              <p className="text-center text-[11px] text-white/60">
                This is a frontend demo. No real credit or payment has been
                processed.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
