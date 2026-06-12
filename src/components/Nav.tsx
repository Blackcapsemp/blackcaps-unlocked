import { Link } from "@tanstack/react-router";
import { useState } from "react";
import bcapsLogo from "@/assets/bcaps-logo.png.asset.json";

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
            src={bcapsLogo.url}
            alt="BLACKCAPS Experience logo"
            width={1220}
            height={351}
            className="h-10 md:h-12 lg:h-14 w-auto max-w-none object-contain shrink-0"
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


        <Link
          to="/contacto"
          className="hidden lg:inline-flex btn text-[10px] py-2.5 px-4 text-ink font-semibold transition-transform hover:-translate-y-0.5 shrink-0"

          style={{ background: "var(--bcaps-signal)" }}
        >
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
