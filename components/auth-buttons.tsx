"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"

export function AuthButtons() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setShowLoginModal(true)
        }}
        className="hidden text-sm font-medium hover:text-[#2CC7D0] transition-colors md:inline-block"
      >
        Login
      </Link>
      <Button
        className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] hover:from-[#28B5BD] hover:to-[#3470E0]"
        onClick={() => setShowSignupModal(true)}
      >
        Sign Up
      </Button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onOpenSignup={() => setShowSignupModal(true)}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onOpenLogin={() => setShowLoginModal(true)}
      />
    </>
  )
}
