"use client"

import Link from "next/link"
import { FileText, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B] flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#2CC7D0]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-32 w-96 h-96 bg-[#3A7BF7]/6 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8B5CF6]/4 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="container px-4 md:px-6 text-center text-white relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <FileText className="h-8 w-8 text-[#2CC7D0]" />
              <div className="absolute inset-0 bg-[#2CC7D0]/30 rounded-full blur-md" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              ReWork
            </span>
          </div>

          {/* 404 Display */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent animate-pulse mb-4">
              404
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full mx-auto mb-6" />
          </div>

          {/* Error Message */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>

            {/* Home Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-medium rounded-lg hover:from-[#3A7BF7] hover:to-[#8B5CF6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-gray-400 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/#features" className="text-[#2CC7D0] hover:text-[#3A7BF7] transition-colors">
                Features
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/#how-it-works" className="text-[#2CC7D0] hover:text-[#3A7BF7] transition-colors">
                How It Works
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/#faq" className="text-[#2CC7D0] hover:text-[#3A7BF7] transition-colors">
                FAQ
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/privacy" className="text-[#2CC7D0] hover:text-[#3A7BF7] transition-colors">
                Privacy
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}