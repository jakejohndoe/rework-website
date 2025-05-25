// app/api/signup-count/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Get database connection
    const db = await getDatabase();
    const collection = db.collection('email_signups');

    // Count total signups
    const count = await collection.countDocuments();

    return NextResponse.json({
      success: true,
      count: count
    });

  } catch (error) {
    console.error('❌ Signup count error:', error);
    return NextResponse.json(
      { error: 'Failed to get signup count' },
      { status: 500 }
    );
  }
}