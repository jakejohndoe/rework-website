// app/admin/emails/page.tsx - Fixed for Next.js 15
import { getDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';

interface EmailSignup {
  _id: string;
  email: string;
  source: string;
  timestamp: Date;
  ipAddress?: string;
}

// Check authentication - Fixed for Next.js 15
async function checkAuth() {
  const cookieStore = await cookies(); // Added await here for Next.js 15
  const session = cookieStore.get('admin-session');
  
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

// Server component - handles data fetching and auth
export default async function AdminEmailsPage() {
  // Check authentication first
  await checkAuth();
  
  let emails: EmailSignup[] = [];
  let error = '';

  try {
    const db = await getDatabase();
    const collection = db.collection('email_signups');
    
    // Get all emails, sorted by most recent first
    const emailDocs = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    
    emails = emailDocs.map(doc => ({
      _id: doc._id.toString(),
      email: doc.email,
      source: doc.source || 'unknown',
      timestamp: doc.timestamp,
      ipAddress: doc.ipAddress
    }));
    
  } catch (err) {
    console.error('Failed to fetch emails:', err);
    error = 'Failed to load emails';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#1E293B] flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">Connection Error</h1>
          <p className="text-gray-300 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return <AdminDashboardClient emails={emails} />;
}