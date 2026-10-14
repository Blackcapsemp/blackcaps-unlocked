import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ARTIST_STYLES, type ArtistProfile } from "@/lib/artists";

const url = z.string().trim().max(300).url("Enlace no válido").or(z.literal(""));
export const artistSchema = z.object({
  artist_name: z.string().trim().min(1, "Indica el nombre artístico").max(80),
  style: z.enum(ARTIST_STYLES),
  city: z.string().trim().min(1, "Indica la ciudad").max(80),
  bio: z.string().trim().min(20, "Cuéntanos algo más (mín. 20 caracteres)").max(2000),
  instagram: url,
  spotify: url,
  soundcloud: url,
  youtube: url,
});
export type ArtistForm = z.infer<typeof artistSchema>;
const empty: ArtistForm = { artist_name: "", style: "DJ", city: "", bio: "", instagram: "", spotify: "", soundcloud: "", youtube: "" };

export function toArtistForm(p: ArtistProfile): ArtistForm {
  return {
    artist_name: p.artist_name, style: (ARTIST_STYLES as readonly string[]).includes(p.style) ? (p.style as ArtistForm["style"]) : "DJ",
    city: p.city, bio: p.bio, instagram: p.instagram ?? "", spotify: p.spotify ?? "", soundcloud: p.soundcloud ?? "", youtube: p.youtube ?? "",
  };
}

/** Converts validated form data to the DB columns (empty links -> null). */
export function artistRow(d: ArtistForm) {
  return {
    artist_name: d.artist_name, style: d.style, city: d.city, bio: d.bio,
    instagram: d.instagram || null, spotify: d.spotify || null, soundcloud: d.soundcloud || null, youtube: d.youtube || null,
  };
}

type Props = {
  initial: ArtistProfile | null;
  initialPreview: string | null;
  hasPhoto: boolean;
  busy: boolean;
  submitLabel: string;
  onSubmit: (data: ArtistForm, file: File | null) => Promise<boolean>;
};

export function ArtistProfileForm({ initial, initialPreview, hasPhoto, busy, submitLabel, onSubmit }: Props) {
  const [form, setForm] = useState<ArtistForm>(initial ? toArtistForm(initial) : empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ArtistForm, string>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview);

  useEffect(() => { setForm(initial ? toArtistForm(initial) : empty); }, [initial]);
  useEffect(() => { setPreview(initialPreview); }, [initialPreview]);

  function set<K extends keyof ArtistForm>(k: K, v: ArtistForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function pickFile(f: File | undefined) {
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Sube una imagen (JPG o PNG)");
    if (f.size > 5 * 1024 * 1024) return toast.error("La imagen debe pesar menos de 5 MB");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = artistSchema.safeParse(form);
    if (!parsed.success) {
      const errs: typeof errors = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as keyof ArtistForm] = i.message));
      setErrors(errs);
      toast.error("Revisa los campos marcados");
      return;
    }
    if (!file && !hasPhoto) return toast.error("Añade una foto para el perfil");
    if (await onSubmit(parsed.data, file)) setFile(null);
  }

  const input = "w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-3 text-base outline-none focus:border-bone focus:ring-2 focus:ring-bone/20 transition";
  const field = (k: keyof ArtistForm, label: string, el: React.ReactNode, hint?: string) => (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="mt-2">{el}</div>
      {errors[k] ? <span className="text-xs text-destructive mt-1 block">{errors[k]}</span> : hint ? <span className="text-xs text-muted-foreground mt-1 block">{hint}</span> : null}
    </label>
  );

  return (
    <form onSubmit={submit} className="mt-10 grid md:grid-cols-[260px_1fr] gap-8">
      <div>
        <label className="block cursor-pointer group">
          <div className="aspect-[4/5] rounded-2xl border border-dashed border-white/25 overflow-hidden grid place-items-center bg-white/[0.03] group-hover:border-bone transition">
            {preview ? <img src={preview} alt="Foto de perfil" className="w-full h-full object-cover" /> : (
              <span className="text-sm text-muted-foreground text-center px-6">Toca para subir la foto<br /><span className="text-xs">JPG/PNG · máx 5 MB</span></span>
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
            <select aria-label="Estilo" className={input} value={form.style} onChange={(e) => set("style", e.target.value as ArtistForm["style"])}>
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
          {busy ? "Guardando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
