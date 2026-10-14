import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Marquee } from "@/components/Marquee";
import crowd from "@/assets/booking-crowd.jpg";
import { supabase } from "@/integrations/supabase/client";
import { ARTIST_STYLES, displayPhotos } from "@/lib/artists";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking de artistas — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Booking de artistas para eventos, festivales, showcases y marcas. Urbano, electrónica, DJ, rap, pop, live set y experimental." },
      { property: "og:title", content: "Booking — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Conectamos artistas, marcas, festivales y experiencias culturales." },
      { property: "og:url", content: "https://blackcaps.es/booking" },
      { property: "og:image", content: crowd },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/booking" },
    ],
  }),
  component: BookingPage,
});

const STYLES = ["Todos", ...ARTIST_STYLES] as const;

type RosterItem = { slug: string; name: string; style: string; city: string; img: string | null };

function BookingPage() {
  const [filter, setFilter] = useState<(typeof STYLES)[number]>("Todos");
  const [artists, setArtists] = useState<RosterItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("artist_profiles")
        .select("id, slug, artist_name, style, city, photo_url, status")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      const photos = await displayPhotos(data ?? []);
      setArtists((data ?? []).map((a) => ({ slug: a.slug, name: a.artist_name, style: a.style, city: a.city, img: a.photo_url ? photos[a.photo_url] ?? null : null })));
    })();
  }, []);

  const list = (artists ?? []).filter((a) => filter === "Todos" || a.style === filter);

  return (
    <>
      <section className="relative pt-44 pb-20 px-4 md:px-8 overflow-hidden">
        <img src={crowd} alt="" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
        <div className="relative mx-auto max-w-[1600px]">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="sticker">Festival · Showcases · B2B</span>
            <span className="sticker" style={{ borderColor: "var(--bcaps-orange)", color: "var(--bcaps-orange)" }}>BCAPSTUDIO.EMP</span>
          </div>
          <h1 className="display text-[14vw] md:text-[12vw] leading-[0.85] mt-6">
            BOOKING<br /><span className="text-gradient-bcaps">OF ARTISTS</span>
          </h1>
          <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-xl text-bone/85">
            Conectamos artistas, marcas, festivales y experiencias culturales. Programación, contratación, showcases, eventos privados y colaboraciones con marcas.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contacto" className="btn btn-primary justify-center">Solicitar artista</Link>
            <Link to="/auth" className="btn btn-ghost justify-center">Soy artista · Crear perfil</Link>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="display text-4xl md:text-7xl">ROSTER<br /><span className="stroke-text">2026</span></h2>
            <div className="-mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto md:flex-wrap pb-2 md:pb-0 [scrollbar-width:none]">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  aria-pressed={filter === s}
                  className={`shrink-0 px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold rounded-full border transition active:scale-95 ${filter === s ? "bg-bone text-ink border-bone" : "border-white/20 hover:border-bone"}`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {artists === null && Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/5 aspect-[4/5] animate-pulse" />
            ))}
            {list.map((a) => (
              <Link key={a.slug} to="/artistas/$slug" params={{ slug: a.slug }} className="group relative overflow-hidden rounded-2xl bg-card aspect-[4/5] block">
                {a.img && <img src={a.img} alt={`Perfil de ${a.name} — artista de ${a.style} en ${a.city}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute top-2 left-2 md:top-3 md:left-3 sticker text-[9px] md:text-xs">{a.style}</div>
                <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
                  <p className="display text-lg md:text-2xl break-words">{a.name}</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-bone/70 mt-1">{a.city}</p>
                  <span className="mt-2 hidden sm:inline-flex text-xs uppercase tracking-[0.18em] font-semibold border-b border-bcaps-green pb-0.5">Ver perfil →</span>
                </div>
              </Link>
            ))}
            {artists !== null && (
              <Link to="/auth" className="group rounded-2xl aspect-[4/5] border border-dashed border-white/25 hover:border-bone transition flex flex-col items-center justify-center text-center p-4">
                <span className="display text-4xl group-hover:scale-110 transition">+</span>
                <p className="display text-base md:text-xl mt-3">¿Eres artista?</p>
                <p className="text-xs text-muted-foreground mt-2">Crea tu perfil y aparece en el roster</p>
              </Link>
            )}
          </div>
          {artists !== null && list.length === 0 && (
            <p className="mt-6 text-sm text-muted-foreground">Aún no hay artistas publicados en este estilo.</p>
          )}
        </div>
      </section>
    </>
  );
}
