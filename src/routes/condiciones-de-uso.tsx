import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, ReviewNote } from "@/components/LegalPage";

export const Route = createFileRoute("/condiciones-de-uso")({
  head: () => ({
    meta: [
      { title: "Condiciones de Uso — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Condiciones generales de uso de la web y participación de artistas en el Roster de BLACKCAPS EXPERIENCE." },
      { property: "og:title", content: "Condiciones de Uso — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Registro, revisión de artistas, derechos sobre materiales y acuerdos de contratación." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://blackcaps.es/condiciones-de-uso" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://blackcaps.es/condiciones-de-uso" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return <LegalPage title="Condiciones de Uso" introduction="Condiciones generales para utilizar la web de BLACKCAPS EXPERIENCE y solicitar la participación como artista en su Roster." sections={[
    { id: "titular", title: "Titular y ámbito", content: <>
      <ul>
        <li><strong>Denominación social:</strong> BLACKCAPS EXPERIENCE, S.L.</li>
        <li><strong>NIF:</strong> B75680611</li>
        <li><strong>Domicilio social:</strong> Avenida de Castilla, 53-55, 28830 San Fernando de Henares (Madrid), España</li>
        <li><strong>Correo electrónico:</strong> <a href="mailto:info@blackcaps.es">info@blackcaps.es</a></li>
        <li><strong>Web:</strong> <a href="/">blackcaps.es</a></li>
        <li><strong>Inscripción registral:</strong> Registro Mercantil de [pendiente], tomo [pendiente], folio [pendiente], hoja [pendiente].</li>
      </ul>
      <ReviewNote>datos de inscripción en el Registro Mercantil, que facilitará la sociedad.</ReviewNote>
      <p>Estas condiciones regulan el uso general de la web y la solicitud de participación artística. No sustituyen presupuestos aceptados ni contratos específicos de producción, alquiler, representación o Booking.</p>
    </> },
    { id: "servicios", title: "Servicios de BLACKCAPS", content: <>
      <p>A través de esta web, BLACKCAPS presenta sus servicios principales:</p>
      <ul>
        <li><strong>Producción audiovisual</strong> para marcas, empresas y eventos.</li>
        <li><strong>Planificación y producción técnica de eventos</strong>, con equipamiento, montaje, instalación y personal técnico.</li>
        <li><strong>Alquiler independiente de equipamiento audiovisual</strong>, sin necesidad de contratar una producción completa.</li>
        <li><strong>Roster &amp; Booking</strong>, gestión de la contratación de artistas del Roster.</li>
      </ul>
      <p><strong>La prestación, el alquiler o la contratación de cualquiera de estos servicios estará sujeta al presupuesto y al acuerdo específico correspondiente</strong>, donde se fijarán precio, alcance, plazos, condiciones técnicas, fianzas, responsabilidades y cancelaciones. La información de la web es orientativa y no constituye una oferta vinculante.</p>
    </> },
    { id: "uso", title: "Uso de la web y de la cuenta", content: <>
      <p>Utiliza la web de forma lícita y respetuosa, sin suplantar identidades, aportar información engañosa, vulnerar derechos de terceros ni interferir en el funcionamiento o la seguridad del servicio.</p>
      <p>Los datos facilitados deben ser veraces y mantenerse actualizados. Quien gestione una cuenta debe proteger sus credenciales y comunicar posibles accesos no autorizados a BLACKCAPS.</p>
      <p>El acceso con Google es una opción de autenticación; no supone autorización para acceder a otros servicios de la cuenta de Google.</p>
    </> },
    { id: "registro", title: "Registro y solicitud de participación", content: <>
      <p><strong>El registro de artistas es una solicitud de participación.</strong> Crear una cuenta o enviar un perfil no implica la incorporación automática al Roster ni la existencia de una relación de representación.</p>
      <p>BLACKCAPS revisa la información y los materiales antes de aprobar y publicar el perfil. Puede solicitar ajustes o decidir no aprobar la solicitud. Mientras el perfil no esté aprobado, no se presenta como integrante público del Roster.</p>
      <p><strong>El registro y la publicación no garantizan contrataciones</strong>, ingresos, un número de actuaciones ni exclusividad. Las condiciones económicas y comerciales se acuerdan individualmente.</p>
    </> },
    { id: "materiales", title: "Materiales, publicación y promoción", content: <>
      <p>Las fotografías, biografías, música y materiales promocionales aportados deben contar con los derechos y autorizaciones necesarios, incluidos los derechos de imagen y los de autores, fotógrafos u otros terceros.</p>
      <p><strong>Publicación en el Roster:</strong> al solicitar la publicación del perfil, el artista autoriza que, una vez aprobado, se muestren en su ficha pública el nombre artístico, fotografía, biografía, estilo, ciudad y enlaces de contenido artístico aportados. Puede pedir su modificación o retirada en cualquier momento.</p>
      <p><strong>Requieren autorización expresa o acuerdo individual:</strong></p>
      <ul>
        <li>El uso de la imagen o los materiales del artista en redes sociales, publicidad, campañas o materiales comerciales de BLACKCAPS fuera de su ficha del Roster.</li>
        <li>La cesión de materiales a clientes, promotores o terceros.</li>
        <li>La grabación, edición o difusión de actuaciones y contenidos audiovisuales nuevos.</li>
        <li>Cualquier exclusividad, representación o condición económica.</li>
        <li>La publicación de perfiles creados manualmente por BLACKCAPS, que requiere la conformidad previa del artista.</li>
      </ul>
      <p>Aportar materiales no transfiere su propiedad a BLACKCAPS. No aportes contenidos ilícitos ni materiales que infrinjan derechos. BLACKCAPS podrá solicitar correcciones o retirar contenidos cuando existan motivos justificados, sin perjuicio de los acuerdos aplicables.</p>
      <ReviewNote>alcance de la autorización de imágenes y de los materiales de terceros, y su coordinación con los acuerdos específicos.</ReviewNote>
    </> },
    { id: "contratacion", title: "Solicitudes de contratación y acuerdos", content: <>
      <p>Las solicitudes enviadas desde las fichas artísticas o el formulario de Booking se gestionan por BLACKCAPS. Enviar una solicitud no confirma una reserva, la disponibilidad del artista ni una contratación.</p>
      <p>Las contrataciones gestionadas por BLACKCAPS se formalizarán conforme a los acuerdos correspondientes. Honorarios, gastos, condiciones técnicas, cancelaciones y demás aspectos comerciales se concretarán para cada proyecto.</p>
      <p><strong>Estas condiciones generales no sustituyen los contratos específicos de representación o Booking.</strong> En caso de discrepancia, se atenderá al acuerdo específico válidamente celebrado y a la normativa imperativa aplicable.</p>
    </> },
    { id: "privacidad", title: "Datos personales", content: <>
      <p>El tratamiento de datos se describe en la <a href="/politica-de-privacidad">Política de Privacidad</a>. La cuenta y los datos internos no se hacen públicos por el mero registro; solo se presenta el contenido artístico previsto una vez aprobado el perfil.</p>
      <p>Para consultas sobre tus datos o para ejercer derechos, escribe a <a href="mailto:info@blackcaps.es">info@blackcaps.es</a>.</p>
    </> },
    { id: "incidencias", title: "Incidencias y retirada de contenidos", content: <>
      <p>Si detectas información incorrecta, problemas de acceso o materiales que puedan vulnerar derechos, comunícalo a <a href="mailto:info@blackcaps.es">info@blackcaps.es</a> e identifica el contenido afectado.</p>
      <p>La web puede experimentar interrupciones o cambios. No se garantiza disponibilidad ininterrumpida ni resultados comerciales concretos. Esta información no limita derechos legalmente reconocidos ni excluye responsabilidades que no puedan excluirse conforme a la ley.</p>
      <p>Los enlaces de contenido artístico llevan a servicios de terceros sujetos a sus propias condiciones y políticas.</p>
    </> },
    { id: "normativa", title: "Normativa aplicable", content: <>
      <p>Estas condiciones se interpretan conforme a la normativa española y europea aplicable, respetando los derechos imperativos y las reglas legales de competencia judicial, incluidas las de protección de consumidores cuando correspondan.</p>
      <ReviewNote>versión completa de estas condiciones antes de su publicación definitiva.</ReviewNote>
    </> },
  ]} />;
}