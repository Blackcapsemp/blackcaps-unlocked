import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { displayPhotos, safeUrl, type ArtistProfile } from "@/lib/artists";
import { toast } from "sonner";

export const Route = createFileRoute("/artistas/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Artista BLACKCAPS` },
      { name: "description", content: "Perfil de artista disponible para booking con BLACKCAPS EXPERIENCE." },
      { property: "og:title", content: `${params.slug} — Booking BLACKCAPS` },
      { property: "og:description", content: "Perfil de artista disponible para booking." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `https://blackcaps.es/artistas/${params.slug}` }],
  }),
  component: ArtistPage,
});

function ArtistPage() {
  const { slug } = Route.useParams();
  const [a, setA] = useState<ArtistProfile | null | undefined>(undefined);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("artist_profiles").select("*").eq("slug", slug).eq("status", "approved").maybeSingle();
      setA(data);
      if (data?.photo_url) setPhoto((await displayPhotos([data]))[data.photo_url] ?? null);
    })();
  }, [slug]);

  if (a === undefined) return <section className="pt-40 pb-20 px-4 text-center text-muted-foreground">Cargando…</section>;
  if (!a) return (
    <section className="pt-40 pb-20 px-4 text-center">
      <h1 className="display text-3xl">Artista no encontrado</h1>
      <Link to="/booking" className="btn btn-ghost mt-6">Ver roster</Link>
    </section>
  );

  // Solo contenido artístico (escuchar/ver trabajos). Redes de contacto como
  // Instagram siguen guardadas pero no se muestran en la ficha pública.
  const links = [["Spotify", a.spotify], ["SoundCloud", a.soundcloud], ["YouTube", a.youtube]]
    .map(([l, u]) => [l, safeUrl(u)] as const).filter(([, u]) => u);

  // Presskit público: solo se muestra si existe una URL válida en la ficha.
  const presskit = safeUrl((a as { presskit_url?: string | null }).presskit_url ?? null);

  const shareProfile = async () => {
    const url = window.location.href;
    const shareData = { title: `${a.artist_name} — BLACKCAPS EXPERIENCE`, text: `Perfil y presskit de ${a.artist_name}`, url };
    if (navigator.share) {
      try { await navigator.share(shareData); return; } catch (e) { if ((e as DOMException).name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace del perfil copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <section className="pt-28 md:pt-36 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/booking" className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-bone">← Volver al roster</Link>

        <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-white/5">
            {photo && <img src={photo} alt={`${a.artist_name}, artista de ${a.style} en ${a.city}`} className="w-full h-full object-cover" />}
          </div>
          <div>
            <div className="flex gap-2"><span className="sticker">{a.style}</span></div>
            <h1 className="display text-5xl md:text-7xl mt-5 break-words">{a.artist_name}</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">{a.city}</p>
            <p className="mt-8 text-base md:text-lg text-bone/85 whitespace-pre-line">{a.bio}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contacto" search={{ type: "booking", artist: a.id }} className="btn btn-primary">Solicitar contratación</Link>
              <button type="button" onClick={shareProfile} className="btn btn-ghost">Compartir perfil / Presskit</button>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Solicitudes de contratación gestionadas por BLACKCAPS EXPERIENCE
            </p>

            {links.length > 0 && (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Música y redes</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {links.map(([l, u]) => (
                    <a key={l} href={u!} target="_blank" rel="noopener noreferrer nofollow" className="px-4 py-2 rounded-full border border-white/20 text-xs uppercase tracking-[0.16em] text-bone/70 hover:bg-bone hover:text-ink transition">{l} ↗</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {presskit && (
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Presskit profesional</p>
              <p className="mt-2 text-bone/85">Información comercial y material promocional de {a.artist_name}.</p>
            </div>
            <a href={presskit} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Descargar presskit (PDF) ↗</a>
          </div>
        )}
      </div>
    </section>
  );
}
