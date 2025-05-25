// app/api/unsubscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Check if email exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() });
    if (!existingEmail) {
      return NextResponse.json(
        { error: 'Email not found in our system' },
        { status: 404 }
      );
    }

    // Remove email from database
    const result = await collection.deleteOne({ email: email.toLowerCase() });

    if (result.deletedCount === 1) {
      console.log('✅ Email unsubscribed successfully:', email);
      return NextResponse.json({
        success: true,
        message: 'Successfully unsubscribed from ReWork updates'
      });
    } else {
      throw new Error('Failed to remove email from database');
    }

  } catch (error) {
    console.error('❌ Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    );
  }
}

// GET route for URL-based unsubscribe (email in query params)
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get database connection
    const db = await getDatabase();
    const collection = db.collection('email_signups');

    // Check if email exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() });
    if (!existingEmail) {
      return NextResponse.json(
        { error: 'Email not found in our system' },
        { status: 404 }
      );
    }

    // Remove email from database
    const result = await collection.deleteOne({ email: email.toLowerCase() });

    if (result.deletedCount === 1) {
      console.log('✅ Email unsubscribed via URL:', email);
      
      // Return a simple HTML page instead of JSON for better UX
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Unsubscribed - ReWork</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif; 
                max-width: 500px; 
                margin: 100px auto; 
                padding: 40px 20px; 
                text-align: center;
                background: linear-gradient(135deg, #0A0F1C 0%, #1E293B 100%);
                color: white;
                min-height: 100vh;
                box-sizing: border-box;
              }
              .container {
                background: rgba(255,255,255,0.05);
                padding: 40px;
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.1);
              }
              h1 { color: #2CC7D0; margin-bottom: 20px; }
              .email { background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 8px; margin: 20px 0; }
              a { color: #2CC7D0; text-decoration: none; }
              a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>✅ Unsubscribed Successfully</h1>
              <p>The email address:</p>
              <div class="email">${email}</div>
              <p>has been removed from ReWork updates.</p>
              <p style="margin-top: 30px;">
                <a href="https://rework.solutions">← Back to ReWork</a>
              </p>
            </div>
          </body>
        </html>
        `,
        { 
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    } else {
      throw new Error('Failed to remove email from database');
    }

  } catch (error) {
    console.error('❌ Unsubscribe error:', error);
    
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error - ReWork</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              max-width: 500px; 
              margin: 100px auto; 
              padding: 40px 20px; 
              text-align: center;
              background: linear-gradient(135deg, #0A0F1C 0%, #1E293B 100%);
              color: white;
              min-height: 100vh;
              box-sizing: border-box;
            }
            .container {
              background: rgba(255,255,255,0.05);
              padding: 40px;
              border-radius: 16px;
              border: 1px solid rgba(255,255,255,0.1);
            }
            h1 { color: #ef4444; margin-bottom: 20px; }
            a { color: #2CC7D0; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>❌ Unsubscribe Failed</h1>
            <p>Sorry, we couldn't process your unsubscribe request.</p>
            <p>Please try again or contact us at hello@rework.solutions</p>
            <p style="margin-top: 30px;">
              <a href="https://rework.solutions">← Back to ReWork</a>
            </p>
          </div>
        </body>
      </html>
      `,
      { 
        status: 500,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}