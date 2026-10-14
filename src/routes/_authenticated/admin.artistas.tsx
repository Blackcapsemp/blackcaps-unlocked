import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { signPhotos, type ArtistProfile } from "@/lib/artists";

export const Route = createFileRoute("/_authenticated/admin/artistas")({
  head: () => ({
    meta: [
      { title: "Revisión de artistas — BLACKCAPS" },
      { name: "description", content: "Panel interno de aprobación de perfiles de artista." },
      { property: "og:title", content: "Revisión de artistas — BLACKCAPS" },
      { property: "og:description", content: "Panel interno." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminArtists,
});

function AdminArtists() {
  const [list, setList] = useState<ArtistProfile[] | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [allowed, setAllowed] = useState<boolean | null>(null);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", u.user!.id).eq("role", "admin").maybeSingle();
    setAllowed(!!r);
    if (!r) return;
    const { data } = await supabase.from("artist_profiles").select("*").order("created_at", { ascending: false });
    setList(data ?? []);
    setPhotos(await signPhotos((data ?? []).map((a) => a.photo_url)));
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: "approved" | "rejected") {
    const { error } = await supabase.from("artist_profiles").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(status === "approved" ? "Artista publicado" : "Artista rechazado");
    setList((l) => l?.map((a) => (a.id === id ? { ...a, status } : a)) ?? null);
  }

  if (allowed === false) {
    return <section className="pt-40 pb-20 px-4 text-center"><h1 className="display text-3xl">Sin acceso</h1><Link to="/" className="btn btn-ghost mt-6">Volver al inicio</Link></section>;
  }

  return (
    <section className="pt-32 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="display text-4xl md:text-6xl">Revisión de artistas</h1>
        {!list ? <p className="mt-8 text-muted-foreground">Cargando…</p> : list.length === 0 ? <p className="mt-8 text-muted-foreground">Aún no hay perfiles.</p> : (
          <div className="mt-10 space-y-4">
            {list.map((a) => (
              <article key={a.id} className="flex flex-col sm:flex-row gap-5 rounded-2xl border border-white/10 p-4 bg-white/[0.02]">
                <div className="w-full sm:w-32 aspect-[4/5] rounded-xl overflow-hidden bg-white/5 shrink-0">
                  {a.photo_url && photos[a.photo_url] && <img src={photos[a.photo_url]} alt={a.artist_name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="display text-2xl">{a.artist_name}</p>
                    <span className="text-xs uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border border-white/20">{a.status}</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{a.style} · {a.city}</p>
                  <p className="mt-3 text-sm text-bone/80 line-clamp-3">{a.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => setStatus(a.id, "approved")} disabled={a.status === "approved"} className="btn btn-primary disabled:opacity-40">Aprobar</button>
                    <button onClick={() => setStatus(a.id, "rejected")} disabled={a.status === "rejected"} className="btn btn-ghost disabled:opacity-40">Rechazar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
