import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ConditionAnswers,
  TradeDevice,
  TradeOptions,
  TradePhoto,
  TradeRecord,
} from "../types/tradein";
import { seedTradeInHistory } from "../data/tradeIn";

interface TradeInState {
  device: TradeDevice | null;
  options: TradeOptions;
  answers: ConditionAnswers;
  photos: TradePhoto[];
  payout: "Store Credit" | "Wallet Credit" | null;
  requestId: string | null;
  history: TradeRecord[];

  setDevice: (d: TradeDevice | null) => void;
  setOptions: (o: Partial<TradeOptions>) => void;
  setAnswer: (key: string, value: string) => void;
  addPhotos: (p: TradePhoto[]) => void;
  removePhoto: (id: string) => void;
  setPayout: (p: TradeInState["payout"]) => void;
  submitRequest: (value: number) => string;
  reset: () => void;
}

export const useTradeInStore = create<TradeInState>()(
  persist(
    (set, get) => ({
      device: null,
      options: {
        storage: "256 GB",
        color: "Deep Blue",
        sim: "Physical SIM",
        battery: "90% or above",
      },
      answers: {},
      photos: [],
      payout: null,
      requestId: null,
      history: seedTradeInHistory,

      setDevice: (d) => set({ device: d }),
      setOptions: (o) => set((s) => ({ options: { ...s.options, ...o } })),
      setAnswer: (key, value) =>
        set((s) => ({ answers: { ...s.answers, [key]: value } })),
      addPhotos: (p) =>
        set((s) => ({ photos: [...s.photos, ...p].slice(0, 5) })),
      removePhoto: (id) =>
        set((s) => ({ photos: s.photos.filter((p) => p.id !== id) })),
      setPayout: (p) => set({ payout: p }),
      submitRequest: (value) => {
        const id =
          "TRADE-DEMO-" +
          String(Math.floor(100000 + Math.random() * 900000)).slice(0, 6);
        const { device, options, answers, payout, history } = get();
        const record: TradeRecord = {
          id,
          device: device?.name ?? "Unknown device",
          image: device?.image,
          value,
          status: "Pending inspection",
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          payout: payout ?? undefined,
          options,
          answers,
        };
        set({ requestId: id, history: [record, ...history] });
        return id;
      },
      reset: () =>
        set({
          device: null,
          answers: {},
          photos: [],
          payout: null,
          requestId: null,
        }),
    }),
    {
      name: "mstudio-tradein",
      partialize: (s) => ({
        device: s.device,
        options: s.options,
        answers: s.answers,
        payout: s.payout,
        requestId: s.requestId,
        history: s.history,
      }),
    },
  ),
);
