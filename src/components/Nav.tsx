import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/produccion-audiovisual", label: "Audiovisual" },
  { to: "/booking", label: "Booking" },
  { to: "/bcapstudio", label: "BCAPSTUDIO" },
  { to: "/sobre-nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRole(session: { user: { id: string } } | null) {
      if (!session) {
        setIsAdmin(false);
        return;
      }
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!r);
    }
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      loadRole(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((e, s) => {
      setSignedIn(!!s);
      if (e === "SIGNED_OUT") setIsAdmin(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled || open ? "bg-ink/85 backdrop-blur-md border-b border-white/10" : ""}`}>
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-3 flex items-center justify-between min-h-[64px] md:min-h-[72px]">
        <Link to="/" className="flex items-center shrink-0 mr-4" aria-label="BLACKCAPS Experience — Inicio">
          <img src="/bcaps-logo.png" alt="" aria-hidden="true" width={1220} height={351}
            className="h-9 md:h-11 lg:h-12 w-auto max-w-[150px] md:max-w-[200px] lg:max-w-[240px] object-contain shrink-0" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1 rounded-full border border-white/15 backdrop-blur-md bg-black/30 px-2 py-1.5">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className="px-3 xl:px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold rounded-full transition-colors hover:bg-bone hover:text-ink whitespace-nowrap"
              activeProps={{ className: "bg-bone text-ink" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 ml-3">
          <Link to={isAdmin ? "/admin/artistas" : signedIn ? "/mi-perfil" : "/auth"} className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold rounded-full border border-white/20 hover:border-bone transition whitespace-nowrap">
            {isAdmin ? "Panel de administración" : signedIn ? "Mi perfil" : "Soy artista"}
          </Link>
          {signedIn && (
            <button onClick={signOut} className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-bone">Salir</button>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden relative w-11 h-11 grid place-items-center rounded-full border border-white/15" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
          <span className={`absolute h-0.5 w-5 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-5 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden h-[calc(100dvh-64px)] overflow-y-auto bg-ink px-6 pt-4 pb-10 flex flex-col">
          <nav aria-label="Móvil" className="flex flex-col">
            {links.map((l) => (
              <Link key={l.to} to={l.to}
                className="display text-2xl py-3 border-b border-white/10 flex items-center justify-between text-bone/80"
                activeProps={{ className: "text-bone" }} activeOptions={{ exact: true }}>
                {l.label} <span aria-hidden className="text-sm text-muted-foreground">→</span>
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/contacto" className="btn btn-primary justify-center">Pedir presupuesto</Link>
            <Link to={isAdmin ? "/admin/artistas" : signedIn ? "/mi-perfil" : "/auth"} className="btn btn-ghost justify-center">
              {isAdmin ? "Panel de administración" : signedIn ? "Mi perfil de artista" : "Soy artista · Crear perfil"}
            </Link>
            {signedIn && <button onClick={signOut} className="text-xs uppercase tracking-[0.16em] text-muted-foreground py-2">Cerrar sesión</button>}
          </div>
        </div>
      )}
    </header>
  );
}
