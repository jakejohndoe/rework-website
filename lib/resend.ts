// lib/resend.ts - Email service setup
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
      subject: `🚀 Welcome to ReWork - ${email} joined the waitlist!`,
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

// Beautiful modern HTML email template with ReWork branding
function getWelcomeEmailHTML(email: string, source: string): string {
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
          background: linear-gradient(135deg, #0A0F1C 0%, #1E293B 50%, #0F172A 100%);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        .header {
          background: linear-gradient(135deg, #2CC7D0 0%, #3A7BF7 50%, #8B5CF6 100%);
          padding: 50px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
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
        }
        
        .welcome-title {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 24px;
          text-align: center;
          background: linear-gradient(135deg, #2CC7D0 0%, #3A7BF7 50%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          letter-spacing: -1px;
        }
        
        .intro-text {
          font-size: 20px;
          line-height: 1.7;
          margin-bottom: 40px;
          text-align: center;
          color: #E2E8F0;
          font-weight: 400;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin: 50px 0;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
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
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
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
                🎉 Welcome to the future
              </div>
            </div>
            
            <!-- Main Title -->
            <h1 class="welcome-title">You're on the list!</h1>
            
            <!-- Intro Text -->
            <p class="intro-text">
              Welcome to the ReWork family. We're thrilled you've joined our waitlist and can't wait to help you land your dream job with AI-powered resume optimization.
            </p>

            <!-- Features Grid -->
            <div class="features-grid">
              <div class="feature-card">
                <span class="feature-icon">🎯</span>
                <div class="feature-title">AI-Powered Tailoring</div>
                <div class="feature-description">
                  Intelligent resume optimization for specific job applications that beats ATS systems every time.
                </div>
              </div>

              <div class="feature-card">
                <span class="feature-icon">⚡</span>
                <div class="feature-title">Lightning Fast</div>
                <div class="feature-description">
                  Generate perfectly optimized resumes in seconds, not hours. More time for applications, less time formatting.
                </div>
              </div>

              <div class="feature-card">
                <span class="feature-icon">📊</span>
                <div class="feature-title">Real-Time Feedback</div>
                <div class="feature-description">
                  Get instant suggestions and improvements to maximize your interview potential with every application.
                </div>
              </div>

              <div class="feature-card">
                <span class="feature-icon">🚀</span>
                <div class="feature-title">Interview Ready</div>
                <div class="feature-description">
                  Land more interviews with resumes that stand out from the crowd and speak directly to hiring managers.
                </div>
              </div>
            </div>

            <!-- CTA Section -->
            <div class="cta-section">
              <p class="cta-text">
                We're putting the finishing touches on ReWork and will notify you the <strong>moment</strong> we go live.
              </p>
              <a href="https://rework.solutions" class="cta-button">
                Visit Our Website
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-brand">The ReWork Team</div>
            <div class="footer-text">Thanks for believing in the future of job searching!</div>
            
            <div class="social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Blog</a>
            </div>
            
            <div class="unsubscribe">
              You received this email because you signed up for ReWork updates via our ${source} form.<br>
              <a href="#">Unsubscribe</a> if you no longer want to receive these emails.
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
  return `
REWORK - Smart tech, for smarter jobs

🎉 You're on the list!

Hey there! Welcome to the ReWork family. We're thrilled you've joined our waitlist and can't wait to help you land your dream job with AI-powered resume optimization.

Here's what you can expect when we launch:

🎯 AI-powered resume tailoring for specific job applications
🚀 ATS optimization to get past applicant tracking systems  
⚡ Generate optimized resumes in seconds, not hours
📊 Real-time feedback and improvement suggestions

We're putting the finishing touches on ReWork and will notify you the MOMENT we go live. You'll be among the first to experience the future of job applications.

Visit our website: https://rework.solutions

Thanks for believing in the future of job searching!
The ReWork Team

---
You received this email because you signed up for ReWork updates via our ${source} form.
Unsubscribe: [link will be added later]
  `;
}