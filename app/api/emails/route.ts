// app/api/emails/route.ts - Updated with Welcome Email
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkRateLimit, getClientIP, shouldBypassRateLimit, RATE_LIMITS } from '@/lib/rateLimiter';
import { verifyReCaptchaToken } from '@/lib/recaptcha';
import { sendWelcomeEmail, sendSignupNotification } from '@/lib/resend';

interface EmailSubmission {
  email: string;
  source?: string; // To track which form submitted (hero, cta, etc.)
  timestamp: Date;
  ipAddress?: string;
  recaptchaScore?: number; // Track reCAPTCHA scores for analytics
  welcomeEmailSent?: boolean; // Track if welcome email was sent
  welcomeEmailId?: string; // Store Resend email ID
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'unknown', recaptchaToken } = body;

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // 🔥 VERIFY RECAPTCHA TOKEN FIRST (if provided)
    let recaptchaScore = 0;
    
    if (recaptchaToken) {
      const recaptchaResult = await verifyReCaptchaToken(recaptchaToken);
      console.log('🔍 reCAPTCHA verification result:', {
        success: recaptchaResult.success,
        score: recaptchaResult.score,
        error: recaptchaResult.error
      });

      if (!recaptchaResult.success) {
        console.log('❌ reCAPTCHA verification failed:', recaptchaResult.error);
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }

      // Check reCAPTCHA score (0.0 = bot, 1.0 = human)
      // For email signups, we can be a bit more lenient (0.3+)
      if (recaptchaResult.score < 0.3) {
        console.log('❌ Low reCAPTCHA score:', recaptchaResult.score);
        return NextResponse.json(
          { error: 'Security verification failed. Please try again later.' },
          { status: 400 }
        );
      }

      recaptchaScore = recaptchaResult.score;
      console.log('✅ reCAPTCHA passed with score:', recaptchaScore);
    } else {
      // For development/testing - allow submissions without reCAPTCHA
      // In production, you might want to require it
      console.log('⚠️ No reCAPTCHA token provided - allowing for development');
    }

    // Check rate limit (unless it's a bypass IP like localhost)
    if (!shouldBypassRateLimit(clientIP)) {
      const rateLimitResult = checkRateLimit(
        `email_signup_${clientIP}`,
        RATE_LIMITS.EMAIL_SIGNUP.maxRequests,
        RATE_LIMITS.EMAIL_SIGNUP.windowMs
      );

      if (!rateLimitResult.allowed) {
        return NextResponse.json(
          { 
            error: rateLimitResult.error,
            retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
          },
          { 
            status: 429,
            headers: {
              'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
            }
          }
        );
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get database connection
    const db = await getDatabase();
    const collection = db.collection('email_signups');

    // Check if email already exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Prepare initial email document (without welcome email data yet)
    let emailDoc: EmailSubmission = {
      email: email.toLowerCase().trim(),
      source,
      timestamp: new Date(),
      ipAddress: clientIP,
      recaptchaScore,
      welcomeEmailSent: false
    };

    // Insert email into database first
    const result = await collection.insertOne(emailDoc);

    if (!result.acknowledged) {
      throw new Error('Failed to insert email into database');
    }

    console.log('✅ Email signup successful:', email, 'reCAPTCHA score:', recaptchaScore);

    // 📧 SEND WELCOME EMAIL
    try {
      const emailResult = await sendWelcomeEmail({ email, source });
      
      if (emailResult.success) {
        // Update the database record with welcome email info
        await collection.updateOne(
          { _id: result.insertedId },
          { 
            $set: { 
              welcomeEmailSent: true,
              welcomeEmailId: emailResult.data?.id 
            } 
          }
        );
        console.log('📧 Welcome email sent and database updated');

        // 🔔 SEND NOTIFICATION TO YOURSELF
        try {
          await sendSignupNotification(email, source);
          console.log('📧 Signup notification sent successfully');
        } catch (notificationError) {
          console.error('❌ Signup notification failed (not critical):', notificationError);
          // Don't fail the whole request if notification fails
        }

      } else {
        console.error('❌ Welcome email failed, but signup still successful:', emailResult.error);
        // Don't fail the whole request if email fails - user is still signed up
      }
    } catch (emailError) {
      console.error('❌ Welcome email error (signup still successful):', emailError);
      // Don't fail the whole request if email fails
    }

    // Success response with rate limit headers
    const response = NextResponse.json({
      success: true,
      message: 'Email successfully added to waitlist',
      id: result.insertedId
    });

    // Add rate limit headers to successful responses too
    if (!shouldBypassRateLimit(clientIP)) {
      // Get updated rate limit info
      const currentLimit = checkRateLimit(
        `email_signup_${clientIP}`,
        RATE_LIMITS.EMAIL_SIGNUP.maxRequests,
        RATE_LIMITS.EMAIL_SIGNUP.windowMs
      );
      
      response.headers.set('X-RateLimit-Limit', RATE_LIMITS.EMAIL_SIGNUP.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', (currentLimit.remainingRequests - 1).toString());
      response.headers.set('X-RateLimit-Reset', new Date(currentLimit.resetTime).toISOString());
    }

    return response;

  } catch (error) {
    console.error('❌ Email signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET route to check email status (for testing)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection('email_signups');
    
    const emailRecord = await collection.findOne({ email: email.toLowerCase() });
    
    return NextResponse.json({
      exists: !!emailRecord,
      email: email.toLowerCase(),
      welcomeEmailSent: emailRecord?.welcomeEmailSent || false,
      signupDate: emailRecord?.timestamp,
      source: emailRecord?.source
    });

  } catch (error) {
    console.error('Email check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}