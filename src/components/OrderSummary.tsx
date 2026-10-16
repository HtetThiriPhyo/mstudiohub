import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { formatMMK } from "../utils/format";

export interface Totals {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

export default function OrderSummary({
  deliveryFee = 5000,
  promoRate = 0,
}: {
  deliveryFee?: number;
  promoRate?: number;
}) {
  const cart = useAppStore((s) => s.cart);
  const toast = useAppStore((s) => s.toast);
  const [promo, setPromo] = useState("");
  const [appliedRate, setAppliedRate] = useState(promoRate);

  const subtotal = cart.reduce((n, c) => n + c.price * c.qty, 0);
  const walletDiscount = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const promoDiscount = Math.round(subtotal * appliedRate);
  const discount = walletDiscount + promoDiscount;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <div className="glass p-5">
      <h3 className="mb-4 font-bold">Order Summary</h3>
      <div className="flex gap-2">
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Promo code"
          aria-label="Promo code"
          className="min-h-[44px] flex-1 rounded-2xl border border-navy/10 bg-white/70 px-4 text-sm"
        />
        <button
          className="min-h-[44px] rounded-2xl bg-navy px-4 text-sm font-semibold text-white"
          onClick={() => {
            if (promo.trim().toUpperCase() === "MSTUDIO10") {
              setAppliedRate(0.1);
              toast("Promo applied: 10% off");
            } else toast("Invalid promo code", "error");
          }}
        >
          Apply
        </button>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-semibold">{formatMMK(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">M STUDIO Wallet discount</dt>
          <dd className="font-semibold text-success">-{formatMMK(discount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery fee</dt>
          <dd className="font-semibold">
            {deliveryFee === 0 ? "Free" : formatMMK(deliveryFee)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-navy/10 pt-2 text-base">
          <dt className="font-bold">Total</dt>
          <dd className="font-extrabold text-teal">{formatMMK(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
