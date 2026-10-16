import { formatMMK } from "../../utils/format";
import type { ValuationResult } from "../../types/tradein";

export default function ValuationBreakdown({
  result,
}: {
  result: ValuationResult;
}) {
  return (
    <div className="glass p-5">
      <h3 className="mb-3 font-bold">Valuation Breakdown</h3>
      {result.breakdown.length === 0 ? (
        <p className="text-sm text-muted">
          Base value applied. No adjustments.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5 text-sm">
          {result.breakdown.map((b) => (
            <li key={b.label} className="flex justify-between">
              <span className="text-muted">{b.label}</span>
              <span
                className={`font-semibold ${b.delta >= 0 ? "text-success" : "text-danger"}`}
              >
                {b.delta >= 0 ? "+" : ""}
                {formatMMK(b.delta)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
