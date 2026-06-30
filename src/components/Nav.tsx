import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/produccion-audiovisual", label: "Audiovisual" },
  { to: "/booking", label: "Booking" },
  { to: "/bcapstudio", label: "BCAPSTUDIO" },
  { to: "/sobre-nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-3 flex items-center justify-between min-h-[64px] md:min-h-[72px]">
        <Link to="/" className="flex items-center group shrink-0 mr-4" aria-label="BLACKCAPS Experience — Inicio">
          <img
            src="/bcaps-logo.png"
            alt=""
            aria-hidden="true"
            width={1220}
            height={351}
            className="h-9 md:h-11 lg:h-12 w-auto max-w-[170px] md:max-w-[210px] lg:max-w-[240px] object-contain shrink-0"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 rounded-full border border-white/15 backdrop-blur-md bg-black/30 px-1.5 lg:px-2 py-1.5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-2.5 lg:px-4 py-2 text-[10px] lg:text-[11px] uppercase tracking-[0.12em] lg:tracking-[0.18em] font-semibold rounded-full transition-colors hover:bg-bone hover:text-ink whitespace-nowrap"
              activeProps={{ className: "px-2.5 lg:px-4 py-2 text-[10px] lg:text-[11px] uppercase tracking-[0.12em] lg:tracking-[0.18em] font-semibold rounded-full bg-bone text-ink whitespace-nowrap" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>




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
          <a
            href="https://presupuestos.blackcaps.es"
            target="_blank"
            rel="noopener"
            data-cta="presupuestos"
            onClick={() => setOpen(false)}
            className="btn text-xs py-3 px-4 text-ink font-semibold text-center mt-2"
            style={{ background: "var(--bcaps-signal)" }}
          >
            Calcula tu presupuesto →
          </a>
        </div>
      )}

    </header>
  );
}
