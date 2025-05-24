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

  const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
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
      return
    }
    
    if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setEmailError('') // Clear any existing errors
    
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue.trim(),
          source: 'hero' // Track this as hero form submission
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success! Keep all your existing success animation
        setIsSubmitting(false)
        setShowSuccess(true)
        setEmailValue('')
        
        // Hide success message after 6 seconds (keeping your existing timing)
        setTimeout(() => setShowSuccess(false), 6000)
      } else {
        // Handle API errors (like duplicate email)
        setIsSubmitting(false)
        if (response.status === 409) {
          setEmailError('This email is already on our waitlist!')
        } else {
          setEmailError(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Email signup error:', error)
      setIsSubmitting(false)
      setEmailError('Network error. Please check your connection and try again.')
    }
  }

  const handleSubmitBottom = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!emailValueBottom.trim()) {
      setEmailErrorBottom('Email is required')
      return
    }
    
    if (!validateEmail(emailValueBottom)) {
      setEmailErrorBottom('Please enter a valid email address')
      return
    }

    setIsSubmittingBottom(true)
    setEmailErrorBottom('') // Clear any existing errors
    
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValueBottom.trim(),
          source: 'final-cta' // Track this as final CTA form submission
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success! Keep all your existing success animation
        setIsSubmittingBottom(false)
        setShowSuccessBottom(true)
        setEmailValueBottom('')
        
        // Hide success message after 6 seconds (keeping your existing timing)
        setTimeout(() => setShowSuccessBottom(false), 6000)
      } else {
        // Handle API errors (like duplicate email)
        setIsSubmittingBottom(false)
        if (response.status === 409) {
          setEmailErrorBottom('This email is already on our waitlist!')
        } else {
          setEmailErrorBottom(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Email signup error:', error)
      setIsSubmittingBottom(false)
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
        
        {/* Subtle ambient particles in navbar */}
        <div className="absolute top-2 left-20 w-8 h-8 bg-[#2CC7D0]/20 rounded-full blur-sm" />
        <div className="absolute bottom-2 right-32 w-6 h-6 bg-[#3A7BF7]/15 rounded-full blur-sm" />
        
        <div className="container relative flex h-16 items-center justify-between px-4 md:px-6 z-10">
          <div className="flex items-center gap-2">
            <Link href="#top" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300 group cursor-pointer">
              <div className="relative">
                <FileText className="h-6 w-6 text-[#2CC7D0] group-hover:scale-110 group-hover:text-[#3A7BF7] transition-all duration-300" />
                <div className="absolute inset-0 bg-[#2CC7D0]/30 rounded-full blur-md group-hover:blur-lg group-hover:bg-[#3A7BF7]/30 transition-all duration-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent group-hover:from-[#2CC7D0] group-hover:via-white group-hover:to-[#3A7BF7] transition-all duration-300">
                ReWork
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex md:items-center md:gap-1">
            <Link href="#features" className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 cursor-pointer">
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0]/0 to-[#3A7BF7]/0 group-hover:from-[#2CC7D0]/20 group-hover:to-[#3A7BF7]/20 rounded-lg transition-all duration-300" />
              <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            
            <Link href="#how-it-works" className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 cursor-pointer">
              <span className="relative z-10">How It Works</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0]/0 to-[#3A7BF7]/0 group-hover:from-[#2CC7D0]/20 group-hover:to-[#3A7BF7]/20 rounded-lg transition-all duration-300" />
              <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            
            <Link href="#faq" className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 group rounded-lg hover:bg-white/5 cursor-pointer">
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
            
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10 hover:scale-105 transition-all duration-300 rounded-full group cursor-pointer">
              <svg className="h-6 w-6 text-white/80 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="top" className="relative w-full pt-8 pb-20 md:pt-12 md:pb-32 lg:pt-16 lg:pb-40 overflow-hidden">
          {/* Enhanced gradient background for better depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] via-[#1E293B] to-[#0F172A] animate-gradient-x" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/80 via-transparent to-[#1E293B]/60" />
          
          {/* Cool background orbs are back! */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2CC7D0]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3A7BF7]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start lg:items-center">
                <div className="flex flex-col justify-center space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#2CC7D0]/10 to-[#3A7BF7]/10 border border-[#2CC7D0]/20 backdrop-blur-sm">
                      <Sparkles className="h-4 w-4 text-[#2CC7D0] mr-2" />
                      <span className="text-sm font-medium text-white">AI-Powered Resume Optimization</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                      Tailor Your Resume in{" "}
                      <span className="relative bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent animate-gradient-x">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] blur-2xl opacity-30"></span>
                        Seconds
                      </span>
                    </h1>
                    
                    <p className="max-w-[600px] text-xl text-gray-300 leading-relaxed">
                      AI-powered resume optimization for job-specific applications. Get more interviews with a resume that
                      stands out from the crowd.
                    </p>
                  </div>
                  
                  {/* Enhanced Email Capture Form with all the bells and whistles */}
                  <div className="mt-8">
                    <div className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${
                      highlightEmail ? 'ring-4 ring-[#2CC7D0] ring-opacity-50 shadow-[0_0_30px_rgba(44,199,208,0.3)] scale-105' : ''
                    } ${showSuccess ? 'ring-4 ring-green-500 ring-opacity-50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : ''}`}>
                      
                      {showSuccess ? (
                        // Success State
                        <div className="text-center py-4">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 animate-bounce">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">You're on the list! 🎉</h3>
                          <p className="text-gray-300">Thanks for joining our waitlist. We'll notify you as soon as ReWork launches!</p>
                        </div>
                      ) : (
                        // Form State
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                              <input
                                type="email"
                                placeholder="Enter your email"
                                value={emailValue}
                                onChange={handleEmailChange}
                                className={`w-full px-6 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm ${
                                  highlightEmail ? 'ring-2 ring-[#2CC7D0] bg-white/15' : ''
                                } ${
                                  emailError ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#2CC7D0]'
                                }`}
                                disabled={isSubmitting}
                              />
                              {emailError && (
                                <div className="absolute -bottom-6 left-0 text-red-400 text-sm flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {emailError}
                                </div>
                              )}
                            </div>
                            <button 
                              type="submit"
                              disabled={isSubmitting || !!emailError}
                              className={`px-8 py-4 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-lg flex items-center gap-2 min-w-[160px] justify-center ${
                                isSubmitting || emailError 
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : 'hover:from-[#3A7BF7] hover:to-[#8B5CF6] hover:shadow-xl hover:scale-105'
                              }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Joining...
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  Get Notified
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                      
                      {/* Enhanced CTA text - only show when not in success state */}
                      {!showSuccess && (
                        <div className="mt-4 text-center">
                          <p className="text-base text-gray-300 font-medium">
                            🚀 Be the first to know when ReWork launches. <span className="text-[#2CC7D0] font-semibold">No spam, ever.</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced feature checkmarks */}
                  <div className="flex items-center justify-center space-x-8 text-sm mt-8">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">ATS-Optimized</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">Job-Specific</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">AI-Powered</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start justify-center lg:items-start lg:justify-center lg:-mt-32">
                  <div className="relative group">
                    {/* Perfect balance glow */}
                    <div className="absolute -inset-20 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full blur-3xl opacity-10 group-hover:opacity-15 transition-opacity duration-1000" />
                    
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="h-[650px] w-[650px] lg:h-[720px] lg:w-[720px] flex items-center justify-center">
                        <Image
                          src="/rework-logo-detailed.png"
                          alt="ReWork AI Resume Optimization"
                          width={610}
                          height={610}
                          className="object-contain drop-shadow-2xl group-hover:scale-105 transition-all duration-1000 lg:w-[680px] lg:h-[680px] animate-gentle-float"
                          priority
                        />
                      </div>
                      
                      {/* Slogan right under logo - no gap */}
                      <div className="text-center -mt-32 lg:-mt-36">
                        <p className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent tracking-tight">
                          Smart tech, for smarter jobs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="relative w-full py-20 md:py-32 overflow-hidden">
          <FloatingElements />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />
          
          {/* Subtle ambient orbs */}
          <div className="absolute top-32 right-20 w-64 h-64 bg-[#3A7BF7]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-16 w-80 h-80 bg-[#8B5CF6]/6 rounded-full blur-3xl" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    How It{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent">
                      Works
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-xl text-muted-foreground">
                    Three simple steps to create a tailored resume that gets you noticed
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3 md:items-stretch">
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
                        <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} shadow-lg`}>
                          <step.icon className="h-10 w-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-card-foreground">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex items-center justify-center px-6">
                        <CardDescription className="text-center text-muted-foreground text-lg leading-relaxed">
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

        {/* Key Features */}
        <section id="features" className="relative w-full py-20 md:py-32 overflow-hidden">
          <FloatingElements />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
          
          {/* Very subtle ambient orbs */}
          <div className="absolute top-20 left-32 w-72 h-72 bg-[#2CC7D0]/6 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-24 w-60 h-60 bg-[#D946EF]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3A7BF7]/4 rounded-full blur-3xl" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    Key{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent">
                      Features
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-xl text-muted-foreground">
                    Powerful tools to help you land your dream job
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                      <CardHeader>
                        <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                          <feature.icon className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-card-foreground">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground leading-relaxed">
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

        {/* Enhanced FAQ Section - matching How It Works background */}
        <section id="faq" className="relative w-full py-20 md:py-32 overflow-hidden">
          {/* Simple dark background like How It Works */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />
          
          {/* Ambient orbs for atmosphere */}
          <div className="absolute top-40 right-32 w-56 h-56 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#2CC7D0]/4 rounded-full blur-3xl" />
          
          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    Frequently Asked{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent">
                      Questions
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-xl text-muted-foreground">
                    Everything you need to know about ReWork
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="mx-auto mt-16 max-w-4xl">
              <AnimatedSection delay={0.2}>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    {
                      question: "How does ReWork's AI tailoring work?",
                      answer: "Our AI analyzes both your resume and the job description to identify key skills, requirements, and terminology. It then restructures your resume to highlight relevant experience and incorporate important keywords, increasing your chances of passing ATS screening and impressing hiring managers."
                    },
                    {
                      question: "When will ReWork be available?",
                      answer: "We're working hard to launch ReWork in early 2024. Sign up for our waitlist to be notified as soon as we're live and get early access to the platform."
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
                      {/* Glassmorphism background with hover glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#2CC7D0]/0 via-[#3A7BF7]/0 to-[#8B5CF6]/0 group-hover:from-[#2CC7D0]/20 group-hover:via-[#3A7BF7]/20 group-hover:to-[#8B5CF6]/20 rounded-xl blur-sm transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/8 hover:border-white/15 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <AccordionTrigger className="text-left text-white px-6 py-5 hover:no-underline group-hover:text-white transition-colors duration-300 text-lg font-semibold">
                          <span className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full group-hover:scale-125 transition-transform duration-300" />
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-6 text-base leading-relaxed">
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

        {/* Final CTA */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          {/* Enhanced gradient background matching hero */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0F172A] via-[#1E293B] to-[#0F172A]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/60 via-transparent to-[#0A0F1C]/80" />
          <FloatingElements />
          
          {/* More prominent orbs for CTA section */}
          <div className="absolute top-16 left-16 w-80 h-80 bg-[#2CC7D0]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-24 right-20 w-72 h-72 bg-[#8B5CF6]/6 rounded-full blur-3xl" />
          
          <div className="container relative px-4 md:px-6 z-10">
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center space-y-8 text-center text-white">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Ready to Transform Your{" "}
                    <span className="bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent">
                      Job Search?
                    </span>
                  </h2>
                  <p className="max-w-[800px] text-xl text-gray-300">
                    Join our waitlist and be the first to experience AI-powered resume optimization
                  </p>
                </div>
                <div className="w-full max-w-lg">
                  <div className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${
                    showSuccessBottom ? 'ring-4 ring-green-500 ring-opacity-50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : ''
                  }`}>
                    
                    {showSuccessBottom ? (
                      // Success State
                      <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 animate-bounce">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Welcome to the waitlist! 🚀</h3>
                        <p className="text-gray-300">You'll be among the first to experience ReWork when we launch!</p>
                      </div>
                    ) : (
                      // Form State  
                      <form onSubmit={handleSubmitBottom}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="relative flex-1">
                            <input
                              type="email"
                              placeholder="Enter your email"
                              value={emailValueBottom}
                              onChange={handleEmailChangeBottom}
                              className={`w-full px-6 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm ${
                                emailErrorBottom ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#2CC7D0]'
                              }`}
                              disabled={isSubmittingBottom}
                            />
                            {emailErrorBottom && (
                              <div className="absolute -bottom-6 left-0 text-red-400 text-sm flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {emailErrorBottom}
                              </div>
                            )}
                          </div>
                          <button 
                            type="submit"
                            disabled={isSubmittingBottom || !!emailErrorBottom}
                            className={`px-8 py-4 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-lg flex items-center gap-2 min-w-[160px] justify-center ${
                              isSubmittingBottom || emailErrorBottom 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:from-[#3A7BF7] hover:to-[#8B5CF6] hover:shadow-xl hover:scale-105'
                            }`}
                          >
                            {isSubmittingBottom ? (
                              <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Joining...
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-400">
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

      {/* Modern Compact Footer */}
      <footer className="relative w-full bg-[#0F172A] py-8 text-white overflow-hidden border-t border-white/5">
        {/* Very subtle footer orbs */}
        <div className="absolute top-4 right-40 w-40 h-40 bg-[#3A7BF7]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-32 w-52 h-52 bg-[#2CC7D0]/3 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Logo & Social */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#2CC7D0]" />
                <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">ReWork</span>
                <span className="text-sm text-gray-400 hidden md:block">•</span>
                <span className="text-sm text-gray-400">Smart tech for smarter jobs</span>
              </div>
              
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-[#2CC7D0] transition-colors duration-300 hover:scale-110 transform">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#2CC7D0] transition-colors duration-300 hover:scale-110 transform">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#2CC7D0] transition-colors duration-300 hover:scale-110 transform">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Essential Links & Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
              <div className="flex items-center gap-6">
                <Link href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</Link>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</Link>
              </div>
              <div className="text-xs text-gray-500">
                © 2025 ReWork. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}