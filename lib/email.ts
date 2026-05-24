// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendWelcomeEmail(to: string, name: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Welcome to WM Trading Academy 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050B18; color: #F0F4FF; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #F5A623, #FFD166); color: #050B18; font-weight: 800; font-size: 24px; padding: 12px 24px; border-radius: 8px;">WM</div>
          <h1 style="color: #F0F4FF; font-size: 24px; margin-top: 16px;">Welcome to WM Trading Academy!</h1>
        </div>
        <p style="color: #8BA3CC; line-height: 1.7;">Hi ${name},</p>
        <p style="color: #8BA3CC; line-height: 1.7;">Your account has been created successfully. You now have access to Nigeria's premier crypto trading education platform.</p>
        <div style="background: #0A1628; border: 1px solid #1E3A6A; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #F5A623; margin: 0 0 12px;">Next Steps:</h3>
          <ul style="color: #8BA3CC; padding-left: 20px; line-height: 2;">
            <li>Choose a subscription plan</li>
            <li>Access your personalized dashboard</li>
            <li>Join our WhatsApp community</li>
            <li>Attend the next live session</li>
          </ul>
        </div>
        <div style="text-align: center; margin-top: 32px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #F5A623, #FFD166); color: #050B18; font-weight: 700; padding: 14px 32px; border-radius: 10px; text-decoration: none;">Go to Dashboard →</a>
        </div>
        <p style="color: #4A6A99; font-size: 12px; text-align: center; margin-top: 32px;">WM Trading Academy · 07065507517 · @wm_winnerman</p>
      </div>
    `,
  });
}

export async function sendPaymentConfirmationEmail(
  to: string,
  name: string,
  amount: number,
  plan: string
) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Payment Confirmed — WM Trading Academy",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050B18; color: #F0F4FF; padding: 40px; border-radius: 16px;">
        <h2 style="color: #00E676;">✓ Payment Confirmed</h2>
        <p style="color: #8BA3CC;">Hi ${name}, your payment of ₦${amount.toLocaleString()} for the <strong style="color: #F5A623;">${plan}</strong> plan has been confirmed.</p>
        <p style="color: #8BA3CC;">Your account has been activated. You now have full access to all ${plan} features.</p>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #F5A623, #FFD166); color: #050B18; font-weight: 700; padding: 14px 32px; border-radius: 10px; text-decoration: none;">Access Dashboard →</a>
        </div>
      </div>
    `,
  });
}

export async function sendPaymentPendingEmail(
  to: string,
  name: string,
  paymentCode: string,
  amount: number
) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Bank Transfer Instructions — WM Trading Academy",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050B18; color: #F0F4FF; padding: 40px; border-radius: 16px;">
        <h2 style="color: #F5A623;">Bank Transfer Instructions</h2>
        <p style="color: #8BA3CC;">Hi ${name}, please complete your payment using the details below:</p>
        <div style="background: #0A1628; border: 1px solid #1E3A6A; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: #4A6A99; padding: 8px 0;">Bank</td><td style="color: #F0F4FF; font-weight: 600;">GTBank</td></tr>
            <tr><td style="color: #4A6A99; padding: 8px 0;">Account Name</td><td style="color: #F0F4FF; font-weight: 600;">WM Trading Academy Ltd</td></tr>
            <tr><td style="color: #4A6A99; padding: 8px 0;">Account Number</td><td style="color: #F0F4FF; font-weight: 600;">0123456789</td></tr>
            <tr><td style="color: #4A6A99; padding: 8px 0;">Amount</td><td style="color: #F5A623; font-weight: 700;">₦${amount.toLocaleString()}</td></tr>
            <tr><td style="color: #4A6A99; padding: 8px 0;">Payment Code</td><td style="color: #00E5FF; font-weight: 700; font-size: 20px;">${paymentCode}</td></tr>
          </table>
        </div>
        <p style="color: #FF5252; font-size: 13px;">⚠️ IMPORTANT: Include the payment code <strong>${paymentCode}</strong> in your transfer description/narration for instant verification.</p>
      </div>
    `,
  });
}
