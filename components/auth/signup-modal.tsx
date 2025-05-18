"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLogin: () => void
}

export function SignupModal({ isOpen, onClose, onOpenLogin }: SignupModalProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Signup attempt with:", { fullName, email, password })
      setIsLoading(false)
      // In a real app, you would handle user creation here
      onClose()
    }, 1000)
  }

  const handleGoogleSignup = () => {
    setIsLoading(true)

    // Simulate Google signup
    setTimeout(() => {
      console.log("Google signup attempt")
      setIsLoading(false)
      // In a real app, you would redirect to Google OAuth
      onClose()
    }, 1000)
  }

  const switchToLogin = () => {
    onClose()
    onOpenLogin()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create an account</DialogTitle>
          <DialogDescription className="text-center">Enter your details to get started with ReWork</DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-5 mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M19.76 10.23c0-.67-.06-1.34-.17-1.98H10.1v3.75h5.47a4.68 4.68 0 01-2.02 3.06v2.54h3.27c1.92-1.77 3.02-4.37 3.02-7.37z"
              fill="#4285F4"
            />
            <path
              d="M10.1 20c2.73 0 5.03-.9 6.7-2.4l-3.27-2.54c-.9.6-2.06.96-3.43.96-2.64 0-4.88-1.78-5.68-4.17H1.06v2.63A10.1 10.1 0 0010.1 20z"
              fill="#34A853"
            />
            <path
              d="M4.42 11.85c-.2-.6-.32-1.24-.32-1.9 0-.66.12-1.3.32-1.9V5.42H1.06A10.1 10.1 0 000 9.95c0 1.61.39 3.14 1.06 4.53l3.36-2.63z"
              fill="#FBBC05"
            />
            <path
              d="M10.1 3.88c1.49 0 2.82.51 3.87 1.5l2.9-2.9C15.14.94 12.84 0 10.1 0 6.16 0 2.82 2.3 1.06 5.42l3.36 2.63c.8-2.4 3.04-4.17 5.68-4.17z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </Button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Button variant="link" className="p-0 h-auto text-sm" type="button">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto text-sm" type="button">
                  Privacy Policy
                </Button>
              </label>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !acceptTerms}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button variant="link" className="p-0" onClick={switchToLogin}>
            Log in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
