'use client';

import { analytics } from '@/lib/analytics';
import { useState } from 'react';

interface EmailSignup {
  _id: string;
  email: string;
  source: string;
  timestamp: Date;
  ipAddress?: string;
}

export default function AdminDashboardClient({ emails }: { emails: EmailSignup[] }) {
  const stats = {
    total: emails.length,
    sources: emails.reduce((acc, email) => {
      acc[email.source] = (acc[email.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    recent: emails.filter(email => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return email.timestamp > oneDayAgo;
    }).length,
    thisWeek: emails.filter(email => {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return email.timestamp > oneWeekAgo;
    }).length
  };

  // Chart data for signup timeline
  const chartData = (() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayKey = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      const daySignups = emails.filter(email => {
        const emailDate = new Date(email.timestamp).toISOString().split('T')[0];
        return emailDate === dayKey;
      }).length;
      
      last7Days.push({
        day: dayName,
        signups: daySignups,
        date: dayKey
      });
    }
    return last7Days;
  })();

  // Pie chart data for sources
  const sourceData = Object.entries(stats.sources).map(([source, count]) => ({
    name: source.charAt(0).toUpperCase() + source.slice(1),
    value: count,
    color: source === 'hero' ? '#2CC7D0' : source === 'final-cta' ? '#3A7BF7' : '#8B5CF6'
  }));

  // State for export functionality
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Export function
  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    try {
      const response = await fetch('/api/admin/export');
      
      if (response.ok) {
        // Track successful export
        analytics.adminEmailExport(emails.length);
        
        // Get the CSV content
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Get filename from response headers or generate one
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition 
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
          : `rework-emails-${new Date().toISOString().split('T')[0]}.csv`;
        
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success feedback
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
        
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      // Could add error state here
    } finally {
      setIsExporting(false);
    }
  };
  

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Matching homepage background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] via-[#1E293B] to-[#0F172A]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 via-transparent to-[#1E293B]/60" />
      
      {/* Floating ambient orbs like homepage */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#2CC7D0]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3A7BF7]/8 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8B5CF6]/6 rounded-full blur-3xl" />
      
      {/* Subtle floating particles */}
      <div className="absolute top-40 right-32 w-3 h-3 bg-[#2CC7D0]/40 rounded-full animate-bounce delay-300" />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-[#3A7BF7]/50 rounded-full animate-bounce delay-700" />
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-[#D946EF]/40 rounded-full animate-bounce delay-1000" />
      
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with logout button */}
          <div className="mb-12 text-center relative">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-4">
              ReWork{" "}
              <span className="bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent">
                Analytics
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real-time insights into your waitlist performance and user engagement
            </p>
            
            {/* Subtle logout button */}
            <button
              onClick={handleLogout}
              className="absolute top-0 right-0 text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm opacity-60 hover:opacity-100"
              title="Logout"
            >
              🚪 Exit
            </button>
          </div>

          {/* Key Stats Cards with Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Total Signups",
                value: stats.total,
                icon: "👥",
                color: "from-[#2CC7D0] to-[#3A7BF7]",
                subtitle: "All time"
              },
              {
                title: "This Week",
                value: stats.thisWeek,
                icon: "📈",
                color: "from-[#3A7BF7] to-[#8B5CF6]",
                subtitle: "Last 7 days"
              },
              {
                title: "Today",
                value: stats.recent,
                icon: "⚡",
                color: "from-[#8B5CF6] to-[#D946EF]",
                subtitle: "Last 24 hours"
              },
              {
                title: "Conversion",
                value: stats.total > 0 ? Math.round((stats.total / (stats.total + 100)) * 100) : 0,
                icon: "🎯",
                color: "from-[#D946EF] to-[#22C55E]",
                subtitle: "Success rate",
                suffix: "%"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Hover glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-3xl p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">
                        {stat.value.toLocaleString()}{stat.suffix || ''}
                      </p>
                      <p className="text-sm text-gray-400">{stat.subtitle}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Signup Timeline Chart */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2CC7D0]/20 to-[#3A7BF7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">📊</div>
                  <h3 className="text-2xl font-bold text-white">Weekly Signups</h3>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {chartData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 group/bar">
                      <div className="relative w-full bg-gray-700/30 rounded-t-lg overflow-hidden mb-2" style={{ height: '200px' }}>
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#2CC7D0] to-[#3A7BF7] rounded-t-lg transition-all duration-1000 ease-out hover:from-[#3A7BF7] hover:to-[#8B5CF6]"
                          style={{ 
                            height: `${Math.max((day.signups / Math.max(...chartData.map(d => d.signups))) * 100, 5)}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-white">{day.signups}</p>
                        <p className="text-xs text-gray-400">{day.day}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Source Breakdown */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8B5CF6]/20 to-[#D946EF]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl">🎯</div>
                  <h3 className="text-2xl font-bold text-white">Traffic Sources</h3>
                </div>
                <div className="space-y-4">
                  {sourceData.map((source, index) => (
                    <div key={index} className="group/source">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{source.name}</span>
                        <span className="text-gray-300">{source.value} ({Math.round((source.value / stats.total) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out group-hover/source:shadow-lg"
                          style={{ 
                            width: `${(source.value / stats.total) * 100}%`,
                            background: `linear-gradient(to right, ${source.color}, ${source.color}99)`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Email List with Enhanced Design */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2CC7D0]/10 via-[#3A7BF7]/10 to-[#8B5CF6]/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="p-8 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📧</div>
                  <h3 className="text-2xl font-bold text-white">Recent Signups</h3>
                  <div className="ml-auto flex items-center gap-4">
                    <div className="px-4 py-2 bg-[#2CC7D0]/20 text-[#2CC7D0] rounded-full text-sm font-semibold">
                      {emails.length} total
                    </div>
                    
                    {/* Export Button */}
                    <button
                      onClick={handleExport}
                      disabled={isExporting || emails.length === 0}
                      className={`group relative px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg flex items-center gap-2 ${
                        isExporting || emails.length === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:from-[#D946EF] hover:to-[#F97316] hover:shadow-xl hover:scale-105'
                      } ${
                        exportSuccess ? 'from-green-500 to-green-600' : ''
                      }`}
                      title={emails.length === 0 ? 'No emails to export' : 'Download CSV file'}
                    >
                      {isExporting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Exporting...</span>
                        </>
                      ) : exportSuccess ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Export CSV</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {emails.slice(0, 20).map((email) => (
                      <tr key={email._id} className="hover:bg-white/5 transition-colors duration-200 group/row">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover/row:scale-110 transition-transform duration-200">
                              {email.email.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white font-medium">{email.email}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            email.source === 'hero' 
                              ? 'bg-[#2CC7D0]/20 text-[#2CC7D0]' 
                              : 'bg-[#3A7BF7]/20 text-[#3A7BF7]'
                          }`}>
                            {email.source === 'hero' ? '🎯 Hero' : '🚀 CTA'}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-gray-300">
                          <div>
                            <div className="font-medium">
                              {new Date(email.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="text-sm text-gray-400">
                              {new Date(email.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-gray-400 text-sm">
                          🌍 {email.ipAddress === '127.0.0.1' ? 'Local' : email.ipAddress || 'Unknown'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {emails.length === 0 && (
                <div className="p-16 text-center">
                  <div className="text-6xl mb-4">📬</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No signups yet</h3>
                  <p className="text-gray-400">Your first waitlist subscriber will appear here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}