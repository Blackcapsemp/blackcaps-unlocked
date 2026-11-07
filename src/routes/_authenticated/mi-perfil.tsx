import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { signPhotos, slugify, type ArtistProfile } from "@/lib/artists";
import { ArtistProfileForm, artistRow, type ArtistForm } from "@/components/ArtistProfileForm";
import { PrivacyNotice } from "@/components/LegalPage";
import { TermsAcceptance, PublicationAcceptance } from "@/components/ArtistLegalAcceptance";
import { Button } from "@/components/ui/button";
import { canRequestPublication, hasAuthorization, loadAuthorizations, recordAuthorization } from "@/lib/artist-legal";

export const Route = createFileRoute("/_authenticated/mi-perfil")({
  beforeLoad: async () => {
    // Los administradores no gestionan un perfil de artista propio: van al panel.
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { data: r } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", u.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (r) throw redirect({ to: "/admin/artistas", replace: true });
  },
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
  const [legalReady, setLegalReady] = useState(false);
  const [termsRecorded, setTermsRecorded] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [publicationRecorded, setPublicationRecorded] = useState(false);
  const [publicationAccepted, setPublicationAccepted] = useState(false);

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
      if (!r) {
        try {
          const records = await loadAuthorizations(u.user.id);
          setTermsRecorded(hasAuthorization(records, "terms"));
          setPublicationRecorded(hasAuthorization(records, "publication"));
          setLegalReady(true);
        } catch { toast.error("No se pudieron cargar tus autorizaciones. Recarga la página."); }
      }
      if (p) {
        setProfile(p);
        if (p.photo_url) setPreview((await signPhotos([p.photo_url]))[p.photo_url] ?? null);
      }
    })();
  }, []);

  async function save(d: ArtistForm, file: File | null) {
    if (!userId || isAdmin || !legalReady || !canRequestPublication(termsRecorded || termsAccepted, publicationAccepted)) return false;
    setBusy(true);
    try {
      if (!termsRecorded) { await recordAuthorization("terms"); setTermsRecorded(true); }
      await recordAuthorization("publication");
      setPublicationRecorded(true);
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
      setPublicationAccepted(false);
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function acceptTerms() {
    if (!termsAccepted) return;
    setBusy(true);
    try { await recordAuthorization("terms"); setTermsRecorded(true); toast.success("Aceptación registrada"); }
    catch { toast.error("No se pudo registrar la aceptación"); }
    finally { setBusy(false); }
  }

  async function withdrawPublication() {
    if (!window.confirm("¿Retirar la autorización de publicación? Tu perfil dejará de mostrarse en el Roster público; tu cuenta se conserva.")) return;
    setBusy(true);
    try {
      await recordAuthorization("publication", "withdrawn");
      setPublicationRecorded(false); setPublicationAccepted(false);
      setProfile((p) => p ? { ...p, status: "rejected" } : p);
      toast.success("Autorización retirada y perfil retirado del Roster");
    } catch { toast.error("No se pudo retirar la autorización"); }
    finally { setBusy(false); }
  }

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

        {!legalReady ? <p className="mt-6 text-muted-foreground">Cargando autorizaciones…</p> : !termsRecorded ? <div className="mt-8 space-y-4"><TermsAcceptance checked={termsAccepted} onChange={setTermsAccepted} /><Button onClick={acceptTerms} disabled={busy || !termsAccepted} className="btn btn-primary">Guardar aceptación</Button></div> : <>
          <ArtistProfileForm initial={profile} initialPreview={preview} hasPhoto={!!profile?.photo_url} busy={busy}
            legalContent={<PublicationAcceptance checked={publicationAccepted} onChange={setPublicationAccepted} />}
            submitDisabled={!publicationAccepted}
            submitLabel={profile ? "Guardar y enviar a revisión" : "Enviar perfil"} onSubmit={save} />
          {publicationRecorded && <Button variant="ghost" onClick={withdrawPublication} disabled={busy} className="mt-4 underline">Retirar autorización de publicación</Button>}
        </>}
        <PrivacyNotice />
      </div>
    </section>
  );
}
