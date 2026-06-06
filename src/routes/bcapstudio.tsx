import { createFileRoute, Link } from "@tanstack/react-router";
import bg from "@/assets/bcapstudio-bg.jpg";

export const Route = createFileRoute("/bcapstudio")({
  head: () => ({
    meta: [
      { title: "BCAPSTUDIO.EMP — Sello creativo 360º" },
      { name: "description", content: "Sello creativo 360º de Blackcaps. Distribución digital, branding, videoclips, estrategia TikTok/IG, royalties y desarrollo completo de artistas." },
      { property: "og:title", content: "BCAPSTUDIO.EMP" },
      { property: "og:description", content: "Sello creativo 360º para artistas, lanzamientos y estrategia digital." },
      { property: "og:image", content: bg },
    ],
  }),
  component: BcapPage,
});

const STEPS = [
  { n: "01", t: "Contacto inicial", d: "Reunión inicial, presentación del proyecto, escucha de material y análisis de necesidades." },
  { n: "02", t: "Diagnóstico", d: "Análisis de identidad artística, revisión de redes, público objetivo y objetivo del lanzamiento." },
  { n: "03", t: "Planificación", d: "Single, EP o álbum. Calendario, estrategia digital, contenido y recursos." },
  { n: "04", t: "Desarrollo creativo", d: "Videoclip, visualizer, portada, branding, fotografía y contenido vertical para redes." },
  { n: "05", t: "Distribución digital", d: "Metadata, ISRC, créditos, subida, verificación de perfiles y programación." },
  { n: "06", t: "Campaña de lanzamiento", d: "Publicaciones, estrategia TikTok/IG, difusión en playlists y feedback con audiencia." },
  { n: "07", t: "Seguimiento", d: "Análisis de streams, métricas, engagement y decisión de continuidad." },
];

const PLANS = [
  {
    t: "Solo distribución",
    p: "Para artistas con material listo para plataformas.",
    items: ["Distribución digital", "Metadata", "ISRC", "Subida a plataformas", "Gestión básica"],
    cta: "Distribuir mi música",
    accent: "bcaps-cyan",
  },
  {
    t: "Lanzamiento asistido",
    p: "Para artistas que necesitan acompañamiento estratégico.",
    items: ["Distribución", "Calendario de lanzamiento", "Estrategia digital", "Contenido promocional", "Revisión de redes", "Seguimiento de métricas"],
    cta: "Quiero lanzar con plan",
    accent: "bcaps-violet",
    feat: true,
  },
  {
    t: "Desarrollo 360º",
    p: "Para artistas que construyen un proyecto completo.",
    items: ["Branding artístico", "Audiovisual", "Portada y fotografía", "Videoclip / visualizer", "Campaña de redes", "Booking", "Estrategia a medio plazo"],
    cta: "Quiero proyecto 360º",
    accent: "bcaps-orange",
  },
];

const TOOLS = [
  { t: "Notion", d: "Gestión de proyectos y entregas" },
  { t: "LANDR", d: "Distribución musical" },
  { t: "Google Drive", d: "Masters, diseños y material" },
  { t: "WhatsApp Business", d: "Coordinación directa" },
  { t: "Meta Ads", d: "Campañas pagas" },
  { t: "TikTok Ads", d: "Performance vertical" },
  { t: "Metricool", d: "Analítica y reporting" },
  { t: "Calendarios", d: "Lanzamientos y showcases" },
];

function BcapPage() {
  return (
    <>
      <section className="relative pt-44 pb-24 px-4 md:px-8 overflow-hidden">
        <img src={bg} alt="" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 gradient-bcaps opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />

        <div className="relative mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Sello creativo 360º</span>
          <h1 className="display text-[14vw] md:text-[11vw] leading-[0.85] mt-4">
            BCAPSTUDIO<span className="text-bcaps-orange">.EMP</span>
          </h1>
          <p className="display text-2xl md:text-4xl mt-6 text-gradient-bcaps">Música · Audiovisual · Estrategia digital</p>
          <p className="mt-8 max-w-2xl text-bone/85 text-lg">
            Línea de negocio de Blackcaps Experience enfocada en el desarrollo creativo y estratégico de artistas y marcas. Integra producción audiovisual, branding, contenido digital, distribución musical y comunicación para construir lanzamientos con identidad y recorrido.
          </p>
        </div>
      </section>

      {/* SERVICIOS SELLO */}
      <section className="py-20 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-5xl md:text-7xl">ECOSISTEMA<br /><span className="stroke-text">CREATIVO</span></h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Distribución digital","Royalties","Branding artístico","Diseño de portada","Videoclips","Visualizers","Fotografía promocional","Contenido vertical","Estrategia TikTok","Campañas de lanzamiento","Análisis de streams","Booking","Producción musical","Estudio y grabación","Gestión de lanzamientos","A&R"].map((s) => (
              <div key={s} className="rounded-2xl border border-white/15 p-5 hover:border-bcaps-violet/60 hover:bg-bcaps-violet/5 transition">
                <p className="display text-lg">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="relative py-24 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <span className="sticker">Plan de funcionamiento</span>
          <h2 className="display text-5xl md:text-7xl mt-6">CÓMO<br />FUNCIONA EL <span className="text-bcaps-cyan">SELLO</span></h2>

          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px border-t border-dashed border-white/20" />
            <div className="grid md:grid-cols-7 gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="relative">
                  <div className="w-12 h-12 rounded-full bg-ink border border-bone grid place-items-center display text-sm">{s.n}</div>
                  <h3 className="display text-lg mt-5 leading-tight">{s.t}</h3>
                  <p className="text-bone/65 text-sm mt-2 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-24 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-5xl md:text-7xl">DE SOLO DISTRIBUCIÓN<br /><span className="text-gradient-bcaps">A DESARROLLO 360º</span></h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div key={p.t} className={`relative rounded-3xl p-8 border ${p.feat ? "border-bcaps-violet bg-bcaps-violet/10 glow-green" : "border-white/15 bg-card/60"}`}>
                {p.feat && <span className="absolute -top-3 left-6 stamp text-bcaps-violet bg-ink">Más popular</span>}
                <h3 className="display text-sm">{p.t}</h3>
                <p className="text-bone/75 mt-3">{p.p}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.items.map((i) => <li key={i} className="flex gap-2 text-sm"><span className="text-bcaps-cyan">●</span>{i}</li>)}
                </ul>
                <Link to="/contacto" className="btn btn-ghost mt-8 w-full justify-center">{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-24 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1600px]">
          <span className="sticker">Sistema digital</span>
          <h2 className="display text-5xl md:text-7xl mt-6">SISTEMA DIGITAL<br /><span className="stroke-text">DE GESTIÓN</span></h2>
          <p className="mt-6 max-w-2xl text-bone/80">
            BCAPSTUDIO incorpora herramientas digitales para automatizar procesos, coordinar lanzamientos y centralizar la comunicación entre artistas y equipo creativo.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TOOLS.map((t) => (
              <div key={t.t} className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition">
                <p className="display text-xl">{t.t}</p>
                <p className="text-xs text-bone/70 mt-2">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
