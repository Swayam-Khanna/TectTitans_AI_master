import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !service || !message) {
    res.status(400).json({ success: false, error: "All fields are required." });
    return;
  }

  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailPassword) {
    req.log.error("GMAIL_APP_PASSWORD is not set");
    res.status(500).json({ success: false, error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gameralipmk@gmail.com",
      pass: gmailPassword,
    },
  });

  const mailOptions = {
    from: `"TechTitans AI Contact" <gameralipmk@gmail.com>`,
    to: "gameralipmk@gmail.com",
    replyTo: email,
    subject: `New Inquiry: ${service} — from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0F19; color: #ffffff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #3B82F6; margin-top: 0;">New Contact Form Submission</h2>
        <hr style="border-color: rgba(255,255,255,0.1); margin-bottom: 24px;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #9CA3AF; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; color: #3B82F6;"><a href="mailto:${email}" style="color: #3B82F6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Service</td>
            <td style="padding: 10px 0; color: #22C55E; font-weight: bold;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9CA3AF; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: #ffffff;">${message.replace(/\n/g, "<br/>")}</td>
          </tr>
        </table>
        <hr style="border-color: rgba(255,255,255,0.1); margin-top: 24px;" />
        <p style="color: #6B7280; font-size: 12px; margin-bottom: 0;">Sent from TechTitans AI website contact form</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    req.log.info({ name, email, service }, "Contact form email sent");
    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact form email");
    res.status(500).json({ success: false, error: "Failed to send email. Please try again." });
  }
});

export default router;
