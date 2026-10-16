import { Link } from "react-router-dom";
import { Award, QrCode } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { formatMMK } from "../utils/format";

export default function RewardBalanceCard({ onScan }: { onScan?: () => void }) {
  const balance = useAppStore((s) => s.balance);
  const purchases = useAppStore((s) => s.purchases);

  return (
    <div className="glass-dark relative overflow-hidden p-6">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-light/30 blur-2xl" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/60">
            Balance
          </p>
          <p className="mt-1 text-3xl font-extrabold md:text-4xl">
            {formatMMK(balance)}
          </p>
        </div>
        <button
          onClick={onScan}
          aria-label="Scan QR code"
          className="rounded-2xl bg-white/10 p-3 hover:bg-white/20"
        >
          <QrCode size={20} />
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="chip bg-white/15 text-white">
            <Award size={14} /> Silver
          </span>
          <span className="text-xs text-white/70">{purchases} Purchases</span>
        </div>
        <Link
          to="/wallet"
          className="text-xs font-bold text-sky-200 hover:underline"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
}
