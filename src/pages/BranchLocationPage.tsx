import { MapPin, Phone } from "lucide-react";
import { PrimaryButton } from "../components/ui/Buttons";
import { branches } from "../data/mock";
import { useAppStore } from "../store/useAppStore";

export default function BranchLocationPage() {
  const toast = useAppStore((s) => s.toast);
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
        Branch Location
      </h1>
      <div className="flex flex-col gap-4">
        {branches.map((b) => (
          <div key={b.id} className="glass p-5">
            <h2 className="font-bold">{b.name}</h2>
            <p className="mt-1 flex items-start gap-2 text-sm text-muted">
              <MapPin size={16} className="mt-0.5 text-teal" /> {b.address}
            </p>
            <p className="mt-1 text-sm text-muted">Hours: {b.hours}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <Phone size={16} className="text-teal" /> {b.phone}
            </p>
            <PrimaryButton
              className="mt-4"
              onClick={() => toast("Opening map (mock)", "info")}
            >
              View on Map
            </PrimaryButton>
          </div>
        ))}
      </div>
    </div>
  );
}
