// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Test database connection
    const db = await getDatabase();
    
    // Try to ping the database
    await db.admin().ping();
    
    // Get database stats
    const stats = await db.stats();
    
    // Check if our email collection exists
    const collections = await db.listCollections().toArray();
    const emailCollection = collections.find(col => col.name === 'email_signups');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful! 🎉',
      database: db.databaseName,
      collections: collections.length,
      emailCollectionExists: !!emailCollection,
      stats: {
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        collections: stats.collections,
        documents: stats.objects
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}