import "server-only";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    : undefined,
});

export async function sendSystemInvitation(input: {
  email: string;
  username: string;
  inviteUrl: string;
  role: string;
}) {
  if (!process.env.SMTP_FROM) {
    throw new Error("SMTP_FROM is not configured.");
  }

  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to: input.email,
    subject: "Invitation to Shalimar CMS",
    text: [
      `Hello ${input.username},`,
      "",
      "You have been invited to access the Shalimar CMS.",
      `Assigned role: ${input.role}`,
      "",
      `Accept your invitation: ${input.inviteUrl}`,
      "",
      "This invitation expires in 72 hours.",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#382b20">
        <h2>Shalimar CMS invitation</h2>
        <p>Hello ${escapeHtml(input.username)},</p>
        <p>You have been invited to access the Shalimar CMS.</p>
        <p>Assigned role: <strong>${escapeHtml(input.role)}</strong></p>
        <p><a href="${escapeHtml(input.inviteUrl)}">Accept invitation</a></p>
        <p>This invitation expires in 72 hours.</p>
      </div>
    `,
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}