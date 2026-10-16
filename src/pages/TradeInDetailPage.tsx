import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TradeInStatusBadge from "../components/tradein/TradeInStatusBadge";
import TradeInTimeline from "../components/tradein/TradeInTimeline";
import { useTradeInStore } from "../store/useTradeInStore";
import { formatMMK } from "../utils/format";

export default function TradeInDetailPage() {
  const { id } = useParams();
  const history = useTradeInStore((s) => s.history);
  const photos = useTradeInStore((s) => s.photos);
  const record = history.find((h) => h.id === id);

  if (!record) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">Trade-in not found</h1>
        <Link
          to="/trade-in/history"
          className="mt-3 inline-block font-bold text-[#005278]"
        >
          Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/trade-in/history"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted"
      >
        <ArrowLeft size={16} /> History
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">{record.id}</h1>
        <TradeInStatusBadge status={record.status} />
      </div>

      <div className="glass mt-6 p-6">
        <div className="flex items-center gap-4">
          {record.image && (
            <img
              src={record.image}
              alt={record.device}
              className="h-20 w-20 rounded-2xl bg-white/60 object-contain p-2"
            />
          )}
          <div>
            <h2 className="text-xl font-extrabold">{record.device}</h2>
            <p className="text-sm text-muted">
              {record.date} · {record.payout ?? "—"}
            </p>
          </div>
        </div>
        <p className="mt-4 text-3xl font-extrabold text-[#005278]">
          {formatMMK(record.value)}
        </p>
        <p className="text-xs text-muted">Estimated value only</p>

        {record.options && (
          <p className="mt-3 text-sm text-muted">
            {record.options.storage} · {record.options.color} ·{" "}
            {record.options.sim} · Battery {record.options.battery}
          </p>
        )}
      </div>

      {record.answers && Object.keys(record.answers).length > 0 && (
        <div className="glass mt-6 p-6">
          <h3 className="mb-3 font-bold">Condition summary</h3>
          <dl className="grid grid-cols-2 gap-2 text-xs text-muted">
            {Object.entries(record.answers).map(([k, v]) => (
              <div key={k} className="rounded-xl bg-[#005278]/5 p-2">
                <dt className="capitalize">{k}</dt>
                <dd className="font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {photos.length > 0 && (
        <div className="glass mt-6 p-6">
          <h3 className="mb-3 font-bold">Local photo previews</h3>
          <div className="flex flex-wrap gap-3">
            {photos.map((p) => (
              <img
                key={p.id}
                src={p.url}
                alt={`Trade-in device ${p.name}`}
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      )}

      <div className="glass mt-6 p-6">
        <h3 className="mb-4 font-bold">Status timeline</h3>
        <TradeInTimeline
          activeStep={
            record.status === "Pending inspection"
              ? 1
              : record.status === "Completed"
                ? 4
                : record.status === "Approved"
                  ? 3
                  : 1
          }
        />
      </div>
    </div>
  );
}
