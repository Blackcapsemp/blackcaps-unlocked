import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ARTIST_STYLES, safeUrl, signPhotos, slugify, type ArtistProfile } from "@/lib/artists";
import { ArtistProfileForm, artistRow, type ArtistForm } from "@/components/ArtistProfileForm";

export const Route = createFileRoute("/_authenticated/admin/artistas")({
  head: () => ({
    meta: [
      { title: "BCAPSTUDIO.EMP Artist Manager — BLACKCAPS" },
      { name: "description", content: "Panel interno de gestión y aprobación de artistas." },
      { property: "og:title", content: "BCAPSTUDIO.EMP Artist Manager" },
      { property: "og:description", content: "Panel interno." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminArtists,
});

type Status = ArtistProfile["status"];
const STATUS_LABEL: Record<Status, string> = { pending: "Pendiente", approved: "Aprobado", rejected: "Rechazado" };

function AdminArtists() {
  const [list, setList] = useState<ArtistProfile[] | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatusFilter] = useState<Status | "all">("all");
  const [style, setStyle] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [selected, setSelected] = useState<ArtistProfile | null>(null);
  const [editing, setEditing] = useState<ArtistProfile | "new" | null>(null);
  const [saving, setSaving] = useState(false);

  // Admin create/edit. Admin photo uploads always go to the "manual/" folder (admin-only write).
  async function saveArtist(d: ArtistForm, file: File | null) {
    const current = editing === "new" ? null : editing;
    setSaving(true);
    try {
      let photo_url = current?.photo_url ?? null;
      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `manual/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("artist-photos").upload(path, file);
        if (error) throw error;
        photo_url = path;
      }
      const row = { ...artistRow(d), photo_url };
      if (current) {
        const { error } = await supabase.from("artist_profiles").update(row).eq("id", current.id);
        if (error) throw error;
        toast.success("Artista actualizado");
      } else {
        const slug = `${slugify(d.artist_name) || "artista"}-${crypto.randomUUID().slice(0, 4)}`;
        const { error } = await supabase.from("artist_profiles").insert({ ...row, slug, user_id: null, status: "pending" });
        if (error) throw error;
        toast.success("Artista creado como pendiente");
      }
      setEditing(null);
      setSelected(null);
      await load();
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
      return false;
    } finally {
      setSaving(false);
    }
  }

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

  async function setStatus(id: string, s: "approved" | "rejected") {
    const { error } = await supabase.from("artist_profiles").update({ status: s }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(s === "approved" ? "Artista publicado" : "Artista rechazado");
    setList((l) => l?.map((a) => (a.id === id ? { ...a, status: s } : a)) ?? null);
    setSelected((a) => (a && a.id === id ? { ...a, status: s } : a));
  }

  const counts = useMemo(() => {
    const l = list ?? [];
    return {
      total: l.length,
      pending: l.filter((a) => a.status === "pending").length,
      approved: l.filter((a) => a.status === "approved").length,
      rejected: l.filter((a) => a.status === "rejected").length,
    };
  }, [list]);

  const styles = useMemo(() => Array.from(new Set([...ARTIST_STYLES, ...(list ?? []).map((a) => a.style)])), [list]);
  const cities = useMemo(() => Array.from(new Set((list ?? []).map((a) => a.city))).sort(), [list]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (list ?? []).filter((a) =>
      (status === "all" || a.status === status) &&
      (style === "all" || a.style === style) &&
      (city === "all" || a.city === city) &&
      (!term || [a.artist_name, a.city, a.style, a.bio].some((v) => v?.toLowerCase().includes(term))),
    );
  }, [list, q, status, style, city]);

  if (allowed === false) {
    return <section className="pt-40 pb-20 px-4 text-center"><h1 className="display text-3xl">Sin acceso</h1><Link to="/" className="btn btn-ghost mt-6">Volver al inicio</Link></section>;
  }

  const cards: { key: Status | "all"; label: string; value: number }[] = [
    { key: "all", label: "Total", value: counts.total },
    { key: "pending", label: "Pendientes", value: counts.pending },
    { key: "approved", label: "Aprobados", value: counts.approved },
    { key: "rejected", label: "Rechazados", value: counts.rejected },
  ];
  const selectCls = "rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm focus:outline-none focus:border-white/40";

  return (
    <section className="pt-32 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">BCAPSTUDIO.EMP</p>
        <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
          <h1 className="display text-3xl md:text-5xl">Artist Manager</h1>
          {allowed && <button onClick={() => setEditing("new")} className="btn btn-primary">+ Añadir artista</button>}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((c) => (
            <button key={c.key} onClick={() => setStatusFilter(c.key)}
              className={`text-left rounded-2xl border p-4 md:p-5 transition hover:border-white/40 ${status === c.key ? "border-white/50 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{c.label}</p>
              <p className="display text-3xl md:text-4xl mt-2">{list ? c.value : "—"}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre, ciudad, estilo…" aria-label="Buscar artistas"
            className="flex-1 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-sm focus:outline-none focus:border-white/40" />
          <select aria-label="Estado" value={status} onChange={(e) => setStatusFilter(e.target.value as Status | "all")} className={selectCls}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobados</option>
            <option value="rejected">Rechazados</option>
          </select>
          <select aria-label="Estilo" value={style} onChange={(e) => setStyle(e.target.value)} className={selectCls}>
            <option value="all">Todos los estilos</option>
            {styles.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select aria-label="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
            <option value="all">Todas las ciudades</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {!list ? <p className="mt-8 text-muted-foreground">Cargando…</p> : filtered.length === 0 ? <p className="mt-8 text-muted-foreground">No hay artistas con estos filtros.</p> : (
          <div className="mt-6 space-y-3">
            <p className="text-xs text-muted-foreground">{filtered.length} resultado(s)</p>
            {filtered.map((a) => (
              <article key={a.id} className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-white/10 p-4 bg-white/[0.02]">
                <button onClick={() => setSelected(a)} className="w-full sm:w-24 aspect-[4/5] rounded-xl overflow-hidden bg-white/5 shrink-0">
                  {a.photo_url && photos[a.photo_url] && <img src={photos[a.photo_url]} alt={a.artist_name} className="w-full h-full object-cover" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="display text-xl md:text-2xl break-words">{a.artist_name}</p>
                    <StatusBadge s={a.status} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{a.style} · {a.city} · {new Date(a.created_at).toLocaleDateString("es-ES")}</p>
                  <p className="mt-2 text-sm text-bone/80 line-clamp-2">{a.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={() => setSelected(a)} className="btn btn-ghost">Ver ficha</button>
                    <button onClick={() => setEditing(a)} className="btn btn-ghost">Editar</button>
                    <button onClick={() => setStatus(a.id, "approved")} disabled={a.status === "approved"} className="btn btn-primary disabled:opacity-40">Aprobar</button>
                    <button onClick={() => setStatus(a.id, "rejected")} disabled={a.status === "rejected"} className="btn btn-ghost disabled:opacity-40">Rechazar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={`Ficha de ${selected.artist_name}`}>
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-ink p-5 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <StatusBadge s={selected.status} />
                {!selected.user_id && <span className="ml-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">Perfil manual</span>}
                <h2 className="display text-3xl md:text-4xl mt-3 break-words">{selected.artist_name}</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{selected.style} · {selected.city}</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Cerrar" className="text-2xl leading-none px-2 hover:opacity-70">×</button>
            </div>
            <div className="mt-6 grid md:grid-cols-[200px_1fr] gap-6">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
                {selected.photo_url && photos[selected.photo_url] && <img src={photos[selected.photo_url]} alt={selected.artist_name} className="w-full h-full object-cover" />}
              </div>
              <div className="space-y-4 text-sm">
                <Field label="Biografía"><p className="whitespace-pre-line text-bone/85">{selected.bio || "—"}</p></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Enlace público">{selected.status === "approved" ? <Link to="/artistas/$slug" params={{ slug: selected.slug }} className="underline">/artistas/{selected.slug}</Link> : <span className="text-muted-foreground">No publicado</span>}</Field>
                  <Field label="Alta">{new Date(selected.created_at).toLocaleString("es-ES")}</Field>
                  <Field label="Última actualización">{new Date(selected.updated_at).toLocaleString("es-ES")}</Field>
                </div>
                <Field label="Redes y música">
                  <div className="flex flex-wrap gap-2">
                    {([["Instagram", selected.instagram], ["Spotify", selected.spotify], ["SoundCloud", selected.soundcloud], ["YouTube", selected.youtube]] as const)
                      .map(([l, u]) => [l, safeUrl(u)] as const).filter(([, u]) => u)
                      .map(([l, u]) => <a key={l} href={u!} target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-[0.14em] hover:bg-bone hover:text-ink transition">{l} ↗</a>)}
                    {![selected.instagram, selected.spotify, selected.soundcloud, selected.youtube].some(Boolean) && <span className="text-muted-foreground">Sin enlaces</span>}
                  </div>
                </Field>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <button onClick={() => setStatus(selected.id, "approved")} disabled={selected.status === "approved"} className="btn btn-primary disabled:opacity-40">Aprobar</button>
              <button onClick={() => setStatus(selected.id, "rejected")} disabled={selected.status === "rejected"} className="btn btn-ghost disabled:opacity-40">Rechazar</button>
              <button onClick={() => setEditing(selected)} className="btn btn-ghost">Editar</button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4" onClick={() => !saving && setEditing(null)} role="dialog" aria-modal="true" aria-label={editing === "new" ? "Añadir artista" : `Editar ${editing.artist_name}`}>
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-ink p-5 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="display text-3xl md:text-4xl">{editing === "new" ? "Añadir artista" : `Editar ${editing.artist_name}`}</h2>
                <p className="text-sm text-muted-foreground mt-1">{editing === "new" ? "Se creará como «Pendiente», sin cuenta asociada. Apruébalo para publicarlo en Booking." : "Los cambios se guardan manteniendo el estado actual."}</p>
              </div>
              <button onClick={() => setEditing(null)} aria-label="Cerrar" className="text-2xl leading-none px-2 hover:opacity-70">×</button>
            </div>
            <ArtistProfileForm initial={editing === "new" ? null : editing}
              initialPreview={editing !== "new" && editing.photo_url ? photos[editing.photo_url] ?? null : null}
              hasPhoto={editing !== "new" && !!editing.photo_url} busy={saving}
              submitLabel={editing === "new" ? "Crear artista" : "Guardar cambios"} onSubmit={saveArtist} />
          </div>
        </div>
      )}
    </section>
  );
}

function StatusBadge({ s }: { s: Status }) {
  return <span className="text-xs uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border border-white/20">{STATUS_LABEL[s]}</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1">{label}</p>{children}</div>;
}
