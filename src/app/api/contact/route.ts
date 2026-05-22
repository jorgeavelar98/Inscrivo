import { Resend } from "resend";
import { NextResponse } from "next/server";

function buildEmailHtml({
  name,
  email,
  restaurant,
  phone,
  message,
}: {
  name: string;
  email: string;
  restaurant: string;
  phone?: string;
  message?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f7f6f1;font-family:Inter,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f6f1;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header -->
        <tr>
          <td style="background-color:#14241c;border-radius:12px 12px 0 0;padding:28px 36px;text-align:center;">
            <p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
              Inscrivo<span style="color:#d4a23c;">.</span>
            </p>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:0.5px;text-transform:uppercase;">
              New inquiry
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background-color:#ffffff;padding:36px 36px 28px;border-left:1px solid #e4e2da;border-right:1px solid #e4e2da;">

            <p style="margin:0 0 24px;font-size:20px;font-weight:700;color:#14241c;">
              ${restaurant} wants a website
            </p>

            <!-- Detail rows -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0ece4;">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#586660;text-transform:uppercase;letter-spacing:0.6px;">Name</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#14241c;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0ece4;">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#586660;text-transform:uppercase;letter-spacing:0.6px;">Email</p>
                  <p style="margin:4px 0 0;font-size:15px;">
                    <a href="mailto:${email}" style="color:#d4a23c;text-decoration:none;font-weight:600;">${email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0ece4;">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#586660;text-transform:uppercase;letter-spacing:0.6px;">Restaurant</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#14241c;">${restaurant}</p>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0ece4;">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#586660;text-transform:uppercase;letter-spacing:0.6px;">Phone</p>
                  <p style="margin:4px 0 0;font-size:15px;">
                    <a href="tel:${phone}" style="color:#d4a23c;text-decoration:none;font-weight:600;">${phone}</a>
                  </p>
                </td>
              </tr>` : ""}
              ${message ? `
              <tr>
                <td style="padding:12px 0;">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#586660;text-transform:uppercase;letter-spacing:0.6px;">Message</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#14241c;line-height:1.6;">${message}</p>
                </td>
              </tr>` : ""}
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td>
                  <a href="mailto:${email}?subject=Re: Your Inscrivo inquiry"
                     style="display:inline-block;background-color:#d4a23c;color:#14241c;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:100px;">
                    Reply to ${name}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#f7f6f1;border:1px solid #e4e2da;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#586660;">
              Sent from the <strong>inscrivo.com</strong> contact form. Hit reply to respond directly to ${name}.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, restaurant, phone, message } = (await request.json()) as {
    name: string;
    email: string;
    restaurant: string;
    phone?: string;
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
    to: "ad.victoriam.ventures@gmail.com",
    replyTo: email,
    subject: `${restaurant} wants a website — new Inscrivo inquiry`,
    text: [
      `New inquiry from ${restaurant}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Restaurant: ${restaurant}`,
      phone ? `Phone: ${phone}` : "",
      message ? `Message: ${message}` : "",
      `\nReply directly to: ${email}`,
    ]
      .filter(Boolean)
      .join("\n"),
    html: buildEmailHtml({ name, email, restaurant, phone, message }),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
