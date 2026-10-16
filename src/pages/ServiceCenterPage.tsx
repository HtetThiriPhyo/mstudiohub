import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PrimaryButton } from "../components/ui/Buttons";
import { useAppStore } from "../store/useAppStore";

const faqs = [
  {
    q: "How do I earn reward MMK?",
    a: "Earn cashback on Apple purchases, trade-ins, and partner promotions credited to your M STUDIO Wallet.",
  },
  {
    q: "How do I use installments?",
    a: "Choose an installment plan labelled product at checkout and select the Installment Plan payment option.",
  },
  {
    q: "Can I transfer reward MMK?",
    a: "Yes — use the Transfer action on your Wallet or Home page to send rewards to another account.",
  },
];

export default function ServiceCenterPage() {
  const toast = useAppStore((s) => s.toast);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
        Service Center
      </h1>
      <div className="glass divide-y divide-navy/5 p-2">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between px-3 py-4 text-left font-semibold"
            >
              {f.q}
              <ChevronDown
                size={18}
                className={`transition ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <p className="px-3 pb-4 text-sm text-muted">{f.a}</p>
            )}
          </div>
        ))}
      </div>
      <div className="glass mt-6 p-6 text-center">
        <h2 className="font-bold">Still need help?</h2>
        <p className="mt-1 text-sm text-muted">
          Mon–Sun, 9:00 AM – 9:00 PM, Yangon time.
        </p>
        <PrimaryButton
          className="mt-4"
          onClick={() => toast("Connecting to support (mock)", "info")}
        >
          Contact Support
        </PrimaryButton>
      </div>
    </div>
  );
}
