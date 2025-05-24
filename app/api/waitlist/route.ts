import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// MongoDB connection string - add this to your .env.local file
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "rework-waitlist"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(DATABASE_NAME)
    const collection = db.collection("waitlist")

    // Check if email already exists
    const existingEmail = await collection.findOne({ email: email.toLowerCase() })
    
    if (existingEmail) {
      await client.close()
      return NextResponse.json(
        { error: "Email already registered" },
        { status:409 }
      )
    }

    // Save email to database
    const result = await collection.insertOne({
      email: email.toLowerCase(),
      timestamp: new Date(),
      source: "landing-page",
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    })

    await client.close()

    // Return success response
    return NextResponse.json(
      { message: "Email successfully added to waitlist", id: result.insertedId },
      { status: 201 }
    )

  } catch (error) {
    console.error("Error adding email to waitlist:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(DATABASE_NAME)
    const collection = db.collection("waitlist")

    // Get waitlist count (for admin purposes)
    const count = await collection.countDocuments()
    
    await client.close()

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}