import { memo, useCallback, type MouseEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Home, ShoppingBag, User, Wallet } from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/store", label: "Store", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: User },
];

interface TabContentProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
}

// Pure presentational; memoized so the icon/label only re-render when the
// active tab actually changes (not on every parent render).
const TabContent = memo(function TabContent({
  label,
  icon: Icon,
  isActive,
}: TabContentProps) {
  return (
    <span className="bottom-nav__content">
      <Icon size={22} strokeWidth={isActive ? 2.25 : 1.85} aria-hidden="true" />
      {isActive && <span className="bottom-nav__label">{label}</span>}
    </span>
  );
});

interface NavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

const NavItem = memo(function NavItem({ to, label, icon }: NavItemProps) {
  const location = useLocation();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Tapping the already-selected tab must not push a duplicate history
      // entry, re-navigate, or retrigger a transition.
      if (location.pathname === to) e.preventDefault();
    },
    [location.pathname, to],
  );

  return (
    <li className="bottom-nav__slot">
      <NavLink
        to={to}
        aria-label={label}
        className="bottom-nav__item"
        onClick={handleClick}
      >
        {({ isActive }) => (
          <>
            {/* Always mounted; its opacity is toggled by CSS
                (`.bottom-nav__item[aria-current="page"] .bottom-nav__pill`),
                so the active highlight cross-fades without mount/unmount,
                layout, scale, or a JS animation loop. */}
            <span aria-hidden="true" className="bottom-nav__pill bg-ink/5" />
            <TabContent label={label} icon={icon} isActive={isActive} />
          </>
        )}
      </NavLink>
    </li>
  );
});

export default function MobileBottomNavigation() {
  return (
    <nav aria-label="Bottom navigation" className="bottom-nav">
      {/* Single frosted-glass surface: the pill itself carries the
          semi-transparent white background + static blur — no navy/blue
          tint, no colored gradient, and no separate second layer. The
          wrapper is transparent and lets page content scroll underneath. */}
      <ul className="bottom-nav__bar">
        {tabs.map((t) => (
          <NavItem key={t.to} to={t.to} label={t.label} icon={t.icon} />
        ))}
      </ul>
    </nav>
  );
}
