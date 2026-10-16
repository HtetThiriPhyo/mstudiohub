import type { ReactNode } from "react";
import { AlertTriangle, Loader2, PackageOpen } from "lucide-react";
import { SecondaryButton } from "./Buttons";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-muted"
      role="status"
    >
      <Loader2 className="animate-spin text-teal" size={32} />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <PackageOpen size={40} className="text-teal/60" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="max-w-sm text-sm text-muted">{message}</p>
      {action}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <AlertTriangle size={40} className="text-danger" />
      <h3 className="text-lg font-bold">Something went wrong</h3>
      <p className="text-sm text-muted">
        We could not load this content. Please try again.
      </p>
      {onRetry && <SecondaryButton onClick={onRetry}>Retry</SecondaryButton>}
    </div>
  );
}
