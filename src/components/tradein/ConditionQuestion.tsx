export default function ConditionQuestion({
  question,
  options,
  value,
  error,
  onChange,
}: {
  id: string;
  question: string;
  options: string[];
  value?: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-bold">{question}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold transition ${value === o ? "border-[#005278] bg-[#005278] text-white" : "border-[#005278]/15 bg-white/70 text-muted hover:bg-white"}`}
          >
            {o}
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1 text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
