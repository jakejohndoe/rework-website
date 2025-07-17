/** @type {import('next').NextConfig} */
const nextConfig = {
  // Re-enabled proper error checking for production safety
  eslint: {
    // Only ignore during builds in development if needed
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Always check TypeScript errors to prevent broken deployments
    ignoreBuildErrors: false,
  },
  images: {
    // Re-enable image optimization for better performance
    // unoptimized: true, // Removed - using Next.js optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rework.solutions',
        pathname: '/**',
      },
    ],
  },
  // Add performance optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
}

export default nextConfig
