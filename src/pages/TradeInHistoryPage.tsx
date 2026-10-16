import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import TradeInStatusBadge from "../components/tradein/TradeInStatusBadge";
import { EmptyState } from "../components/ui/States";
import { useTradeInStore } from "../store/useTradeInStore";
import { formatMMK } from "../utils/format";

const statuses = [
  "All",
  "Draft",
  "Pending inspection",
  "Approved",
  "Value adjusted",
  "Completed",
  "Rejected",
  "Cancelled",
];

export default function TradeInHistoryPage() {
  const history = useTradeInStore((s) => s.history);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(
    () =>
      history.filter(
        (h) =>
          (status === "All" || h.status === status) &&
          (h.device.toLowerCase().includes(query.toLowerCase()) ||
            h.id.toLowerCase().includes(query.toLowerCase())),
      ),
    [history, query, status],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Trade-in History
      </h1>

      <div className="relative mt-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          aria-label="Search trade-ins"
          placeholder="Search by ID or device…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-h-[48px] rounded-2xl border border-[#005278]/15 bg-white/70 pl-11 pr-4 text-sm backdrop-blur-md focus:border-[#005278] focus:outline-none"
        />
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`min-h-[40px] whitespace-nowrap rounded-full border px-4 text-sm font-semibold ${status === s ? "border-[#005278] bg-[#005278] text-white" : "border-[#005278]/15 bg-white/70 text-muted"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No trade-ins found"
          message="Try a different search or filter."
        />
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {filtered.map((h) => (
            <li key={h.id}>
              <Link
                to={`/trade-in/${h.id}`}
                className="glass flex items-center gap-4 p-4"
              >
                {h.image && (
                  <img
                    src={h.image}
                    alt={h.device}
                    className="h-14 w-14 rounded-2xl bg-white/60 object-contain p-1"
                  />
                )}
                <div className="flex-1">
                  <p className="font-bold">{h.device}</p>
                  <p className="text-xs text-muted">
                    {h.id} · {h.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-[#005278]">
                    {formatMMK(h.value)}
                  </p>
                  <TradeInStatusBadge status={h.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
