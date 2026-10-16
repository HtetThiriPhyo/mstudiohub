import type { Transaction } from "../types";
import { formatMMK } from "../utils/format";

export default function TransactionRow({ tx }: { tx: Transaction }) {
  return (
    <li className="flex items-center justify-between py-3">
      <div>
        <p className="font-semibold">{tx.title}</p>
        <p className="text-xs text-muted">{tx.date}</p>
      </div>
      <p
        className={`font-bold ${tx.type === "in" ? "text-success" : "text-ink"}`}
      >
        {tx.amount > 0 ? "+" : ""}
        {formatMMK(tx.amount)}
      </p>
    </li>
  );
}
