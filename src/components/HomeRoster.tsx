import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { approvedPhotoUrl } from "@/lib/artists";

type A = { id: string; slug: string; artist_name: string; style: string; photo_url: string | null };

export function HomeRoster() {
  const [artists, setArtists] = useState<A[] | null>(null);

  useEffect(() => {
    supabase
      .from("artist_profiles")
      .select("id, slug, artist_name, style, photo_url")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setArtists(data ?? []));
  }, []);

  return (
    <section className="py-20 md:py-32 px-5 md:px-10 border-t border-ivory/10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">Roster & Booking</span>
            <h2 className="mt-5 text-4xl md:text-6xl">El talento que completa tu evento.</h2>
          </div>
          <p className="md:col-span-5 text-ivory/75">
            Contamos con un roster de DJs y artistas para eventos corporativos, marcas y experiencias en directo. Seleccionamos el talento adecuado y coordinamos su contratación para que cada evento tenga una identidad propia.
          </p>
        </div>

        {artists && artists.length > 0 && (
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((a) => (
              <Link
                key={a.id}
                to="/artistas/$slug"
                params={{ slug: a.slug }}
                className="group block rounded-lg overflow-hidden border border-ivory/10 bg-ivory/5 transition-all duration-300 hover:-translate-y-1 hover:border-ivory/30 hover:shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden bg-ivory/10">
                  {a.photo_url && (
                    <img src={approvedPhotoUrl(a.id)} alt={`${a.artist_name}, artista del roster`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
                <div className="p-6 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl">{a.artist_name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/60">{a.style}</p>
                  </div>
                  <span aria-hidden className="text-ivory/60 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link to="/booking" className="btn btn-corp">Descubrir nuestro roster</Link>
          <Link to="/contacto" search={{ type: "booking" } as never} className="btn btn-line">Solicitar contratación</Link>
          <Link to="/auth" className="ml-1 text-xs uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory underline-offset-4 hover:underline transition-colors">
            ¿Eres artista? Colabora con nosotros
          </Link>
        </div>
      </div>
    </section>
  );
}
