// app/api/emails/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get database connection (this will trigger the MongoDB connection!)
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
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    };

    // Insert email into database
    const result = await collection.insertOne(emailDoc);

    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        message: 'Email successfully added to waitlist',
        id: result.insertedId
      });
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