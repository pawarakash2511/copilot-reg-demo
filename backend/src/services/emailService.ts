import nodemailer from 'nodemailer'
import { Submission } from '../models/submission'

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  })
}

export async function sendSubmissionEmail(submission: Submission): Promise<void> {
  const transporter = createTransporter()

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL is not configured')
  }

  const html = `
    <h2>New Registration Received</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr><td><strong>Name</strong></td><td>${submission.name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${submission.email}</td></tr>
      <tr><td><strong>Occupation</strong></td><td>${submission.occupation}</td></tr>
    </table>
  `

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: `New Registration: ${submission.name}`,
    html,
  })
}
