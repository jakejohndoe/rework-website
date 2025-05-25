// lib/recaptcha.ts
export async function getReCaptchaToken(action: string): Promise<string | null> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.grecaptcha) {
        console.warn('reCAPTCHA not loaded')
        resolve(null)
        return
      }
  
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action })
          .then((token: string) => {
            resolve(token)
          })
          .catch((error: any) => {
            console.error('reCAPTCHA error:', error)
            resolve(null)
          })
      })
    })
  }
  
  export async function verifyReCaptchaToken(
    token: string
  ): Promise<{ success: boolean; score: number; error?: string }> {
    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      })
  
      const data = await response.json()
      
      if (!data.success) {
        return { 
          success: false, 
          score: 0, 
          error: `reCAPTCHA verification failed: ${data['error-codes']?.join(', ') || 'Unknown error'}` 
        }
      }
  
      return {
        success: true,
        score: data.score || 0,
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error)
      return { 
        success: false, 
        score: 0, 
        error: 'Failed to verify reCAPTCHA token' 
      }
    }
  }
  
  // Add type declaration for grecaptcha
  declare global {
    interface Window {
      grecaptcha: {
        ready: (callback: () => void) => void
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
    }
  }