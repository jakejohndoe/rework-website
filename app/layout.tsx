// app/layout.tsx - Clean SEO without warnings + reCAPTCHA
import "@/app/globals.css"
import { Inter } from "next/font/google"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { Metadata, Viewport } from "next"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

// Separate viewport export (Next.js 15 requirement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2CC7D0' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' }
  ],
  colorScheme: 'dark'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://rework.solutions'), 
  title: {
    default: "ReWork - Smart Tech, For Smarter Jobs",
    template: "%s | ReWork"
  },
  description: "Tailor your resume in seconds with AI-powered optimization. Beat ATS systems, get more interviews, and land your dream job with ReWork's intelligent resume builder.",
  keywords: [
    "AI resume builder",
    "resume optimization", 
    "ATS resume",
    "job application automation",
    "resume tailoring",
    "AI career tools",
    "resume scanner",
    "job search automation",
    "LinkedIn optimization",
    "Indeed resume",
    "CareerBuilder",
    "resume keywords",
    "applicant tracking system",
    "job interview preparation",
    "professional resume",
    "resume templates",
    "career development",
    "job hunting tools",
    "resume analyzer",
    "employment automation"
  ],
  authors: [{ name: "ReWork Team" }],
  creator: "ReWork",
  publisher: "ReWork",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rework.solutions", 
    siteName: "ReWork",
    title: "ReWork - Smart Tech, For Smarter Jobs",
    description: "Tailor your resume in seconds with AI-powered optimization. Beat ATS systems and get more interviews.",
    images: [
      {
        url: "/og-image.png", // We'll create this later if you want
        width: 1200,
        height: 630,
        alt: "ReWork AI Resume Optimization Platform",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@rework.solutions", 
    creator: "@rework.solutions",
    title: "ReWork - Smart Tech, For Smarter Jobs",
    description: "Tailor your resume in seconds with AI-powered optimization. Beat ATS systems and get more interviews.",
    images: ["/og-image.png"] // Same as OpenGraph
  },
  // Simple icons - just the favicon
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Simple performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <GoogleAnalytics />
        
        {/* reCAPTCHA v3 Script - loaded after page is interactive */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
        
        {children}
      </body>
    </html>
  )
}