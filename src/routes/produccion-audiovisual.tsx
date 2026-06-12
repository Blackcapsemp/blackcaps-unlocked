import { createFileRoute, Link } from "@tanstack/react-router";
import camera from "@/assets/camera-detail.jpg";

export const Route = createFileRoute("/produccion-audiovisual")({
  head: () => ({
    meta: [
      { title: "Producción audiovisual en Madrid — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Productora audiovisual en Madrid, Valencia y Barcelona: aftermovies, videoclips, branded content, vídeos corporativos y campañas para marcas." },
      { property: "og:title", content: "Producción audiovisual — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Aftermovies, videoclips, branded content, entrevistas y campañas audiovisuales con calidad técnica de cine." },
      { property: "og:url", content: "https://blackcaps.es/produccion-audiovisual" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/produccion-audiovisual" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Producción audiovisual",
          serviceType: "Audiovisual Production",
          provider: { "@type": "Organization", name: "BLACKCAPS EXPERIENCE", url: "https://blackcaps.es" },
          areaServed: [
            { "@type": "City", name: "Madrid" },
            { "@type": "City", name: "Valencia" },
            { "@type": "City", name: "Barcelona" },
          ],
          description: "Producción audiovisual completa: aftermovies, videoclips, branded content, vídeos corporativos, entrevistas y campañas para redes.",
        }),
      },
    ],
  }),
  component: ProduccionAudiovisualPage,
});

const PIEZAS = [
  { t: "Aftermovies", d: "Resumen audiovisual de eventos, festivales y showcases con narrativa propia." },
  { t: "Videoclips", d: "Dirección creativa, rodaje y postproducción para artistas y sellos." },
  { t: "Branded content", d: "Piezas de marca con storytelling para campañas digitales y broadcast." },
  { t: "Vídeos corporativos", d: "Vídeos institucionales, casos de éxito, employer branding y formación interna." },
  { t: "Entrevistas", d: "Formatos talking-head, documental y reportaje para marcas y medios." },
  { t: "Contenido para redes", d: "Piezas verticales para TikTok, Reels y Shorts con foco en performance." },
];

const PROCESO = [
  { n: "01", t: "Briefing", d: "Entendemos el proyecto, objetivos y público." },
  { n: "02", t: "Preproducción", d: "Concepto, guión, casting, localizaciones y plan de rodaje." },
  { n: "03", t: "Rodaje", d: "Equipo técnico y creativo en formato cine, broadcast o ágil." },
  { n: "04", t: "Postproducción", d: "Montaje, color, sonido, motion y entregables multiformato." },
];

function ProduccionAudiovisualPage() {
  return (
    <>
      <section className="relative pt-44 pb-20 px-4 md:px-8 overflow-hidden grain">
        <img src={camera} alt="" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Audiovisual · Cine · Branded</span>
          <h1 className="display text-5xl md:text-[9rem] leading-[0.85] mt-6">
            PRODUCCIÓN<br /><span className="text-gradient-bcaps">AUDIOVISUAL</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-bone/85">
            Convertimos eventos, marcas, artistas y proyectos culturales en piezas audiovisuales con impacto. Desde aftermovies y videoclips hasta campañas y vídeos corporativos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacto" className="btn btn-primary">Pedir presupuesto</Link>
            <Link to="/servicios/video-corporativo" className="btn btn-ghost">Vídeos corporativos</Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-4xl md:text-6xl">FORMATOS</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PIEZAS.map((p) => (
              <article key={p.t} className="rounded-2xl border border-white/10 p-8 hover:border-bcaps-green transition-colors">
                <h3 className="display text-2xl">{p.t}</h3>
                <p className="mt-3 text-bone/75">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 paper text-ink">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-4xl md:text-6xl text-ink">PROCESO</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESO.map((p) => (
              <div key={p.n} className="bg-ink text-bone rounded-2xl p-8">
                <span className="num-3d text-5xl">{p.n}</span>
                <h3 className="display text-xl mt-4">{p.t}</h3>
                <p className="mt-3 text-bone/80">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="display text-4xl md:text-6xl">¿Tienes un proyecto audiovisual?</h2>
          <p className="mt-6 text-bone/80">Cuéntanos qué necesitas. Respondemos en 48h hábiles.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contacto" className="btn btn-primary">Pedir presupuesto</Link>
            <Link to="/sobre-nosotros" className="btn btn-ghost">Sobre nosotros</Link>
          </div>
        </div>
      </section>
    </>
  );
}
