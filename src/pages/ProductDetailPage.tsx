import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import QuantitySelector from "../components/ui/QuantitySelector";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { products } from "../data/mock";
import { formatMMK } from "../utils/format";
import { useAppStore } from "../store/useAppStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const addToCart = useAppStore((s) => s.addToCart);
  const wishlist = useAppStore((s) => s.wishlist);
  const toggleWishlist = useAppStore((s) => s.toggleWishlist);
  const toast = useAppStore((s) => s.toast);

  const [storage, setStorage] = useState(product?.storageOptions[0] ?? "");
  const [color, setColor] = useState(product?.colorOptions[0] ?? "");
  const [sim, setSim] = useState(product?.simOptions[0] ?? "");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/store" className="mt-4 inline-block font-bold text-teal">
          Back to Store
        </Link>
      </div>
    );
  }

  const liked = wishlist.includes(product.id);
  const add = () =>
    addToCart({
      id: `${product.id}-${storage}-${color}-${sim}-${Date.now()}`,
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      qty,
      storage,
      color,
      sim,
    });

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Link
          to="/store"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted"
        >
          <ArrowLeft size={16} /> Store
        </Link>
        <img
          src={product.image}
          alt={product.title}
          className="w-full aspect-square rounded-3xl bg-gradient-to-b from-white to-slate-100 object-contain p-4 shadow-soft"
        />
      </div>

      <div className="flex flex-col gap-5">
        {product.promo && (
          <span className="chip w-fit bg-navy text-white">{product.promo}</span>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight">
          {product.title}
        </h1>
        <div className="flex items-baseline gap-3">
          <p className="text-2xl font-extrabold text-teal">
            {formatMMK(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-muted line-through">
              {formatMMK(product.originalPrice)}
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        {product.simOptions.length > 0 && (
          <OptionGroup
            label="SIM Card"
            options={product.simOptions}
            value={sim}
            onChange={setSim}
          />
        )}
        {product.storageOptions.length > 0 && (
          <OptionGroup
            label="Storage"
            options={product.storageOptions}
            value={storage}
            onChange={setStorage}
          />
        )}
        {product.colorOptions.length > 0 && (
          <OptionGroup
            label="Color"
            options={product.colorOptions}
            value={color}
            onChange={setColor}
          />
        )}

        <div className="flex items-center gap-4">
          <span className="text-sm font-bold">Quantity</span>
          <QuantitySelector qty={qty} onChange={setQty} />
        </div>

        <div className="flex gap-3">
          <PrimaryButton
            className="flex-1"
            onClick={() => {
              add();
              toast("Added to cart");
            }}
          >
            Add to Cart
          </PrimaryButton>
          <button
            aria-label="Toggle wishlist"
            onClick={() => {
              toggleWishlist(product.id);
              toast(
                liked ? "Removed from wishlist" : "Added to wishlist",
                "info",
              );
            }}
            className={`min-h-[44px] min-w-[48px] rounded-2xl border border-navy/10 px-4 ${liked ? "text-danger" : "text-muted"}`}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
        <SecondaryButton
          onClick={() => {
            add();
            navigate("/checkout");
          }}
        >
          Buy Now
        </SecondaryButton>
        <SecondaryButton onClick={() => navigate("/trade-in")}>
          Trade in your old device
        </SecondaryButton>

        <div className="glass p-4 text-sm">
          <p className="font-bold">Delivery</p>
          <p className="text-muted">
            Express: 1–2 business days · Standard: 3–5 business days
          </p>
          <p className="mt-2 font-bold">Installment Plan</p>
          <p className="text-muted">
            0% interest available on select Apple products.
          </p>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold ${value === o ? "border-teal bg-teal text-white" : "border-navy/10 bg-white/70 text-muted"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
