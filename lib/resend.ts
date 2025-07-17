// lib/resend.ts - Updated with real unsubscribe link
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailData {
  email: string;
  source?: string;
}

export async function sendWelcomeEmail({ email, source = 'unknown' }: WelcomeEmailData) {
  try {
    console.log('📧 Sending welcome email to:', email);

    // For testing: send to your verified email, but personalize for the actual user
    const testEmail = process.env.NODE_ENV === 'development' ? 'hello@rework.solutions' : email;
    
    const { data, error } = await resend.emails.send({
      from: 'ReWork <hello@rework.solutions>', // ✅ Updated to custom domain
      to: [testEmail],
      subject: `🎆 Your ReWork Beta Access is Ready! Start optimizing now →`,
      html: getWelcomeEmailHTML(email, source),
      text: getWelcomeEmailText(email, source), // Add plain text version
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return { success: false, error };
    }

    console.log('✅ Welcome email sent successfully:', data?.id);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    return { success: false, error };
  }
}

// NEW FUNCTION: Send notification to yourself when someone signs up
export async function sendSignupNotification(userEmail: string, source: string) {
  try {
    console.log('📧 Sending signup notification for:', userEmail);

    const { data, error } = await resend.emails.send({
      from: 'ReWork <hello@rework.solutions>',
      to: 'hello@rework.solutions', // this sends to YOU
      subject: `🎆 New ReWork Beta User!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; background: #f8fafc; padding: 40px; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-bottom: 24px;">New beta user joined! 🎆</h2>
          <div style="background: white; padding: 24px; border-radius: 8px; border-left: 4px solid #2CC7D0;">
            <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Source:</strong> ${source}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Check your admin dashboard at <a href="https://rework.solutions/admin/emails" style="color: #2CC7D0;">rework.solutions/admin/emails</a> for more details.</p>
        </div>
      `
    });

    if (error) {
      console.error('❌ Signup notification error:', error);
      return { success: false, error };
    }

    console.log('✅ Signup notification sent successfully:', data?.id);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Failed to send signup notification:', error);
    return { success: false, error };
  }
}

// Beautiful modern HTML email template with ReWork branding
function getWelcomeEmailHTML(email: string, source: string): string {
  // Create unsubscribe URL with email parameter
  const unsubscribeUrl = `https://rework.solutions/api/unsubscribe?email=${encodeURIComponent(email)}`;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ReWork</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display', Roboto, sans-serif;
          line-height: 1.6;
          color: #ffffff;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #0A0F1C 0%, #1E293B 100%);
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        .email-container {
          max-width: 640px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0A0F1C 0%, #1E293B 30%, #2D1B69 70%, #0F172A 100%);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .header {
          background: linear-gradient(135deg, #2CC7D0 0%, #3A7BF7 30%, #8B5CF6 70%, #D946EF 100%);
          padding: 50px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.3;
        }
        
        .logo-section {
          position: relative;
          z-index: 2;
          margin-bottom: 20px;
        }
        
        .logo {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 8px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: -1px;
        }
        
        .tagline {
          font-size: 18px;
          font-weight: 500;
          opacity: 0.95;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }
        
        .content {
          padding: 60px 40px;
        }
        
        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(44, 199, 208, 0.15);
          border: 1px solid rgba(44, 199, 208, 0.3);
          border-radius: 50px;
          padding: 12px 24px;
          margin-bottom: 32px;
          font-size: 14px;
          font-weight: 600;
          color: #2CC7D0;
          text-transform: uppercase;
          letter-spacing: 1px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(44, 199, 208, 0.2);
        }
        
        .welcome-title {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 24px;
          text-align: center;
          background: linear-gradient(135deg, #2CC7D0 0%, #3A7BF7 30%, #8B5CF6 70%, #D946EF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          letter-spacing: -1px;
          text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
        }
        
        .intro-text {
          font-size: 20px;
          line-height: 1.7;
          margin-bottom: 40px;
          text-align: center;
          color: #E2E8F0;
          font-weight: 400;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin: 50px 0;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #2CC7D0 0%, #3A7BF7 50%, #8B5CF6 100%);
        }
        
        .feature-icon {
          font-size: 28px;
          margin-bottom: 16px;
          display: block;
        }
        
        .feature-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #F8FAFC;
        }
        
        .feature-description {
          font-size: 15px;
          color: #CBD5E1;
          line-height: 1.6;
        }
        
        .cta-section {
          text-align: center;
          margin: 50px 0;
          padding: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .cta-text {
          font-size: 18px;
          margin-bottom: 30px;
          color: #E2E8F0;
          font-weight: 500;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #2CC7D0 0%, #3A7BF7 100%);
          color: white;
          text-decoration: none;
          padding: 18px 40px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 8px 32px rgba(44, 199, 208, 0.3);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(44, 199, 208, 0.4);
        }
        
        .footer {
          padding: 40px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .footer-brand {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #F8FAFC;
        }
        
        .footer-text {
          font-size: 14px;
          color: #94A3B8;
          margin-bottom: 30px;
        }
        
        .social-links {
          margin: 24px 0;
        }
        
        .social-links a {
          color: #2CC7D0;
          text-decoration: none;
          margin: 0 16px;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .unsubscribe {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 12px;
          color: #64748B;
          line-height: 1.5;
        }
        
        .unsubscribe a {
          color: #2CC7D0;
          text-decoration: none;
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
          .email-container { margin: 0 16px; }
          .header, .content { padding: 40px 24px; }
          .welcome-title { font-size: 32px; }
          .logo { font-size: 36px; }
          .intro-text { font-size: 18px; }
          .cta-section { padding: 30px 20px; }
          .social-links a { margin: 0 8px; }
        }
      </style>
    </head>
    <body>
      <div style="padding: 40px 20px; background: linear-gradient(135deg, #0A0F1C 0%, #1E293B 100%); min-height: 100vh;">
        <div class="email-container">
          
          <!-- Header with Logo -->
          <div class="header">
            <div class="logo-section">
              <div class="logo">ReWork</div>
              <div class="tagline">Smart tech, for smarter jobs</div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="content">
            
            <!-- Welcome Badge -->
            <div style="text-align: center;">
              <div class="welcome-badge">
                🎆 BETA ACCESS GRANTED
              </div>
            </div>
            
            <!-- Main Title -->
            <h1 class="welcome-title">Welcome to ReWork Beta!</h1>
            
            <!-- Intro Text -->
            <p class="intro-text">
              🎯 Welcome to the ReWork beta community! You're now part of an exclusive group of early adopters testing the future of AI-powered resume optimization. Your beta access is <strong>active and ready</strong> – start transforming your job search today!
            </p>

            <!-- Features Grid -->
            <div class="features-grid">
              <div class="feature-card">
                <span class="feature-icon">🎯</span>
                <div class="feature-title">AI-Powered Tailoring</div>
                <div class="feature-description">
                  🎯 Experience intelligent resume optimization for specific job applications. <strong>Available now in beta!</strong>
                </div>
              </div>

              <div class="feature-card">
                <span class="feature-icon">⚡</span>
                <div class="feature-title">Lightning Fast</div>
                <div class="feature-description">
                  ⚡ Generate perfectly optimized resumes in seconds. <strong>Test it yourself</strong> with our live beta platform.
                </div>
              </div>

              <div class="feature-card">
                <span class="feature-icon">📊</span>
                <div class="feature-title">Real-Time Feedback</div>
                <div class="feature-description">
                  📊 Get instant suggestions and improvements. <strong>Start optimizing</strong> your resume today with beta access.
                </div>
              </div>

              <div class="feature-card">
                <span class="feature-icon">🚀</span>
                <div class="feature-title">Exclusive Beta Access</div>
                <div class="feature-description">
                  🎆 You're part of our exclusive beta community helping shape the future of AI-powered job applications. <strong>Your feedback matters!</strong>
                </div>
              </div>
            </div>

            <!-- CTA Section -->
            <div class="cta-section">
              <p class="cta-text">
                🚀 ReWork beta is <strong>live and ready</strong> for you to explore! Your exclusive beta access grants you immediate entry to the future of resume optimization.
              </p>
              <a href="https://app.rework.solutions" class="cta-button">
                ⚡ START BETA TESTING
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-brand">The ReWork Team</div>
            <div class="footer-text">Thanks for being part of our beta community!</div>
            
            <div class="social-links">
              <a href="https://x.com/reworkapp">Twitter</a>
              <a href="https://www.linkedin.com/in/reworkapp/">LinkedIn</a>
            </div>
            
            <div class="unsubscribe">
              You received this email because you joined our exclusive ReWork beta community via our ${source} form.<br>
              <a href="${unsubscribeUrl}">Unsubscribe</a> if you no longer want to receive these emails.
            </div>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}

// Plain text version for email clients that don't support HTML
function getWelcomeEmailText(email: string, source: string): string {
  const unsubscribeUrl = `https://rework.solutions/api/unsubscribe?email=${encodeURIComponent(email)}`;
  
  return `
REWORK - Smart tech, for smarter jobs

🎉 Welcome to ReWork Beta!

Hey there! Welcome to the ReWork beta community! You're now part of an exclusive group testing the future of AI-powered resume optimization. Ready to transform your job search?

Here's what you can experience right now in beta:

🎯 AI-powered resume tailoring for specific job applications
🚀 ATS optimization to get past applicant tracking systems  
⚡ Generate optimized resumes in seconds, not hours
📊 Real-time feedback and improvement suggestions
🎆 Exclusive beta community access

ReWork beta is LIVE and ready for you to explore! Start optimizing your resume today and be part of shaping the future of job applications.

Access the beta app: https://app.rework.solutions

Thanks for being part of our beta community!
The ReWork Team

Social Links:
Twitter: https://x.com/reworkapp
LinkedIn: https://www.linkedin.com/in/reworkapp/

---
You received this email because you joined our exclusive ReWork beta community via our ${source} form.
Unsubscribe: ${unsubscribeUrl}
  `;
}