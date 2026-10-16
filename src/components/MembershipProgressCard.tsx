import { Link } from "react-router-dom";
import { Crown } from "lucide-react";

export default function MembershipProgressCard() {
  const pct = Math.round((27134 / 30000) * 100);
  return (
    <div className="glass p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-amber-100 p-2.5 text-amber-600">
          <Crown size={18} />
        </span>
        <div>
          <h4 className="font-bold">Silver Member</h4>
          <p className="text-xs text-muted">5 Purchases</p>
        </div>
        <Link to="/wallet" className="ml-auto text-xs font-bold text-teal">
          Explore More
        </Link>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-navy/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>27,134 / 30,000</span>
        <span>Next: Gold</span>
      </div>
    </div>
  );
}
