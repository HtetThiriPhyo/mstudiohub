export interface TradeDevice {
  id: string;
  name: string;
  category: "iPhone" | "iPad" | "Mac" | "Apple Watch" | "Other";
  image: string;
  baseValue: number;
}

export interface TradeOptions {
  storage: string;
  color: string;
  sim: string;
  battery: string;
}

export type ConditionAnswers = Record<string, string>;

export interface TradePhoto {
  id: string;
  name: string;
  url: string;
}

export interface ValuationResult {
  value: number;
  breakdown: { label: string; delta: number }[];
  ineligible: boolean;
  reason?: string;
}

export interface TradeRecord {
  id: string;
  device: string;
  image?: string;
  value: number;
  status:
    | "Draft"
    | "Pending inspection"
    | "Approved"
    | "Value adjusted"
    | "Completed"
    | "Rejected"
    | "Cancelled";
  date: string;
  payout?: string;
  options?: TradeOptions;
  answers?: ConditionAnswers;
}
