// components/RecaptchaDebug.tsx - Add this temporarily to test
'use client'

import { useState, useEffect } from 'react'
import { getReCaptchaToken } from '@/lib/recaptcha'

export default function RecaptchaDebug() {
  const [status, setStatus] = useState<string>('Checking...')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if reCAPTCHA is loaded
    const checkRecaptcha = () => {
      if (typeof window !== 'undefined') {
        if (window.grecaptcha) {
          setStatus('✅ reCAPTCHA loaded successfully')
        } else {
          setStatus('❌ reCAPTCHA not loaded')
        }
      }
    }

    // Check immediately and then every second for 10 seconds
    checkRecaptcha()
    const interval = setInterval(checkRecaptcha, 1000)
    setTimeout(() => clearInterval(interval), 10000)

    return () => clearInterval(interval)
  }, [])

  const testToken = async () => {
    try {
      setStatus('🧪 Getting reCAPTCHA token...')
      const token = await getReCaptchaToken('test')
      
      if (token) {
        setStatus(`✅ Token received: ${token.substring(0, 20)}...`)
        
        // Test API call
        const response = await fetch('/api/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: `test-${Date.now()}@example.com`,
            source: 'debug_test',
            recaptchaToken: token
          })
        })
        
        const data = await response.json()
        setStatus(`🎯 API Response: ${response.status} - ${data.message || data.error}`)
      } else {
        setStatus('❌ Failed to get token')
      }
    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-3 py-1 bg-purple-600 text-white text-xs rounded"
      >
        reCAPTCHA Debug
      </button>
      
      {isVisible && (
        <div className="mt-2 p-3 bg-black/90 text-white text-xs rounded max-w-sm">
          <div className="mb-2">{status}</div>
          
          <button
            onClick={testToken}
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded mr-2"
          >
            Test Token
          </button>
          
          <button
            onClick={() => setIsVisible(false)}
            className="px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Close
          </button>
          
          <div className="mt-2 text-gray-400">
            Site Key: {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.substring(0, 10)}...
          </div>
        </div>
      )}
    </div>
  )
}

// Add this to your page.tsx temporarily:
// import RecaptchaDebug from '@/components/RecaptchaDebug'
// Then add <RecaptchaDebug /> anywhere in your JSX