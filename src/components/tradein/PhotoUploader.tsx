import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { useTradeInStore } from "../../store/useTradeInStore";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

export default function PhotoUploader() {
  const photos = useTradeInStore((s) => s.photos);
  const addPhotos = useTradeInStore((s) => s.addPhotos);
  const removePhoto = useTradeInStore((s) => s.removePhoto);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => ACCEPT.includes(f.type));
    if (valid.length !== files.length)
      setError("Only JPG, PNG, and WEBP files are allowed.");
    else setError("");
    if (photos.length + valid.length > 5) {
      setError("You can add up to 5 photos.");
      return;
    }
    addPhotos(
      valid.map((f) => ({
        id: f.name + Date.now() + Math.random(),
        name: f.name,
        url: URL.createObjectURL(f),
      })),
    );
  };

  return (
    <div>
      <h3 className="font-bold">Add photos to improve your estimate.</h3>
      <p className="text-xs text-muted">
        Photos are previewed locally for this demo and are not uploaded.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`mt-3 rounded-3xl border-2 border-dashed p-6 text-center transition ${drag ? "border-[#005278] bg-[#005278]/5" : "border-[#005278]/20 bg-white/50"}`}
      >
        <Upload className="mx-auto text-[#005278]" size={24} />
        <p className="mt-2 text-sm text-muted">Drag &amp; drop, or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 min-h-[44px] rounded-full bg-[#05314A] px-5 py-2 text-sm font-semibold text-white"
        >
          Choose Photos
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          aria-label="Upload device photos"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-semibold text-danger">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-3">
        {photos.map((p) => (
          <div key={p.id} className="relative">
            <img
              src={p.url}
              alt={`Device preview ${p.name}`}
              className="h-20 w-20 rounded-2xl object-cover"
            />
            <button
              aria-label={`Remove ${p.name}`}
              onClick={() => {
                URL.revokeObjectURL(p.url);
                removePhoto(p.id);
              }}
              className="absolute -right-2 -top-2 rounded-full bg-danger p-1 text-white"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
