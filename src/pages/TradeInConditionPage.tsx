import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ConditionQuestion from "../components/tradein/ConditionQuestion";
import PhotoUploader from "../components/tradein/PhotoUploader";
import { PrimaryButton } from "../components/ui/Buttons";
import { useTradeInStore } from "../store/useTradeInStore";

const questions = [
  { key: "power", q: "Does the device power on?", options: ["Yes", "No"] },
  {
    key: "touchscreen",
    q: "Does the touchscreen work correctly?",
    options: ["Yes", "No", "Partially"],
  },
  {
    key: "display",
    q: "Display condition",
    options: ["No cracks", "Minor scratches", "Cracked", "Display issue"],
  },
  {
    key: "body",
    q: "Body condition",
    options: ["Like new", "Good", "Fair", "Heavily damaged"],
  },
  {
    key: "biometric",
    q: "Is Face ID or Touch ID working?",
    options: ["Yes", "No", "Not applicable"],
  },
  {
    key: "cameras",
    q: "Are all cameras working?",
    options: ["Yes", "No", "Partially"],
  },
  {
    key: "activation",
    q: "Is Activation Lock disabled?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    key: "accessories",
    q: "Accessories",
    options: ["Full accessories", "Some accessories", "No accessories"],
  },
];

export default function TradeInConditionPage() {
  const navigate = useNavigate();
  const answers = useTradeInStore((s) => s.answers);
  const setAnswer = useTradeInStore((s) => s.setAnswer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const completed = questions.every((q) => answers[q.key]);
  const showError = (key: string) => submitted && !answers[key];

  const onContinue = () => {
    setSubmitted(true);
    const missing: Record<string, string> = {};
    questions.forEach((q) => {
      if (!answers[q.key]) missing[q.key] = "Please answer this question.";
    });
    setErrors(missing);
    if (Object.keys(missing).length === 0) navigate("/trade-in/estimate");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/trade-in/device"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Device condition
      </h1>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy/10">
        <div
          className="h-full rounded-full bg-[#005278] transition-all"
          style={{
            width: `${(Object.keys(answers).length / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="glass mt-6 flex flex-col gap-6 p-6">
        {questions.map((q) => (
          <ConditionQuestion
            key={q.key}
            id={q.key}
            question={q.q}
            options={q.options}
            value={answers[q.key]}
            error={
              showError(q.key) ? "Please answer this question." : errors[q.key]
            }
            onChange={(v) => {
              setAnswer(q.key, v);
              setErrors((e) => ({ ...e, [q.key]: "" }));
            }}
          />
        ))}
      </div>

      <div className="glass mt-6 p-6">
        <PhotoUploader />
      </div>

      <PrimaryButton
        className="mt-6 w-full"
        onClick={onContinue}
        disabled={!completed && submitted}
      >
        Continue
      </PrimaryButton>
    </div>
  );
}
