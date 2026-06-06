import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Contacta con Blackcaps Experience. Producción audiovisual, booking, soluciones digitales, sello discográfico y colaboraciones. Madrid · Valencia · Barcelona." },
      { property: "og:title", content: "Contacto — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "¿Creamos algo juntos? Cuéntanos qué necesitas." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="relative pt-44 pb-16 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Contacto · B2B & Artists</span>
          <h1 className="display text-[16vw] md:text-[12vw] leading-[0.85] mt-4">
            ¿CREAMOS<br /><span className="text-gradient-bcaps">ALGO JUNTOS?</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-bone/85">
            Cuéntanos qué necesitas: producción audiovisual, soporte técnico, booking artístico, desarrollo web, sello discográfico o una colaboración cultural.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-8">
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
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="md:col-span-8 rounded-3xl border border-white/15 bg-card p-6 md:p-10 grid md:grid-cols-2 gap-5"
          >
            <Field label="Nombre" name="name" />
            <Field label="Empresa / artista" name="company" />
            <Field label="Email" name="email" type="email" />
            <Field label="Teléfono" name="phone" />
            <div className="md:col-span-2">
              <Label>Tipo de proyecto</Label>
              <select name="type" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 mt-2 focus:border-bcaps-green outline-none">
                {["Producción audiovisual","Servicios técnicos","Booking de artistas","Desarrollo web","BCAPSTUDIO (sello)","Empresa Amiga / partner","Otro"].map(o => <option key={o} className="bg-ink">{o}</option>)}
              </select>
            </div>
            <Field label="Presupuesto aproximado" name="budget" placeholder="€" />
            <Field label="Fecha tentativa" name="date" placeholder="MM/AAAA" />
            <div className="md:col-span-2">
              <Label>Mensaje</Label>
              <textarea name="message" rows={5} className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 mt-2 focus:border-bcaps-green outline-none resize-none" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-bone/60">Te respondemos en menos de 48h hábiles.</p>
              <button type="submit" className="btn btn-accent">{sent ? "✓ Enviado" : "Enviar propuesta →"}</button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 mt-12">
        <div className="mx-auto max-w-[1600px] text-center">
          <h2 className="display text-[14vw] md:text-[10vw] leading-[0.85]">
            BLACKCAPS<br /><span className="text-gradient-bcaps">EXPERIENCE</span>
          </h2>
          <p className="display text-2xl md:text-4xl mt-6 stroke-text">ANYWHERE BUT WITH MUSIC</p>
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs uppercase tracking-[0.18em] text-bone/70">{children}</span>;
}
function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        name={name} type={type} placeholder={placeholder}
        className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 mt-2 focus:border-bcaps-green outline-none"
      />
    </label>
  );
}
