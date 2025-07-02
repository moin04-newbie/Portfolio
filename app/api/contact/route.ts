import { NextResponse } from 'next/server';
// @ts-expect-error: No types for nodemailer
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Read SMTP credentials from environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    // Support multiple recipients (comma-separated)
    const toEmail = process.env.CONTACT_TO_EMAIL
      ? process.env.CONTACT_TO_EMAIL.split(',').map(e => e.trim())
      : [smtpUser];

    if (!smtpUser || !smtpPass) {
      console.error('SMTP credentials not configured.');
      return NextResponse.json({ error: 'SMTP credentials not configured.' }, { status: 500 });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send the email
    try {
      await transporter.sendMail({
        from: `Portfolio Contact <${smtpUser}>`,
        to: toEmail,
        subject: `New Contact Form Submission: ${subject}`,
        replyTo: email,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
      });
    } catch (sendError) {
      console.error('Error sending email:', sendError);
      return NextResponse.json({ error: 'Failed to send email (exception).' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
} 