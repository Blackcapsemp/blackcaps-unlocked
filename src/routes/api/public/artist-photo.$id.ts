import { createFileRoute } from "@tanstack/react-router";

// Serves an artist's photo only when the profile exists and is approved.
// The storage bucket stays private (owner/admin only); this is the public read path.
export const Route = createFileRoute("/api/public/artist-photo/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: artist } = await supabaseAdmin
          .from("artist_profiles")
          .select("photo_url")
          .eq("id", params.id)
          .eq("status", "approved")
          .maybeSingle();
        if (!artist?.photo_url) return new Response("Not found", { status: 404 });
        const { data, error } = await supabaseAdmin.storage.from("artist-photos").download(artist.photo_url);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "Content-Type": data.type || "image/jpeg",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
