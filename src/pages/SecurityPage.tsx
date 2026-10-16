import { PrimaryButton } from "../components/ui/Buttons";
import { useAppStore } from "../store/useAppStore";

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-teal" : "bg-navy/15"}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </label>
  );
}

export default function SecurityPage() {
  const biometric = useAppStore((s) => s.biometric);
  const pushEnabled = useAppStore((s) => s.pushEnabled);
  const setBiometric = useAppStore((s) => s.setBiometric);
  const setPushEnabled = useAppStore((s) => s.setPushEnabled);
  const toast = useAppStore((s) => s.toast);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
        Security &amp; Privacy
      </h1>
      <div className="glass p-6">
        <h2 className="font-bold">Password</h2>
        <p className="mb-4 text-sm text-muted">Last changed 3 months ago.</p>
        <PrimaryButton
          onClick={() => toast("Password change link sent (mock)")}
        >
          Change Password
        </PrimaryButton>

        <div className="mt-6 divide-y divide-navy/5 border-t border-navy/5">
          <Toggle
            label="Biometric Login"
            description="Use Face ID / fingerprint to sign in"
            checked={biometric}
            onChange={setBiometric}
          />
          <Toggle
            label="Push Notifications"
            description="Order updates, promotions, rewards"
            checked={pushEnabled}
            onChange={setPushEnabled}
          />
          <Toggle
            label="Personalized Offers"
            description="Use my activity to improve recommendations"
            checked={pushEnabled}
            onChange={setPushEnabled}
          />
        </div>
      </div>
    </div>
  );
}
