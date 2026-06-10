import { createFileRoute, Link } from "@tanstack/react-router";
import heroStage from "@/assets/hero-stage.jpg";
import djBooth from "@/assets/dj-booth.jpg";
import camera from "@/assets/camera-detail.jpg";
import artist from "@/assets/artist-portrait.jpg";
import bcapBg from "@/assets/bcapstudio-bg.jpg";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BLACKCAPS EXPERIENCE — Productora audiovisual, eventos y sello musical" },
      { name: "description", content: "Productora creativa B2B con sede en Madrid, Valencia y Barcelona. Producción audiovisual, servicios técnicos para eventos, booking artístico, soluciones digitales y sello discográfico 360º BCAPSTUDIO.EMP." },
    ],
  }),
  component: Home,
});

const SERVICES = [
  { n: "01", t: "Producción audiovisual", d: "Aftermovies, entrevistas, contenido de redes, videoclips y campañas audiovisuales completas." },
  { n: "02", t: "Servicios técnicos", d: "Sonido, iluminación, visuales, streaming y soporte técnico para todo tipo de evento." },
  { n: "03", t: "Visuales y contenido", d: "Motion graphics, VJ, pantallas LED, identidad visual para escenarios y campañas." },
  { n: "04", t: "Booking de artistas", d: "Conectamos talento con eventos, marcas, festivales y proyectos culturales." },
  { n: "05", t: "Soluciones digitales", d: "Webs, landings de evento, tiendas online, automatizaciones con IA y mantenimiento." },
  { n: "06", t: "Colaboraciones B2B", d: "Equipo técnico y creativo externo para agencias, productoras e instituciones." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden grain">
        <img
          src={heroStage}
          alt="Concierto Blackcaps con pantallas LED"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />

        <div className="absolute top-24 left-4 md:left-8 z-10 flex flex-col gap-3">
          <span className="sticker">● Live since 2020</span>
          <span className="stamp text-xs">B2B · Audiovisual · Events</span>
        </div>


        <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 pt-44 md:pt-56 pb-24">
          <h1 className="display text-[18vw] md:text-[14vw] leading-[0.85]">
            <span className="reveal-mask"><span>BLACK</span></span>
            <span className="reveal-mask block stroke-text glitch" style={{ animationDelay: "200ms" }}><span>CAPS</span></span>
            <span className="reveal-mask block text-gradient-bcaps" style={{ animationDelay: "400ms" }}><span>EXPERIENCE</span></span>
          </h1>

          <div className="mt-10 grid md:grid-cols-3 gap-6 items-end">
            <p className="md:col-span-2 text-lg md:text-xl text-bone/85 max-w-2xl">
              Producción audiovisual · Servicios técnicos · Booking artístico · Soluciones digitales.
              <span className="block mt-3 text-bcaps-green text-2xl display">Tu marca, tu sonido, tu historia: lo creamos todo.</span>
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/servicios" className="btn btn-primary">Ver servicios</Link>
              <Link to="/booking" className="btn btn-ghost">Booking</Link>
              <Link to="/contacto" className="btn btn-accent">Trabaja con nosotros</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 inset-x-0 z-10">
          <Marquee items={["AUDIOVISUAL", "MUSIC", "EVENTS", "BOOKING", "DIGITAL", "CULTURE", "B2B"]} fast />
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="relative py-24 md:py-36 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 display text-[28vw] leading-none text-white/[0.025] pointer-events-none select-none">CULTURE</div>
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-12 gap-10 relative">
          <div className="md:col-span-5">
            <span className="sticker mb-6">01 — Quiénes somos</span>
            <h2 className="display text-6xl md:text-8xl">QUIÉNES<br /><span className="text-bcaps-green">SOMOS</span></h2>
            <p className="mt-8 text-bone/80 text-lg leading-relaxed max-w-xl">
              Somos una productora creativa audiovisual, musical y de eventos B2B. Creamos soluciones completas para marcas, instituciones, artistas y proyectos culturales —combinando producción audiovisual, tecnología, contenido digital, servicios técnicos y estrategia creativa.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Ayuntamientos","Promotores","Agencias","Marcas","Artistas","B2B & Corporate"].map((x) => (
                <span key={x} className="sticker">{x}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 relative">
            <div className="grid grid-cols-2 gap-4">
              <img src={djBooth} alt="DJ booth" width={1200} height={1500} loading="lazy" className="rounded-2xl object-cover w-full h-72 md:h-96" />
              <img src={camera} alt="Camera detail" width={1200} height={1500} loading="lazy" className="rounded-2xl object-cover w-full h-72 md:h-96 mt-12" />
              <img src={artist} alt="Artist portrait" width={1024} height={1280} loading="lazy" className="col-span-2 rounded-2xl object-cover w-full h-72 md:h-[28rem]" />
            </div>
            <div className="absolute -top-6 -right-2 stamp text-bcaps-green rotate-6">Since 2020</div>
          </div>

          <div className="md:col-span-12 mt-10">
            <p className="display text-5xl md:text-[10vw] leading-[0.9] stroke-text">
              ANYWHERE BUT WITH <span className="text-gradient-bcaps not-stroke">MUSIC.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="relative py-24 md:py-36 px-4 md:px-8 bg-[oklch(0.1_0_0)] border-y border-white/5">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="sticker mb-6">02 — Servicios</span>
              <h2 className="display text-6xl md:text-8xl mt-4">NUESTROS<br />SERVICIOS</h2>
            </div>
            <p className="max-w-md text-bone/75">
              Blackcaps ofrece servicios modulares, adaptados a cada tipo de evento, proyecto cultural, marca o artista.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
            {SERVICES.map((s) => (
              <div key={s.n} className="bg-ink p-8 md:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-[oklch(0.16_0_0)] transition-colors">
                <div className="flex items-start justify-between">
                  <span className="num-3d text-5xl md:text-6xl">{s.n}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition text-bcaps-green">↗</span>
                </div>
                <div className="mt-10">
                  <h3 className="display text-sm group-hover:text-bcaps-green transition-colors">{s.t}</h3>
                  <p className="mt-3 text-bone/70 text-sm leading-relaxed text-sm">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/servicios" className="btn btn-ghost">Ver todos los servicios →</Link>
          </div>
        </div>
      </section>

      {/* BOOKING TEASER */}
      <section className="relative py-24 md:py-36 px-4 md:px-8 overflow-hidden">
        <Marquee items={["URBAN", "ELECTRONIC", "DJ", "RAP", "POP", "EXPERIMENTAL", "LIVE SET"]} reverse />
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-2 gap-12 mt-12 items-center">
          <div>
            <span className="sticker mb-6">03 — Booking</span>
            <h2 className="display text-6xl md:text-8xl mt-4">BOOKING<br /><span className="stroke-text">OF ARTISTS</span></h2>
            <p className="mt-6 text-bone/80 max-w-lg">
              Impulsamos la programación artística, contratación, showcases, eventos privados, festivales y colaboraciones con marcas. Creamos oportunidades reales para artistas emergentes y consolidados.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="btn btn-primary">Solicitar artista</Link>
              <Link to="/booking" className="btn btn-ghost">Soy artista</Link>
            </div>
          </div>
          <div className="relative">
            <img src={artist} alt="Artist" width={1024} height={1280} loading="lazy" className="rounded-3xl w-full h-[32rem] object-cover" />
            <div className="absolute -bottom-4 -left-4 bg-bone text-ink p-5 rounded-2xl max-w-[14rem] rotate-[-3deg]">
              <p className="display text-sm leading-tight">FESTIVAL POSTER ENERGY</p>
              <p className="text-[10px] mt-2 uppercase tracking-[0.18em]">Live · 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* BCAPSTUDIO */}
      <section className="relative py-24 md:py-36 px-4 md:px-8 overflow-hidden">
        <img src={bcapBg} alt="" width={1920} height={1080} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 gradient-bcaps opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="sticker mb-6">04 — Sello creativo 360º</span>
              <h2 className="display text-6xl md:text-[8rem] leading-[0.85]">
                BCAPSTUDIO<span className="text-bcaps-orange">.EMP</span>
              </h2>
              <p className="mt-4 text-xl md:text-2xl text-gradient-bcaps display">Música · Audiovisual · Estrategia digital</p>
            </div>
            <Link to="/bcapstudio" className="btn btn-primary">Conoce el sello →</Link>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <p className="md:col-span-7 text-lg text-bone/85 max-w-2xl">
              Línea de negocio de Blackcaps Experience enfocada al desarrollo creativo y estratégico de artistas y marcas en entornos digitales. Integra producción audiovisual, branding, contenido digital, distribución musical y comunicación para construir lanzamientos con identidad y recorrido.
            </p>
            <div className="md:col-span-5 grid grid-cols-2 gap-3">
              {["Distribución", "Royalties", "Branding", "Videoclips", "TikTok/IG", "Estudio"].map((t) => (
                <div key={t} className="rounded-2xl border border-white/15 backdrop-blur-md bg-black/30 p-4">
                  <p className="display text-lg">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANIFIESTO / VISION */}
      <section className="relative py-24 md:py-36 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <span className="sticker">05 — Nuestra visión</span>
          <h2 className="display text-5xl md:text-8xl mt-6 max-w-5xl">
            CREEMOS QUE EL FUTURO DE LOS <span className="text-bcaps-green">EVENTOS, LA MÚSICA Y LA CULTURA</span> PASA POR UNIR CREATIVIDAD, TECNOLOGÍA Y COMUNIDAD.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Talento emergente", d: "Impulsamos artistas, marcas y proyectos con identidad." },
              { n: "02", t: "Experiencias culturales", d: "Generamos eventos con narrativa, no solo logística." },
              { n: "03", t: "Comunidad", d: "Construimos red entre artistas, marcas y promotores." },
            ].map((x) => (
              <div key={x.n} className="border-t border-white/15 pt-6">
                <span className="num-3d text-4xl">{x.n}</span>
                <h3 className="display text-sm mt-4">{x.t}</h3>
                <p className="mt-3 text-bone/70 text-sm">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
