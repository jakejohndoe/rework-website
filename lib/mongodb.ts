// lib/mongodb.ts
// Create this file in your project: lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
    
    // Log connection status for development
    if (process.env.NODE_ENV === 'development') {
      globalWithMongo._mongoClientPromise
        .then((client) => {
          console.log('🎉 MongoDB connected successfully to:', client.db().databaseName);
          console.log('📧 Email collection ready for signups!');
        })
        .catch((error) => {
          console.error('❌ MongoDB connection failed:', error.message);
        });
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  
  // Log connection errors in production (but not verbose success messages)
  clientPromise
    .catch((error) => console.error('MongoDB connection failed:', error.message));
}

export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB_NAME || 'rework-landing');
}