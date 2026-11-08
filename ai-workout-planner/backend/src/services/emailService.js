const nodemailer = require('nodemailer');

// Helper to create and configure the Nodemailer transporter
function getTransporter() {
  const user = process.env.EMAIL_ID || process.env.EMAIL_USER;
  // Gmail app passwords often come with spaces (e.g., 'abcd efgh ijkl mnop'), strip them cleanly
  const pass = (process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  if (!user || !pass) {
    console.warn('[EmailService] EMAIL_ID or EMAIL_PASSWORD is missing in .env');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });
}

// Generate a secure 6-digit numeric OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send an OTP email to the recipient
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit code
 * @param {string} purpose - 'signup' | 'login' | 'reset_password'
 */
async function sendOtpEmail(to, otp, purpose = 'login') {
  const transporter = getTransporter();
  const senderEmail = process.env.EMAIL_ID || process.env.EMAIL_USER || 'no-reply@planfit.ai';

  let subject = 'Your Planfit Verification Code';
  let title = 'Authentication Code';
  let description = 'Use the 6-digit code below to securely verify your Planfit session.';

  if (purpose === 'signup') {
    subject = 'Welcome to Planfit ✦ Verify Your Account';
    title = 'Verify Your Email';
    description = 'Welcome to Planfit AI! Please enter the code below to complete your account registration.';
  } else if (purpose === 'login') {
    subject = 'Planfit Login Verification Code 🔒';
    title = 'Two-Factor Login Verification';
    description = 'A login attempt was made for your Planfit account. Enter this code to sign in.';
  } else if (purpose === 'reset_password') {
    subject = 'Reset Your Planfit Password 🔑';
    title = 'Password Reset Request';
    description = 'Use the code below to verify your identity and choose a new password.';
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #07090e;
          color: #f1f5f9;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 520px;
          margin: 0 auto;
          background: #0d121f;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .header {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          padding: 32px 24px;
          text-align: center;
          border-bottom: 1px solid rgba(0, 245, 255, 0.2);
        }
        .logo {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .logo span {
          color: #00f5ff;
        }
        .content {
          padding: 36px 32px;
          text-align: center;
        }
        h2 {
          font-size: 22px;
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 12px;
        }
        p {
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }
        .otp-box {
          background: rgba(0, 245, 255, 0.08);
          border: 2px dashed #00f5ff;
          border-radius: 16px;
          padding: 20px;
          margin: 24px auto;
          display: inline-block;
        }
        .otp-code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 38px;
          font-weight: 900;
          letter-spacing: 10px;
          color: #00f5ff;
          margin: 0;
          padding-left: 10px;
        }
        .footer {
          padding: 20px 24px 30px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 13px;
          color: #64748b;
        }
        .warning {
          font-size: 13px;
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.04);
          padding: 10px 16px;
          border-radius: 8px;
          display: inline-block;
          margin-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">PLANFIT <span>✦ AI</span></div>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <p>${description}</p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>
          <div class="warning">
            ⏱️ This code will expire in <strong>10 minutes</strong>.
          </div>
          <p style="font-size: 13px; color: #64748b; margin-top: 12px;">
            If you did not initiate this request, you can safely ignore this email. No changes will be made without this code.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Planfit AI • Built for Modern Lifters
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(`\n========================================`);
    console.log(`[EmailService MOCK OTP] To: ${to} | Code: ${otp} | Purpose: ${purpose}`);
    console.log(`(Configure EMAIL_ID and EMAIL_PASSWORD in .env for live emails)`);
    console.log(`========================================\n`);
    return { success: true, mocked: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Planfit AI Security" <${senderEmail}>`,
      to,
      subject,
      text: `${title}: Your Planfit verification code is: ${otp}. It expires in 10 minutes.`,
      html: htmlContent
    });

    console.log(`[EmailService] OTP email sent successfully to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService Error] Failed to send email to ${to}:`, error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
}

module.exports = {
  generateOtp,
  sendOtpEmail
};
