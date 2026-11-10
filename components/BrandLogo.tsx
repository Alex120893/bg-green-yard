export function BrandLogo({ english = false }: { english?: boolean }) {
  return (
    <span className="brand-logo">
      <svg viewBox="0 0 68 64" fill="none" aria-hidden="true">
        <path d="M30 57C26 28 42 9 65 3 63 28 49 44 33 49Z" fill="#91c92c" />
        <path d="M26 54C7 49 4 35 5 24 22 28 30 39 26 54Z" fill="#78b92c" />
        <path d="M29 61C30 44 40 29 53 16M28 59 13 36" stroke="#c4df73" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span>
        <span className="brand-logo-name">BG GREEN <span>YARD</span></span>
        <span className="brand-logo-tagline">{english ? "LANDSCAPING · MAINTENANCE · GARDEN SOLUTIONS" : "ОЗЕЛЕНЯВАНЕ · ПОДДРЪЖКА · ГРАДИНСКИ РЕШЕНИЯ"}</span>
      </span>
    </span>
  );
}
