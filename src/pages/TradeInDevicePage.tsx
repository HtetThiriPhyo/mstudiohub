import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import DeviceCard from "../components/tradein/DeviceCard";
import DeviceOptionSelector from "../components/tradein/DeviceOptionSelector";
import CategoryPill from "../components/CategoryPill";
import { PrimaryButton } from "../components/ui/Buttons";
import { tradeDevices } from "../data/tradeIn";
import { useTradeInStore } from "../store/useTradeInStore";

const categories = ["iPhone", "iPad", "Mac", "Apple Watch", "Other"] as const;

export default function TradeInDevicePage() {
  const navigate = useNavigate();
  const device = useTradeInStore((s) => s.device);
  const setDevice = useTradeInStore((s) => s.setDevice);
  const options = useTradeInStore((s) => s.options);
  const setOptions = useTradeInStore((s) => s.setOptions);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("iPhone");

  const filtered = useMemo(
    () =>
      tradeDevices.filter(
        (d) =>
          (category === "Other"
            ? d.category === "Other"
            : d.category === category) &&
          d.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/trade-in"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-extrabold tracking-tight">
        What device are you trading in?
      </h1>

      <div className="relative mt-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          aria-label="Search devices"
          placeholder="Search devices…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-h-[48px] rounded-2xl border border-[#005278]/15 bg-white/70 pl-11 pr-4 text-sm backdrop-blur-md focus:border-[#005278] focus:outline-none"
        />
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <CategoryPill
            key={c}
            label={c}
            active={category === c}
            onClick={() => setCategory(c)}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {filtered.map((d) => (
          <DeviceCard
            key={d.id}
            device={d}
            selected={device?.id === d.id}
            onSelect={() => setDevice(d)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-muted">
          No devices match your search.
        </p>
      )}

      {device && (
        <div className="glass mt-8 flex flex-col gap-5 p-6">
          <h2 className="text-lg font-bold">{device.name} details</h2>
          <DeviceOptionSelector
            label="Storage"
            options={["128 GB", "256 GB", "512 GB", "1 TB"]}
            value={options.storage}
            onChange={(v) => setOptions({ storage: v })}
          />
          <DeviceOptionSelector
            label="Color"
            options={[
              "Deep Blue",
              "Silver",
              "Black",
              "Natural Titanium",
              "Pink",
            ]}
            value={options.color}
            onChange={(v) => setOptions({ color: v })}
          />
          <DeviceOptionSelector
            label="SIM type"
            options={["Physical SIM", "eSIM", "Dual SIM", "Not sure"]}
            value={options.sim}
            onChange={(v) => setOptions({ sim: v })}
          />
          <DeviceOptionSelector
            label="Battery health"
            options={["90% or above", "80–89%", "Below 80%", "Not sure"]}
            value={options.battery}
            onChange={(v) => setOptions({ battery: v })}
          />
          <PrimaryButton onClick={() => navigate("/trade-in/condition")}>
            Continue
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
