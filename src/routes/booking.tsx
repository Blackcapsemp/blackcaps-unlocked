import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Marquee } from "@/components/Marquee";
import crowd from "@/assets/booking-crowd.jpg";
import artist from "@/assets/artist-portrait.jpg";
import dj from "@/assets/dj-booth.jpg";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking de artistas — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Booking de artistas para eventos, festivales, showcases y marcas. Urbano, electrónica, DJ, rap, pop, live set y experimental." },
      { property: "og:title", content: "Booking — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Conectamos artistas, marcas, festivales y experiencias culturales." },
      { property: "og:image", content: crowd },
    ],
  }),
  component: BookingPage,
});

const STYLES = ["Todos", "Urbano", "Electrónica", "DJ", "Rap", "Pop", "Experimental", "Live Set"] as const;

const ARTISTS = [
  { name: "NÖRA", style: "Electrónica", city: "Madrid", img: dj },
  { name: "MC KORI", style: "Rap", city: "Valencia", img: artist },
  { name: "LUX/22", style: "Pop", city: "Barcelona", img: artist },
  { name: "SAVAGE FM", style: "Urbano", city: "Madrid", img: dj },
  { name: "RAYA LIVE", style: "Live Set", city: "Barcelona", img: artist },
  { name: "VOID 808", style: "Experimental", city: "Madrid", img: dj },
  { name: "DJ KAIBA", style: "DJ", city: "Valencia", img: dj },
  { name: "ÓCTAVA", style: "Pop", city: "Madrid", img: artist },
];

function BookingPage() {
  const [filter, setFilter] = useState<(typeof STYLES)[number]>("Todos");
  const list = ARTISTS.filter((a) => filter === "Todos" || a.style === filter);

  return (
    <>
      <section className="relative pt-44 pb-20 px-4 md:px-8 overflow-hidden">
        <img src={crowd} alt="" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
        <div className="relative mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Festival · Showcases · B2B</span>
          <h1 className="display text-[16vw] md:text-[14vw] leading-[0.85] mt-6">
            BOOKING<br /><span className="text-gradient-bcaps">OF ARTISTS</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-bone/85">
            Conectamos artistas, marcas, festivales y experiencias culturales. Programación, contratación, showcases, eventos privados y colaboraciones con marcas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacto" className="btn btn-primary">Solicitar artista</Link>
            <Link to="/contacto" className="btn btn-ghost">Soy artista</Link>
          </div>
        </div>
      </section>

      <Marquee items={STYLES.slice(1) as unknown as string[]} fast />

      {/* BLOQUES */}
      <section className="py-20 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
          {["Booking para eventos","Showcases y actuaciones","Programación cultural","Gestión de artistas","Colaboraciones con marcas","Contenido audiovisual"].map((b, i) => (
            <div key={b} className="bg-ink p-8 min-h-[180px] flex items-end hover:bg-[oklch(0.15_0_0)] transition">
              <div>
                <span className="text-xs text-bcaps-green font-mono">0{i+1}</span>
                <p className="display text-2xl mt-2">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROSTER */}
      <section className="py-20 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <h2 className="display text-5xl md:text-7xl">ROSTER<br /><span className="stroke-text">2026</span></h2>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold rounded-full border transition ${filter === s ? "bg-bone text-ink border-bone" : "border-white/20 hover:border-bone"}`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {list.map((a) => (
              <article key={a.name} className="group relative overflow-hidden rounded-2xl bg-card aspect-[4/5]">
                <img src={a.img} alt={`Perfil de ${a.name} — artista de ${a.style} en ${a.city}`} width={1024} height={1280} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute top-3 left-3 sticker">{a.style}</div>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="display text-2xl">{a.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-bone/70 mt-1">{a.city}</p>
                  <Link to="/contacto" className="mt-3 inline-flex text-xs uppercase tracking-[0.18em] font-semibold border-b border-bcaps-green pb-0.5">Solicitar booking →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
