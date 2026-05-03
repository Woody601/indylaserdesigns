import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { fullName, email, number, message } = await request.json();

  if (!fullName || !email || !number || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Contact Form <noreply@indylaserdesigns.com>",
    to: "info@indylaserdesigns.com",
    subject: `New contact form submission from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
