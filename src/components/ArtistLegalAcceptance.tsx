import { Link } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { PUBLICATION_TEXT, PUBLICATION_LIMITS } from "@/lib/artist-legal";

export function TermsAcceptance({ checked, onChange, id = "artist-terms" }: { checked: boolean; onChange: (value: boolean) => void; id?: string }) {
  return <div className="flex items-start gap-3 text-sm leading-relaxed">
    <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-1" />
    <label htmlFor={id}>Acepto las <Link to="/condiciones-de-uso" className="underline" target="_blank">Condiciones de Uso</Link> y declaro haber leído la <Link to="/politica-de-privacidad" className="underline" target="_blank">Política de Privacidad</Link> de BLACKCAPS EXPERIENCE.</label>
  </div>;
}
export function PublicationAcceptance({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="space-y-3 text-sm leading-relaxed">
    <div className="flex items-start gap-3"><Checkbox id="artist-publication" checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-1" /><label htmlFor="artist-publication">{PUBLICATION_TEXT}</label></div>
    <p className="text-muted-foreground">{PUBLICATION_LIMITS}</p>
  </div>;
}