import { createFileRoute, Link } from "@tanstack/react-router";
import camera from "@/assets/camera-detail.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Producción audiovisual, cobertura de eventos, soluciones técnicas y servicios para agencias y empresas. Además: booking y soluciones digitales." },
      { property: "og:title", content: "Servicios — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Servicios audiovisuales modulares para marcas, empresas, agencias y eventos." },
      { property: "og:url", content: "https://blackcaps.es/servicios" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://blackcaps.es/og/servicios.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://blackcaps.es/og/servicios.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://blackcaps.es/servicios" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            "Producción audiovisual y creación de contenido",
            "Producción y cobertura de eventos",
            "Soluciones técnicas audiovisuales",
            "Servicios para agencias y empresas",
            "Servicios complementarios",
          ].map((name, i) => ({
            "@type": "Service",
            position: i + 1,
            name,
            provider: { "@type": "Organization", name: "BLACKCAPS EXPERIENCE" },
            areaServed: "ES",
          })),
        }),
      },
    ],
  }),
  component: ServiciosPage,
});

const GROUPS = [
  {
    n: "01", t: "Producción audiovisual y creación de contenido",
    copy: "Piezas visuales con impacto para marcas, empresas y proyectos culturales: desde un vídeo corporativo hasta una campaña completa.",
    items: ["Vídeo corporativo", "Entrevistas", "Contenido para redes", "Campañas audiovisuales", "Motion graphics", "Videoclips y contenido artístico"],
    link: { to: "/servicios/video-corporativo" as const, label: "Vídeo corporativo" },
  },
  {
    n: "02", t: "Producción y cobertura de eventos",
    copy: "Contamos tu evento con grabación profesional y piezas listas para comunicar.",
    items: ["Grabación de eventos", "Aftermovies", "Proyectos culturales", "Streaming", "Visuales para escenario"],
  },
  {
    n: "03", t: "Soluciones técnicas audiovisuales",
    copy: "Técnica fiable para eventos pequeños, medianos y de gran escala.",
    items: ["Equipamiento audiovisual", "Sonido", "Iluminación", "Sistemas de visuales y pantallas", "Soporte técnico"],
  },
  {
    n: "04", t: "Servicios para agencias y empresas",
    copy: "Equipo técnico y creativo externo para ampliar recursos sin aumentar tu estructura.",
    items: ["Agencias de comunicación", "Productoras", "Promotoras", "Organizadores de eventos", "Instituciones culturales"],
  },
];

const COMPLEMENTARY = [
  { t: "Booking y apoyo a artistas", d: "Booking, programación y curaduría artística.", to: "/booking" as const },
  { t: "BCAPSTUDIO.EMP", d: "Sello, música y estrategia para artistas.", to: "/bcapstudio" as const },
  { t: "Desarrollo web y digital", d: "Webs, landings, tiendas online, automatizaciones con IA y mantenimiento.", to: "/contacto" as const },
];

const AMIGA = [
  { p: "10%", t: "Proyectos puntuales" },
  { p: "15%", t: "Colaboraciones recurrentes" },
  { p: "20%", t: "Partners de larga duración" },
];

function ServiciosPage() {
  return (
    <div className="corp">
      <section className="relative pt-40 pb-20 px-5 md:px-10 overflow-hidden">
        <img src={camera} alt="" width={1200} height={1500} className="absolute top-0 right-0 w-full md:w-1/2 h-full object-cover opacity-25 md:opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/90 to-graphite/30" />
        <div className="relative mx-auto max-w-[1400px]">
          <span className="eyebrow fade-up">Servicios</span>
          <h1 className="mt-6 text-5xl md:text-7xl max-w-4xl fade-up">Servicios audiovisuales para <em className="text-copper">empresas y marcas</em>.</h1>
          <p className="mt-8 max-w-2xl text-lg text-ivory/80">Servicios modulares adaptados a cada proyecto. Trabajamos con empresas, agencias, marcas, ayuntamientos y promotores.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contacto" className="btn btn-copper">Solicitar propuesta</Link>
            <a href="https://presupuestos.blackcaps.es" target="_blank" rel="noopener" data-cta="presupuestos" className="btn btn-line">Calcular presupuesto →</a>
          </div>
        </div>
      </section>

      <section className="corp-light py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px] divide-y divide-graphite/15 border-y border-graphite/15">
          {GROUPS.map((s) => (
            <article key={s.n} className="py-12 md:py-16 grid md:grid-cols-12 gap-8 items-start">
              <span className="md:col-span-1 font-serif text-4xl text-copper">{s.n}</span>
              <div className="md:col-span-5">
                <h2 className="text-3xl md:text-4xl">{s.t}</h2>
                <p className="mt-4 text-graphite/70 max-w-md">{s.copy}</p>
                {s.link && <Link to={s.link.to} className="mt-5 inline-block text-sm font-semibold text-copper underline-offset-4 hover:underline">{s.link.label} →</Link>}
              </div>
              <ul className="md:col-span-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-graphite/85 text-sm">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />{it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-5 md:px-10 bg-sage/25">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">05 · Servicios complementarios</span>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {COMPLEMENTARY.map((c) => (
              <Link key={c.t} to={c.to} className="block border border-ivory/15 rounded-lg p-6 hover:border-copper transition-colors">
                <h3 className="text-xl">{c.t}</h3>
                <p className="mt-2 text-sm text-ivory/70">{c.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="corp-light py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">Programa B2B</span>
          <h2 className="mt-5 text-4xl md:text-6xl">Programa Empresa Amiga</h2>
          <p className="mt-6 max-w-2xl text-graphite/75">Para colaboradores, instituciones y agencias con las que trabajamos de forma recurrente.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {AMIGA.map((a) => (
              <div key={a.p} className="bg-graphite text-ivory rounded-lg p-8">
                <span className="font-serif text-5xl text-copper">{a.p}</span>
                <p className="mt-3">{a.t}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-graphite/85">
              {["Descuentos en servicios y equipamiento", "Prioridad en disponibilidad de equipo", "Acceso a soluciones técnicas y creativas", "Colaboraciones en proyectos culturales", "Apoyo en difusión y contenido"].map((b) => (
                <li key={b} className="flex gap-3"><span className="text-copper">→</span>{b}</li>
              ))}
            </ul>
            <div className="flex md:justify-end items-end">
              <Link to="/contacto" className="btn btn-copper">Hablemos de una colaboración</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
