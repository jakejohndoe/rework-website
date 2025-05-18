"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenSignup: () => void
}

export function LoginModal({ isOpen, onClose, onOpenSignup }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt with:", { email, password })
      setIsLoading(false)
      // In a real app, you would handle authentication here
      onClose()
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)

    // Simulate Google login
    setTimeout(() => {
      console.log("Google login attempt")
      setIsLoading(false)
      // In a real app, you would redirect to Google OAuth
      onClose()
    }, 1000)
  }

  const switchToSignup = () => {
    onClose()
    onOpenSignup()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Log in to ReWork</DialogTitle>
          <DialogDescription className="text-center">Enter your details to access your account</DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
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
          Continue with Google
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="px-0 text-xs" type="button">
                  Forgot password?
                </Button>
              </div>
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
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7]">
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Button variant="link" className="p-0" onClick={switchToSignup}>
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
