import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Contacta con Blackcaps Experience: contacto general, booking de artistas o aplicación a BCAPSTUDIO. Madrid · Valencia · Barcelona." },
      { property: "og:title", content: "Contacto — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "¿Creamos algo juntos? Cuéntanos qué necesitas." },
    ],
  }),
  component: ContactoPage,
});

type RequestType = "general" | "booking" | "artist";

const baseSchema = z.object({
  name: z.string().trim().min(1, "Nombre obligatorio").max(120),
  email: z.string().trim().email("Email inválido").max(320),
  phone: z.string().trim().min(5, "Teléfono obligatorio").max(40),
  city: z.string().trim().min(1, "Ciudad obligatoria").max(120),
  message: z.string().trim().min(10, "Cuéntanos algo más (mín. 10 caracteres)").max(5000),
});

const generalSchema = baseSchema.extend({
  company: z.string().trim().min(1, "Empresa obligatoria").max(200),
  service: z.string().trim().min(1, "Selecciona un servicio"),
  date: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
});

const bookingSchema = baseSchema.extend({
  eventType: z.string().trim().min(1, "Tipo de evento obligatorio").max(120),
  eventDate: z.string().trim().min(1, "Fecha obligatoria").max(40),
  eventCity: z.string().trim().min(1, "Ciudad del evento obligatoria").max(120),
  attendees: z.string().trim().min(1, "Indica nº de asistentes").max(20),
  artistType: z.string().trim().min(1, "Tipo de artista obligatorio").max(120),
  budget: z.string().trim().min(1, "Presupuesto obligatorio").max(40),
  technicalNeeds: z.string().trim().max(2000).optional().or(z.literal("")),
});

const artistSchema = baseSchema.extend({
  artistName: z.string().trim().min(1, "Nombre artístico obligatorio").max(120),
  socials: z.string().trim().min(1, "Indica al menos una red").max(500),
  musicLinks: z.string().trim().min(1, "Añade un link de música").max(500),
  projectType: z.string().trim().min(1, "Tipo de proyecto obligatorio").max(120),
  serviceRequested: z.string().trim().min(1, "Selecciona un servicio"),
});

const TABS: { id: RequestType; label: string; sub: string }[] = [
  { id: "general", label: "Contacto general", sub: "Empresas · marcas · partners" },
  { id: "booking", label: "Booking de artistas", sub: "Eventos · festivales · privados" },
  { id: "artist", label: "Soy artista / BCAPSTUDIO", sub: "Sello · management · producción" },
];

function ContactoPage() {
  const [type, setType] = useState<RequestType>("general");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;

    const schema = type === "general" ? generalSchema : type === "booking" ? bookingSchema : artistSchema;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "");
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      toast.error("Revisa los campos marcados");
      return;
    }

    const { name, email, phone, city, message, ...rest } = parsed.data as Record<string, string>;
    setSending(true);
    const { error } = await supabase.from("contact_submissions").insert({
      request_type: type,
      name, email, phone, city, message,
      payload: rest,
    });
    setSending(false);

    if (error) {
      toast.error("No se pudo enviar. Inténtalo de nuevo.");
      return;
    }
    setSent(true);
    toast.success("Solicitud enviada. Te respondemos en <48h.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <section className="relative pt-44 pb-12 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Contacto · B2B & Artists</span>
          <h1 className="display text-[16vw] md:text-[12vw] leading-[0.85] mt-4">
            ¿CREAMOS<br /><span className="text-gradient-bcaps">ALGO JUNTOS?</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-bone/85">
            Elige el tipo de solicitud y cuéntanos los detalles. Te respondemos en menos de 48h hábiles.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px] grid lg:grid-cols-12 gap-10">
          {/* Sidebar info */}
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-bcaps-green">Email</p>
              <a href="mailto:info@blackcaps.es" className="display text-2xl md:text-3xl block mt-2 hover:text-bcaps-green transition">info@blackcaps.es</a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-bcaps-green">Instagram</p>
              <a href="https://instagram.com/Blackcaps.emp" className="display text-2xl md:text-3xl block mt-2 hover:text-bcaps-green transition">@Blackcaps.emp</a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-bcaps-green">Teléfono</p>
              <p className="display text-xl mt-2">686 06 88 968</p>
              <p className="display text-xl">722 12 99 48</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-bcaps-green">Ubicación</p>
              <p className="display text-xl mt-2">Madrid · Valencia<br />Barcelona · España</p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className="grid sm:grid-cols-3 gap-2 mb-6">
              {TABS.map((t) => {
                const active = t.id === type;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => { setType(t.id); setErrors({}); setSent(false); }}
                    className={`text-left rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${active ? "border-bcaps-green bg-bcaps-green/10 glow-green" : "border-white/15 bg-card hover:border-white/30"}`}
                  >
                    <p className={`display text-sm md:text-base ${active ? "text-bcaps-green" : "text-bone"}`}>{t.label}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-bone/60 mt-1">{t.sub}</p>
                  </button>
                );
              })}
            </div>

            {sent ? (
              <div className="rounded-3xl border border-bcaps-green/40 bg-bcaps-green/5 p-10 text-center glow-green">
                <span className="stamp">Recibido</span>
                <h2 className="display text-3xl md:text-5xl mt-6">¡Mensaje en camino!</h2>
                <p className="mt-4 text-bone/80 max-w-md mx-auto">
                  Hemos guardado tu solicitud. Te responderemos en menos de 48h hábiles desde info@blackcaps.es.
                </p>
                <button onClick={() => setSent(false)} className="btn btn-ghost mt-8">Enviar otra solicitud →</button>
              </div>
            ) : (
              <form
                key={type}
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/15 bg-card p-6 md:p-10 grid md:grid-cols-2 gap-5"
              >
                <Field label="Nombre*" name="name" error={errors.name} />
                <Field label="Email*" name="email" type="email" error={errors.email} />
                <Field label="Teléfono*" name="phone" error={errors.phone} />
                <Field label="Ciudad*" name="city" error={errors.city} />

                {type === "general" && (
                  <>
                    <Field label="Empresa*" name="company" error={errors.company} />
                    <SelectField
                      label="Servicio interesado*"
                      name="service"
                      error={errors.service}
                      options={["Producción audiovisual", "Servicios técnicos", "Desarrollo web", "Branding", "Empresa Amiga / partner", "Otro"]}
                    />
                    <Field label="Fecha aproximada" name="date" placeholder="MM/AAAA" />
                    <Field label="Presupuesto" name="budget" placeholder="€" />
                  </>
                )}

                {type === "booking" && (
                  <>
                    <Field label="Tipo de evento*" name="eventType" placeholder="Festival, club, privado…" error={errors.eventType} />
                    <Field label="Fecha del evento*" name="eventDate" placeholder="DD/MM/AAAA" error={errors.eventDate} />
                    <Field label="Ciudad del evento*" name="eventCity" error={errors.eventCity} />
                    <Field label="Nº de asistentes*" name="attendees" placeholder="500" error={errors.attendees} />
                    <Field label="Tipo de artista*" name="artistType" placeholder="DJ, banda, solista…" error={errors.artistType} />
                    <Field label="Presupuesto*" name="budget" placeholder="€" error={errors.budget} />
                    <TextareaField label="Necesidades técnicas" name="technicalNeeds" rows={4} full />
                  </>
                )}

                {type === "artist" && (
                  <>
                    <Field label="Nombre artístico*" name="artistName" error={errors.artistName} />
                    <Field label="Redes sociales*" name="socials" placeholder="@instagram, @tiktok…" error={errors.socials} />
                    <Field label="Links de música*" name="musicLinks" placeholder="Spotify, SoundCloud, YouTube…" full error={errors.musicLinks} />
                    <Field label="Tipo de proyecto*" name="projectType" placeholder="EP, single, álbum, live…" error={errors.projectType} />
                    <SelectField
                      label="Servicio solicitado*"
                      name="serviceRequested"
                      error={errors.serviceRequested}
                      options={["Sello discográfico (BCAPSTUDIO)", "Management", "Producción musical", "Distribución", "Booking", "Otro"]}
                    />
                  </>
                )}

                <TextareaField label="Mensaje*" name="message" rows={5} full error={errors.message} />

                <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap pt-2">
                  <p className="text-xs text-bone/60">Te respondemos en menos de 48h hábiles.</p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-accent disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Enviando…" : "Enviar propuesta →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Field primitives ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs uppercase tracking-[0.18em] text-bone/70">{children}</span>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="block mt-1 text-xs text-destructive">{msg}</span>;
}

function Field({
  label, name, type = "text", placeholder, error, full,
}: { label: string; name: string; type?: string; placeholder?: string; error?: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-transparent border rounded-xl px-4 py-3 mt-2 outline-none transition-colors ${error ? "border-destructive focus:border-destructive" : "border-white/20 focus:border-bcaps-green"}`}
      />
      <FieldError msg={error} />
    </label>
  );
}

function TextareaField({
  label, name, rows = 4, error, full,
}: { label: string; name: string; rows?: number; error?: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <Label>{label}</Label>
      <textarea
        name={name}
        rows={rows}
        className={`w-full bg-transparent border rounded-xl px-4 py-3 mt-2 outline-none resize-none transition-colors ${error ? "border-destructive focus:border-destructive" : "border-white/20 focus:border-bcaps-green"}`}
      />
      <FieldError msg={error} />
    </label>
  );
}

function SelectField({
  label, name, options, error,
}: { label: string; name: string; options: string[]; error?: string }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select
        name={name}
        defaultValue=""
        className={`w-full bg-transparent border rounded-xl px-4 py-3 mt-2 outline-none transition-colors ${error ? "border-destructive focus:border-destructive" : "border-white/20 focus:border-bcaps-green"}`}
      >
        <option value="" disabled className="bg-ink">Selecciona una opción…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">{o}</option>
        ))}
      </select>
      <FieldError msg={error} />
    </label>
  );
}
