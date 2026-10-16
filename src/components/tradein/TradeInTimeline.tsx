const steps = [
  "Request submitted",
  "Inspection pending",
  "Device inspected",
  "Value confirmed",
  "Credit issued",
];

export default function TradeInTimeline({
  activeStep = 1,
}: {
  activeStep?: number;
}) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          <span
            aria-hidden
            className={`h-4 w-4 rounded-full border-2 ${i < activeStep ? "border-[#005278] bg-[#005278]" : i === activeStep ? "border-[#05314A] bg-[#05314A]" : "border-gray-300 bg-white"}`}
          />
          <span
            className={`text-sm font-semibold ${i <= activeStep ? "text-[#0B0F14]" : "text-gray-400"}`}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}
