"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface EmailCaptureProps {
  variant?: "default" | "white"
  className?: string
}

export function EmailCapture({ variant = "default", className = "" }: EmailCaptureProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Enhanced email validation - supports modern domains like arcin.io
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Call the actual email signup API
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        throw new Error("Failed to submit email")
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center justify-center space-x-3 p-6 rounded-2xl ${
          variant === "white" 
            ? "bg-white/10 backdrop-blur-xl border border-white/20 text-white" 
            : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
        } ${className}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-6 w-6" />
        </motion.div>
        <span className="font-semibold text-lg">Welcome to ReWork Beta! Check your email for access.</span>
      </motion.div>
    )
  }

  // Form state
  return (
    <div className={`w-full max-w-lg ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                className={`pl-12 h-14 text-lg rounded-xl border-2 transition-all duration-300 ${
                  variant === "white"
                    ? "bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border-white/30 focus:border-white/60"
                    : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-[#2CC7D0] dark:focus:border-[#2CC7D0]"
                }`}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !email}
            size="lg"
            className={`h-14 px-8 rounded-xl transition-all duration-300 group ${
              variant === "white"
                ? "bg-white text-[#3A7BF7] hover:bg-white/90 disabled:bg-white/50 shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] hover:from-[#28B5BD] hover:to-[#3470E0] disabled:opacity-50 shadow-lg hover:shadow-xl"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="font-semibold">Joining...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Join Beta</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm font-medium ${
              variant === "white" 
                ? "text-red-200" 
                : "text-red-600 dark:text-red-400"
            }`}>
            {error}
          </motion.p>
        )}
        
        <p className={`text-sm text-center ${
          variant === "white" 
            ? "text-white/70" 
            : "text-gray-500 dark:text-gray-400"
        }`}>
          🚀 Ready to optimize your resume? Beta access available now.
        </p>
      </form>
    </div>
  )
}