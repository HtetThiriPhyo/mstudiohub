import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Briefcase, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import RewardBalanceCard from "../components/RewardBalanceCard";
import RewardCard from "../components/RewardCard";
import TransactionRow from "../components/TransactionRow";
import PromoCarousel from "../components/PromoCarousel";
import GlassModal from "../components/ui/GlassModal";
import QRScanModal from "../components/QRScanModal";
import { PrimaryButton } from "../components/ui/Buttons";
import { banners, rewards, transactions } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

const actions = [
  { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
  { id: "tradein", label: "Trade-in Calculator", icon: Calculator },
  { id: "business", label: "Business", icon: Briefcase },
];

export default function HomePage() {
  const user = useAppStore((s) => s.user);
  const navigate = useNavigate();
  const toast = useAppStore((s) => s.toast);
  const [qrOpen, setQrOpen] = useState(false);
  const [actionModal, setActionModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-xl font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted">Good Morning,</p>
          <h1 className="text-xl font-extrabold tracking-tight">{user.name}</h1>
        </div>
      </header>

      <RewardBalanceCard onScan={() => setQrOpen(true)} />

      <section>
        <h2 className="mb-3 text-lg font-bold">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((a) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={a.id}
              onClick={() =>
                a.id === "tradein"
                  ? navigate("/trade-in")
                  : setActionModal(a.id)
              }
              className="glass flex flex-col items-center gap-2 p-4 text-sm font-semibold"
            >
              <span className="rounded-2xl bg-teal/10 p-3 text-teal">
                <a.icon size={20} />
              </span>
              {a.label}
            </motion.button>
          ))}
        </div>
      </section>

      <section>
        <PromoCarousel banners={banners} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Featured Reward</h2>
          <button
            onClick={() => toast("All rewards listed (mock)", "info")}
            className="text-sm font-bold text-teal"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {rewards.map((r) => (
            <RewardCard key={r.id} reward={r} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent History</h2>
          <button
            onClick={() => toast("Full history (mock)", "info")}
            className="text-sm font-bold text-teal"
          >
            View All
          </button>
        </div>
        <ul className="glass divide-y divide-navy/5 p-5">
          {transactions.slice(0, 4).map((t) => (
            <TransactionRow key={t.id} tx={t} />
          ))}
        </ul>
      </section>

      <QRScanModal open={qrOpen} onClose={() => setQrOpen(false)} />
      <GlassModal
        open={actionModal !== null}
        onClose={() => setActionModal(null)}
        title={actions.find((a) => a.id === actionModal)?.label}
      >
        <p className="text-sm text-muted">
          This is a mock {actionModal} flow. No real transaction is processed.
        </p>
        <PrimaryButton
          className="mt-4 w-full"
          onClick={() => {
            setActionModal(null);
            toast("Action completed (mock)");
          }}
        >
          Confirm
        </PrimaryButton>
      </GlassModal>
    </div>
  );
}
