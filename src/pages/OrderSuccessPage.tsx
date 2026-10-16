import { Link, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "../components/ui/Buttons";

export default function OrderSuccessPage() {
  const { state } = useLocation() as { state?: { orderId?: string } };
  const orderId = state?.orderId ?? "MS-000000";

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="glass max-w-md p-10 text-center">
        <CheckCircle2 size={56} className="mx-auto text-success" />
        <h1 className="mt-4 text-2xl font-extrabold">Order Successful!</h1>
        <p className="mt-2 text-sm text-muted">
          Thank you for your purchase. This is a mock order — no payment was
          processed.
        </p>
        <p className="mt-4 rounded-2xl bg-navy/5 py-3 text-sm font-bold">
          Order ID: {orderId}
        </p>
        <Link to="/home" className="mt-6 inline-block w-full">
          <PrimaryButton className="w-full">Back to Home</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
