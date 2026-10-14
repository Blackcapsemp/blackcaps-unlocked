import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso artistas — BLACKCAPS EXPERIENCE" },
      { name: "description", content: "Crea tu cuenta de artista para aparecer en el roster de booking de BLACKCAPS EXPERIENCE." },
      { property: "og:title", content: "Acceso artistas — BLACKCAPS" },
      { property: "og:description", content: "Crea tu perfil de artista y aparece en nuestro roster." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function redirectAfterLogin() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return navigate({ to: "/mi-perfil" });
    const { data: r } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", u.user.id)
      .eq("role", "admin")
      .maybeSingle();
    navigate({ to: r ? "/admin/artistas" : "/mi-perfil" });
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) redirectAfterLogin();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) return toast.error("La contraseña debe tener al menos 8 caracteres");
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/mi-perfil` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Revisa tu email para confirmar la cuenta");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await redirectAfterLogin();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo acceder");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth` });
    if (res.error) toast.error("No se pudo acceder con Google");
    else if (!("redirected" in res && res.redirected)) navigate({ to: "/mi-perfil" });
  }

  const input = "w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-3 text-base outline-none focus:border-bone focus:ring-2 focus:ring-bone/20 transition";

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 flex items-start justify-center">
      <div className="w-full max-w-md">
        <span className="sticker">Artistas</span>
        <h1 className="display text-4xl md:text-5xl mt-5 leading-[0.95]">
          {mode === "signup" ? "Crea tu perfil" : "Accede a tu perfil"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tu perfil aparecerá en el roster de booking una vez lo revisemos (normalmente en 48 h).
        </p>

        <div className="mt-8 grid grid-cols-2 p-1 rounded-full border border-white/15">
          {(["signup", "login"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition ${mode === m ? "bg-bone text-ink" : "text-bone/70 hover:text-bone"}`}
            >
              {m === "signup" ? "Registrarme" : "Ya tengo cuenta"}
            </button>
          ))}
        </div>

        <button type="button" onClick={google} className="btn btn-ghost w-full justify-center mt-6">
          Continuar con Google
        </button>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-white/10" /> o con email <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${input} mt-2`} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Contraseña</span>
            <input type="password" required minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} mt-2`} />
            <span className="text-xs text-muted-foreground mt-1 block">Mínimo 8 caracteres</span>
          </label>
          <button disabled={busy} className="btn btn-primary w-full justify-center disabled:opacity-60">
            {busy ? "Un momento…" : mode === "signup" ? "Crear cuenta" : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}
