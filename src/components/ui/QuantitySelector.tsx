import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  qty,
  onChange,
  min = 1,
  max = 99,
}: {
  qty: number;
  onChange: (q: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/60 px-2 py-1 backdrop-blur-md shadow-glass">
      <button
        aria-label="Decrease quantity"
        className="rounded-full p-2 hover:bg-navy/5 min-h-[36px] min-w-[36px]"
        onClick={() => onChange(Math.max(min, qty - 1))}
      >
        <Minus size={16} />
      </button>
      <span className="min-w-[20px] text-center font-bold">{qty}</span>
      <button
        aria-label="Increase quantity"
        className="rounded-full p-2 hover:bg-navy/5 min-h-[36px] min-w-[36px]"
        onClick={() => onChange(Math.min(max, qty + 1))}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
