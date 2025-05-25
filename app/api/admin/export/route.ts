// app/api/admin/export/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDatabase } from '@/lib/mongodb';

// Check admin authentication
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session && session.value === 'authenticated';
}

// Convert data to CSV format
function arrayToCSV(data: any[]) {
  if (data.length === 0) return '';
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get database connection
    const db = await getDatabase();
    const collection = db.collection('email_signups');

    // Fetch all emails
    const emails = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Format data for CSV
    const csvData = emails.map(email => ({
      'Email': email.email,
      'Source': email.source || 'unknown',
      'Date': new Date(email.timestamp).toLocaleDateString('en-US'),
      'Time': new Date(email.timestamp).toLocaleTimeString('en-US'),
      'Full Timestamp': email.timestamp.toISOString(),
      'IP Address': email.ipAddress || 'unknown',
      'ID': email._id.toString()
    }));

    // Convert to CSV
    const csvContent = arrayToCSV(csvData);

    // Generate filename with current date
    const now = new Date();
    const filename = `rework-emails-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.csv`;

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

// Also add a POST endpoint for filtered exports (future enhancement)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { dateRange, source } = await request.json();

    // Get database connection
    const db = await getDatabase();
    const collection = db.collection('email_signups');

    // Build query based on filters
    let query: any = {};
    
    if (source && source !== 'all') {
      query.source = source;
    }
    
    if (dateRange) {
      const now = new Date();
      let startDate;
      
      switch (dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        query.timestamp = { $gte: startDate };
      }
    }

    // Fetch filtered emails
    const emails = await collection
      .find(query)
      .sort({ timestamp: -1 })
      .toArray();

    // Format data for CSV
    const csvData = emails.map(email => ({
      'Email': email.email,
      'Source': email.source || 'unknown',
      'Date': new Date(email.timestamp).toLocaleDateString('en-US'),
      'Time': new Date(email.timestamp).toLocaleTimeString('en-US'),
      'Full Timestamp': email.timestamp.toISOString(),
      'IP Address': email.ipAddress || 'unknown',
      'ID': email._id.toString()
    }));

    // Convert to CSV
    const csvContent = arrayToCSV(csvData);

    // Generate filename with filters
    const now = new Date();
    const filterSuffix = source && source !== 'all' ? `-${source}` : '';
    const dateSuffix = dateRange ? `-${dateRange}` : '';
    const filename = `rework-emails${filterSuffix}${dateSuffix}-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.csv`;

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Filtered CSV export error:', error);
    return NextResponse.json(
      { error: 'Failed to export filtered data' },
      { status: 500 }
    );
  }
}