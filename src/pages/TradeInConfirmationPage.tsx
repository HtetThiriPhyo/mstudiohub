import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { useTradeInStore } from "../store/useTradeInStore";
import { formatMMK } from "../utils/format";

export default function TradeInConfirmationPage() {
  const { device, payout, requestId, history } = useTradeInStore();
  const record = history.find((h) => h.id === requestId) ?? history[0];

  return (
    <div className="mx-auto max-w-xl">
      <div className="glass p-8 text-center">
        <CheckCircle2 size={52} className="mx-auto text-success" />
        <h1 className="mt-4 text-2xl font-extrabold">
          Trade-in request submitted
        </h1>
        <p className="mt-2 rounded-2xl bg-[#005278]/5 py-3 font-bold">
          {record?.id ?? "TRADE-DEMO-000123"}
        </p>
        <dl className="mt-4 space-y-1 text-sm text-muted">
          <div>
            Device:{" "}
            <strong className="text-ink">
              {device?.name ?? record?.device ?? "—"}
            </strong>
          </div>
          <div>
            Estimated value:{" "}
            <strong className="text-ink">
              {formatMMK(record?.value ?? 0)}
            </strong>
          </div>
          <div>
            Payout method:{" "}
            <strong className="text-ink">
              {payout ?? record?.payout ?? "—"}
            </strong>
          </div>
          <div>
            Status:{" "}
            <strong className="text-[#005278]">
              {record?.status ?? "Pending inspection"}
            </strong>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted">
          Frontend-only demo. No real request has been sent.
        </p>
      </div>

      <div className="glass mt-6 p-6">
        <h2 className="font-bold">Next steps</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>Review your device details</li>
          <li>Contact an M STUDIO branch</li>
          <li>Confirm the final value manually</li>
        </ol>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link to={record ? `/trade-in/${record.id}` : "/trade-in/history"}>
          <PrimaryButton className="w-full">View Trade-in Status</PrimaryButton>
        </Link>
        <Link to="/trade-in/history">
          <SecondaryButton className="w-full">
            View Trade-in History
          </SecondaryButton>
        </Link>
        <Link to="/home">
          <SecondaryButton className="w-full">Back to Home</SecondaryButton>
        </Link>
        <Link to="/store">
          <PrimaryButton className="w-full">Continue Shopping</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
