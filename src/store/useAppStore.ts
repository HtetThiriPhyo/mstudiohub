import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Notification, User } from "../types";
import { notifications as seedNotifications } from "../data/mock";

export interface ToastMsg {
  id: number;
  message: string;
  kind: "success" | "info" | "error";
}

interface AppState {
  isAuthenticated: boolean;
  user: User;
  balance: number;
  membershipLevel: string;
  purchases: number;
  cart: CartItem[];
  wishlist: string[];
  language: "English" | "Myanmar";
  notifications: Notification[];
  toasts: ToastMsg[];
  biometric: boolean;
  pushEnabled: boolean;

  login: () => void;
  logout: () => void;
  setLanguage: (l: "English" | "Myanmar") => void;
  setBiometric: (v: boolean) => void;
  setPushEnabled: (v: boolean) => void;
  updateUser: (u: Partial<User>) => void;

  addToCart: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;

  markAllRead: () => void;
  markOneRead: (id: string) => void;
  toast: (message: string, kind?: ToastMsg["kind"]) => void;
  dismissToast: (id: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: {
        name: "Rachel",
        phone: "09 777 888 999",
        email: "rachel@example.com",
        membership: "Silver Member",
        purchases: 5,
      },
      balance: 100000,
      membershipLevel: "Silver",
      purchases: 5,
      cart: [],
      wishlist: [],
      language: "English",
      notifications: seedNotifications,
      toasts: [],
      biometric: true,
      pushEnabled: true,

      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      setLanguage: (l) => set({ language: l }),
      setBiometric: (v) => set({ biometric: v }),
      setPushEnabled: (v) => set({ pushEnabled: v }),
      updateUser: (u) => set({ user: { ...get().user, ...u } }),

      addToCart: (item) =>
        set((s) => {
          const key =
            item.productId +
            (item.storage || "") +
            (item.color || "") +
            (item.sim || "");
          const found = s.cart.find(
            (c) =>
              c.productId +
                (c.storage || "") +
                (c.color || "") +
                (c.sim || "") ===
              key,
          );
          if (found)
            return {
              cart: s.cart.map((c) =>
                c === found ? { ...c, qty: c.qty + item.qty } : c,
              ),
            };
          return { cart: [...s.cart, item] };
        }),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: s.cart.map((c) =>
            c.id === id ? { ...c, qty: Math.max(1, qty) } : c,
          ),
        })),
      removeFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((w) => w !== productId)
            : [...s.wishlist, productId],
        })),

      markAllRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),
      markOneRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
      toast: (message, kind = "success") => {
        const id = Date.now() + Math.random();
        set((s) => ({ toasts: [...s.toasts, { id, message, kind }] }));
        setTimeout(() => get().dismissToast(id), 2800);
      },
      dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "mstudio-hub-v2",
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        cart: s.cart,
        wishlist: s.wishlist,
        language: s.language,
        biometric: s.biometric,
        pushEnabled: s.pushEnabled,
        user: s.user,
        notifications: s.notifications,
      }),
    },
  ),
);
