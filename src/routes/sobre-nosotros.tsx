import { createFileRoute, Link } from "@tanstack/react-router";
import artist from "@/assets/artist-portrait.jpg";
import camera from "@/assets/camera-detail.jpg";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Conoce a BLACKCAPS EXPERIENCE: productora creativa B2B con sede en Madrid, Valencia y Barcelona. Equipo, misión, valores y cultura de trabajo." },
      { property: "og:title", content: "Sobre nosotros — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Productora creativa B2B. Conoce nuestro equipo, misión y forma de trabajar." },
      { property: "og:url", content: "https://blackcaps.es/sobre-nosotros" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://blackcaps.es/sobre-nosotros" },
    ],
  }),
  component: SobreNosotrosPage,
});

const VALUES = [
  { t: "Creatividad", d: "Cada proyecto es una oportunidad para contar algo único, con una narrativa visual propia." },
  { t: "Tecnología", d: "Integramos las últimas herramientas audiovisuales, técnicas y digitales en cada producción." },
  { t: "Comunidad", d: "Trabajamos en red con artistas, marcas, agencias e instituciones culturales." },
  { t: "Calidad", d: "Cuidamos el detalle en cada fase: del briefing inicial a la entrega final." },
];

function SobreNosotrosPage() {
  return (
    <>
      <section className="relative pt-44 pb-20 px-4 md:px-8 overflow-hidden grain">
        <img src={artist} alt="" width={1200} height={1500} loading="lazy" className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
        <div className="relative mx-auto max-w-[1600px]">
          <span className="sticker mb-6">Quiénes somos</span>
          <h1 className="display text-6xl md:text-[10rem] leading-[0.85] mt-6">
            SOBRE<br />NOSOTROS
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-bone/80">
            BLACKCAPS EXPERIENCE es una productora creativa B2B fundada en 2020. Trabajamos desde Madrid, Valencia y Barcelona uniendo audiovisual, técnica de eventos, booking artístico y soluciones digitales.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="display text-4xl md:text-6xl">NUESTRA MISIÓN</h2>
            <p className="mt-6 text-bone/80 text-lg">
              Creemos que el futuro de los eventos, la música y la cultura pasa por unir creatividad, tecnología y comunidad. Acompañamos a marcas, artistas, agencias e instituciones culturales con un equipo modular y flexible que se adapta a cada reto.
            </p>
          </div>
          <div>
            <h2 className="display text-4xl md:text-6xl">CÓMO TRABAJAMOS</h2>
            <p className="mt-6 text-bone/80 text-lg">
              Operamos como un colectivo creativo y técnico: una estructura ligera, conectada con una red de especialistas en audiovisual, sonido, iluminación, visuales, diseño y desarrollo digital. Esto nos permite producir desde piezas íntimas hasta despliegues técnicos para grandes eventos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 paper text-ink">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-5xl md:text-7xl text-ink">VALORES</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.t} className="bg-ink text-bone rounded-2xl p-8">
                <h3 className="display text-2xl text-bcaps-green">{v.t}</h3>
                <p className="mt-3 text-bone/80">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <img src={camera} alt="" width={1200} height={800} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" />
        <div className="relative mx-auto max-w-[1600px] text-center">
          <h2 className="display text-4xl md:text-6xl">¿Quieres trabajar con nosotros?</h2>
          <p className="mt-6 text-bone/80 max-w-2xl mx-auto">
            Cuéntanos tu proyecto o pídenos un presupuesto. Respondemos en 48h hábiles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contacto" className="btn btn-primary">Pedir presupuesto</Link>
            <Link to="/servicios" className="btn btn-ghost">Ver servicios</Link>
          </div>
        </div>
      </section>
    </>
  );
}
