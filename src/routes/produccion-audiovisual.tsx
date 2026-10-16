import { createFileRoute, Link } from "@tanstack/react-router";
import camera from "@/assets/camera-detail.jpg";
import crowd from "@/assets/booking-crowd.jpg";
import heroStage from "@/assets/hero-stage.jpg";
import djBooth from "@/assets/dj-booth.jpg";
import photo from "@/assets/av-photo.jpg";
import post from "@/assets/av-post.jpg";

export const Route = createFileRoute("/produccion-audiovisual")({
  head: () => ({
    meta: [
      { title: "Producción audiovisual en Madrid — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Productora audiovisual en Madrid, Valencia y Barcelona: aftermovies, videoclips, branded content, vídeos corporativos y campañas para marcas." },
      { property: "og:title", content: "Producción audiovisual — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Aftermovies, videoclips, branded content, entrevistas y campañas audiovisuales con calidad técnica de cine." },
      { property: "og:url", content: "https://blackcaps.es/produccion-audiovisual" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://blackcaps.es/og/produccion-audiovisual.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://blackcaps.es/og/produccion-audiovisual.jpg" },
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

const SERVICIOS = [
  { id: "video", t: "Producción de vídeo", d: "Vídeos corporativos, campañas, branded content y entrevistas. Idea, guion, rodaje y entrega en los formatos que necesitas.", img: camera },
  { id: "fotografia", t: "Fotografía profesional", d: "Fotografía corporativa, de producto y de eventos para comunicación, prensa y redes.", img: photo },
  { id: "eventos", t: "Cobertura de eventos", d: "Grabación y aftermovies de eventos corporativos, culturales y de marca, con piezas resumen listas para publicar.", img: crowd },
  { id: "postproduccion", t: "Edición y postproducción", d: "Montaje, corrección de color, sonido, motion graphics y entregables multiformato.", img: post },
];

const FORMATOS = ["Aftermovies", "Videoclips", "Branded content", "Vídeos corporativos", "Entrevistas", "Contenido vertical para redes"];

const PROCESO = [
  { n: "01", t: "Briefing y planificación", d: "Objetivos, público, plazos y presupuesto." },
  { n: "02", t: "Preproducción", d: "Concepto, guion, localizaciones y plan de rodaje." },
  { n: "03", t: "Rodaje y producción", d: "Equipo técnico y creativo con un único interlocutor." },
  { n: "04", t: "Postproducción y entrega", d: "Montaje, color, sonido y formatos finales." },
];

function ProduccionAudiovisualPage() {
  return (
    <div className="corp">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <img src={camera} alt="Cámara profesional en un rodaje audiovisual" width={1920} height={1080} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/20" />
        <div className="relative w-full mx-auto max-w-[1400px] px-5 md:px-10 pt-40 pb-16 md:pb-24">
          <span className="eyebrow fade-up">Producción audiovisual</span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl max-w-5xl fade-up" style={{ animationDelay: "120ms" }}>
            PRODUCCIÓN AUDIOVISUAL PARA MARCAS, EMPRESAS Y EVENTOS.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ivory/80 fade-up" style={{ animationDelay: "240ms" }}>
            Planificamos y desarrollamos producciones audiovisuales para proyectos corporativos, campañas y eventos. Desde la idea inicial hasta el rodaje, la postproducción y la entrega final.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 fade-up" style={{ animationDelay: "360ms" }}>
            <a href="#servicios" className="btn btn-corp">Explorar servicios</a>
            <Link to="/contacto" className="btn btn-line">Solicitar propuesta →</Link>
          </div>
        </div>
      </section>

      {/* NAVEGACIÓN INTERNA */}
      <nav aria-label="Áreas audiovisuales" className="sticky top-16 md:top-[72px] z-30 bg-graphite/90 backdrop-blur border-y border-ivory/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex gap-6 overflow-x-auto py-3 text-xs uppercase tracking-[0.18em] whitespace-nowrap">
          {SERVICIOS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-ivory/70 hover:text-ivory transition-colors">{s.t}</a>
          ))}
          <a href="#proceso" className="text-ivory/70 hover:text-ivory transition-colors">Proceso</a>
        </div>
      </nav>

      {/* SERVICIOS ALTERNOS */}
      <section id="servicios" className="corp-light scroll-mt-32 py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px] space-y-20 md:space-y-28">
          {SERVICIOS.map((s, i) => (
            <article key={s.id} id={s.id} className="scroll-mt-36 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className={`md:col-span-7 overflow-hidden rounded-lg group ${i % 2 ? "md:order-2" : ""}`}>
                <img src={s.img} alt={s.t} loading="lazy" width={1280} height={960} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="md:col-span-5">
                <span className="font-display text-sm text-graphite/50">0{i + 1}</span>
                <h2 className="mt-3 text-3xl md:text-5xl">{s.t}</h2>
                <p className="mt-5 text-graphite/75 leading-relaxed">{s.d}</p>
                <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] font-semibold border-b border-graphite pb-1 hover:gap-3 transition-all">
                  Solicitar propuesta <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
          <div className="border-t border-graphite/15 pt-10">
            <span className="eyebrow">También producimos</span>
            <ul className="mt-6 flex flex-wrap gap-2">
              {FORMATOS.map((f) => (
                <li key={f} className="border border-graphite/20 rounded-full px-4 py-2 text-sm">{f}</li>
              ))}
            </ul>
            <Link to="/servicios/video-corporativo" className="btn btn-corp mt-8">Vídeos corporativos →</Link>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Galería</span>
          <h2 className="mt-5 text-3xl md:text-5xl max-w-3xl">Nuestros trabajos, muy pronto aquí.</h2>
          <p className="mt-5 max-w-2xl text-ivory/70">Estamos preparando una selección de producciones propias. Las imágenes actuales son ilustrativas.</p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-12 gap-4">
            {[
              { img: heroStage, c: "col-span-2 md:col-span-8 aspect-[16/9]" },
              { img: djBooth, c: "md:col-span-4 aspect-[3/4] md:aspect-auto" },
              { img: post, c: "md:col-span-4 aspect-[3/4] md:aspect-[4/5]" },
              { img: crowd, c: "col-span-2 md:col-span-8 aspect-[16/9] md:aspect-auto" },
            ].map((g, i) => (
              <div key={i} className={`relative rounded-lg overflow-hidden group ${g.c}`}>
                <img src={g.img} alt="Imagen ilustrativa de producción audiovisual" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 transition duration-700 group-hover:opacity-90 group-hover:scale-[1.03]" />
                <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.2em] text-ivory/80">Proyecto · Próximamente</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="corp-light scroll-mt-32 py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 className="mt-5 text-3xl md:text-5xl max-w-3xl">Organización y confianza en cada fase.</h2>
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/15 border border-graphite/15 rounded-lg overflow-hidden">
            {PROCESO.map((p) => (
              <li key={p.n} className="bg-ivory p-8">
                <span className="font-display text-4xl text-corp-highlight">{p.n}</span>
                <h3 className="mt-6 text-xl">{p.t}</h3>
                <p className="mt-3 text-sm text-graphite/70">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CIERRE */}
      <section className="py-24 md:py-32 px-5 md:px-10 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl">HABLEMOS DE TU PRÓXIMA PRODUCCIÓN.</h2>
          <p className="mt-6 text-ivory/75">Cuéntanos qué necesitas y estudiaremos la mejor solución audiovisual para tu proyecto.</p>
          <Link to="/contacto" className="btn btn-corp mt-10">Solicitar propuesta</Link>
        </div>
      </section>
    </div>
  );
}
