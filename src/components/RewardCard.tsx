import { Plus } from "lucide-react";
import type { Reward } from "../types";
import { formatMMK } from "../utils/format";
import { motion } from "framer-motion";
import { useAppStore } from "../store/useAppStore";

export default function RewardCard({ reward }: { reward: Reward }) {
  const toast = useAppStore((s) => s.toast);
  return (
    <motion.div whileHover={{ y: -4 }} className="glass overflow-hidden p-0">
      <img
        src={reward.image}
        alt={reward.title}
        className="h-32 w-full object-contain bg-gradient-to-b from-white to-slate-100 p-2"
        loading="lazy"
      />
      <div className="flex items-center justify-between gap-2 p-4">
        <div>
          <h4 className="font-bold">{reward.title}</h4>
          <p className="text-sm text-teal font-semibold">
            {formatMMK(reward.price)}
          </p>
        </div>
        <button
          aria-label={`Redeem ${reward.title}`}
          onClick={() => toast(`${reward.title} redeemed (mock)`)}
          className="rounded-full bg-teal p-2.5 text-white hover:bg-teal-dark"
        >
          <Plus size={16} />
        </button>
      </div>
    </motion.div>
  );
}
