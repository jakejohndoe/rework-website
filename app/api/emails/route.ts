// app/api/emails/route.ts - Updated with Rate Limiting
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { checkRateLimit, getClientIP, shouldBypassRateLimit, RATE_LIMITS } from '@/lib/rateLimiter';

interface EmailSubmission {
  email: string;
  source?: string; // To track which form submitted (hero, cta, etc.)
  timestamp: Date;
  ipAddress?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'unknown' } = body;

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

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

      // Add rate limit info to response headers (for debugging)
      const headers = {
        'X-RateLimit-Limit': RATE_LIMITS.EMAIL_SIGNUP.maxRequests.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remainingRequests.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
      };
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

    // Prepare email document
    const emailDoc: EmailSubmission = {
      email: email.toLowerCase().trim(),
      source,
      timestamp: new Date(),
      ipAddress: clientIP
    };

    // Insert email into database
    const result = await collection.insertOne(emailDoc);

    if (result.acknowledged) {
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
    } else {
      throw new Error('Failed to insert email');
    }

  } catch (error) {
    console.error('Email signup error:', error);
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
    
    const exists = await collection.findOne({ email: email.toLowerCase() });
    
    return NextResponse.json({
      exists: !!exists,
      email: email.toLowerCase()
    });

  } catch (error) {
    console.error('Email check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}