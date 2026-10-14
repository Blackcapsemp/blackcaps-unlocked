import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type ArtistProfile = Tables<"artist_profiles">;

export const ARTIST_STYLES = ["Urbano", "Electrónica", "DJ", "Rap", "Pop", "Experimental", "Live Set"] as const;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** photo_url stores the storage path; bucket is private so we sign URLs. */
export async function signPhotos(paths: (string | null)[]) {
  const valid = paths.filter((p): p is string => !!p);
  if (!valid.length) return {} as Record<string, string>;
  const { data } = await supabase.storage.from("artist-photos").createSignedUrls(valid, 60 * 60 * 24);
  const map: Record<string, string> = {};
  data?.forEach((d) => {
    if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
  });
  return map;
}

export function safeUrl(u: string | null) {
  if (!u) return null;
  const v = u.startsWith("http") ? u : `https://${u}`;
  try {
    const url = new URL(v);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}
