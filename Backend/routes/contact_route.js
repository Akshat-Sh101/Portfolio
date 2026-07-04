import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const escapeHtml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};

  // ── Basic server-side validation ──
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are all required.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (!process.env.EMAIL || !process.env.APP_PASSWORD) {
    console.error("Missing EMAIL or APP_PASSWORD environment variables.");
    return res.status(500).json({
      success: false,
      message: "Server email is not configured.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      // Gmail requires "from" to be the authenticated account, not the
      // visitor's address, or the message will likely be rejected/spoofed.
      from: `"Portfolio Contact" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email, // lets you hit "reply" and email the visitor directly
      subject: `Portfolio Contact: Mail From My Portfolio Website`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

export default router;