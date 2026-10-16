import { useState } from "react";
import { classNames } from "../utils/format";

const tabs = ["Terms of Service", "Privacy Policy", "Reward Policy"] as const;

const content: Record<(typeof tabs)[number], string[]> = {
  "Terms of Service": [
    "By using M STUDIO Hub you agree to our standard service terms. This mock document outlines acceptable use, account responsibility, and dispute handling for rewards and purchases.",
    "All transactions shown in the demo environment are simulated and do not constitute real purchases or rewards.",
  ],
  "Privacy Policy": [
    "We store only the data needed to run your account experience: profile, cart, wishlist, language, and preferences. No passwords or payment data of any kind are transmitted.",
    "Data is persisted locally in your browser via LocalStorage and is never uploaded to a server in this demo.",
  ],
  "Reward Policy": [
    "Reward MMK balances are promotional credits for demo use. Redeemed rewards expire after 90 days in production policy terms.",
    "Cashback is granted per purchase category and may be adjusted during promotional campaigns.",
  ],
};

export default function TermsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Terms of Service");

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
        Terms &amp; Policies
      </h1>
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={classNames(
              "min-h-[40px] whitespace-nowrap rounded-full border px-4 text-sm font-semibold",
              tab === t
                ? "border-teal bg-teal text-white"
                : "border-navy/10 bg-white/70 text-muted",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="glass space-y-4 p-6 text-sm leading-relaxed text-muted">
        {content[tab].map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
