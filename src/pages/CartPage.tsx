import { Link } from "react-router-dom";
import CartItemRow from "../components/CartItemRow";
import OrderSummary from "../components/OrderSummary";
import { PrimaryButton } from "../components/ui/Buttons";
import { EmptyState } from "../components/ui/States";
import { useAppStore } from "../store/useAppStore";

export default function CartPage() {
  const cart = useAppStore((s) => s.cart);

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Browse the store to add products to your cart."
        action={
          <Link to="/store" className="font-bold text-teal">
            Go to Store
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">My Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <OrderSummary />
          <Link to="/checkout">
            <PrimaryButton className="w-full">Checkout</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
