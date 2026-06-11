import { createFileRoute, Link } from "@tanstack/react-router";
import camera from "@/assets/camera-detail.jpg";

export const Route = createFileRoute("/servicios/video-corporativo")({
  head: () => ({
    meta: [
      { title: "Vídeos corporativos en Madrid — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Producción de vídeos corporativos para empresas en Madrid: storytelling de marca, vídeos institucionales, casos de éxito, recruitment y campañas con calidad técnica de cine." },
      { property: "og:title", content: "Vídeos corporativos en Madrid — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Productora audiovisual especializada en vídeos corporativos para empresas. Storytelling, calidad técnica y entrega 360º." },
      { property: "og:url", content: "https://blackcaps.es/servicios/video-corporativo" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/servicios/video-corporativo" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Producción de vídeos corporativos",
          serviceType: "Corporate Video Production",
          provider: {
            "@type": "Organization",
            name: "BLACKCAPS EXPERIENCE",
            url: "https://blackcaps.es",
          },
          areaServed: [
            { "@type": "City", name: "Madrid" },
            { "@type": "City", name: "Valencia" },
            { "@type": "City", name: "Barcelona" },
          ],
          description: "Vídeos corporativos para empresas: storytelling de marca, vídeos institucionales, casos de éxito, employer branding y campañas digitales.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "¿Cuánto cuesta un vídeo corporativo en Madrid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "El coste de un vídeo corporativo depende de la duración, equipo técnico, localizaciones y postproducción. Trabajamos con presupuestos a medida desde piezas para redes hasta campañas audiovisuales completas para empresas.",
              },
            },
            {
              "@type": "Question",
              name: "¿Qué tipos de vídeos corporativos producís para empresas?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Producimos vídeos institucionales, de marca, casos de éxito, testimoniales, recruitment / employer branding, eventos corporativos, formación interna y campañas para redes sociales.",
              },
            },
            {
              "@type": "Question",
              name: "¿Trabajáis solo en Madrid?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nuestra base está en Madrid, Valencia y Barcelona, pero producimos vídeos corporativos en toda España y rodajes internacionales bajo demanda.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: VideoCorporativoPage,
});

const FORMATS = [
  { t: "Vídeo institucional", d: "La pieza ancla de tu marca: misión, equipo, propósito y propuesta de valor en una narrativa cuidada." },
  { t: "Storytelling de marca", d: "Historias reales que conectan tu empresa con clientes, partners y empleados — más allá del catálogo." },
  { t: "Casos de éxito", d: "Producciones documentales con clientes reales explicando resultados, retorno y experiencia trabajando contigo." },
  { t: "Employer branding", d: "Vídeos de cultura, equipo y recruitment para atraer talento y reforzar marca empleadora." },
  { t: "Producto y servicio", d: "Demos audiovisuales con foco en beneficios, diferenciadores y prueba social." },
  { t: "Eventos corporativos", d: "Cobertura de jornadas, kick-offs, convenciones y aftermovies para uso interno y externo." },
  { t: "Formación y comunicación interna", d: "Series de vídeo para academias, onboarding y comunicación con empleados." },
  { t: "Campañas para redes", d: "Versionado vertical, cortes para LinkedIn, Instagram, TikTok y YouTube Ads." },
];

const PROCESS = [
  { n: "01", t: "Briefing", d: "Entendemos objetivo, audiencia, mensajes clave, KPIs y contexto de marca." },
  { n: "02", t: "Concepto y guion", d: "Propuesta creativa, tono, estructura narrativa, guion técnico y referencias visuales." },
  { n: "03", t: "Preproducción", d: "Casting, localizaciones, permisos, planificación de rodaje y arte." },
  { n: "04", t: "Rodaje", d: "Equipo técnico profesional: cámara cine, iluminación, sonido directo y dirección." },
  { n: "05", t: "Postproducción", d: "Montaje, color, motion graphics, locución, música original y versionados." },
  { n: "06", t: "Entrega y campaña", d: "Masters, formatos por canal y opción de plan de difusión digital." },
];

const TRUST = [
  "Equipo cine 4K / 6K + ópticas profesionales",
  "Dirección creativa + guion incluidos",
  "Color grading profesional",
  "Locución, música y sonido cuidados",
  "Versionados para redes incluidos",
  "Equipo técnico propio en Madrid",
];

function VideoCorporativoPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-44 pb-20 px-4 md:px-8 overflow-hidden grain">
        <img src={camera} alt="Cámara cine en rodaje de vídeo corporativo" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Link to="/servicios" className="sticker hover:opacity-80">← Servicios</Link>
            <span className="sticker">Madrid · Valencia · Barcelona</span>
            <span className="sticker">B2B · Corporate</span>
          </div>
          <h1 className="display text-5xl md:text-7xl lg:text-[7vw] leading-[0.9] max-w-[18ch]">
            VÍDEOS CORPORATIVOS<br /><span className="text-gradient-bcaps">PARA EMPRESAS</span> EN MADRID
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-bone/85 leading-relaxed">
            Producimos vídeos corporativos con storytelling de marca y calidad técnica de cine. De la idea al máster final: guion, rodaje, postproducción y versionados para web, redes y eventos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacto" className="btn btn-primary">Pedir presupuesto</Link>
            <Link to="/contacto" className="btn btn-ghost">Hablar con el equipo</Link>
          </div>
        </div>
      </section>

      {/* INTRO / VALOR */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="sticker mb-6">Por qué importa</span>
            <h2 className="display text-4xl md:text-6xl mt-4">EL VÍDEO ES LA<br /><span className="text-bcaps-green">PRIMERA IMPRESIÓN</span> DE TU MARCA</h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-bone/85 text-lg leading-relaxed">
            <p>
              Las empresas que comunican con vídeo generan más confianza, atraen mejor talento y cierran ventas más rápido. Un vídeo corporativo bien hecho no es decoración: es la forma más eficaz de explicar <strong>quién eres, qué haces y por qué importa</strong>.
            </p>
            <p>
              En Blackcaps Experience producimos piezas con narrativa de marca real — no <em>stock</em> ni plantillas — combinando dirección creativa, equipo técnico de cine y conocimiento del entorno digital actual.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              {TRUST.map((t) => (
                <li key={t} className="flex items-start gap-3 text-bone/90 text-base">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bcaps-green shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FORMATOS */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1400px]">
          <span className="sticker mb-6">Formatos</span>
          <h2 className="display text-4xl md:text-6xl mt-4">QUÉ TIPO DE VÍDEO<br />NECESITA TU EMPRESA</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FORMATS.map((f) => (
              <div key={f.t} className="rounded-2xl border border-white/15 p-6 bg-card/40 hover:border-bcaps-green/60 hover:bg-bcaps-green/[0.04] transition">
                <p className="display text-lg">{f.t}</p>
                <p className="mt-3 text-bone/75 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1400px]">
          <span className="sticker mb-6">Proceso</span>
          <h2 className="display text-4xl md:text-6xl mt-4">DEL BRIEFING<br /><span className="stroke-text">A LA ENTREGA FINAL</span></h2>
          <div className="mt-14 grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PROCESS.map((s) => (
              <div key={s.n}>
                <div className="w-12 h-12 rounded-full bg-ink border border-bone grid place-items-center display text-sm">{s.n}</div>
                <h3 className="display text-base mt-5 leading-tight">{s.t}</h3>
                <p className="text-bone/70 text-sm mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1100px]">
          <span className="sticker mb-6">Dudas frecuentes</span>
          <h2 className="display text-4xl md:text-6xl mt-4">PREGUNTAS<br /><span className="text-bcaps-green">FRECUENTES</span></h2>
          <div className="mt-12 space-y-6">
            <Faq q="¿Cuánto cuesta un vídeo corporativo en Madrid?" a="El coste depende de duración, equipo, localizaciones y postproducción. Trabajamos con presupuestos a medida — desde piezas verticales para redes hasta campañas audiovisuales completas para empresas e instituciones." />
            <Faq q="¿Qué tipos de vídeos corporativos producís?" a="Vídeos institucionales, storytelling de marca, casos de éxito, employer branding, formación interna, eventos corporativos y campañas para redes sociales." />
            <Faq q="¿Cuánto tarda el proceso?" a="Un vídeo corporativo estándar toma entre 3 y 6 semanas desde briefing a entrega final. Para producciones más complejas o series de contenido, planificamos calendarios a medida." />
            <Faq q="¿Trabajáis solo en Madrid?" a="Nuestra base está en Madrid, Valencia y Barcelona, pero producimos vídeos corporativos en toda España y rodajes internacionales bajo demanda." />
            <Faq q="¿Entregáis versiones para redes sociales?" a="Sí. Cada proyecto incluye versionados verticales y cuadrados para LinkedIn, Instagram, TikTok y YouTube, además del máster principal." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-4 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="display text-4xl md:text-6xl">¿LISTOS PARA<br /><span className="text-gradient-bcaps">RODAR VUESTRO VÍDEO?</span></h2>
          <p className="mt-6 text-bone/80 max-w-xl mx-auto">
            Cuéntanos tu proyecto y te devolvemos una propuesta creativa y presupuesto en menos de 48h hábiles.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contacto" className="btn btn-accent">Pedir presupuesto</Link>
            <Link to="/servicios" className="btn btn-ghost">Ver todos los servicios</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-card/40 p-6 open:border-bcaps-green/40 open:bg-bcaps-green/[0.04]">
      <summary className="display text-lg md:text-xl cursor-pointer list-none flex items-start justify-between gap-4">
        <span>{q}</span>
        <span className="text-bcaps-green transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-4 text-bone/80 leading-relaxed">{a}</p>
    </details>
  );
}
