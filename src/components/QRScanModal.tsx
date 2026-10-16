import GlassModal from "./ui/GlassModal";
import { useAppStore } from "../store/useAppStore";

export default function QRScanModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const toast = useAppStore((s) => s.toast);
  return (
    <GlassModal open={open} onClose={onClose} title="Scan QR Code">
      <div className="flex flex-col items-center gap-4">
        <div className="grid h-48 w-48 place-items-center rounded-3xl border-2 border-dashed border-teal/50 bg-teal/5">
          <div className="h-28 w-28 rounded-xl border-4 border-teal/70" />
        </div>
        <p className="text-sm text-muted">
          Point your camera at an M STUDIO QR code.
        </p>
        <button
          className="min-h-[44px] rounded-2xl bg-teal px-6 py-3 text-sm font-semibold text-white"
          onClick={() => {
            onClose();
            toast("QR scanned successfully (mock)");
          }}
        >
          Simulate Scan
        </button>
      </div>
    </GlassModal>
  );
}
