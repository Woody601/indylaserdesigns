import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { fullName, email, number, message, website } = await request.json();

    // Required fields
    if (!fullName || !email || !number || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Honeypot field
    if (website && website.trim() !== "") {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Name validation
    if (fullName.trim().length < 2 || fullName.length > 100) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    // Detect random strings such as:
    // CAoDtSqzBlFjSkaDg
    const randomNameRegex = /^[A-Za-z]{15,}$/;
    if (randomNameRegex.test(fullName.trim())) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Message validation
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Contact Form <noreply@indylaserdesigns.com>",
      to: "info@indylaserdesigns.com",
      subject: `New contact form submission from ${fullName}`,
      text: `Name: ${fullName}
Email: ${email}
Phone: ${number}

Message:
${message}`,
      replyTo: email,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
