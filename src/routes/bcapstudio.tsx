import { createFileRoute, Link } from "@tanstack/react-router";
import bg from "@/assets/bcapstudio-bg.jpg";

export const Route = createFileRoute("/bcapstudio")({
  head: () => ({
    meta: [
      { title: "BCAPSTUDIO.EMP — Sello creativo 360º" },
      { name: "description", content: "Sello creativo 360º de Blackcaps. Distribución digital, branding, videoclips, estrategia TikTok/IG, royalties y desarrollo completo de artistas." },
      { property: "og:title", content: "BCAPSTUDIO.EMP" },
      { property: "og:description", content: "Sello creativo 360º para artistas, lanzamientos y estrategia digital." },
      { property: "og:url", content: "https://blackcaps.es/bcapstudio" },
      { property: "og:image", content: bg },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/bcapstudio" },
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
    <div className="corp">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img src={bg} alt="" width={1920} height={1080} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 gradient-bcaps opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/20" />
        <div className="relative w-full mx-auto max-w-[1400px] px-5 md:px-10 pt-40 pb-16 md:pb-24">
          <span className="eyebrow fade-up">Sello creativo 360º</span>
          <h1 className="display text-3xl sm:text-4xl md:text-5xl leading-tight mt-6 fade-up">
            BCAPSTUDIO<span className="text-bcaps-orange">.EMP</span>
            <span className="sr-only"> — Sello Creativo 360º</span>
          </h1>
          <p className="display text-3xl sm:text-4xl md:text-6xl leading-[0.95] mt-4 text-gradient-bcaps max-w-5xl fade-up" style={{ animationDelay: "120ms" }}>Música · Audiovisual · Estrategia digital</p>
          <p className="mt-8 max-w-2xl text-ivory/80 text-lg fade-up" style={{ animationDelay: "240ms" }}>
            Línea de negocio de Blackcaps Experience enfocada en el desarrollo creativo y estratégico de artistas y marcas. Integra producción audiovisual, branding, contenido digital, distribución musical y comunicación para construir lanzamientos con identidad y recorrido.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 fade-up" style={{ animationDelay: "360ms" }}>
            <Link to="/contacto" className="btn btn-corp">Hablar con el sello</Link>
            <Link to="/booking" className="btn btn-line">Ver artistas →</Link>
          </div>
        </div>
      </section>

      {/* ECOSISTEMA */}
      <section className="corp-light py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Servicios del sello</span>
          <h2 className="display text-4xl md:text-6xl mt-5">ECOSISTEMA <span className="text-gradient-bcaps">CREATIVO</span></h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-graphite/15 border border-graphite/15 rounded-lg overflow-hidden">
            {["Distribución digital","Royalties","Branding artístico","Diseño de portada","Videoclips","Visualizers","Fotografía promocional","Contenido vertical","Estrategia TikTok","Campañas de lanzamiento","Análisis de streams","Booking","Producción musical","Estudio y grabación","Gestión de lanzamientos","A&R"].map((s) => (
              <div key={s} className="bg-ivory p-5 md:p-6 transition-colors hover:bg-sand/40">
                <p className="text-base md:text-lg font-semibold">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Plan de funcionamiento</span>
          <h2 className="display text-4xl md:text-6xl mt-5">CÓMO FUNCIONA EL <span className="text-gradient-bcaps">SELLO</span></h2>
          <div className="mt-16 relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px border-t border-dashed border-ivory/20" />
            <div className="grid sm:grid-cols-2 md:grid-cols-7 gap-8 md:gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="relative">
                  <div className="w-12 h-12 rounded-full bg-graphite border border-ivory grid place-items-center display text-sm">{s.n}</div>
                  <h3 className="text-lg mt-5 leading-tight">{s.t}</h3>
                  <p className="text-ivory/65 text-sm mt-2 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="corp-light py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Planes</span>
          <h2 className="display text-4xl md:text-6xl mt-5">DE SOLO DISTRIBUCIÓN<br /><span className="text-gradient-bcaps">A DESARROLLO 360º</span></h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div key={p.t} className={`relative rounded-lg p-8 border transition-shadow hover:shadow-xl ${p.feat ? "bg-graphite text-ivory border-graphite" : "bg-ivory border-graphite/15"}`}>
                {p.feat && <span className="absolute -top-3 left-6 text-[11px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full gradient-bcaps text-ivory">Más popular</span>}
                <h3 className="text-2xl">{p.t}</h3>
                <p className={`mt-3 ${p.feat ? "text-ivory/75" : "text-graphite/70"}`}>{p.p}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.items.map((i) => <li key={i} className="flex gap-2"><span className="text-gradient-bcaps">●</span>{i}</li>)}
                </ul>
                <Link to="/contacto" className={`btn ${p.feat ? "btn-corp" : "btn-line"} mt-8 w-full justify-center`}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIST ROSTER & BOOKING */}
      <section className="relative py-20 md:py-28 px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0 opacity-60 pointer-events-none"
             style={{ backgroundImage: "radial-gradient(800px 360px at 85% 20%, oklch(0.72 0.19 55 / 0.12), transparent 60%), radial-gradient(700px 320px at 10% 90%, oklch(0.68 0.22 310 / 0.10), transparent 60%)" }} />
        <div className="relative mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">BCAPSTUDIO.EMP · Representación artística</span>
            <h2 className="display text-4xl md:text-6xl mt-5 leading-[0.95]">
              ARTIST ROSTER<br /><span className="text-gradient-bcaps">& BOOKING</span>
            </h2>
            <p className="mt-6 max-w-xl text-ivory/80 text-base md:text-lg leading-relaxed">
              Promocionamos, representamos y contratamos a los artistas de nuestro roster. Desde showcases y festivales hasta eventos privados y colaboraciones con marcas: conectamos el talento de BCAPSTUDIO.EMP con escenarios y oportunidades reales.
            </p>
          </div>
          <div className="rounded-lg border border-ivory/15 bg-ivory/5 backdrop-blur p-8 md:p-10">
            <p className="text-xl">¿Qué necesitas?</p>
            <p className="text-sm text-ivory/65 mt-2 leading-relaxed">
              Explora el roster de artistas disponibles para tu evento, o crea tu perfil de artista y pasa a formar parte de BCAPSTUDIO.EMP.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/booking" className="btn btn-corp justify-center flex-1">Explorar artistas</Link>
              <Link to="/auth" className="btn btn-line justify-center flex-1">Soy artista</Link>
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-ivory/45">
              Booking gestionado por BCAPSTUDIO.EMP · BLACKCAPS EXPERIENCE
            </p>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="corp-light py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Sistema digital</span>
          <h2 className="display text-4xl md:text-6xl mt-5">SISTEMA DIGITAL <span className="text-gradient-bcaps">DE GESTIÓN</span></h2>
          <p className="mt-6 max-w-2xl text-graphite/75">
            BCAPSTUDIO incorpora herramientas digitales para automatizar procesos, coordinar lanzamientos y centralizar la comunicación entre artistas y equipo creativo.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TOOLS.map((t) => (
              <div key={t.t} className="rounded-lg bg-ivory border border-graphite/10 p-5 transition-shadow hover:shadow-lg">
                <p className="text-xl font-semibold">{t.t}</p>
                <p className="text-xs text-graphite/65 mt-2">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="py-20 md:py-28 px-5 md:px-10 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="display text-3xl md:text-5xl">¿LANZAMOS TU <span className="text-gradient-bcaps">PRÓXIMO PROYECTO?</span></h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contacto" className="btn btn-corp">Solicitar propuesta</Link>
            <Link to="/booking" className="btn btn-line">Explorar artistas →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
