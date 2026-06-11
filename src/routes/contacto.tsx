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
      { property: "og:url", content: "https://blackcaps.es/contacto" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/contacto" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "BLACKCAPS EXPERIENCE",
          url: "https://blackcaps.es/contacto",
          email: "info@blackcaps.es",
          telephone: ["+34686068968", "+34722129948"],
          areaServed: ["Madrid", "Valencia", "Barcelona", "España"],
          address: [
            { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
            { "@type": "PostalAddress", addressLocality: "Valencia", addressCountry: "ES" },
            { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
          ],
          openingHours: "Mo-Fr 10:00-19:00",
          sameAs: ["https://instagram.com/Blackcaps.emp"],
        }),
      },
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

  const currentTab = TABS.find((t) => t.id === type)!;
  const stepIndex = TABS.findIndex((t) => t.id === type) + 1;

  return (
    <>
      <section className="relative pt-40 pb-10 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60"
             style={{ backgroundImage: "radial-gradient(900px 380px at 75% 10%, oklch(0.74 0.18 152 / 0.10), transparent 60%), radial-gradient(700px 320px at 5% 90%, oklch(0.58 0.22 265 / 0.10), transparent 60%)" }} />
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="sticker">Contacto</span>
            <span className="sticker" style={{ borderColor: "var(--bcaps-green)", color: "var(--bcaps-green)" }}>B2B · Booking · Artists</span>
            <span className="text-xs uppercase tracking-[0.2em] text-bone/50">Respuesta &lt; 48h</span>
          </div>
          <h1 className="display text-[9vw] md:text-[8.5vw] leading-[0.9] mt-2 max-w-[14ch]">
            Hablemos de <span className="text-gradient-bcaps">tu próximo</span> proyecto.
          </h1>
          <p className="mt-6 max-w-xl text-sm md:text-lg text-bone/75 leading-relaxed">
            Cuéntanos qué necesitas — propuesta creativa o petición de presupuesto — y te respondemos en menos de 48h hábiles.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar info */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-6 md:p-7 space-y-7 sticky top-28">
              <div>
                <p className="display text-base text-bone/90">Contacto directo</p>
                <div className="h-px bg-white/10 mt-3" />
              </div>

              <ContactItem label="Email" value="info@blackcaps.es" href="mailto:info@blackcaps.es" />
              <ContactItem label="Instagram" value="@Blackcaps.emp" href="https://instagram.com/Blackcaps.emp" />

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-bcaps-green">Teléfono</p>
                <p className="mt-2 text-bone text-lg tabular-nums">686 06 88 968</p>
                <p className="text-bone/80 text-lg tabular-nums">722 12 99 48</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-bcaps-green">Oficinas</p>
                <p className="mt-2 text-bone/90 leading-relaxed">Madrid · Valencia<br />Barcelona · España</p>
              </div>

              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-bone/50 mb-2">Horario</p>
                <p className="text-sm text-bone/75">Lun – Vie · 10:00 – 19:00 CET</p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">

            {/* Tabs */}
            <div className="grid sm:grid-cols-3 gap-2 mb-8">
              {TABS.map((t, i) => {
                const active = t.id === type;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => { setType(t.id); setErrors({}); setSent(false); }}
                    className={`group relative text-left rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${active ? "border-bcaps-green bg-bcaps-green/[0.07] glow-green" : "border-white/10 bg-card/60 hover:border-white/25"}`}
                  >
                    <div className="flex items-center mb-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-bcaps-green" : "bg-bone/20"}`} />
                    </div>
                    <p className={`text-[13px] md:text-[15px] font-semibold leading-snug ${active ? "text-bone" : "text-bone/90"}`}>{t.label}</p>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-bone/55 mt-2">{t.sub}</p>
                  </button>
                );
              })}
            </div>

            {sent ? (
              <div className="rounded-2xl border border-bcaps-green/40 bg-bcaps-green/[0.06] p-10 text-center glow-green">
                <span className="stamp">Recibido</span>
                <h2 className="display text-3xl md:text-5xl mt-6">¡Mensaje en camino!</h2>
                <p className="mt-4 text-bone/80 max-w-md mx-auto leading-relaxed">
                  Hemos guardado tu solicitud. Te responderemos en menos de 48h hábiles desde info@blackcaps.es.
                </p>
                <button onClick={() => setSent(false)} className="btn btn-ghost mt-8">Enviar otra solicitud →</button>
              </div>
            ) : (
              <form
                key={type}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-6 md:p-9"
              >
                <FormSection step="02" title="Tus datos" subtitle="Cómo te localizamos">
                  <Field label="Nombre*" name="name" error={errors.name} />
                  <Field label="Email*" name="email" type="email" error={errors.email} />
                  <Field label="Teléfono*" name="phone" error={errors.phone} />
                  <Field label="Ciudad*" name="city" error={errors.city} />
                </FormSection>

                <FormSection step="03" title={`Detalles · ${currentTab.label}`} subtitle={currentTab.sub}>
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
                </FormSection>

                <FormSection step="04" title="Tu mensaje" subtitle="Cuanto más detalle, mejor propuesta" last>
                  <TextareaField label="Mensaje*" name="message" rows={5} full error={errors.message} />
                </FormSection>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-bone/55 max-w-xs leading-relaxed">
                    Envíanos tu propuesta o pide un presupuesto sin compromiso. Respondemos en &lt; 48h hábiles.
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-accent disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {sending ? "Enviando…" : "Enviar propuesta / pedir presupuesto"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
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

/* ---------- Sidebar item ---------- */

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-bcaps-green">{label}</p>
      <a href={href} className="mt-2 inline-flex items-center gap-2 text-bone text-lg hover:text-bcaps-green transition-colors group">
        {value}
        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
      </a>
    </div>
  );
}

/* ---------- Form section ---------- */

function FormSection({
  step, title, subtitle, children, last,
}: { step: string; title: string; subtitle?: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "pb-7 mb-7 border-b border-white/10"}>
      <div className="flex items-baseline gap-3 mb-5">
        <span className="text-[10px] tabular-nums tracking-[0.22em] text-bcaps-green">{step}</span>
        <div>
          <p className="display text-base md:text-lg text-bone">{title}</p>
          {subtitle && <p className="text-[11px] uppercase tracking-[0.18em] text-bone/50 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-5">{children}</div>
    </div>
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
        className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 mt-2 text-bone placeholder:text-bone/30 outline-none transition-all focus:bg-white/[0.06] focus:ring-2 focus:ring-bcaps-green/20 ${error ? "border-destructive" : "border-white/10 focus:border-bcaps-green/60"}`}
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
        className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 mt-2 text-bone placeholder:text-bone/30 outline-none resize-none transition-all focus:bg-white/[0.06] focus:ring-2 focus:ring-bcaps-green/20 ${error ? "border-destructive" : "border-white/10 focus:border-bcaps-green/60"}`}
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
        aria-label={label}
        defaultValue=""
        className={`w-full bg-white/[0.03] border rounded-lg px-4 py-3 mt-2 text-bone outline-none transition-all focus:bg-white/[0.06] focus:ring-2 focus:ring-bcaps-green/20 ${error ? "border-destructive" : "border-white/10 focus:border-bcaps-green/60"}`}
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
