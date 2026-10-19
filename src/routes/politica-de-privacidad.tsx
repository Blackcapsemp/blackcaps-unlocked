import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Información sobre datos personales, formularios, perfiles de artistas, acceso con Google y derechos en BLACKCAPS EXPERIENCE." },
      { property: "og:title", content: "Política de Privacidad — BLACKCAPS EXPERIENCE" },
      { property: "og:description", content: "Cómo tratamos los datos personales y cómo ejercer tus derechos." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://blackcaps.es/politica-de-privacidad" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://blackcaps.es/politica-de-privacidad" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalPage title="Política de Privacidad" introduction="Información sobre el tratamiento de datos personales en la web, las solicitudes comerciales y el registro de artistas, conforme al Reglamento General de Protección de Datos (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD)." sections={[
    { id: "responsable", title: "Responsable del tratamiento", content: <>
      <p><strong>BLACKCAPS EXPERIENCE, S.L.</strong> · NIF: B75680611.</p>
      <p>Domicilio: Avenida de Castilla, 53-55, 28830 San Fernando de Henares (Madrid), España.</p>
      <p>Correo: <a href="mailto:info@blackcaps.es">info@blackcaps.es</a> · Web: <a href="https://blackcaps.es">https://blackcaps.es</a>.</p>
    </> },
    { id: "datos", title: "Datos que recogemos", content: <>
      <ul>
        <li><strong>Contacto y presupuesto:</strong> nombre, correo, teléfono, ciudad, empresa cuando corresponda y el mensaje, servicio, fechas o presupuesto que facilites.</li>
        <li><strong>Solicitudes de Booking:</strong> artista solicitado y su identificador, tipo y lugar del evento, fecha, asistentes, presupuesto y necesidades técnicas, según los campos cumplimentados.</li>
        <li><strong>Solicitudes artísticas:</strong> nombre artístico, redes, enlaces musicales, proyecto y servicios solicitados.</li>
        <li><strong>Cuenta de usuario:</strong> correo y datos necesarios para el registro y la autenticación. La contraseña se gestiona mediante el servicio de autenticación; no forma parte del perfil público.</li>
        <li><strong>Perfil artístico:</strong> nombre artístico, estilo, ciudad, biografía, fotografía y enlaces o material promocional aportados.</li>
      </ul>
      <p>Los campos obligatorios se identifican en cada formulario. No incluyas datos sensibles ni información de terceros innecesaria para tu solicitud.</p>
    </> },
    { id: "google", title: "Inicio de sesión con Google", content: <>
      <p>Si eliges Google, utilizamos la información básica que facilite para identificarte y autenticar tu cuenta, como el identificador de usuario, nombre, correo y fotografía de cuenta cuando esté disponible.</p>
      <p><strong>Google Login se utiliza únicamente para autenticación.</strong> No solicitamos acceso a Gmail, Google Drive, contactos ni otros servicios de Google. La fotografía de cuenta no implica su publicación automática como fotografía artística.</p>
      <p>Google trata los datos de su propio servicio conforme a su <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacidad</a>.</p>
    </> },
    { id: "finalidades", title: "Finalidades y bases jurídicas", content: <>
      <ul>
        <li><strong>Responder consultas:</strong> el interés legítimo en atender comunicaciones dirigidas a BLACKCAPS; cuando solicites una propuesta o contratación, la aplicación de medidas precontractuales a petición tuya (artículos 6.1.f y 6.1.b RGPD, respectivamente).</li>
        <li><strong>Gestionar presupuestos y servicios:</strong> medidas precontractuales y, cuando exista un acuerdo, ejecución del contrato (artículo 6.1.b RGPD).</li>
        <li><strong>Gestionar cuentas y solicitudes de artistas:</strong> tramitar la participación solicitada, revisar la información y administrar la relación de uso del servicio (artículo 6.1.b RGPD).</li>
        <li><strong>Publicar contenido artístico aprobado:</strong> gestionar la participación solicitada en el Roster conforme a las condiciones aplicables. Debe revisarse jurídicamente la base y la autorización de imagen adecuada para cada caso, especialmente respecto de materiales de terceros.</li>
        <li><strong>Atender obligaciones legales y reclamaciones:</strong> cumplimiento de obligaciones aplicables (artículo 6.1.c RGPD) y, cuando proceda, interés legítimo en la defensa de derechos (artículo 6.1.f RGPD).</li>
      </ul>
      <p>No se atribuye al registro una autorización general para publicidad. Cualquier finalidad adicional deberá informarse y contar con la base jurídica que corresponda.</p>
    </> },
    { id: "publicacion", title: "Datos privados y perfiles públicos", content: <>
      <p><strong>La cuenta y la solicitud no se publican por el hecho de registrarte.</strong> BLACKCAPS revisa los perfiles y decide su aprobación antes de incorporarlos al Roster.</p>
      <p>Tras la aprobación, la ficha pública puede mostrar nombre artístico, fotografía, biografía, estilo, ciudad y enlaces de contenido artístico, como Spotify, SoundCloud y YouTube; un presskit solo se muestra cuando exista un enlace válido. La ciudad no representa un domicilio exacto.</p>
      <p>El correo de cuenta, contraseñas, solicitudes de contacto y datos internos de gestión no forman parte de la ficha pública. Instagram no se muestra como vía de contacto directo en la ficha artística. La contratación se gestiona a través de BLACKCAPS.</p>
      <p>Las fotografías de perfiles pendientes o rechazados no se ofrecen públicamente. También pueden existir perfiles creados manualmente por administración: antes de publicarlos deben verificarse la procedencia de los datos, el deber de información y los derechos sobre los materiales.</p>
      <p>Los contenidos publicados son accesibles a visitantes y pueden ser indexados por buscadores o compartidos por terceros. Puedes solicitar su rectificación o retirada mediante el correo del responsable.</p>
    </> },
    { id: "proveedores", title: "Proveedores tecnológicos y destinatarios", content: <>
      <p>La prestación del servicio utiliza infraestructura de base de datos, autenticación y almacenamiento, servicios de correo y alojamiento web. Entre los proveedores tecnológicos se encuentran Supabase, Resend, Google y el proveedor de alojamiento de la web.</p>
      <ul>
        <li><strong>Base de datos, autenticación y almacenamiento:</strong> soporte de cuentas, solicitudes y materiales artísticos.</li>
        <li><strong>Resend:</strong> envío de comunicaciones por correo relacionadas con los formularios.</li>
        <li><strong>Google:</strong> autenticación cuando eliges este método, además del tratamiento propio de Google descrito en su política.</li>
        <li><strong>Alojamiento web:</strong> prestación y disponibilidad de la web y su infraestructura.</li>
      </ul>
      <p>El personal autorizado accede a los datos necesarios para tramitar solicitudes y revisar perfiles. Los datos podrán comunicarse a autoridades cuando exista una obligación legal.</p>
      <p><strong>Pendiente de revisión:</strong> confirmar la identidad contractual del proveedor de alojamiento, los proveedores efectivamente activos, su papel como encargados o responsables, los acuerdos de tratamiento, ubicaciones y posibles transferencias internacionales. Este texto no afirma que existan o no dichas transferencias ni atribuye garantías no verificadas. Si fueran aplicables, deberá facilitarse la información sobre destinos y mecanismos de garantía antes de publicar la versión definitiva.</p>
    </> },
    { id: "conservacion", title: "Conservación", content: <>
      <p>Los datos se conservarán durante el tiempo necesario para atender la solicitud, gestionar la cuenta o participación artística y mantener la relación comercial correspondiente. Se revisará la necesidad de conservar solicitudes no continuadas y perfiles que ya no participen.</p>
      <p>Cuando proceda su supresión, podrán mantenerse bloqueados los datos necesarios para atender obligaciones legales o responsabilidades durante los plazos legalmente aplicables. No se fija aquí un plazo concreto no verificado.</p>
      <p>Los plazos operativos, la eliminación en copias de seguridad y los criterios de revisión de cuentas inactivas quedan pendientes de validación documental y jurídica.</p>
    </> },
    { id: "derechos", title: "Tus derechos", content: <>
      <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, en los casos y con el alcance previstos en el RGPD. Si un tratamiento se basa en consentimiento, puedes retirarlo sin afectar a la licitud del tratamiento anterior.</p>
      <p>Escribe a <a href="mailto:info@blackcaps.es">info@blackcaps.es</a>, indicando el derecho que deseas ejercer y los datos necesarios para localizar tu solicitud o cuenta. Si existen dudas razonables sobre tu identidad, podremos solicitar información adicional proporcionada para verificarla.</p>
      <p>Si consideras que el tratamiento vulnera la normativa, tienes derecho a presentar una reclamación ante la <a href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.</p>
    </> },
    { id: "revision", title: "Revisión de esta política", content: <>
      <p>Esta versión debe revisarse antes de su publicación para confirmar los tratamientos reales, sus bases jurídicas, la información a artistas incorporados manualmente, los proveedores y los criterios de conservación. No constituye una certificación de cumplimiento ni sustituye asesoramiento jurídico.</p>
      <p>Los cambios relevantes en el tratamiento deberán reflejarse en esta política y comunicarse cuando la normativa lo exija.</p>
    </> },
  ]} />;
}