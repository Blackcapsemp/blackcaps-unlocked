import { createFileRoute, Link } from "@tanstack/react-router";
import { Marquee } from "@/components/Marquee";
import camera from "@/assets/camera-detail.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Producción audiovisual, servicios técnicos para eventos, visuales, booking, desarrollo web y colaboraciones B2B para agencias e instituciones." },
      { property: "og:title", content: "Servicios — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Servicios modulares para eventos, marcas, artistas y proyectos culturales." },
      { property: "og:url", content: "https://blackcaps.es/servicios" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/servicios" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            "Producción audiovisual",
            "Servicios técnicos para eventos",
            "Visuales y contenido creativo",
            "Booking y apoyo a artistas",
            "Desarrollo web y soluciones digitales",
            "Colaboraciones para agencias",
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

const FULL = [
  {
    n: "01", t: "Producción audiovisual",
    copy: "Convertimos eventos, marcas y proyectos culturales en piezas visuales con impacto: desde aftermovies hasta campañas audiovisuales completas.",
    items: ["Grabación de eventos", "Aftermovies", "Entrevistas", "Proyectos culturales", "Contenido para redes", "Videoclips y contenido artístico"],
  },
  {
    n: "02", t: "Servicios técnicos para eventos",
    copy: "Soluciones técnicas fiables para eventos pequeños, medianos y de gran escala.",
    items: ["Equipamiento audiovisual", "Sonido", "Iluminación", "Sistemas de visuales", "Streaming", "Soporte técnico"],
  },
  {
    n: "03", t: "Visuales y contenido creativo",
    copy: "Diseñamos experiencias visuales para escenarios, pantallas, marcas y campañas culturales.",
    items: ["Visuales para conciertos", "Motion graphics", "Contenido para pantallas", "Diseño para cultura", "Identidad visual"],
  },
  {
    n: "04", t: "Booking y apoyo a artistas",
    copy: "Conectamos talento con eventos, marcas, festivales y proyectos culturales.",
    items: ["Booking de artistas", "Programación cultural", "Curaduría artística", "Gestión de colaboraciones", "Videoclips y contenido"],
  },
  {
    n: "05", t: "Desarrollo web y soluciones digitales",
    copy: "Soluciones digitales que conectan contenido, tecnología y comunicación.",
    items: ["Diseño y desarrollo web", "Landings de evento", "Tiendas online", "Automatizaciones con IA", "Integraciones", "Soporte y mantenimiento"],
  },
  {
    n: "06", t: "Colaboraciones para agencias",
    copy: "Equipo técnico y creativo externo para ampliar recursos sin aumentar estructura interna.",
    items: ["Agencias de comunicación", "Productoras", "Promotoras", "Organizadores de eventos", "Instituciones culturales"],
  },
];

const AMIGA = [
  { p: "10%", t: "Proyectos puntuales" },
  { p: "15%", t: "Colaboraciones recurrentes" },
  { p: "20%", t: "Partners de larga duración" },
];

function ServiciosPage() {
  return (
    <>
      <section className="relative pt-44 pb-20 px-4 md:px-8 overflow-hidden grain">
        <img src={camera} alt="" width={1200} height={1500} loading="lazy" className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
        <div className="relative mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Servicios modulares</span>
          <h1 className="display text-6xl md:text-[12rem] leading-[0.85] mt-6">
            NUESTROS<br /><span className="stroke-text">SERVICIOS</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-bone/80">
            Servicios modulares adaptados a cada tipo de evento, proyecto cultural, marca o artista. Trabajamos con ayuntamientos, promotores, agencias, marcas y artistas.
          </p>
        </div>
      </section>

      <Marquee items={["AUDIOVISUAL", "TÉCNICO", "VISUALES", "BOOKING", "DIGITAL", "AGENCIAS"]} />

      <section className="py-20 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px] space-y-px bg-white/10 rounded-3xl overflow-hidden">
          {FULL.map((s, i) => (
            <article key={s.n} className="bg-ink p-8 md:p-14 grid md:grid-cols-12 gap-8 items-start hover:bg-[oklch(0.15_0_0)] transition-colors">
              <div className="md:col-span-2">
                <span className="num-3d text-6xl md:text-7xl">{s.n}</span>
              </div>
              <div className="md:col-span-5">
                <h2 className="display text-4xl md:text-6xl">{s.t}</h2>
                <p className="mt-5 text-bone/75 max-w-md">{s.copy}</p>
              </div>
              <ul className="md:col-span-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-bone/85">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bcaps-green shrink-0" />
                    <span className="text-sm">{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* PROGRAMA EMPRESA AMIGA */}
      <section className="relative py-24 md:py-36 px-4 md:px-8 paper text-ink overflow-hidden">
        <div className="absolute top-8 right-8 stamp text-ink">Partner Oficial</div>
        <div className="mx-auto max-w-[1600px]">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] border border-ink rounded-full px-3 py-1">Programa B2B</span>
          <h2 className="display text-5xl md:text-8xl mt-6 text-ink">PROGRAMA<br />EMPRESA <span className="text-bcaps-blue">AMIGA</span></h2>
          <p className="mt-6 max-w-2xl text-ink/80">
            Para colaboradores, instituciones y agencias con las que trabajamos de forma recurrente. Creamos sinergias entre empresas, potenciando visibilidad, posicionamiento y proyectos culturales compartidos.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {AMIGA.map((a) => (
              <div key={a.p} className="bg-ink text-bone rounded-2xl p-8 hover-distort">
                <span className="display text-6xl text-bcaps-green">{a.p}</span>
                <p className="mt-3 text-lg">{a.t}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-ink/85">
              {["Descuentos en servicios y equipamiento", "Prioridad en disponibilidad de equipo", "Acceso a soluciones técnicas y creativas", "Colaboraciones en proyectos culturales", "Apoyo en difusión y contenido"].map((b) => (
                <li key={b} className="flex gap-3"><span className="text-bcaps-blue">→</span>{b}</li>
              ))}
            </ul>
            <div className="flex md:justify-end items-end">
              <Link to="/contacto" className="btn btn-accent">Hablemos de una colaboración</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
