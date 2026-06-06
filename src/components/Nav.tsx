import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/booking", label: "Booking" },
  { to: "/bcapstudio", label: "BCAPSTUDIO" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block w-9 h-9 rounded-full bg-bone text-ink grid place-items-center font-black text-lg group-hover:bg-bcaps-green transition-colors">B</span>
          <span className="display text-lg tracking-tight hidden sm:inline">BLACKCAPS<span className="text-bcaps-green">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/15 backdrop-blur-md bg-black/30 px-2 py-1.5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full transition-colors hover:bg-bone hover:text-ink"
              activeProps={{ className: "px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full bg-bone text-ink" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/contacto" className="hidden md:inline-flex btn btn-accent text-[10px] py-2.5 px-4">
          Trabaja con nosotros →
        </Link>

        <button onClick={() => setOpen(!open)} className="md:hidden text-bone p-2" aria-label="menu">
          <div className="w-6 h-0.5 bg-bone mb-1.5" />
          <div className="w-6 h-0.5 bg-bone mb-1.5" />
          <div className="w-4 h-0.5 bg-bone" />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-ink border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="display text-sm" activeProps={{ className: "display active text-sm" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
