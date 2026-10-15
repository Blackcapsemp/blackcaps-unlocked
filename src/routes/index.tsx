import { createFileRoute, Link } from "@tanstack/react-router";
import heroStage from "@/assets/hero-stage.jpg";
import camera from "@/assets/camera-detail.jpg";
import crowd from "@/assets/booking-crowd.jpg";
import djBooth from "@/assets/dj-booth.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BLACKCAPS EXPERIENCE — Productora audiovisual B2B" },
      { name: "description", content: "Productora audiovisual para marcas, empresas, agencias y eventos en Madrid, Valencia y Barcelona. Vídeo, cobertura de eventos y soluciones técnicas." },
      { property: "og:title", content: "BLACKCAPS EXPERIENCE — Productora audiovisual para empresas" },
      { property: "og:description", content: "Producción audiovisual, cobertura de eventos y soluciones técnicas para marcas, empresas y agencias." },
      { property: "og:url", content: "https://blackcaps.es/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/" },
      { rel: "preload", as: "image", href: heroStage, fetchPriority: "high" },
    ],
  }),
  component: Home,
});

const CORE = [
  { t: "Producción audiovisual", d: "Vídeo corporativo, campañas, entrevistas y contenido para redes, de la idea a la entrega final.", img: camera },
  { t: "Cobertura de eventos", d: "Grabación, aftermovies y piezas resumen para eventos corporativos, culturales y de marca.", img: crowd },
  { t: "Soluciones técnicas", d: "Sonido, iluminación, visuales, pantallas y streaming con equipo propio y técnicos especializados.", img: heroStage },
];

const STEPS = [
  { n: "01", t: "Briefing", d: "Escuchamos objetivos, público, plazos y presupuesto." },
  { n: "02", t: "Propuesta", d: "Enviamos una propuesta clara con alcance, calendario y coste." },
  { n: "03", t: "Producción", d: "Rodaje, técnica y coordinación con un único interlocutor." },
  { n: "04", t: "Entrega", d: "Postproducción, revisiones y formatos listos para publicar." },
];

const COMPLEMENTARY = [
  { t: "Booking de artistas", to: "/booking" as const },
  { t: "BCAPSTUDIO.EMP", to: "/bcapstudio" as const },
  { t: "Desarrollo web y digital", to: "/servicios" as const },
];

function Home() {
  return (
    <div className="corp">
      {/* 1. HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={heroStage} alt="Producción audiovisual y técnica de evento de BLACKCAPS" width={1920} height={1080} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/30" />
        <div className="relative w-full mx-auto max-w-[1400px] px-5 md:px-10 pt-40 pb-16 md:pb-24">
          <span className="eyebrow fade-up">Productora audiovisual · Desde 2020</span>
          <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl max-w-5xl fade-up" style={{ animationDelay: "120ms" }}>
            Contenido audiovisual para <span className="text-copper">marcas, empresas</span> y eventos.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ivory/80 fade-up" style={{ animationDelay: "240ms" }}>
            Producimos vídeo, cubrimos eventos y ponemos la técnica audiovisual para que tu comunicación se vea y suene profesional. Madrid, Valencia, Barcelona y toda España.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 fade-up" style={{ animationDelay: "360ms" }}>
            <Link to="/contacto" className="btn btn-copper">Solicitar propuesta</Link>
            <a href="https://presupuestos.blackcaps.es" target="_blank" rel="noopener" data-cta="presupuestos" className="btn btn-line">Calcular presupuesto →</a>
          </div>
        </div>
      </section>

      {/* 2. SERVICIOS DESTACADOS */}
      <section className="corp-light py-20 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
            <div className="md:col-span-7">
              <span className="eyebrow">Servicios audiovisuales</span>
              <h2 className="mt-5 text-4xl md:text-6xl">Lo que hacemos, de principio a fin.</h2>
            </div>
            <p className="md:col-span-5 text-graphite/75">Un solo equipo para idear, grabar, producir y dar soporte técnico. Servicios modulares que se adaptan a cada proyecto.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CORE.map((s) => (
              <article key={s.t} className="group bg-ivory border border-graphite/10 rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.t} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl">{s.t}</h3>
                  <p className="mt-3 text-graphite/70 text-sm leading-relaxed">{s.d}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/servicios" className="btn btn-line text-graphite">Ver todos los servicios →</Link>
          </div>
        </div>
      </section>

      {/* 3. PROYECTOS */}
      <section className="py-20 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Proyectos</span>
          <h2 className="mt-5 text-4xl md:text-6xl max-w-3xl">Producciones realizadas</h2>
          <p className="mt-6 max-w-2xl text-ivory/70">Muy pronto mostraremos aquí una selección de nuestros trabajos. Si quieres ver ejemplos ahora, pídenos nuestro reel.</p>
          <div className="mt-12 grid md:grid-cols-12 gap-4">
            {[{ img: crowd, c: "md:col-span-7 aspect-[16/10]" }, { img: djBooth, c: "md:col-span-5 aspect-[16/10] md:aspect-auto" }].map((p, i) => (
              <div key={i} className={`relative rounded-lg overflow-hidden ${p.c}`}>
                <img src={p.img} alt="Espacio reservado para un proyecto audiovisual" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 to-transparent" />
                <span className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.2em] text-sand">Proyecto · Próximamente</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/contacto" className="btn btn-line">Solicitar reel</Link>
          </div>
        </div>
      </section>

      {/* 4. FORMA DE TRABAJAR */}
      <section className="corp-light py-20 md:py-32 px-5 md:px-10 border-t border-graphite/10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 className="mt-5 text-4xl md:text-6xl max-w-3xl">Un proceso claro, sin sorpresas.</h2>
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/15 border border-graphite/15 rounded-lg overflow-hidden">
            {STEPS.map((s) => (
              <li key={s.n} className="bg-ivory p-8">
                <span className="font-display text-4xl text-copper">{s.n}</span>
                <h3 className="mt-6 text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm text-graphite/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. COMPLEMENTARIOS */}
      <section className="py-16 md:py-20 px-5 md:px-10 bg-sage/25 border-y border-ivory/10">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <span className="eyebrow">Servicios complementarios</span>
            <p className="mt-4 text-ivory/75">Además de la producción audiovisual, ofrecemos soluciones que completan tus proyectos.</p>
          </div>
          <ul className="md:col-span-7 grid sm:grid-cols-3 gap-3">
            {COMPLEMENTARY.map((c) => (
              <li key={c.t}>
                <Link to={c.to} className="flex items-center justify-between gap-3 border border-ivory/15 rounded-md px-5 py-4 text-sm hover:border-copper hover:text-copper transition-colors">
                  {c.t} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. CONTACTO */}
      <section className="py-20 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px] text-center">
          <span className="eyebrow">Hablemos</span>
          <h2 className="mt-5 text-4xl md:text-6xl max-w-3xl mx-auto">¿Tienes un proyecto? Te enviamos una propuesta profesional.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contacto" className="btn btn-copper">Solicitar propuesta</Link>
            <a href="https://presupuestos.blackcaps.es" target="_blank" rel="noopener" data-cta="presupuestos" className="btn btn-line">Calcular presupuesto →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
