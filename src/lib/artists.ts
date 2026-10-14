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

/** Public URL for an approved artist's photo, served by the server after checking approval. */
export function approvedPhotoUrl(id: string) {
  return `/api/public/artist-photo/${id}`;
}

/**
 * Map photo_url -> displayable URL. Approved artists are served through the
 * public server route; pending/rejected photos stay private and are signed
 * (only owner/admin can read them in storage).
 */
export async function displayPhotos(artists: Pick<ArtistProfile, "id" | "status" | "photo_url">[]) {
  const map: Record<string, string> = {};
  const privatePaths: string[] = [];
  for (const a of artists) {
    if (!a.photo_url) continue;
    if (a.status === "approved") map[a.photo_url] = approvedPhotoUrl(a.id);
    else privatePaths.push(a.photo_url);
  }
  Object.assign(map, await signPhotos(privatePaths));
  return map;
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
