import nodemailer from 'nodemailer';

/**
 * Send an email using Nodemailer and Ethereal Email (for testing).
 * @param {Object} options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email HTML body
 */
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const message = {
      from: `${process.env.FROM_NAME || 'Primetrade Admin'} <${process.env.FROM_EMAIL || 'noreply@primetrade.ai'}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export default sendEmail;
