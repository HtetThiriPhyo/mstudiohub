import type {
  ConditionAnswers,
  TradeOptions,
  ValuationResult,
} from "../types/tradein";

export function estimateValue(
  base: number,
  options: TradeOptions,
  answers: ConditionAnswers,
): ValuationResult {
  const breakdown: { label: string; delta: number }[] = [];
  let value = base;
  let ineligible = false;
  let reason: string | undefined;

  const apply = (label: string, pct: number) => {
    const delta = Math.round(base * pct);
    value += delta;
    breakdown.push({ label, delta });
  };

  if (options.battery === "90% or above") apply("Battery 90%+", 0.05);
  else if (options.battery === "Below 80%") apply("Battery below 80%", -0.15);

  if (answers.body === "Like new") apply("Body: Like new", 0.1);
  else if (answers.body === "Fair") apply("Body: Fair", -0.15);
  else if (answers.body === "Heavily damaged")
    apply("Body: Heavily damaged", -0.35);

  if (answers.display === "Minor scratches")
    apply("Minor display scratches", -0.05);
  else if (answers.display === "Cracked") apply("Cracked display", -0.3);
  else if (answers.display === "Display issue") apply("Display issue", -0.25);

  if (answers.accessories === "No accessories") apply("No accessories", -0.05);
  else if (answers.accessories === "Full accessories")
    apply("Full accessories", 0.03);

  const majorBroken =
    answers.power === "No" ||
    answers.touchscreen === "No" ||
    answers.cameras === "No" ||
    answers.biometric === "No";
  if (majorBroken) apply("Major function not working", -0.25);

  if (answers.activation === "No") {
    ineligible = true;
    reason =
      "Activation Lock is enabled on this device. Trade-in is not eligible until Activation Lock is disabled.";
    value = 0;
  }

  return {
    value: Math.max(0, Math.round(value)),
    breakdown,
    ineligible,
    reason,
  };
}
