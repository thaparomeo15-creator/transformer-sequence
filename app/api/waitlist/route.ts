import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return Response.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const sendResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Transformer Sequence",
      html: `
        <div style="font-family: monospace; background: #080808; color: #00E5FF; padding: 20px; border-radius: 8px;">
          <h2>// TRANSFORMER SEQUENCE</h2>
          <p>Welcome to the waitlist!</p>
          <p>Your email: <strong>${email}</strong></p>
          <p>Status: <strong>QUEUED FOR ACCESS</strong></p>
          <p>We'll notify you when you're in.</p>
          <hr style="border: 1px solid #7B61FF; margin: 20px 0;" />
          <p>The world's first zero-latency scroll-driven canvas engine.</p>
        </div>
      `,
    });

    if (sendResult.error) {
      console.error("Resend error:", sendResult.error);
      return Response.json(
        { error: "Email send failed", details: sendResult.error },
        { status: 500 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email,
          tier: "personal",
          source: "website",
          metadata: { timestamp: new Date().toISOString() },
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      if (error.code === '23505') {
        return Response.json(
          { error: "Already registered", code: "DUPLICATE" },
          { status: 409 }
        );
      }
      return Response.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return Response.json(
      { 
        success: true, 
        message: "Email sent and waitlist entry created",
        emailId: sendResult.data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return Response.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
