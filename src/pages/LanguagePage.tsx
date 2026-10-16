import { Check } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function LanguagePage() {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const toast = useAppStore((s) => s.toast);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Language</h1>
      <div className="glass divide-y divide-navy/5 p-2">
        {(["English", "Myanmar"] as const).map((l) => (
          <button
            key={l}
            onClick={() => {
              setLanguage(l);
              toast(`Language set to ${l}`);
            }}
            className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold"
          >
            {l}
            {language === l && <Check size={18} className="text-teal" />}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">
        Current language: <strong>{language}</strong>
      </p>
    </div>
  );
}
