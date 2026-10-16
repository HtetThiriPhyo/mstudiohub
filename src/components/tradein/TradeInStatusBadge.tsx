const colors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600",
  "Pending inspection": "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  "Value adjusted": "bg-blue-100 text-blue-700",
  Completed: "bg-[#005278]/10 text-[#005278]",
  Rejected: "bg-red-100 text-red-600",
  Cancelled: "bg-gray-200 text-gray-600",
};

export default function TradeInStatusBadge({
  status,
}: {
  status: keyof typeof colors | string;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${colors[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}
