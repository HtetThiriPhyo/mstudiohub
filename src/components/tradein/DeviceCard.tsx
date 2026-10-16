import { Check } from "lucide-react";
import type { TradeDevice } from "../../types/tradein";
import { formatMMK } from "../../utils/format";

export default function DeviceCard({
  device,
  selected,
  onSelect,
}: {
  device: TradeDevice;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={`glass relative flex flex-col p-4 text-left transition ${selected ? "ring-2 ring-[#005278]" : ""}`}
    >
      {selected && (
        <span className="absolute right-3 top-3 rounded-full bg-[#005278] p-1 text-white">
          <Check size={14} />
        </span>
      )}
      <img
        src={device.image}
        alt={device.name}
        className="h-28 w-full rounded-2xl bg-white/60 object-contain p-2"
      />
      <h3 className="mt-3 font-bold leading-snug">{device.name}</h3>
      <p className="text-xs text-muted">{device.category}</p>
      <p className="mt-1 text-sm font-bold text-[#005278]">
        From {formatMMK(device.baseValue)}
      </p>
    </button>
  );
}
