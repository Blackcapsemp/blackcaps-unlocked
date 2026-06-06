type Props = { items: string[]; reverse?: boolean; fast?: boolean; sep?: string; className?: string };

export function Marquee({ items, reverse, fast, sep = "·", className = "" }: Props) {
  const line = (
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {items.concat(items).map((t, i) => (
        <span key={i} className="display text-5xl md:text-7xl whitespace-nowrap">
          {t} <span className="text-bcaps-green">{sep}</span>
        </span>
      ))}
    </div>
  );
  return <div className={`marquee ${fast ? "ticker-fast" : ""} ${className}`}>{line}{line}</div>;
}
