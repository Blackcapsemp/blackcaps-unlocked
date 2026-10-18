import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { createCityResolver, filterRoster, groupCities, type CityRow } from "@/lib/roster-cities";
const SpainRosterMap = lazy(() => import("@/components/SpainRosterMap"));
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/booking" },
    ],
  }),
  component: BookingPage,
});

const STYLES = ["Todos", ...ARTIST_STYLES] as const;

type RosterItem = { id: string; slug: string; name: string; style: string; city: string; img: string | null };

function BookingPage() {
  const [filter, setFilter] = useState<(typeof STYLES)[number]>("Todos");
  const [city, setCity] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [cityRows, setCityRows] = useState<CityRow[]>([]);
  const [error, setError] = useState(false);
  const [artists, setArtists] = useState<RosterItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error: fetchError } = await supabase
        .from("artist_profiles")
        .select("id, slug, artist_name, style, city, photo_url, status")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (fetchError) { setError(true); setArtists([]); return; }
      const photos = await displayPhotos(data ?? []);
      setArtists((data ?? []).map((a) => ({ id: a.id, slug: a.slug, name: a.artist_name, style: a.style, city: a.city, img: a.photo_url ? photos[a.photo_url] ?? null : null })));
    })();
  }, []);

  useEffect(() => {
    let active = true;
    import("@/lib/spain-cities.json").then((data) => { if (active) setCityRows(data.default as CityRow[]); }).catch(() => { /* City filtering remains available without map coordinates. */ });
    return () => { active = false; };
  }, []);
  const resolve = useMemo(() => createCityResolver(cityRows), [cityRows]);
  const cities = useMemo(() => groupCities(artists ?? [], resolve), [artists, resolve]);
  const list = filterRoster(artists ?? [], filter, city, resolve);
  const selectedCity = cities.find((c) => c.key === city);
  const reset = () => { setCity(""); setFilter("Todos"); setResetKey((key) => key + 1); };
  const selectCity = (key: string) => { setCity(key); setFilter("Todos"); };

  return (
    <div className="corp booking-roster">
      <section className="relative pt-32 md:pt-40 pb-16 px-4 md:px-8 overflow-hidden">
        <img src={crowd} alt="" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
        <div className="relative mx-auto max-w-[1600px]">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="sticker">Roster & Booking</span>
            <span className="sticker">BCAPSTUDIO.EMP</span>
          </div>
          <h1 className="display text-4xl sm:text-6xl md:text-7xl leading-[0.85] mt-6">
            ARTIST ROSTER<br />& BOOKING
          </h1>
          <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-xl text-bone/85">
            Conectamos artistas, marcas, festivales y experiencias culturales. Programación, contratación, showcases, eventos privados y colaboraciones con marcas.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contacto" search={{ type: "booking" }} className="btn btn-primary justify-center">Solicitar contratación</Link>
            <Link to="/auth" className="btn btn-ghost justify-center">Soy artista · Crear perfil</Link>
          </div>
        </div>
      </section>

      <section className="corp-light px-4 md:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
            <div><span className="eyebrow">BCAPSTUDIO.EMP</span><h2 className="display text-2xl md:text-4xl mt-4">Artistas por ciudad</h2></div>
            <p className="max-w-lg text-sm">La ciudad es su referencia, no un límite: coordinamos actuaciones en toda España.</p>
          </div>
          <ClientOnly fallback={<div className="h-[600px] md:h-[560px] bg-sand/30 animate-pulse" />}>
            <Suspense fallback={<div className="h-[600px] md:h-[560px] bg-sand/30 animate-pulse" />}>
              <SpainRosterMap cities={cities} selected={city} onSelect={selectCity} resetKey={resetKey} />
            </Suspense>
          </ClientOnly>
          <p className="mt-3 text-xs opacity-70">Ubicaciones aproximadas del centro de cada ciudad · Datos geográficos: GeoNames (CC BY 4.0).</p>
          {artists !== null && !artists.length && !error && <p role="status" className="mt-5 text-base">Todavía no hay artistas publicados. Puedes solicitar una contratación a BLACKCAPS EXPERIENCE.</p>}
          {cities.some((c) => !c.location) && cityRows.length > 0 && <p className="mt-3 text-sm">Los artistas cuya ciudad no tiene una ubicación verificada siguen disponibles en el listado.</p>}
        </div>
      </section>

      {/* ROSTER */}
      <section className="py-20 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <h2 className="display text-3xl md:text-5xl">{selectedCity?.name ?? "Nuestro roster"}</h2>
            <div className="flex flex-wrap items-end gap-3 w-full md:w-auto">
              <label className="flex flex-col gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold uppercase">Filtrar por ciudad</span>
                <select value={city} onChange={(event) => selectCity(event.target.value)} className="bg-card text-foreground border border-border rounded-md px-4 h-11 w-full sm:min-w-56">
                  <option value="">Todas las ciudades</option>
                  {cities.map((c) => <option key={c.key} value={c.key}>{c.name} ({c.count})</option>)}
                </select>
              </label>
              <Button variant="outline" size="icon" className="h-11 w-11" title="Restablecer filtros" aria-label="Restablecer filtros" onClick={reset}><RotateCcw /></Button>
            </div>
          </div>
          <div aria-label="Filtrar por estilo" className="flex flex-wrap gap-2 mb-6">
            {STYLES.map((s) => <Button key={s} variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)} aria-pressed={filter === s}>{s}</Button>)}
          </div>
          <p role="status" className="text-sm text-muted-foreground mb-6">{artists === null ? "Cargando artistas…" : error ? "No se pudo cargar el roster. Vuelve a intentarlo más tarde." : `${list.length} ${list.length === 1 ? "artista disponible" : "artistas disponibles"}${selectedCity ? ` en ${selectedCity.name}` : ""}`}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {artists === null && Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-md bg-white/5 aspect-[4/5] animate-pulse" />
            ))}
            {list.map((a) => (
              <div key={a.id}>
              <Link key={a.slug} to="/artistas/$slug" params={{ slug: a.slug }} className="group relative overflow-hidden rounded-md bg-card aspect-[4/5] block">
                {a.img && <img src={a.img} alt={`Perfil de ${a.name} — artista de ${a.style} en ${a.city}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute top-2 left-2 md:top-3 md:left-3 sticker text-xs">{a.style}</div>
                <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
                  <p className="display text-lg md:text-2xl break-words">{a.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-bone/70 mt-1">{a.city}</p>
                  <span className="mt-2 hidden sm:inline-flex text-xs uppercase tracking-[0.18em] font-semibold border-b border-bcaps-green pb-0.5">Ver perfil →</span>
                </div>
              </Link>
              <Link to="/contacto" search={{ type: "booking", artist: a.id }} className="flex py-3 text-xs font-semibold border-b border-border">Solicitar contratación →</Link>
              </div>
            ))}
            {artists !== null && (
              <Link to="/auth" className="group rounded-md aspect-[4/5] border border-dashed border-white/25 hover:border-bone transition flex flex-col items-center justify-center text-center p-4">
                <span className="display text-4xl group-hover:scale-110 transition">+</span>
                <p className="display text-base md:text-xl mt-3">¿Eres artista?</p>
                <p className="text-xs text-muted-foreground mt-2">Crea tu perfil y aparece en el roster</p>
              </Link>
            )}
          </div>
          {artists !== null && list.length === 0 && (
            <p className="mt-6 text-sm text-muted-foreground">No hay artistas publicados con estos filtros.</p>
          )}
        </div>
      </section>
      <section className="corp-light px-4 md:px-8 py-14">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-center justify-between gap-6">
          <div><h2 className="display text-2xl md:text-3xl">El talento para tu próximo evento</h2><p className="mt-4 text-base">Contrataciones gestionadas por BLACKCAPS EXPERIENCE.</p></div>
          <Link to="/contacto" search={{ type: "booking" }} className="btn btn-corp">Solicitar contratación</Link>
        </div>
      </section>
    </div>
  );
}
