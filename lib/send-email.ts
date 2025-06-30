"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNotificationEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Retail AI Agent <onboarding@resend.dev>", // This will be the sender
      to: [email], // User's email
      subject: "Welcome to Retail AI Agent - You're on the list!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 40px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #00ffff, #4a90e2); border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px; font-weight: bold;">RA</span>
            </div>
            <h1 style="color: #00ffff; margin: 0; font-size: 28px;">Welcome to the Future!</h1>
          </div>
          
          <div style="background: rgba(0, 255, 255, 0.1); padding: 20px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.3); margin-bottom: 30px;">
            <h2 style="color: #00ffff; margin-top: 0;">Thank you for joining our waitlist!</h2>
            <p style="line-height: 1.6; color: #e2e8f0;">
              You're now part of an exclusive group that will be the first to experience revolutionary AI-powered retail technology.
            </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #00ffff;">What's Coming:</h3>
            <ul style="color: #e2e8f0; line-height: 1.8;">
              <li>🤖 Intelligent product recommendations</li>
              <li>🛍️ Personalized shopping experiences</li>
              <li>📊 Advanced retail analytics</li>
              <li>🚀 Cutting-edge AI technology</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 40px;">
            <p style="color: #94a3b8; font-size: 14px;">
              Stay tuned for updates. We'll notify you as soon as we launch!
            </p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(0, 255, 255, 0.2);">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                Retail AI Agent Team<br>
                The Future of Intelligent Retail
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, error: error.message }
    }

    // Also send a notification to your email
    await resend.emails.send({
      from: "Retail AI Agent <onboarding@resend.dev>",
      to: ["smartatharv14@gmail.com"], // Your email
      subject: "New Waitlist Signup - Retail AI Agent",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00ffff;">New Waitlist Signup!</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00ffff;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Signed up at:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> Retail AI Agent Coming Soon Page</p>
          </div>
          <p style="margin-top: 20px; color: #666;">
            This user has been added to your waitlist and has received a welcome email.
          </p>
        </div>
      `,
    })

    return { success: true, data }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
