import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import CategoryPill from "../components/CategoryPill";
import ProductCard from "../components/ProductCard";
import SortBottomSheet from "../components/SortBottomSheet";
import { EmptyState } from "../components/ui/States";
import { products } from "../data/mock";

const categories = ["Apple", "Case", "Protector", "Installment Plan"] as const;

export default function StorePage() {
  const [category, setCategory] = useState<string>("Apple");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.category === category &&
        p.title.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Store</h1>
        <button
          onClick={() => setSortOpen(true)}
          aria-label="Sort products"
          className="min-h-[44px] rounded-full border border-[#005278]/15 bg-white/70 px-4 text-sm font-semibold text-[#05314A] backdrop-blur-md"
        >
          {sort === "default"
            ? "Sort: Default"
            : sort === "asc"
              ? "Price: Low to High"
              : "Price: High to Low"}
        </button>
      </div>

      <div className="glass-dark flex items-center gap-4 p-5">
        <p className="flex-1 text-sm font-bold">Trade in your old device</p>
        <Link
          to="/trade-in"
          className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold"
        >
          Get estimate
        </Link>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          aria-label="Search products"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-h-[48px] rounded-2xl border border-navy/10 bg-white/70 pl-11 pr-4 text-sm backdrop-blur focus:border-teal focus:outline-none"
        />
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <CategoryPill
            key={c}
            label={c}
            active={category === c}
            onClick={() => setCategory(c)}
          />
        ))}
      </div>

      <SortBottomSheet
        open={sortOpen}
        value={sort}
        onChange={setSort}
        onClose={() => setSortOpen(false)}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try a different search or category."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
