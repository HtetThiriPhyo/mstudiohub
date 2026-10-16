import { NavLink, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import NotificationBell from "./NotificationBell";
import AppLogo from "./AppLogo";
import { useAppStore } from "../store/useAppStore";

const links = [
  { to: "/home", label: "Home" },
  { to: "/wallet", label: "Wallet" },
  { to: "/store", label: "Store" },
  { to: "/profile", label: "Profile" },
];

export default function AppHeader() {
  const cartCount = useAppStore((s) => s.cart.reduce((n, c) => n + c.qty, 0));
  const initial = useAppStore((s) => s.user.name.charAt(0));

  return (
    <header className="sticky top-0 z-[100] border-b border-navy/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/home" aria-label="M STUDIO Hub home">
          <AppLogo size="sm" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-[#05314A] text-white" : "text-muted hover:bg-navy/5"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className="relative rounded-full border border-navy/10 bg-white/70 p-2.5 hover:bg-white"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-teal px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <NotificationBell />
          <Link
            to="/profile"
            aria-label="Profile"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-teal font-bold text-white md:flex"
          >
            {initial}
          </Link>
        </div>
      </div>
    </header>
  );
}
