export const formatMMK = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n) +
  " MMK";

export const classNames = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");
