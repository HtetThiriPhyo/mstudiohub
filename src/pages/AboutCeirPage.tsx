export default function AboutCeirPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
        About CEIR
      </h1>
      <div className="glass space-y-4 p-6 text-sm leading-relaxed text-muted">
        <p>
          <strong className="text-ink">M STUDIO Hub</strong> is operated by CEIR
          Myanmar Company Limited, an authorized reseller of premium Apple
          products and accessories in Myanmar.
        </p>
        <p>
          The hub lets you track cashback, redeem rewards, shop Apple products,
          and manage your membership — all in one place.
        </p>
        <dl className="grid grid-cols-2 gap-3 border-t border-navy/5 pt-4">
          <dt className="text-muted">App version</dt>
          <dd className="font-semibold">1.0.0 (mock)</dd>
          <dt className="text-muted">Build</dt>
          <dd className="font-semibold">2026.10.05</dd>
          <dt className="text-muted">Support</dt>
          <dd className="font-semibold">support@mstudio.example</dd>
        </dl>
      </div>
    </div>
  );
}
