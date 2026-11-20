// Supabase Edge Function: send-enquiry-notification
// Triggered when a new project enquiry is inserted into public.enquiries
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EnquiryPayload {
  customer_name: string;
  business_name?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  project_description: string;
  budget: string;
  expected_date?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: EnquiryPayload = await req.json();
    const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") || "contact@clearcode.dev";
    const emailApiKey = Deno.env.get("EMAIL_PROVIDER_API_KEY");

    console.log(`Received enquiry from ${payload.customer_name} (${payload.email}) for budget ${payload.budget}`);

    // If email API key is configured (e.g. Resend), send notification email
    if (emailApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${emailApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ClearCode.dev <notifications@clearcode.dev>",
          to: [adminEmail],
          subject: `⚡ New Project Enquiry: ${payload.customer_name} (${payload.budget})`,
          html: `
            <h2>New Project Enquiry on ClearCode.dev</h2>
            <p><strong>Customer Name:</strong> ${payload.customer_name}</p>
            <p><strong>Business Name:</strong> ${payload.business_name || "N/A"}</p>
            <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
            <p><strong>Phone:</strong> ${payload.phone}</p>
            <p><strong>WhatsApp:</strong> ${payload.whatsapp || "N/A"}</p>
            <p><strong>Budget:</strong> ${payload.budget}</p>
            <p><strong>Expected Date:</strong> ${payload.expected_date || "Flexible"}</p>
            <p><strong>Project Description:</strong></p>
            <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #168BFF;">
              ${payload.project_description}
            </blockquote>
          `,
        }),
      });

      const resData = await emailResponse.json();
      return new Response(JSON.stringify({ success: true, resData }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Enquiry logged. Configure EMAIL_PROVIDER_API_KEY to send live email dispatches." 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
