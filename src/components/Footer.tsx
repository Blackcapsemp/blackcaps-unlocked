import { Link } from "@tanstack/react-router";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pt-16 overflow-hidden">
      <Marquee items={["BLACKCAPS EXPERIENCE", "ANYWHERE BUT WITH MUSIC", "SINCE 2020", "B2B · BOOKING · AUDIOVISUAL", "BCAPSTUDIO.EMP"]} />
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="display text-5xl md:text-6xl leading-[0.85]">
            ¿CREAMOS<br /><span className="text-gradient-bcaps">ALGO JUNTOS?</span>
          </h3>
          <p className="mt-6 max-w-md text-muted-foreground">
            Cuéntanos qué necesitas: producción audiovisual, soporte técnico, booking artístico, desarrollo web o sello discográfico.
          </p>
          <Link to="/contacto" className="btn btn-primary mt-6">Enviar propuesta →</Link>
        </div>
        <div>
          <div className="sticker mb-4">Contacto</div>
          <ul className="space-y-2 text-sm">
            <li>info@blackcaps.es</li>
            <li>@Blackcaps.emp</li>
            <li>blackcaps.es</li>
            <li>686 06 88 968 · 722 12 99 48</li>
          </ul>
        </div>
        <div>
          <div className="sticker mb-4">Ciudades</div>
          <ul className="space-y-2 text-sm">
            <li>Madrid</li>
            <li>Valencia</li>
            <li>Barcelona</li>
            <li>España</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} BLACKCAPS EXPERIENCE S.L.</span>
          <span className="tracking-[0.3em] uppercase">Anywhere but with music</span>
        </div>
      </div>
    </footer>
  );
}
