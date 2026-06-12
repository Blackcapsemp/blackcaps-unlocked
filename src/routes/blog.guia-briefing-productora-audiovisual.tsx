import { createFileRoute, Link } from "@tanstack/react-router";

const URL = "https://blackcaps-es.lovable.app/blog/guia-briefing-productora-audiovisual";
const TITLE = "Cómo hacer un briefing para una productora audiovisual";
const DESC = "Guía B2B para preparar un briefing claro y obtener un presupuesto preciso de tu productora audiovisual: objetivos, públicos, formatos, plazos y entregables.";

export const Route = createFileRoute("/blog/guia-briefing-productora-audiovisual")({
  head: () => ({
    meta: [
      { title: `${TITLE} — BLACKCAPS EXPERIENCE` },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESC,
          author: { "@type": "Organization", name: "BLACKCAPS EXPERIENCE" },
          publisher: { "@type": "Organization", name: "BLACKCAPS EXPERIENCE", url: "https://blackcaps-es.lovable.app" },
          mainEntityOfPage: URL,
          inLanguage: "es-ES",
          about: ["productora audiovisual", "presupuesto producción audiovisual", "briefing audiovisual"],
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
              name: "¿Qué información debe incluir un briefing para una productora audiovisual?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Un briefing eficaz incluye objetivo de negocio, público objetivo, mensaje clave, formato y duración, referencias visuales, canales de difusión, fecha de entrega, localizaciones, recursos disponibles y presupuesto aproximado.",
              },
            },
            {
              "@type": "Question",
              name: "¿Cómo se calcula el presupuesto de una producción audiovisual?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "El presupuesto depende de jornadas de rodaje, equipo técnico, equipo humano, localizaciones, postproducción, música y derechos, número de entregables y plazos. Un briefing detallado permite cerrar el presupuesto con precisión.",
              },
            },
            {
              "@type": "Question",
              name: "¿Cuánto tiempo se necesita para producir un vídeo corporativo o aftermovie?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Un vídeo corporativo estándar suele requerir entre 3 y 6 semanas. Un aftermovie de evento puede entregarse en 5 a 10 días tras el rodaje según complejidad y volumen de material.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: BriefingGuide,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="text-2xl md:text-4xl mb-4">{title}</h2>
      <div className="space-y-4 text-base md:text-lg leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function BriefingGuide() {
  return (
    <article className="relative">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-12">
          <p className="sticker mb-6">Guía · B2B · Briefing</p>
          <h1 className="text-4xl md:text-6xl">
            Cómo hacer un briefing para una productora audiovisual
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            La guía definitiva para preparar un briefing claro, recibir un presupuesto preciso y conseguir
            resultados a la altura de tu marca. Escrita desde la experiencia de producir eventos corporativos,
            aftermovies y campañas para marcas en Madrid, Valencia y Barcelona.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Lectura aproximada · 8 minutos</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <nav aria-label="Índice" className="rounded-lg border border-border p-6 bg-card">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Índice</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li><a className="hover:underline" href="#por-que">Por qué un buen briefing decide el resultado</a></li>
            <li><a className="hover:underline" href="#estructura">Estructura de un briefing audiovisual</a></li>
            <li><a className="hover:underline" href="#presupuesto">Qué influye en el presupuesto</a></li>
            <li><a className="hover:underline" href="#errores">Errores frecuentes que encarecen el proyecto</a></li>
            <li><a className="hover:underline" href="#plantilla">Plantilla rápida de briefing</a></li>
            <li><a className="hover:underline" href="#faq">Preguntas frecuentes</a></li>
          </ol>
        </nav>

        <Section id="por-que" title="Por qué un buen briefing decide el resultado">
          <p>
            Contratar una productora audiovisual sin un briefing es como pedir un edificio sin planos. Las
            primeras reuniones se llenan de suposiciones, las propuestas llegan con presupuestos disparados
            y el resultado rara vez encaja con lo que la marca necesitaba comunicar.
          </p>
          <p>
            Un briefing bien escrito alinea expectativas, acelera la propuesta creativa y permite cerrar el
            presupuesto de producción audiovisual con precisión desde el primer correo. Es la herramienta que
            convierte una idea difusa en un proyecto producible.
          </p>
        </Section>

        <Section id="estructura" title="Estructura de un briefing audiovisual">
          <p>Un briefing profesional cubre, como mínimo, estos diez bloques:</p>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Objetivo de negocio.</strong> ¿Qué quieres conseguir? Notoriedad, leads, posicionamiento
              de marca empleadora, lanzamiento de producto, recap de evento, formación interna.
            </li>
            <li>
              <strong>Público objetivo.</strong> Define a quién hablas: sector, cargo, edad, idioma, contexto
              de consumo (LinkedIn corporativo no es Instagram Reels).
            </li>
            <li>
              <strong>Mensaje clave.</strong> Una sola frase que el espectador debe recordar al terminar el vídeo.
            </li>
            <li>
              <strong>Formato y duración.</strong> Vídeo corporativo (1–3 min), aftermovie (60–120 s), entrevistas,
              branded content, cápsulas para redes, spot publicitario. Cada formato tiene su lógica de producción.
            </li>
            <li>
              <strong>Referencias visuales.</strong> Dos o tres vídeos que te inspiren, indicando qué te gusta de
              cada uno: ritmo de montaje, tratamiento de color, tipografía, tono narrativo.
            </li>
            <li>
              <strong>Canales de difusión.</strong> Web, YouTube, LinkedIn, Instagram, pantallas en evento,
              email marketing. El canal condiciona el formato (vertical, horizontal, con o sin audio).
            </li>
            <li>
              <strong>Fechas.</strong> Día de entrega final, hitos intermedios, fechas inamovibles (lanzamiento,
              evento, feria). Si hay rodaje en directo, indícalo desde el primer día.
            </li>
            <li>
              <strong>Localizaciones y permisos.</strong> Oficinas propias, exteriores, plató, evento. ¿Quién
              gestiona los permisos? ¿Hay restricciones de marca o seguridad?
            </li>
            <li>
              <strong>Recursos disponibles.</strong> Logos en vectorial, manual de marca, música corporativa,
              imágenes de archivo, voz en off interna o externa.
            </li>
            <li>
              <strong>Presupuesto orientativo.</strong> Aunque sea una horquilla. Evita la ronda de propuestas a
              ciegas y permite a la productora proponer la mejor configuración para tu inversión.
            </li>
          </ol>
        </Section>

        <Section id="presupuesto" title="Qué influye en el presupuesto de producción audiovisual">
          <p>
            El precio de un proyecto audiovisual no depende del tipo de pieza, sino de las decisiones que se
            toman en el briefing. Estos son los factores que más mueven el presupuesto:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Jornadas de rodaje</strong> y número de localizaciones.</li>
            <li><strong>Equipo técnico</strong> (cámaras, ópticas, iluminación, sonido, dron, gimbal, slider).</li>
            <li><strong>Equipo humano</strong> (dirección, DOP, foquista, sonidista, gaffer, producción, maquillaje).</li>
            <li><strong>Postproducción</strong>: edición, color, grafismo, motion, VFX, masterización.</li>
            <li><strong>Música y derechos</strong> (librería, composición original, sincronización).</li>
            <li><strong>Castings, locutores o talentos</strong> y derechos de imagen.</li>
            <li><strong>Número de entregables y versiones</strong> (master + cortes para redes + subtítulos).</li>
            <li><strong>Plazos ajustados</strong>: las entregas exprés conllevan refuerzo de equipo.</li>
          </ul>
          <p>
            Compartir presupuesto orientativo no encarece el proyecto: lo afina. Permite a la productora
            recomendar dónde invertir y dónde optimizar para conseguir el máximo impacto.
          </p>
        </Section>

        <Section id="errores" title="Errores frecuentes que encarecen el proyecto">
          <ul className="list-disc list-inside space-y-2">
            <li>Pedir "un vídeo corporativo" sin definir objetivo ni duración.</li>
            <li>Sumar entregables a mitad de producción (versiones para redes, idiomas extra, subtítulos).</li>
            <li>Cambiar referencias visuales después de la propuesta creativa aprobada.</li>
            <li>No facilitar acceso a localizaciones, marca o portavoces con tiempo.</li>
            <li>Validar el guion con un comité amplio sin un único interlocutor que decida.</li>
            <li>Solicitar presupuestos comparativos sin briefing común: las propuestas no son comparables.</li>
          </ul>
        </Section>

        <Section id="plantilla" title="Plantilla rápida de briefing">
          <div className="rounded-lg border border-border bg-card p-6 font-mono text-sm leading-7">
            <p>1. Empresa y contacto:</p>
            <p>2. Proyecto / título de trabajo:</p>
            <p>3. Objetivo de negocio:</p>
            <p>4. Público objetivo:</p>
            <p>5. Mensaje clave (una frase):</p>
            <p>6. Formato y duración:</p>
            <p>7. Referencias (2–3 enlaces + por qué):</p>
            <p>8. Canales de difusión:</p>
            <p>9. Fechas clave (rodaje / entrega):</p>
            <p>10. Localizaciones:</p>
            <p>11. Recursos disponibles:</p>
            <p>12. Presupuesto orientativo:</p>
          </div>
          <p>
            Copia este esquema en un documento, complétalo y envíaselo a la productora antes de la primera
            reunión. En 48 horas deberías tener una propuesta creativa y un presupuesto cerrado.
          </p>
        </Section>

        <Section id="faq" title="Preguntas frecuentes">
          <div>
            <h3 className="text-lg mb-1">¿Cuánto cuesta una producción audiovisual corporativa?</h3>
            <p>
              Un vídeo corporativo profesional en España suele situarse entre 3.500 € y 25.000 € según equipo,
              jornadas, postproducción y entregables. Aftermovies de evento, entre 2.500 € y 12.000 €. Campañas
              de marca con talento y varias piezas, a partir de 15.000 €.
            </p>
          </div>
          <div>
            <h3 className="text-lg mb-1">¿Cuánto se tarda en producir un vídeo?</h3>
            <p>
              Vídeo corporativo: 3–6 semanas. Aftermovie de evento: 5–10 días. Campaña con preproducción
              creativa, casting y varias piezas: 6–10 semanas.
            </p>
          </div>
          <div>
            <h3 className="text-lg mb-1">¿Quién aporta la idea creativa?</h3>
            <p>
              La productora propone el tratamiento creativo y el guion partiendo del briefing del cliente. El
              briefing aporta objetivo y restricciones; la creatividad se construye conjuntamente en la
              preproducción.
            </p>
          </div>
        </Section>

        <aside className="mt-16 rounded-xl border border-border bg-card p-8">
          <p className="sticker mb-4">Siguiente paso</p>
          <h2 className="text-2xl md:text-3xl">¿Listo para enviar tu briefing?</h2>
          <p className="mt-3 text-muted-foreground">
            Cuéntanos tu proyecto y te respondemos con una propuesta creativa y un presupuesto cerrado en 48 horas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contacto" className="btn btn-primary">Enviar briefing</Link>
            <Link to="/produccion-audiovisual" className="btn btn-ghost">Ver servicios audiovisuales</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
