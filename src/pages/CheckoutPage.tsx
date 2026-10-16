import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/ui/StepIndicator";
import { PrimaryButton, SecondaryButton } from "../components/ui/Buttons";
import { InputField } from "../components/InputField";
import { useAppStore } from "../store/useAppStore";
import { formatMMK } from "../utils/format";

const deliveries = [
  {
    id: "express",
    label: "Express Delivery",
    eta: "1–2 Business Days",
    fee: 5000,
  },
  {
    id: "standard",
    label: "Standard Delivery",
    eta: "3–5 Business Days",
    fee: 0,
  },
];

const payments = ["M STUDIO Wallet", "Cash on Delivery", "Mock Card Payment"];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useAppStore((s) => s.cart);
  const user = useAppStore((s) => s.user);
  const clearCart = useAppStore((s) => s.clearCart);

  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState(deliveries[0]);
  const [payment, setPayment] = useState(payments[0]);
  const [address, setAddress] = useState({
    name: user.name,
    phone: user.phone,
    address: "No. 12, Pyay Road, Yangon",
  });
  const [editing, setEditing] = useState(false);

  const subtotal = cart.reduce((n, c) => n + c.price * c.qty, 0);
  const total = Math.max(
    0,
    subtotal - Math.round(subtotal * 0.05) + delivery.fee,
  );

  const confirm = () => {
    const orderId = "MS-" + Math.floor(100000 + Math.random() * 900000);
    clearCart();
    navigate("/order-success", { state: { orderId } });
  };

  if (cart.length === 0 && step < 2) {
    return <p className="py-16 text-center text-muted">Your cart is empty.</p>;
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
      <StepIndicator steps={["Cart", "Address", "Payment"]} current={step} />

      {step === 0 && (
        <section className="glass p-5">
          <h2 className="mb-3 font-bold">Review Items</h2>
          <ul className="divide-y divide-navy/5">
            {cart.map((c) => (
              <li key={c.id} className="flex justify-between py-2 text-sm">
                <span>
                  {c.title} × {c.qty}
                </span>
                <span className="font-semibold">
                  {formatMMK(c.price * c.qty)}
                </span>
              </li>
            ))}
          </ul>
          <PrimaryButton className="mt-4 w-full" onClick={() => setStep(1)}>
            Continue
          </PrimaryButton>
        </section>
      )}

      {step === 1 && (
        <section className="glass p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Shipping Address</h2>
            <button
              className="text-sm font-bold text-teal"
              onClick={() => setEditing((v) => !v)}
            >
              {editing ? "Done" : "Edit"}
            </button>
          </div>
          {editing ? (
            <div className="mt-4 flex flex-col gap-3">
              <InputField
                id="name"
                label="Name"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />
              <InputField
                id="phone"
                label="Phone"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
              <InputField
                id="address"
                label="Address"
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
              />
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">
              {address.name} · {address.phone} · {address.address}
            </p>
          )}

          <h2 className="mb-2 mt-6 font-bold">Delivery Method</h2>
          <div className="flex flex-col gap-2">
            {deliveries.map((d) => (
              <label
                key={d.id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${delivery.id === d.id ? "border-teal bg-teal/5" : "border-navy/10"}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery.id === d.id}
                  onChange={() => setDelivery(d)}
                  className="accent-teal"
                />
                <div className="flex-1">
                  <p className="font-semibold">{d.label}</p>
                  <p className="text-xs text-muted">{d.eta}</p>
                </div>
                <span className="font-bold">
                  {d.fee === 0 ? "Free" : formatMMK(d.fee)}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <SecondaryButton onClick={() => setStep(0)}>Back</SecondaryButton>
            <PrimaryButton className="flex-1" onClick={() => setStep(2)}>
              Continue
            </PrimaryButton>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="glass p-5">
          <h2 className="mb-3 font-bold">Payment</h2>
          <div className="flex flex-col gap-2">
            {payments.map((p) => (
              <label
                key={p}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${payment === p ? "border-teal bg-teal/5" : "border-navy/10"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === p}
                  onChange={() => setPayment(p)}
                  className="accent-teal"
                />
                <span className="font-semibold">{p}</span>
              </label>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Total:{" "}
            <span className="font-extrabold text-teal">{formatMMK(total)}</span>
          </p>
          <div className="mt-4 flex gap-3">
            <SecondaryButton onClick={() => setStep(1)}>Back</SecondaryButton>
            <PrimaryButton className="flex-1" onClick={confirm}>
              Confirm Order
            </PrimaryButton>
          </div>
        </section>
      )}
    </div>
  );
}
