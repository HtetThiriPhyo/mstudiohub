import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftRight,
  History,
  QrCode,
  Gift,
  RefreshCcw,
} from "lucide-react";
import RewardBalanceCard from "../components/RewardBalanceCard";
import MembershipProgressCard from "../components/MembershipProgressCard";
import TransactionRow from "../components/TransactionRow";
import QRScanModal from "../components/QRScanModal";
import GlassModal from "../components/ui/GlassModal";
import { PrimaryButton } from "../components/ui/Buttons";
import { LoadingState, EmptyState, ErrorState } from "../components/ui/States";
import { transactions } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

const actions = [
  { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
  { id: "scan", label: "Scan QR", icon: QrCode },
  { id: "redeem", label: "Redeem Reward", icon: Gift },
  { id: "tradein", label: "Trade-in Value", icon: RefreshCcw },
  { id: "history", label: "View History", icon: History },
];

export default function WalletPage() {
  const toast = useAppStore((s) => s.toast);
  const [qrOpen, setQrOpen] = useState(false);
  const navigate = useNavigate();
  const [transferOpen, setTransferOpen] = useState(false);
  const [status, setStatus] = useState<"ok" | "loading" | "empty" | "error">(
    "ok",
  );

  const handleAction = (id: string) => {
    if (id === "scan") setQrOpen(true);
    else if (id === "transfer") setTransferOpen(true);
    else if (id === "redeem") toast("Reward redeemed (mock)");
    else if (id === "tradein") navigate("/trade-in");
    else if (id === "history") setStatus("empty");
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal">
          Real Rewards
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight">Wallet</h1>
      </header>

      <RewardBalanceCard onScan={() => setQrOpen(true)} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {actions.map((a) => (
          <button
            key={a.id}
            onClick={() => handleAction(a.id)}
            className="glass flex flex-col items-center gap-2 p-4 text-sm font-semibold"
          >
            <span className="rounded-2xl bg-teal/10 p-3 text-teal">
              <a.icon size={20} />
            </span>
            {a.label}
          </button>
        ))}
      </div>

      <MembershipProgressCard />

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">Transactions</h2>
          <div className="flex gap-1 text-xs">
            <button
              className="rounded-full border border-navy/10 px-3 py-1"
              onClick={() => setStatus("loading")}
            >
              Loading
            </button>
            <button
              className="rounded-full border border-navy/10 px-3 py-1"
              onClick={() => setStatus("empty")}
            >
              Empty
            </button>
            <button
              className="rounded-full border border-navy/10 px-3 py-1"
              onClick={() => setStatus("error")}
            >
              Error
            </button>
            <button
              className="rounded-full border border-navy/10 px-3 py-1"
              onClick={() => setStatus("ok")}
            >
              Reset
            </button>
          </div>
        </div>
        {status === "loading" && <LoadingState label="Loading transactions…" />}
        {status === "error" && <ErrorState onRetry={() => setStatus("ok")} />}
        {status === "empty" && (
          <EmptyState
            title="No transactions yet"
            message="Your reward activity will appear here."
          />
        )}
        {status === "ok" && (
          <ul className="glass divide-y divide-navy/5 p-5">
            {transactions.map((t) => (
              <TransactionRow key={t.id} tx={t} />
            ))}
          </ul>
        )}
      </section>

      <QRScanModal open={qrOpen} onClose={() => setQrOpen(false)} />
      <GlassModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        title="Transfer Reward"
      >
        <p className="text-sm text-muted">
          Transfer mock MMK rewards to another M STUDIO account.
        </p>
        <PrimaryButton
          className="mt-4 w-full"
          onClick={() => {
            setTransferOpen(false);
            toast("Transfer completed (mock)");
          }}
        >
          Confirm Transfer
        </PrimaryButton>
      </GlassModal>
    </div>
  );
}
