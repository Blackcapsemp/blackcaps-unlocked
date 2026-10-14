import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { safeUrl, signPhotos, type ArtistProfile } from "@/lib/artists";

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
      if (data?.photo_url) setPhoto((await signPhotos([data.photo_url]))[data.photo_url] ?? null);
    })();
  }, [slug]);

  if (a === undefined) return <section className="pt-40 pb-20 px-4 text-center text-muted-foreground">Cargando…</section>;
  if (!a) return (
    <section className="pt-40 pb-20 px-4 text-center">
      <h1 className="display text-3xl">Artista no encontrado</h1>
      <Link to="/booking" className="btn btn-ghost mt-6">Ver roster</Link>
    </section>
  );

  const links = [["Instagram", a.instagram], ["Spotify", a.spotify], ["SoundCloud", a.soundcloud], ["YouTube", a.youtube]]
    .map(([l, u]) => [l, safeUrl(u)] as const).filter(([, u]) => u);

  return (
    <section className="pt-28 md:pt-36 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-white/5">
          {photo && <img src={photo} alt={`${a.artist_name}, artista de ${a.style} en ${a.city}`} className="w-full h-full object-cover" />}
        </div>
        <div>
          <Link to="/booking" className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-bone">← Volver al roster</Link>
          <div className="mt-6 flex gap-2"><span className="sticker">{a.style}</span></div>
          <h1 className="display text-5xl md:text-7xl mt-5 break-words">{a.artist_name}</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">{a.city}</p>
          <p className="mt-8 text-base md:text-lg text-bone/85 whitespace-pre-line">{a.bio}</p>
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {links.map(([l, u]) => (
                <a key={l} href={u!} target="_blank" rel="noopener noreferrer nofollow" className="px-4 py-2 rounded-full border border-white/20 text-xs uppercase tracking-[0.16em] hover:bg-bone hover:text-ink transition">{l} ↗</a>
              ))}
            </div>
          )}
          <Link to="/contacto" className="btn btn-primary mt-10">Solicitar booking de {a.artist_name}</Link>
        </div>
      </div>
    </section>
  );
}
