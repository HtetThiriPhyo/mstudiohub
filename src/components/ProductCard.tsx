import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types";
import { formatMMK } from "../utils/format";
import { useAppStore } from "../store/useAppStore";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const wishlist = useAppStore((s) => s.wishlist);
  const toggleWishlist = useAppStore((s) => s.toggleWishlist);
  const toast = useAppStore((s) => s.toast);
  const liked = wishlist.includes(product.id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass flex flex-col overflow-hidden p-0"
    >
      <Link to={`/store/product/${product.id}`} className="relative block">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-square w-full bg-gradient-to-b from-white to-slate-100 object-contain p-3"
          loading="lazy"
        />
        {product.promo && (
          <span className="chip absolute left-3 top-3 bg-navy text-white">
            {product.promo}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <Link to={`/store/product/${product.id}`}>
          <h4 className="font-bold leading-snug">{product.title}</h4>
        </Link>
        <div className="flex items-baseline gap-2">
          <p className="font-extrabold text-teal">{formatMMK(product.price)}</p>
          {product.originalPrice && (
            <p className="text-xs text-muted line-through">
              {formatMMK(product.originalPrice)}
            </p>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <button
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => {
              toggleWishlist(product.id);
              toast(
                liked ? "Removed from wishlist" : "Added to wishlist",
                "info",
              );
            }}
            className={`min-h-[44px] min-w-[44px] rounded-full p-2.5 ${liked ? "text-danger" : "text-muted hover:bg-navy/5"}`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
          <button
            aria-label={`Add ${product.title} to cart`}
            onClick={() => {
              addToCart({
                id: product.id + Date.now(),
                productId: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                qty: 1,
              });
              toast("Added to cart");
            }}
            className="rounded-full bg-teal p-2.5 text-white hover:bg-teal-dark"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
