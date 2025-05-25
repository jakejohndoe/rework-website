"use client"

import { analytics } from '@/lib/analytics';

import Link from "next/link"
import { useState } from "react"
import { FileText, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!password.trim()) {
    setError('Password is required')
    return
  }

  setIsLoading(true)
  setError('')
  
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      // Track successful admin login
      analytics.adminLogin();
      
      // Redirect to admin dashboard
      window.location.href = '/admin/emails'
    } else {
      const data = await response.json()
      
      // Handle different error types
      if (response.status === 429) {
        // Rate limited
        setError(data.error || 'Too many login attempts. Please try again later.')
      } else {
        // Invalid password or other errors
        setError(data.error || 'Invalid password')
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    setError('Network error. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Same background as homepage */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] via-[#1E293B] to-[#0F172A] animate-gradient-x" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 via-transparent to-[#1E293B]/60" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#2CC7D0]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3A7BF7]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#8B5CF6]/8 rounded-full blur-3xl animate-pulse delay-500" />
      
      {/* Subtle particles */}
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#2CC7D0]/40 rounded-full animate-bounce delay-300" />
      <div className="absolute bottom-40 left-16 w-3 h-3 bg-[#3A7BF7]/50 rounded-full animate-bounce delay-700" />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group w-fit">
          <div className="relative">
            <FileText className="h-6 w-6 text-[#2CC7D0] group-hover:scale-110 group-hover:text-[#3A7BF7] transition-all duration-300" />
            <div className="absolute inset-0 bg-[#2CC7D0]/30 rounded-full blur-md group-hover:blur-lg group-hover:bg-[#3A7BF7]/30 transition-all duration-300" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent group-hover:from-[#2CC7D0] group-hover:via-white group-hover:to-[#3A7BF7] transition-all duration-300">
            ReWork
          </span>
        </Link>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="relative group">
            {/* Hover glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#2CC7D0]/20 via-[#3A7BF7]/20 to-[#8B5CF6]/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-2xl mb-4 shadow-lg">
                  <div className="text-2xl">🔐</div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                <p className="text-gray-300">Enter password to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Admin password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                      }}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2CC7D0] focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {error && (
                    <div className="mt-3 text-red-400 text-sm flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || !password.trim()}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-lg flex items-center gap-3 justify-center hover:from-[#3A7BF7] hover:to-[#8B5CF6] hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <div className="text-xl">🚀</div>
                      <span>Access Dashboard</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link 
                  href="/"
                  className="text-sm text-gray-400 hover:text-[#2CC7D0] transition-colors duration-300"
                >
                  ← Back to homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}