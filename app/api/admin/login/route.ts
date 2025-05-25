// app/api/admin/login/route.ts - Updated with Rate Limiting
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkRateLimit, getClientIP, shouldBypassRateLimit, RATE_LIMITS } from '@/lib/rateLimiter';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit for login attempts (unless it's a bypass IP)
    if (!shouldBypassRateLimit(clientIP)) {
      const rateLimitResult = checkRateLimit(
        `login_attempt_${clientIP}`,
        RATE_LIMITS.LOGIN_ATTEMPT.maxRequests,
        RATE_LIMITS.LOGIN_ATTEMPT.windowMs
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

    // Check against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      // Create session cookie
      const response = NextResponse.json({ success: true });
      
      // Set secure session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return response;
    } else {
      // Wrong password - this still counts toward rate limit
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  // Clear the session cookie
  const cookieStore = await cookies();
  cookieStore.set('admin-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  });

  return response;
}