"use client"

import Link from "next/link"
import { FileText, Shield, Mail, Database } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] to-[#1E293B]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/90 to-[#0F172A]/95" />
        <div className="container relative flex h-16 items-center justify-between px-4 md:px-6 z-10">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group cursor-pointer">
            <div className="relative">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-[#2CC7D0] group-hover:scale-110 group-hover:text-[#3A7BF7] transition-all duration-300" />
              <div className="absolute inset-0 bg-[#2CC7D0]/30 rounded-full blur-md group-hover:blur-lg group-hover:bg-[#3A7BF7]/30 transition-all duration-300" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent group-hover:from-[#2CC7D0] group-hover:via-white group-hover:to-[#3A7BF7] transition-all duration-300">
              ReWork
            </span>
          </Link>
          
          <Link 
            href="/"
            className="px-4 py-2 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white text-sm font-medium rounded-lg hover:from-[#3A7BF7] hover:to-[#8B5CF6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 md:px-6 py-8 md:py-16 text-white relative z-10">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2CC7D0]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3A7BF7]/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#2CC7D0]/10 to-[#3A7BF7]/10 border border-[#2CC7D0]/20 backdrop-blur-sm mb-6">
              <Shield className="h-4 w-4 text-[#2CC7D0] mr-2" />
              <span className="text-sm font-medium text-white">Privacy & Security</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy{" "}
              <span className="bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We take your privacy seriously. Here's how we collect, use, and protect your information.
            </p>
            
            <p className="text-sm text-gray-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            
            {/* Information We Collect */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  When you sign up for ReWork beta, we collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Email Address:</strong> To notify you when ReWork launches and send important updates</li>
                  <li><strong>Signup Source:</strong> Which form you used to sign up (for analytics)</li>
                  <li><strong>Timestamp:</strong> When you signed up for beta access</li>
                  <li><strong>IP Address:</strong> For security and spam prevention</li>
                  <li><strong>reCAPTCHA Data:</strong> To prevent automated signups</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3A7BF7] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Send you launch notifications and product updates</li>
                  <li>Provide customer support</li>
                  <li>Improve our service and user experience</li>
                  <li>Prevent spam and abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-6">
                  <p className="text-green-400 font-semibold">✅ We will never:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-green-300">
                    <li>Sell your email address to third parties</li>
                    <li>Send you spam or unwanted marketing</li>
                    <li>Share your data without your consent</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encrypted data transmission (HTTPS/TLS)</li>
                  <li>Secure cloud storage with MongoDB Atlas</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited access to your data on a need-to-know basis</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <div className="space-y-4 text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Unsubscribe:</strong> Click the unsubscribe link in any email</li>
                  <li><strong>Data Access:</strong> Request a copy of your data</li>
                  <li><strong>Data Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Data Correction:</strong> Update or correct your information</li>
                </ul>
                
                <p className="mt-4">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:hello@rework.solutions" className="text-[#2CC7D0] hover:text-[#3A7BF7] transition-colors">
                    hello@rework.solutions
                  </a>
                </p>
              </div>
            </section>

            {/* Cookies and Analytics */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Cookies and Analytics</h2>
              <div className="space-y-4 text-gray-300">
                <p>We use:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> To understand how visitors use our site</li>
                  <li><strong>reCAPTCHA:</strong> To prevent spam (Google service)</li>
                  <li><strong>Essential cookies:</strong> For basic site functionality</li>
                </ul>
                
                <p className="mt-4">
                  You can disable cookies in your browser settings, though this may affect site functionality.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may update this privacy policy from time to time. We'll notify you of any material 
                  changes by email and update the "Last updated" date at the top of this page.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-[#2CC7D0]/10 to-[#3A7BF7]/10 border border-[#2CC7D0]/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this privacy policy or how we handle your data, 
                please don't hesitate to reach out.
              </p>
              
              <a 
                href="mailto:hello@rework.solutions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-semibold rounded-lg hover:from-[#3A7BF7] hover:to-[#8B5CF6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}