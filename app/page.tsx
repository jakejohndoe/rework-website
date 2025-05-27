"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Code,
  CreditCard,
  Download,
  FileText,
  Layers,
  MessageSquare,
  Sparkles,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailCapture } from "@/components/email-capture"
import { CursorEffect } from "@/components/cursor-effect"
import { FloatingElements } from "@/components/floating-elements"
import { AnimatedSection } from "@/components/animated-section"
import { SpinningHero } from "@/components/SpinningHero"
import { analytics } from '@/lib/analytics'
import { getReCaptchaToken } from '@/lib/recaptcha'
import { useSignupCount } from '@/lib/useSignupCount'

// Signup Counter Component
function SignupCounter() {
  const { count, loading, error } = useSignupCount();
  
  if (loading || error || count === 0) return null;
  
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-xs md:text-sm text-gray-300 font-medium">
        <span className="text-[#2CC7D0] font-semibold">{count.toLocaleString()}</span> people waiting
      </span>
    </div>
  );
}

// Simple Mobile Menu Component
function MobileMenu({ onGetStartedClick }: { onGetStartedClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden hover:bg-white/10 hover:scale-105 transition-all duration-300 rounded-full group cursor-pointer"
      >
        <svg className="h-6 w-6 text-white/80 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <>
              <line x1="4" x2="20" y1="6" y2="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <line x1="4" x2="20" y1="12" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <line x1="4" x2="20" y1="18" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </>
          )}
        </svg>
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-64 bg-[#0F172A] border-l border-white/10 p-6">
            <div className="flex flex-col space-y-6 mt-16">
              <a href="#features" onClick={() => setIsOpen(false)} className="text-white hover:text-[#2CC7D0] transition-colors text-lg font-medium">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-white hover:text-[#2CC7D0] transition-colors text-lg font-medium">
                How It Works
              </a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="text-white hover:text-[#2CC7D0] transition-colors text-lg font-medium">
                FAQ
              </a>
              <button 
                onClick={() => { setIsOpen(false); onGetStartedClick(); }}
                className="mt-6 px-4 py-3 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white rounded-lg text-left font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const [highlightEmail, setHighlightEmail] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailValue, setEmailValue] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')
  
  // Bottom form states
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false)
  const [emailValueBottom, setEmailValueBottom] = useState('')
  const [showSuccessBottom, setShowSuccessBottom] = useState(false)
  const [emailErrorBottom, setEmailErrorBottom] = useState('')

  const handleGetStartedClick = (e?: React.MouseEvent) => {
    e?.preventDefault()
    
    // Track CTA button click
    analytics.ctaButtonClick('navbar_get_started');
    
    // Check if user is already near the top of the page
    if (window.scrollY < 100) {
      // Already at top, highlight the email input
      setHighlightEmail(true)
      
      // Remove highlight after animation
      setTimeout(() => setHighlightEmail(false), 2000)
      
      // Focus the email input
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
      if (emailInput) {
        emailInput.focus()
      }
    } else {
      // Not at top, scroll to top
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailValue(value)
    
    // Track form focus (only once per session)
    if (value.length === 1) {
      analytics.emailFormFocus('hero');
    }
    
    // Clear error when user starts typing
    if (emailError) setEmailError('')
    
    // Real-time validation feedback
    if (value.length > 0 && !validateEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleEmailChangeBottom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailValueBottom(value)
    
    // Track form focus (only once per session)
    if (value.length === 1) {
      analytics.emailFormFocus('final-cta');
    }
    
    if (emailErrorBottom) setEmailErrorBottom('')
    
    if (value.length > 0 && !validateEmail(value)) {
      setEmailErrorBottom('Please enter a valid email address')
    } else {
      setEmailErrorBottom('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!emailValue.trim()) {
      setEmailError('Email is required')
      analytics.formError('hero', 'empty_email');
      return
    }
    
    if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address')
      analytics.formError('hero', 'invalid_email');
      return
    }

    // Track form submission attempt
    analytics.emailFormSubmitAttempt('hero');

    setIsSubmitting(true)
    setEmailError('') // Clear any existing errors
    
    try {
      // 🆕 GET RECAPTCHA TOKEN
      const recaptchaToken = await getReCaptchaToken('email_signup')
      
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue.trim(),
          source: 'hero', // Track this as hero form submission
          recaptchaToken // 🆕 INCLUDE TOKEN
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success! Track conversion
        analytics.emailSignup('hero');
        
        // Keep all your existing success animation
        setIsSubmitting(false)
        setShowSuccess(true)
        setEmailValue('')
        
        // Hide success message after 6 seconds (keeping your existing timing)
        setTimeout(() => setShowSuccess(false), 6000)
      } else {
        // Handle different types of errors
        setIsSubmitting(false)
        
        if (response.status === 429) {
          // Rate limited
          analytics.rateLimitHit('hero');
          analytics.formError('hero', 'rate_limited');
          setEmailError(data.error || 'Too many requests. Please try again later.')
        } else if (response.status === 409) {
          // Duplicate email
          analytics.formError('hero', 'duplicate_email');
          setEmailError('This email is already on our waitlist!')
        } else {
          // Other errors
          analytics.formError('hero', 'api_error');
          setEmailError(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Email signup error:', error)
      setIsSubmitting(false)
      analytics.formError('hero', 'network_error');
      setEmailError('Network error. Please check your connection and try again.')
    }
  }

  const handleSubmitBottom = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!emailValueBottom.trim()) {
      setEmailErrorBottom('Email is required')
      analytics.formError('final-cta', 'empty_email');
      return
    }
    
    if (!validateEmail(emailValueBottom)) {
      setEmailErrorBottom('Please enter a valid email address')
      analytics.formError('final-cta', 'invalid_email');
      return
    }

    // Track form submission attempt
    analytics.emailFormSubmitAttempt('final-cta');

    setIsSubmittingBottom(true)
    setEmailErrorBottom('') // Clear any existing errors
    
    try {
      // 🆕 GET RECAPTCHA TOKEN
      const recaptchaToken = await getReCaptchaToken('email_signup')
      
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValueBottom.trim(),
          source: 'final-cta', // Track this as final CTA form submission
          recaptchaToken // 🆕 INCLUDE TOKEN
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success! Track conversion
        analytics.emailSignup('final-cta');
        
        // Keep all your existing success animation
        setIsSubmittingBottom(false)
        setShowSuccessBottom(true)
        setEmailValueBottom('')
        
        // Hide success message after 6 seconds (keeping your existing timing)
        setTimeout(() => setShowSuccessBottom(false), 6000)
      } else {
        // Handle different types of errors
        setIsSubmittingBottom(false)
        
        if (response.status === 429) {
          // Rate limited
          analytics.rateLimitHit('final-cta');
          analytics.formError('final-cta', 'rate_limited');
          setEmailErrorBottom(data.error || 'Too many requests. Please try again later.')
        } else if (response.status === 409) {
          // Duplicate email
          analytics.formError('final-cta', 'duplicate_email');
          setEmailErrorBottom('This email is already on our waitlist!')
        } else {
          // Other errors
          analytics.formError('final-cta', 'api_error');
          setEmailErrorBottom(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Email signup error:', error)
      setIsSubmittingBottom(false)
      analytics.formError('final-cta', 'network_error');
      setEmailErrorBottom('Network error. Please check your connection and try again.')
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col relative">
      <CursorEffect />
      <FloatingElements />
      
      {/* Enhanced Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-white/10">
        {/* Glassmorphism background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#1E293B]/90 to-[#0F172A]/95" />
        
        {/* Subtle ambient particles in navbar - hide on small screens */}
        <div className="hidden md:block absolute top-2 left-20 w-8 h-8 bg-[#2CC7D0]/20 rounded-full blur-sm" />
        <div className="hidden md:block absolute bottom-2 right-32 w-6 h-6 bg-[#3A7BF7]/15 rounded-full blur-sm" />
        
        <div className="container relative flex h-16 items-center justify-between px-4 md:px-6 z-10">
          <div className="flex items-center gap-2">
            <Link href="#top" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group cursor-pointer">
              <div className="relative">
                <Image
                  src="/rework-logo-detailed.png"
                  alt="ReWork"
                  width={120}
                  height={120}
                  className="h-24 w-24 md:h-30 md:w-30 group-hover:scale-110 transition-all duration-300 object-contain"
                />
                <div className="absolute inset-0 bg-[#2CC7D0]/30 rounded-full blur-md group-hover:blur-lg group-hover:bg-[#3A7BF7]/30 transition-all duration-300" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent group-hover:from-[#2CC7D0] group-hover:via-white group-hover:to-[#3A7BF7] transition-all duration-300">
                ReWork
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex md:items-center md:gap-1">
            <Link 
              href="#features" 
              onClick={() => analytics.navigationClick('features')}
              className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0]/0 to-[#3A7BF7]/0 group-hover:from-[#2CC7D0]/20 group-hover:to-[#3A7BF7]/20 rounded-lg transition-all duration-300" />
              <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            
            <Link 
              href="#how-it-works"
              onClick={() => analytics.navigationClick('how-it-works')}
              className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <span className="relative z-10">How It Works</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0]/0 to-[#3A7BF7]/0 group-hover:from-[#2CC7D0]/20 group-hover:to-[#3A7BF7]/20 rounded-lg transition-all duration-300" />
              <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            
            <Link 
              href="#faq"
              onClick={() => analytics.navigationClick('faq')}
              className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <span className="relative z-10">FAQ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0]/0 to-[#3A7BF7]/0 group-hover:from-[#2CC7D0]/20 group-hover:to-[#3A7BF7]/20 rounded-lg transition-all duration-300" />
              <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Premium CTA button */}
            <button 
              onClick={handleGetStartedClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white text-sm font-medium rounded-lg hover:from-[#3A7BF7] hover:to-[#8B5CF6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </button>
            
            {/* Mobile Menu */}
            <MobileMenu onGetStartedClick={handleGetStartedClick} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="top" className="relative w-full pt-6 pb-16 md:pt-8 md:pb-20 lg:pt-12 lg:pb-32 xl:pt-16 xl:pb-40 overflow-hidden">
          {/* Enhanced gradient background for better depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] via-[#1E293B] to-[#0F172A] animate-gradient-x" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 via-transparent to-[#1E293B]/60" />
          
          {/* Cool background orbs - responsive sizing */}
          <div className="absolute top-16 md:top-20 left-6 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-[#2CC7D0]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-12 md:bottom-20 right-6 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-[#3A7BF7]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-16 items-start lg:items-center">
                <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#2CC7D0]/10 to-[#3A7BF7]/10 border border-[#2CC7D0]/20 backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-[#2CC7D0] mr-2" />
                      <span className="text-xs md:text-sm font-medium text-white">AI-Powered Resume Optimization</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                      Tailor Your Resume in{" "}
                      <span className="relative bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent animate-gradient-x">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] blur-2xl opacity-30"></span>
                        Seconds
                      </span>
                    </h1>
                    
                    <p className="max-w-[600px] text-base md:text-xl text-gray-300 leading-relaxed">
                      AI-powered resume optimization for job-specific applications. Get more interviews with a resume that
                      stands out from the crowd.
                    </p>
                  </div>
                  
                  {/* Enhanced Email Capture Form - responsive padding and sizing */}
                  <div className="mt-6 md:mt-8">
                    <div className={`relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${
                      highlightEmail ? 'ring-4 ring-[#2CC7D0] ring-opacity-50 shadow-[0_0_30px_rgba(44,199,208,0.3)] scale-105' : ''
                    } ${showSuccess ? 'ring-4 ring-green-500 ring-opacity-50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : ''}`}>
                      
                      {showSuccess ? (
                        // Success State
                        <div className="text-center py-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full mb-4 animate-bounce">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2">You're on the list! 🎉</h3>
                          <p className="text-sm md:text-base text-gray-300">Thanks for joining our waitlist. We'll notify you as soon as ReWork launches!</p>
                        </div>
                      ) : (
                        // Form State
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <div className="relative flex-1">
                              <input
                                type="email"
                                placeholder="Enter your email"
                                value={emailValue}
                                onChange={handleEmailChange}
                                className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-base md:text-lg backdrop-blur-sm ${
                                  highlightEmail ? 'ring-2 ring-[#2CC7D0] bg-white/15' : ''
                                } ${
                                  emailError ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#2CC7D0]'
                                }`}
                                disabled={isSubmitting}
                              />
                              {emailError && (
                                <div className="absolute -bottom-5 md:-bottom-6 left-0 text-red-400 text-xs md:text-sm flex items-center gap-1">
                                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {emailError}
                                </div>
                              )}
                            </div>
                            <button 
                              type="submit"
                              disabled={isSubmitting || !!emailError}
                              className={`px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-base md:text-lg flex items-center gap-2 min-w-[140px] md:min-w-[160px] justify-center ${
                                isSubmitting || emailError 
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : 'hover:from-[#3A7BF7] hover:to-[#8B5CF6] hover:shadow-xl hover:scale-105'
                              }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  <span className="hidden sm:inline">Joining...</span>
                                  <span className="sm:hidden">...</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  Get Notified
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                      
                      {/* Enhanced CTA text with signup counter - only show when not in success state */}
                      {!showSuccess && (
                        <div className="mt-3 md:mt-4 text-center space-y-3">
                          <p className="text-sm md:text-base text-gray-300 font-medium">
                            🚀 Be the first to know when ReWork launches. <span className="text-[#2CC7D0] font-semibold">No spam, ever.</span>
                          </p>
                          <SignupCounter />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced feature checkmarks - responsive layout */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xs md:text-sm mt-6 md:mt-8">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">ATS-Optimized</span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">Job-Specific</span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">AI-Powered</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start justify-center lg:items-start lg:justify-center lg:-mt-16 xl:-mt-32">
                  <div className="h-[400px] w-[400px] md:h-[550px] md:w-[550px] lg:h-[650px] lg:w-[650px] xl:h-[720px] xl:w-[720px] flex items-center justify-center">
                    <SpinningHero />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* How It Works - responsive spacing */}
        <section id="how-it-works" className="relative w-full py-12 md:py-20 lg:py-32 overflow-hidden">
          <FloatingElements />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />
          
          {/* Subtle ambient orbs - hide on small screens */}
          <div className="hidden md:block absolute top-32 right-20 w-64 h-64 bg-[#3A7BF7]/8 rounded-full blur-3xl" />
          <div className="hidden md:block absolute bottom-16 left-16 w-80 h-80 bg-[#8B5CF6]/6 rounded-full blur-3xl" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-16">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    How It{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent">
                      Works
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-lg md:text-xl text-muted-foreground px-4">
                    Three simple steps to create a tailored resume that gets you noticed
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="mx-auto mt-8 md:mt-16 grid max-w-6xl grid-cols-1 gap-8 md:gap-12 md:grid-cols-3 md:items-stretch">
              {[
                {
                  icon: Upload,
                  title: "Upload Resume",
                  description: "Upload your existing resume in any format. Our system will analyze and extract your information.",
                  color: "from-[#2CC7D0] to-[#3A7BF7]",
                  delay: 0.1
                },
                {
                  icon: FileText,
                  title: "Add Job Description", 
                  description: "Paste the job description you're applying for. Our AI will identify key skills and requirements.",
                  color: "from-[#3A7BF7] to-[#8B5CF6]",
                  delay: 0.2
                },
                {
                  icon: Download,
                  title: "Download Tailored PDF",
                  description: "Get your optimized resume instantly, tailored specifically for the job you want.",
                  color: "from-[#8B5CF6] to-[#D946EF]",
                  delay: 0.3
                }
              ].map((step, index) => (
                <AnimatedSection key={index} delay={step.delay} className="h-full">
                  <div className="group relative h-full">
                    <div className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" 
                         style={{background: `linear-gradient(to right, ${step.color.split(' ')[1]}, ${step.color.split(' ')[3]})`}} />
                    <Card className="relative h-full border-0 bg-card backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 flex flex-col min-h-[280px]">
                      <CardHeader className="text-center pb-4 flex-shrink-0">
                        <div className={`mx-auto mb-4 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} shadow-lg`}>
                          <step.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-card-foreground">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex items-center justify-center px-4 md:px-6">
                        <CardDescription className="text-center text-muted-foreground text-base md:text-lg leading-relaxed">
                          {step.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features - responsive spacing and grid */}
        <section id="features" className="relative w-full py-12 md:py-20 lg:py-32 overflow-hidden">
          <FloatingElements />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
          
          {/* Very subtle ambient orbs - hide on small screens */}
          <div className="hidden md:block absolute top-20 left-32 w-72 h-72 bg-[#2CC7D0]/6 rounded-full blur-3xl" />
          <div className="hidden md:block absolute bottom-32 right-24 w-60 h-60 bg-[#D946EF]/5 rounded-full blur-3xl" />
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3A7BF7]/4 rounded-full blur-3xl" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-16">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    Key{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent">
                      Features
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-lg md:text-xl text-muted-foreground px-4">
                    Powerful tools to help you land your dream job
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="mx-auto mt-8 md:mt-16 grid max-w-7xl grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Sparkles,
                  title: "AI Keyword Optimization",
                  description: "Our AI identifies and incorporates key terms from job descriptions to help you pass ATS screening.",
                  color: "from-[#2CC7D0] to-[#3A7BF7]",
                  delay: 0.1
                },
                {
                  icon: Layers,
                  title: "Multiple Templates",
                  description: "Choose from dozens of professionally designed templates to match your industry and style.",
                  color: "from-[#3A7BF7] to-[#8B5CF6]",
                  delay: 0.2
                },
                {
                  icon: MessageSquare,
                  title: "Content Suggestions",
                  description: "Get smart recommendations to improve your resume's impact and readability.",
                  color: "from-[#8B5CF6] to-[#D946EF]",
                  delay: 0.3
                },
                {
                  icon: Cloud,
                  title: "Cloud Storage",
                  description: "Securely store all your resume versions and access them from any device.",
                  color: "from-[#D946EF] to-[#F97316]",
                  delay: 0.4
                },
                {
                  icon: Code,
                  title: "ATS Simulation",
                  description: "Test your resume against simulated ATS systems to ensure it passes automated screenings.",
                  color: "from-[#F97316] to-[#EAB308]",
                  delay: 0.5
                },
                {
                  icon: CreditCard,
                  title: "Premium Cover Letters",
                  description: "Generate matching cover letters tailored to each job application.",
                  color: "from-[#EAB308] to-[#22C55E]",
                  delay: 0.6
                }
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={feature.delay}>
                  <div className="group relative h-full">
                    <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-lg"
                         style={{background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}} />
                    <Card className="relative h-full border-0 bg-card backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                      <CardHeader className="p-4 md:p-6">
                        <div className={`mb-3 md:mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                          <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                        </div>
                        <CardTitle className="text-lg md:text-xl font-bold text-card-foreground">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6 pt-0">
                        <CardDescription className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section - responsive spacing */}
        <section id="faq" className="relative w-full py-12 md:py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />
          
          {/* Ambient orbs - hide on small screens */}
          <div className="hidden md:block absolute top-40 right-32 w-56 h-56 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
          <div className="hidden md:block absolute bottom-20 left-20 w-48 h-48 bg-[#2CC7D0]/4 rounded-full blur-3xl" />
          
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-16">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    Frequently Asked{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent">
                      Questions
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-lg md:text-xl text-muted-foreground px-4">
                    Everything you need to know about ReWork
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="mx-auto mt-8 md:mt-16 max-w-4xl">
              <AnimatedSection delay={0.2}>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    {
                      question: "How does ReWork's AI tailoring work?",
                      answer: "Our AI analyzes both your resume and the job description to identify key skills, requirements, and terminology. It then restructures your resume to highlight relevant experience and incorporate important keywords, increasing your chances of passing ATS screening and impressing hiring managers."
                    },
                    {
                      question: "When will ReWork be available?",
                      answer: "We're working hard to launch ReWork in July 2025. Sign up for our waitlist to be notified as soon as we're live and get early access to the platform."
                    },
                    {
                      question: "Is my data secure with ReWork?",
                      answer: "Absolutely. We take data security seriously. Your resume data and job descriptions are encrypted and stored securely. We never share your personal information with third parties, and you can delete your data at any time."
                    },
                    {
                      question: "Can I use ReWork for any industry or job type?",
                      answer: "Yes! ReWork is designed to work across all industries and job types. Our AI has been trained on millions of resumes and job descriptions from various sectors, from tech and healthcare to finance, education, and more."
                    }
                  ].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`} className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#2CC7D0]/0 via-[#3A7BF7]/0 to-[#8B5CF6]/0 group-hover:from-[#2CC7D0]/20 group-hover:via-[#3A7BF7]/20 group-hover:to-[#8B5CF6]/20 rounded-xl blur-sm transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/8 hover:border-white/15 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <AccordionTrigger className="text-left text-white px-4 md:px-6 py-4 md:py-5 hover:no-underline group-hover:text-white transition-colors duration-300 text-base md:text-lg font-semibold">
                          <span className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full group-hover:scale-125 transition-transform duration-300" />
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base leading-relaxed">
                          <div className="pl-5 border-l-2 border-gradient-to-b from-[#2CC7D0]/30 to-[#3A7BF7]/30 ml-2">
                            {item.answer}
                          </div>
                        </AccordionContent>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Final CTA - responsive spacing */}
        <section className="relative w-full py-12 md:py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] via-[#1E293B] to-[#0F172A]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/60 via-transparent to-[#0A0F1C]/80" />
          <FloatingElements />
          
          {/* More prominent orbs - hide on small screens */}
          <div className="hidden md:block absolute top-16 left-16 w-80 h-80 bg-[#2CC7D0]/8 rounded-full blur-3xl" />
          <div className="hidden md:block absolute bottom-24 right-20 w-72 h-72 bg-[#8B5CF6]/6 rounded-full blur-3xl" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center text-white">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl px-4">
                    Ready to Transform Your{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent">
                      Job Search?
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-lg md:text-xl text-gray-300 px-4">
                    Join our waitlist and be the first to experience AI-powered resume optimization
                  </p>
                </div>
                <div className="w-full max-w-lg">
                  <div className={`relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${
                    showSuccessBottom ? 'ring-4 ring-green-500 ring-opacity-50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : ''
                  }`}>
                    
                    {showSuccessBottom ? (
                      // Success State
                      <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full mb-4 animate-bounce">
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Welcome to the waitlist! 🚀</h3>
                        <p className="text-sm md:text-base text-gray-300">You'll be among the first to experience ReWork when we launch!</p>
                      </div>
                    ) : (
                      // Form State  
                      <form onSubmit={handleSubmitBottom}>
                        <div className="flex flex-col gap-3 md:gap-4">
                          <div className="relative">
                            <input
                              type="email"
                              placeholder="Enter your email"
                              value={emailValueBottom}
                              onChange={handleEmailChangeBottom}
                              className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-base md:text-lg backdrop-blur-sm ${
                                emailErrorBottom ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#2CC7D0]'
                              }`}
                              disabled={isSubmittingBottom}
                            />
                            {emailErrorBottom && (
                              <div className="absolute -bottom-6 left-0 text-red-400 text-xs md:text-sm flex items-center gap-1">
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {emailErrorBottom}
                              </div>
                            )}
                          </div>
                          <button 
                            type="submit"
                            disabled={isSubmittingBottom || !!emailErrorBottom}
                            className={`w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-base md:text-lg flex items-center gap-2 justify-center ${
                              isSubmittingBottom || emailErrorBottom 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:from-[#3A7BF7] hover:to-[#8B5CF6] hover:shadow-xl hover:scale-105'
                            }`}
                          >
                            {isSubmittingBottom ? (
                              <>
                                <svg className="animate-spin w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="hidden sm:inline">Joining...</span>
                                <span className="sm:hidden">...</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Get Notified
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                    
                    {!showSuccessBottom && (
                      <div className="mt-3 md:mt-4 text-center">
                        <p className="text-xs md:text-sm text-gray-400">
                          🚀 <span className="text-[#2CC7D0] font-semibold">No spam, ever.</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Modern Compact Footer - responsive */}
      <footer className="relative w-full bg-[#0F172A] py-6 md:py-8 text-white overflow-hidden border-t border-white/5">
        {/* Very subtle footer orbs - hide on small screens */}
        <div className="hidden md:block absolute top-4 right-40 w-40 h-40 bg-[#3A7BF7]/4 rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-4 left-32 w-52 h-52 bg-[#2CC7D0]/3 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            {/* Left: Logo & Social */}
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src="/rework-logo-detailed.png"
                alt="ReWork"
                width={40}
                height={40}
                className="h-16 w-16 md:h-20 md:w-20 object-contain"
              />
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">ReWork</span>
              <span className="text-sm text-gray-400 hidden md:block">•</span>
              <span className="text-xs md:text-sm text-gray-400 text-center md:text-left">smart tech for smarter jobs</span>
            </div>
              
              <div className="flex space-x-3 md:space-x-4">
                <Link href="https://x.com/reworkapp" target="_blank" className="text-gray-400 hover:text-[#2CC7D0] transition-colors duration-300 hover:scale-110 transform">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com/in/reworkapp/" target="_blank" className="text-gray-400 hover:text-[#2CC7D0] transition-colors duration-300 hover:scale-110 transform">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Essential Links & Copyright */}
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6 text-xs md:text-sm">
              <div className="flex items-center gap-4 md:gap-6">
                <Link href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</Link>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</Link>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="text-xs text-gray-500">
                  © 2025 ReWork. All rights reserved.
                </div>
                {/* Subtle admin access - looks like a decoration but is clickable */}
                <Link 
                  href="/admin/login" 
                  className="w-2 h-2 bg-gray-600/30 rounded-full hover:bg-[#2CC7D0]/40 transition-all duration-500 hover:scale-150 cursor-pointer"
                  title=""
                >
                  <span className="sr-only">Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}