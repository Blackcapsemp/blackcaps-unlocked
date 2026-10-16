import { Link } from "@tanstack/react-router";
import screens from "@/assets/eq-screens.jpg";
import sound from "@/assets/eq-sound.jpg";
import truss from "@/assets/eq-truss.jpg";
import lights from "@/assets/hero-stage.jpg";
import dj from "@/assets/dj-booth.jpg";
import integral from "@/assets/booking-crowd.jpg";

const ITEMS = [
  { t: "Pantallas y sistemas de vídeo", d: "Pantallas y sistemas de proyección para presentaciones, escenarios y contenido en directo.", img: screens },
  { t: "Sonido profesional y altavoces", d: "Sistemas de sonido para ponencias, conciertos, celebraciones y espacios de cualquier tamaño.", img: sound },
  { t: "Iluminación para eventos y escenarios", d: "Iluminación técnica y ambiental para crear la atmósfera adecuada en cada momento.", img: lights },
  { t: "Mesas y equipamiento DJ", d: "Equipamiento DJ preparado para sesiones en eventos corporativos y experiencias de marca.", img: dj },
  { t: "Estructuras Truss", d: "Estructuras para montajes técnicos seguros de iluminación, pantallas y escenografía.", img: truss },
  { t: "Soluciones técnicas integrales", d: "Coordinamos todo el montaje técnico del evento con un único interlocutor.", img: integral },
];

export function EquipmentSection() {
  return (
    <section className="py-20 md:py-32 px-5 md:px-10 border-t border-ivory/10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
          <div className="md:col-span-7">
            <span className="eyebrow">Equipamiento propio</span>
            <h2 className="mt-5 text-4xl md:text-6xl">Equipamiento audiovisual y soluciones técnicas para eventos.</h2>
          </div>
          <p className="md:col-span-5 text-ivory/75">
            Disponemos de equipamiento audiovisual propio para dar respuesta a las necesidades técnicas de eventos corporativos, producciones, espectáculos y celebraciones.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((s) => (
            <article key={s.t} className="group rounded-lg overflow-hidden border border-ivory/10 bg-ivory/5 transition-all duration-300 hover:-translate-y-1 hover:border-ivory/30">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.t} loading="lazy" width={1280} height={960} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-xl">{s.t}</h3>
                <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{s.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/contacto" search={{ type: "general" }} className="btn btn-corp">Consultar equipamiento</Link>
          <Link to="/contacto" search={{ type: "general" }} className="btn btn-line">Solicitar presupuesto</Link>
        </div>
      </div>
    </section>
  );
}
