import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import QuantitySelector from "./ui/QuantitySelector";
import type { CartItem } from "../types";
import { formatMMK } from "../utils/format";
import { useAppStore } from "../store/useAppStore";

export default function CartItemRow({ item }: { item: CartItem }) {
  const updateQty = useAppStore((s) => s.updateQty);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const toggleWishlist = useAppStore((s) => s.toggleWishlist);
  const toast = useAppStore((s) => s.toast);

  return (
    <div className="glass flex gap-4 p-4">
      <img
        src={item.image}
        alt={item.title}
        className="h-20 w-20 rounded-2xl bg-gradient-to-b from-white to-slate-100 object-contain p-1"
      />
      <div className="flex flex-1 flex-col gap-1">
        <Link
          to={`/store/product/${item.productId}`}
          className="font-bold leading-snug"
        >
          {item.title}
        </Link>
        <p className="text-xs text-muted">
          {[item.storage, item.color, item.sim].filter(Boolean).join(" · ")}
        </p>
        <p className="font-extrabold text-teal">
          {formatMMK(item.price * item.qty)}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <QuantitySelector
            qty={item.qty}
            onChange={(q) => updateQty(item.id, q)}
          />
          <div className="flex gap-1">
            <button
              aria-label="Move to wishlist"
              onClick={() => {
                toggleWishlist(item.productId);
                toast("Saved to wishlist", "info");
              }}
              className="min-h-[44px] min-w-[44px] rounded-full p-2.5 text-muted hover:bg-navy/5"
            >
              <Heart size={18} />
            </button>
            <button
              aria-label="Remove item"
              onClick={() => {
                removeFromCart(item.id);
                toast("Removed from cart", "info");
              }}
              className="min-h-[44px] min-w-[44px] rounded-full p-2.5 text-danger hover:bg-danger/10"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
