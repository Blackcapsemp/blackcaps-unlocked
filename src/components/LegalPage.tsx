import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PrivacyNotice() {
  return <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Consulta cómo tratamos tus datos en la <Link to="/politica-de-privacidad" className="text-foreground underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">Política de Privacidad</Link>.</p>;
}

type Section = { id: string; title: string; content: ReactNode };

export function LegalPage({ title, introduction, sections }: { title: string; introduction: string; sections: Section[] }) {
  return (
    <article className="bg-background text-foreground pt-32 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-border pb-8">
          <span className="sticker">BLACKCAPS EXPERIENCE</span>
          <h1 className="display text-3xl md:text-5xl mt-6 leading-tight break-words">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-3xl">{introduction}</p>
          <p className="mt-5 border-l-2 border-border pl-4 text-sm text-muted-foreground">Versión preparada para revisión jurídica antes de su publicación.</p>
        </header>
        <nav aria-label="Índice del documento" className="border-b border-border py-8">
          <h2 className="display text-lg mb-4">Contenido</h2>
          <ol className="grid gap-3 md:grid-cols-2 text-base">
            {sections.map((section, i) => <li key={section.id}><a href={`#${section.id}`} className="underline underline-offset-4 hover:text-muted-foreground">{i + 1}. {section.title}</a></li>)}
          </ol>
        </nav>
        <div className="divide-y divide-border">
          {sections.map((section, i) => <section key={section.id} id={section.id} className="scroll-mt-28 py-8">
            <h2 className="display text-xl md:text-2xl leading-snug">{i + 1}. {section.title}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2">{section.content}</div>
          </section>)}
        </div>
        <nav aria-label="Documentos legales" className="flex flex-wrap gap-5 border-t border-border pt-8 text-sm">
          <Link to="/politica-de-privacidad" className="underline underline-offset-4">Política de Privacidad</Link>
          <Link to="/condiciones-de-uso" className="underline underline-offset-4">Condiciones de Uso</Link>
          <Link to="/contacto" className="underline underline-offset-4">Contacto</Link>
        </nav>
      </div>
    </article>
  );
}