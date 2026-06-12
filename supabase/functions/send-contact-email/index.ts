// Supabase Edge Function: send-contact-email
// Receives contact form data, validates, stores in contact_submissions,
// and sends a notification email via Resend to info@blackcaps.es.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  request_type?: "general" | "booking" | "artist";
  city?: string;
  page?: string;
  extra?: Record<string, unknown>;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const body = (await req.json()) as ContactPayload;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const service = (body.service ?? "").trim();
    const message = (body.message ?? "").trim();
    const city = (body.city ?? "").trim();
    const requestType = (body.request_type ?? "general") as
      | "general"
      | "booking"
      | "artist";
    const page = (body.page ?? "").trim();
    const extra = body.extra ?? {};

    if (!name || name.length > 200) {
      return new Response(
        JSON.stringify({ success: false, error: "Nombre obligatorio" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!email || !isEmail(email) || email.length > 320) {
      return new Response(
        JSON.stringify({ success: false, error: "Email inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!message || message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: "Mensaje obligatorio" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL");

    // Persist submission
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        request_type: requestType,
        name,
        email,
        phone: phone || null,
        city: city || null,
        message,
        payload: { service, page, ...extra },
      });

    if (insertError) {
      console.error("[send-contact-email] insert error:", insertError);
    }

    if (!RESEND_API_KEY || !NOTIFICATION_EMAIL || !FROM_EMAIL) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email configuration missing",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const fechaEnvio = new Date().toLocaleString("es-ES", {
      timeZone: "Europe/Madrid",
    });

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111; max-width: 640px; margin: 0 auto;">
        <h2 style="margin: 0 0 16px;">Nuevo contacto desde BLACKCAPS</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tbody>
            <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Nombre</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${esc(name)}</td></tr>
            <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${esc(email)}</td></tr>
            <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Teléfono</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${esc(phone || "—")}</td></tr>
            <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Servicio</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${esc(service || "—")}</td></tr>
            <tr><td style="padding:8px; border-bottom:1px solid #eee; vertical-align: top;"><strong>Mensaje</strong></td><td style="padding:8px; border-bottom:1px solid #eee; white-space: pre-wrap;">${esc(message)}</td></tr>
            <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Fecha de envío</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${esc(fechaEnvio)}</td></tr>
            <tr><td style="padding:8px;"><strong>Página de origen</strong></td><td style="padding:8px;">${esc(page || "—")}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    const text = `Nuevo contacto desde BLACKCAPS

Nombre: ${name}
Email: ${email}
Teléfono: ${phone || "—"}
Servicio: ${service || "—"}
Mensaje:
${message}

Fecha de envío: ${fechaEnvio}
Página de origen: ${page || "—"}`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFICATION_EMAIL],
        reply_to: email,
        subject: "Nuevo contacto desde BLACKCAPS",
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("[send-contact-email] Resend error:", resendRes.status, errBody);
      return new Response(
        JSON.stringify({
          success: false,
          error: "No se ha podido enviar la notificación interna. Tu solicitud ha sido guardada.",
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[send-contact-email] unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Error interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
