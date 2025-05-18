import Image from "next/image"
import Link from "next/link"
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
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthButtons } from "@/components/auth-buttons"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#0F172A] text-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <FileText className="h-6 w-6 text-[#2CC7D0]" />
              <span className="text-xl font-bold">ReWork</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-[#2CC7D0] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-[#2CC7D0] transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-[#2CC7D0] transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-[#2CC7D0] transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-[#2CC7D0] transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AuthButtons />
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
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
        <section id="top" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-[#0F172A] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    Tailor Your Resume in Seconds
                  </h1>
                  <p className="max-w-[600px] text-[#334155] dark:text-gray-300 md:text-xl">
                    AI-powered resume optimization for job-specific applications. Get more interviews with a resume that
                    stands out.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] hover:from-[#28B5BD] hover:to-[#3470E0]">
                    Try for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#334155] text-[#334155] dark:border-gray-400 dark:text-gray-300"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-[#22C55E]" />
                    <span className="dark:text-gray-300">ATS-Optimized</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-[#22C55E]" />
                    <span className="dark:text-gray-300">Job-Specific</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-[#22C55E]" />
                    <span className="dark:text-gray-300">AI-Powered</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="ReWork App Mockup"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full bg-white dark:bg-gray-900 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-[#0F172A] dark:text-white sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[700px] text-[#334155] dark:text-gray-300 md:text-xl">
                  Three simple steps to create a tailored resume that gets you noticed
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2CC7D0]/10 dark:bg-[#2CC7D0]/20">
                  <Upload className="h-8 w-8 text-[#2CC7D0]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Upload Resume</h3>
                <p className="text-[#334155] dark:text-gray-300">
                  Upload your existing resume in any format. Our system will analyze and extract your information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3A7BF7]/10 dark:bg-[#3A7BF7]/20">
                  <FileText className="h-8 w-8 text-[#3A7BF7]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Add Job Description</h3>
                <p className="text-[#334155] dark:text-gray-300">
                  Paste the job description you're applying for. Our AI will identify key skills and requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20">
                  <Download className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Download Tailored PDF</h3>
                <p className="text-[#334155] dark:text-gray-300">
                  Get your optimized resume instantly, tailored specifically for the job you want.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="w-full bg-[#F1F5F9] dark:bg-gray-800 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-[#0F172A] dark:text-white sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[700px] text-[#334155] dark:text-gray-300 md:text-xl">
                  Powerful tools to help you land your dream job
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2CC7D0]/10 dark:bg-[#2CC7D0]/20">
                    <Sparkles className="h-5 w-5 text-[#2CC7D0]" />
                  </div>
                  <CardTitle className="text-[#0F172A] dark:text-white">AI Keyword Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] dark:text-gray-200">
                    Our AI identifies and incorporates key terms from job descriptions to help you pass ATS screening.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3A7BF7]/10 dark:bg-[#3A7BF7]/20">
                    <Layers className="h-5 w-5 text-[#3A7BF7]" />
                  </div>
                  <CardTitle className="text-[#0F172A] dark:text-white">Multiple Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] dark:text-gray-200">
                    Choose from dozens of professionally designed templates to match your industry and style.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20">
                    <MessageSquare className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                  <CardTitle className="text-[#0F172A] dark:text-white">Content Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] dark:text-gray-200">
                    Get smart recommendations to improve your resume's impact and readability.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3A7BF7]/10 dark:bg-[#3A7BF7]/20">
                    <Cloud className="h-5 w-5 text-[#3A7BF7]" />
                  </div>
                  <CardTitle className="text-[#0F172A] dark:text-white">Cloud Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] dark:text-gray-200">
                    Securely store all your resume versions and access them from any device.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2CC7D0]/10 dark:bg-[#2CC7D0]/20">
                    <Code className="h-5 w-5 text-[#2CC7D0]" />
                  </div>
                  <CardTitle className="text-[#0F172A] dark:text-white">ATS Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] dark:text-gray-200">
                    Test your resume against simulated ATS systems to ensure it passes automated screenings.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D946EF]/10 dark:bg-[#D946EF]/20">
                    <CreditCard className="h-5 w-5 text-[#D946EF]" />
                  </div>
                  <CardTitle className="text-[#0F172A] dark:text-white">Premium Cover Letters</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#334155] dark:text-gray-200">
                    <span className="font-semibold text-[#D946EF]">Premium Feature:</span> Generate matching cover
                    letters tailored to each job application.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full bg-[#F1F5F9] dark:bg-gray-800 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg bg-white dark:bg-gray-700 p-6 text-center shadow-md">
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white">75%</h3>
                <p className="text-[#334155] dark:text-gray-200">of resumes are rejected by ATS before human review</p>
                <p className="text-xs text-[#334155]/70 dark:text-gray-400">Source: JobScan Research, 2023</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg bg-white dark:bg-gray-700 p-6 text-center shadow-md">
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white">52%</h3>
                <p className="text-[#334155] dark:text-gray-200">increase in interview rates with tailored resumes</p>
                <p className="text-xs text-[#334155]/70 dark:text-gray-400">Source: ReWork Internal Study, 2023</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg bg-white dark:bg-gray-700 p-6 text-center shadow-md">
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white">3x</h3>
                <p className="text-[#334155] dark:text-gray-200">faster resume creation compared to manual editing</p>
                <p className="text-xs text-[#334155]/70 dark:text-gray-400">Source: User Feedback Analysis, 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="w-full bg-white dark:bg-gray-900 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-[#0F172A] dark:text-white sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[700px] text-[#334155] dark:text-gray-300 md:text-xl">
                  Choose the plan that works for your job search needs
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col rounded-lg border border-[#F1F5F9] dark:border-gray-700 p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white">Free</h3>
                    <p className="text-[#334155] dark:text-gray-300">Get started with basic features</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2CC7D0]/10 dark:bg-[#2CC7D0]/20">
                    <FileText className="h-5 w-5 text-[#2CC7D0]" />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#0F172A] dark:text-white">$0</span>
                  <span className="text-[#334155] dark:text-gray-300">/month</span>
                </div>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">1 tailoring per day</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">ATS keyword optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">PDF downloads</span>
                  </li>
                </ul>
                <Button className="mt-auto w-full bg-[#2CC7D0] hover:bg-[#28B5BD]">Get Started</Button>
              </div>
              <div className="relative flex flex-col rounded-lg border-0 bg-gradient-to-br from-[#3A7BF7]/5 to-[#8B5CF6]/5 dark:from-[#3A7BF7]/10 dark:to-[#8B5CF6]/10 p-6 shadow-md dark:bg-gray-800">
                <div className="absolute -top-4 right-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-3 py-1 text-xs font-medium text-white">
                  RECOMMENDED
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white">Premium</h3>
                    <p className="text-[#334155] dark:text-gray-300">Everything you need for your job search</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20">
                    <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#0F172A] dark:text-white">$12</span>
                  <span className="text-[#334155] dark:text-gray-300">/month</span>
                </div>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">Unlimited tailorings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">Premium templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">Advanced ATS optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">AI content suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">Cover letter generation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#22C55E]" />
                    <span className="text-[#334155] dark:text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Button className="mt-auto w-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C51DD] hover:to-[#C33FD6]">
                  Upgrade to Premium
                </Button>
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-5xl rounded-lg border border-[#F1F5F9] dark:border-gray-700 shadow-md dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#F1F5F9] dark:border-gray-700">
                      <th className="p-4 text-left text-[#0F172A] dark:text-white">Feature Comparison</th>
                      <th className="p-4 text-center text-[#0F172A] dark:text-white">Free</th>
                      <th className="p-4 text-center text-[#0F172A] dark:text-white">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#F1F5F9] dark:border-gray-700">
                      <td className="p-4 text-[#334155] dark:text-gray-300">Resume Tailorings</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">1 per day</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#F1F5F9] dark:border-gray-700">
                      <td className="p-4 text-[#334155] dark:text-gray-300">Templates</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">5 Basic</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">25+ Premium</td>
                    </tr>
                    <tr className="border-b border-[#F1F5F9] dark:border-gray-700">
                      <td className="p-4 text-[#334155] dark:text-gray-300">ATS Optimization</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">Basic</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">Advanced</td>
                    </tr>
                    <tr className="border-b border-[#F1F5F9] dark:border-gray-700">
                      <td className="p-4 text-[#334155] dark:text-gray-300">Cover Letters</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">❌</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">✅</td>
                    </tr>
                    <tr className="border-b border-[#F1F5F9] dark:border-gray-700">
                      <td className="p-4 text-[#334155] dark:text-gray-300">Cloud Storage</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">3 Resumes</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-[#334155] dark:text-gray-300">Priority Support</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">❌</td>
                      <td className="p-4 text-center text-[#334155] dark:text-gray-300">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full bg-[#F1F5F9] dark:bg-gray-800 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-[#0F172A] dark:text-white sm:text-4xl md:text-5xl">
                  Success Stories
                </h2>
                <p className="max-w-[700px] text-[#334155] dark:text-gray-300 md:text-xl">
                  See how ReWork has helped job seekers land their dream roles
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=100&width=100" alt="Sarah J." fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] dark:text-white">Sarah J.</h4>
                      <p className="text-sm text-[#334155] dark:text-gray-300">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-[#334155] dark:text-gray-200">
                    "After 3 months of job searching with no callbacks, I used ReWork to tailor my resume. Within 2
                    weeks, I had 5 interviews and landed my dream job at a tech startup."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Marcus T."
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] dark:text-white">Marcus T.</h4>
                      <p className="text-sm text-[#334155] dark:text-gray-300">Marketing Manager</p>
                    </div>
                  </div>
                  <p className="text-[#334155] dark:text-gray-200">
                    "The ATS optimization feature is a game-changer. My resume was finally getting through to hiring
                    managers instead of being filtered out by automated systems."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md dark:bg-gray-700 dark:border-gray-600">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=100&width=100" alt="Priya K." fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] dark:text-white">Priya K.</h4>
                      <p className="text-sm text-[#334155] dark:text-gray-300">Data Analyst</p>
                    </div>
                  </div>
                  <p className="text-[#334155] dark:text-gray-200">
                    "As a career changer, I struggled to highlight transferable skills. ReWork helped me reframe my
                    experience to match data analyst roles, and I got hired within a month!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full bg-white dark:bg-gray-900 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-[#0F172A] dark:text-white sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[700px] text-[#334155] dark:text-gray-300 md:text-xl">
                  Everything you need to know about ReWork
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="dark:border-gray-700">
                  <AccordionTrigger className="text-left text-[#0F172A] dark:text-white">
                    How does ReWork's AI tailoring work?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#334155] dark:text-gray-300">
                    Our AI analyzes both your resume and the job description to identify key skills, requirements, and
                    terminology. It then restructures your resume to highlight relevant experience and incorporate
                    important keywords, increasing your chances of passing ATS screening and impressing hiring managers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="dark:border-gray-700">
                  <AccordionTrigger className="text-left text-[#0F172A] dark:text-white">
                    Is my data secure with ReWork?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#334155] dark:text-gray-300">
                    Absolutely. We take data security seriously. Your resume data and job descriptions are encrypted and
                    stored securely. We never share your personal information with third parties, and you can delete
                    your data at any time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="dark:border-gray-700">
                  <AccordionTrigger className="text-left text-[#0F172A] dark:text-white">
                    Can I use ReWork for any industry or job type?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#334155] dark:text-gray-300">
                    Yes! ReWork is designed to work across all industries and job types. Our AI has been trained on
                    millions of resumes and job descriptions from various sectors, from tech and healthcare to finance,
                    education, and more.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="dark:border-gray-700">
                  <AccordionTrigger className="text-left text-[#0F172A] dark:text-white">
                    How many resumes can I create with the free plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#334155] dark:text-gray-300">
                    With the free plan, you can create one tailored resume per day and store up to three different
                    versions in your account. For unlimited tailorings and storage, you can upgrade to our Premium plan.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="dark:border-gray-700">
                  <AccordionTrigger className="text-left text-[#0F172A] dark:text-white">
                    Can I cancel my Premium subscription at any time?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#334155] dark:text-gray-300">
                    Yes, you can cancel your Premium subscription at any time. Your benefits will continue until the end
                    of your billing period, and you won't be charged again. There are no cancellation fees or long-term
                    commitments.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="max-w-[700px] md:text-xl">
                  Join thousands of job seekers who have boosted their career with ReWork
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-[#3A7BF7] hover:bg-white/90">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="bg-white/20 border border-white text-white hover:bg-white/30 backdrop-blur-sm transition-all">
                  <Link href="#pricing" className="w-full h-full flex items-center justify-center">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0F172A] py-12 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <FileText className="h-6 w-6 text-[#2CC7D0]" />
                <span className="text-xl font-bold">ReWork</span>
              </Link>
              <p className="text-sm text-gray-400">Smart tech for smarter jobs</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Career Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resume Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2023 ReWork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
