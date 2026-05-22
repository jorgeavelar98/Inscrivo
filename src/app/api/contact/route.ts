import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, restaurant, message } = await request.json() as {
    name: string;
    email: string;
    restaurant: string;
    message?: string;
  };

  if (!name || !email || !restaurant) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: "Inscrivo Contact Form <onboarding@resend.dev>",
    to: "info@inscrivo.com",
    replyTo: email,
    subject: `New inquiry from ${restaurant}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Restaurant: ${restaurant}`,
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <h2>New inquiry from ${restaurant}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Restaurant:</strong> ${restaurant}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      <hr/>
      <p style="color:#888;font-size:12px">Sent from the Inscrivo contact form. Reply to this email to respond directly to ${name}.</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
