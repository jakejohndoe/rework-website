// lib/rateLimiter.ts
interface RateLimitEntry {
    count: number;
    resetTime: number;
  }
  
  // In-memory store for rate limiting
  const rateLimitStore = new Map<string, RateLimitEntry>();
  
  // Clean up old entries every hour
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 60 * 60 * 1000); // Clean every hour
  
  export interface RateLimitResult {
    allowed: boolean;
    remainingRequests: number;
    resetTime: number;
    error?: string;
  }
  
  export function checkRateLimit(
    identifier: string, 
    maxRequests: number = 3, 
    windowMs: number = 60 * 60 * 1000 // 1 hour default
  ): RateLimitResult {
    const now = Date.now();
    const resetTime = now + windowMs;
    
    // Get or create entry for this identifier
    let entry = rateLimitStore.get(identifier);
    
    // Create new entry if doesn't exist or if reset time has passed
    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: resetTime
      };
    }
    
    // Check if limit exceeded
    if (entry.count >= maxRequests) {
      const minutesUntilReset = Math.ceil((entry.resetTime - now) / (60 * 1000));
      return {
        allowed: false,
        remainingRequests: 0,
        resetTime: entry.resetTime,
        error: `Too many email submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`
      };
    }
    
    // Increment count and update store
    entry.count += 1;
    rateLimitStore.set(identifier, entry);
    
    return {
      allowed: true,
      remainingRequests: maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }
  
  // Get client IP address from request
  export function getClientIP(request: Request): string {
    // Check various headers for the real IP
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
    
    if (forwarded) {
      // x-forwarded-for can contain multiple IPs, get the first one
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    // Fallback - won't be available in serverless but good for development
    return 'unknown';
  }
  
  // Special rate limits for different actions
  export const RATE_LIMITS = {
    EMAIL_SIGNUP: {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
      description: 'email signups'
    },
    LOGIN_ATTEMPT: {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
      description: 'login attempts'
    }
  } as const;
  
  // Check if IP should be bypassed (for development/admin)
  export function shouldBypassRateLimit(ip: string): boolean {
    const bypassIPs = [
      '127.0.0.1',
      '::1',
      'localhost',
      'unknown' // Development fallback
    ];
    
    return bypassIPs.includes(ip);
  }