import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const LEGAL_VERSION = "2026-11-07";
export const TERMS_TEXT = "Acepto las Condiciones de Uso y declaro haber leído la Política de Privacidad de BLACKCAPS EXPERIENCE.";
export const PUBLICATION_TEXT = "Autorizo expresamente a BLACKCAPS EXPERIENCE, S.L. a publicar y mostrar mi nombre artístico, biografía, fotografías y materiales promocionales aportados en su web, Roster y presskit público, con la finalidad de presentar mi proyecto artístico y gestionar posibles contrataciones. Declaro disponer de los derechos y autorizaciones necesarios sobre los materiales facilitados.";
export const PUBLICATION_LIMITS = "Esta autorización no incluye campañas publicitarias externas, publicaciones independientes en redes sociales, cesiones de materiales a terceros para otros usos ni grabaciones de actuaciones, que requerirán autorización o acuerdo específico cuando corresponda.";
export type Authorization = Tables<"artist_legal_authorizations">;
export function latestAuthorization(rows: Authorization[], kind: "terms" | "publication") {
  return rows.filter((r) => r.kind === kind).sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id))[0];
}
export function hasAuthorization(rows: Authorization[], kind: "terms" | "publication") {
  return latestAuthorization(rows, kind)?.state === "active";
}
export function canRequestPublication(terms: boolean, publication: boolean) { return terms && publication; }
export async function loadAuthorizations(userId: string | null, profileId: string | null = null) {
  let query = supabase.from("artist_legal_authorizations").select("*").order("created_at", { ascending: false });
  if (profileId) query = query.eq("artist_profile_id", profileId);
  else if (userId) query = query.eq("user_id", userId).is("artist_profile_id", null);
  else return [];
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
export async function recordAuthorization(kind: "terms" | "publication", state: "active" | "withdrawn" = "active", profileId: string | null = null, documentReference: string | null = null) {
  const { error } = await supabase.rpc("record_artist_authorization", { p_kind: kind, p_state: state, p_profile_id: profileId ?? undefined, p_document_reference: documentReference ?? undefined });
  if (error) throw error;
}