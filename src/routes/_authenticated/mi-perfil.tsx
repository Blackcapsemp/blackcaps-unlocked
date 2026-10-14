import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { signPhotos, slugify, type ArtistProfile } from "@/lib/artists";
import { ArtistProfileForm, artistRow, type ArtistForm } from "@/components/ArtistProfileForm";

export const Route = createFileRoute("/_authenticated/mi-perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil de artista — BLACKCAPS" },
      { name: "description", content: "Gestiona tu perfil de artista en BLACKCAPS EXPERIENCE." },
      { property: "og:title", content: "Mi perfil de artista — BLACKCAPS" },
      { property: "og:description", content: "Gestiona tu perfil de artista." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyProfile,
});

const STATUS = {
  pending: { label: "En revisión", cls: "border-amber-400/50 text-amber-300" },
  approved: { label: "Publicado", cls: "border-bcaps-signal text-bcaps-signal" },
  rejected: { label: "No aprobado", cls: "border-destructive text-destructive" },
} as const;

function MyProfile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setUserId(u.user.id);
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("artist_profiles").select("*").eq("user_id", u.user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle(),
      ]);
      setIsAdmin(!!r);
      if (p) {
        setProfile(p);
        if (p.photo_url) setPreview((await signPhotos([p.photo_url]))[p.photo_url] ?? null);
      }
    })();
  }, []);

  async function save(d: ArtistForm, file: File | null) {
    if (!userId) return false;
    setBusy(true);
    try {
      let photo_url = profile?.photo_url ?? null;
      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${userId}/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("artist-photos").upload(path, file, { upsert: true });
        if (error) throw error;
        photo_url = path;
      }
      const row = { ...artistRow(d), photo_url, status: "pending" as const };
      if (profile) {
        const { data, error } = await supabase.from("artist_profiles").update(row).eq("id", profile.id).select().single();
        if (error) throw error;
        setProfile(data);
      } else {
        const slug = `${slugify(d.artist_name) || "artista"}-${userId.slice(0, 4)}`;
        const { data, error } = await supabase.from("artist_profiles").insert({ ...row, user_id: userId, slug }).select().single();
        if (error) throw error;
        setProfile(data);
      }
      toast.success("Perfil enviado. Lo revisaremos y te avisaremos cuando esté publicado.");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
      return false;
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-3 text-base outline-none focus:border-bone focus:ring-2 focus:ring-bone/20 transition";
  const field = (k: keyof Form, label: string, el: React.ReactNode, hint?: string) => (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="mt-2">{el}</div>
      {errors[k] ? <span className="text-xs text-destructive mt-1 block">{errors[k]}</span> : hint ? <span className="text-xs text-muted-foreground mt-1 block">{hint}</span> : null}
    </label>
  );

  return (
    <section className="pt-32 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="sticker">Perfil de artista</span>
            <h1 className="display text-4xl md:text-6xl mt-5">Mi perfil</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {isAdmin && <Link to="/admin/artistas" className="btn btn-ghost">Revisar artistas</Link>}
            {profile?.status === "approved" && (
              <Link to="/artistas/$slug" params={{ slug: profile.slug }} className="btn btn-ghost">Ver mi página</Link>
            )}
          </div>
        </div>

        {profile && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className={`px-3 py-1 rounded-full border text-xs uppercase tracking-[0.14em] ${STATUS[profile.status].cls}`}>{STATUS[profile.status].label}</span>
            <span className="text-muted-foreground">
              {profile.status === "pending" && "Estamos revisando tu perfil."}
              {profile.status === "approved" && "Tu perfil está visible en Booking. Si lo editas, volverá a revisión."}
              {profile.status === "rejected" && "Revisa tu información y vuelve a enviarlo."}
            </span>
          </div>
        )}

        <form onSubmit={save} className="mt-10 grid md:grid-cols-[260px_1fr] gap-8">
          <div>
            <label className="block cursor-pointer group">
              <div className="aspect-[4/5] rounded-2xl border border-dashed border-white/25 overflow-hidden grid place-items-center bg-white/[0.03] group-hover:border-bone transition">
                {preview ? <img src={preview} alt="Foto de perfil" className="w-full h-full object-cover" /> : (
                  <span className="text-sm text-muted-foreground text-center px-6">Toca para subir tu foto<br /><span className="text-xs">JPG/PNG · máx 5 MB</span></span>
                )}
              </div>
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
              {preview && <span className="mt-2 block text-xs text-center text-muted-foreground">Toca para cambiar</span>}
            </label>
          </div>

          <div className="space-y-5">
            {field("artist_name", "Nombre artístico *", <input className={input} value={form.artist_name} onChange={(e) => set("artist_name", e.target.value)} />)}
            <div className="grid sm:grid-cols-2 gap-5">
              {field("style", "Estilo *", (
                <select aria-label="Estilo" className={input} value={form.style} onChange={(e) => set("style", e.target.value as Form["style"])}>
                  {ARTIST_STYLES.map((s) => <option key={s} value={s} className="bg-ink">{s}</option>)}
                </select>
              ))}
              {field("city", "Ciudad *", <input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} />)}
            </div>
            {field("bio", "Biografía *", <textarea rows={5} className={input} value={form.bio} onChange={(e) => set("bio", e.target.value)} />, `${form.bio.length}/2000`)}
            <div className="grid sm:grid-cols-2 gap-5">
              {field("instagram", "Instagram", <input className={input} placeholder="https://instagram.com/…" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} />)}
              {field("spotify", "Spotify", <input className={input} placeholder="https://open.spotify.com/…" value={form.spotify} onChange={(e) => set("spotify", e.target.value)} />)}
              {field("soundcloud", "SoundCloud", <input className={input} placeholder="https://soundcloud.com/…" value={form.soundcloud} onChange={(e) => set("soundcloud", e.target.value)} />)}
              {field("youtube", "YouTube", <input className={input} placeholder="https://youtube.com/…" value={form.youtube} onChange={(e) => set("youtube", e.target.value)} />)}
            </div>
            <button disabled={busy} className="btn btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
              {busy ? "Guardando…" : profile ? "Guardar y enviar a revisión" : "Enviar perfil"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
