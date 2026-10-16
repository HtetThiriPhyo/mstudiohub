import { useRef, useState } from "react";
import type { Banner } from "../types";

export default function PromoCarousel({ banners }: { banners: Banner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(idx);
  };

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
      >
        {banners.map((b) => (
          <div
            key={b.id}
            className="w-full shrink-0 snap-center overflow-hidden rounded-3xl shadow-soft"
          >
            <img
              src={b.image}
              alt={b.title}
              className="h-44 w-full object-cover md:h-64"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {banners.map((b, i) => (
          <span
            key={b.id}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-teal" : "w-2 bg-navy/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
