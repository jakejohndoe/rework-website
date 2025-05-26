"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export function SpinningHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      // Convert mouse position to rotation values
      const rotateY = (mouseX / rect.width) * 30 // Max 30 degrees
      const rotateX = -(mouseY / rect.height) * 30 // Max 30 degrees (negative for natural feel)
      
      imageRef.current.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(50px)
      `
    }

    const handleMouseLeave = () => {
      if (!imageRef.current) return
      
      // Return to gentle floating animation
      imageRef.current.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        translateZ(0px)
      `
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative group cursor-none w-full h-full flex items-center justify-center"
    >
      {/* Enhanced 3D glow effect */}
      <div className="absolute -inset-20 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-all duration-1000 animate-pulse" />
      <div className="absolute -inset-32 bg-gradient-to-r from-[#3A7BF7] to-[#8B5CF6] rounded-full blur-3xl opacity-5 group-hover:opacity-15 transition-all duration-1500 animate-pulse delay-500" />
      
      {/* 3D Container */}
      <div className="relative flex flex-col items-center justify-center">
        <div 
          ref={imageRef}
          className="relative transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          }}
        >
          {/* Main image with enhanced 3D effects */}
          <div className="relative">
            {/* Shadow layer for depth */}
            <div 
              className="absolute inset-0 bg-black/20 rounded-full blur-xl transform translate-y-8 scale-95 opacity-60"
              style={{ transform: 'translateZ(-100px) scale(0.9)' }}
            />
            
            {/* Glow layers for depth */}
            <div className="absolute -inset-10 bg-gradient-to-r from-[#2CC7D0]/30 to-[#3A7BF7]/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -inset-5 bg-gradient-to-r from-[#3A7BF7]/20 to-[#8B5CF6]/20 rounded-full blur-xl animate-pulse delay-1000" />
            
            {/* Main image */}
            <div className="relative z-10">
              <Image
                src="/rework-logo-detailed.png"
                alt="ReWork AI Resume Optimization"
                width={610}
                height={610}
                className="object-contain drop-shadow-2xl w-[380px] h-[380px] md:w-[520px] md:h-[520px] lg:w-[610px] lg:h-[610px] xl:w-[680px] xl:h-[680px]"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(44, 199, 208, 0.3))',
                }}
                priority
              />
            </div>
            
            {/* Floating particles for extra effect */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#2CC7D0] rounded-full animate-bounce opacity-60" 
                 style={{ animationDelay: '0s', animationDuration: '3s' }} />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#3A7BF7] rounded-full animate-bounce opacity-40" 
                 style={{ animationDelay: '1s', animationDuration: '4s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[#8B5CF6] rounded-full animate-bounce opacity-50" 
                 style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
          </div>
        </div>
        
        {/* Enhanced tagline with 3D effect */}
        <div className="text-center -mt-20 md:-mt-28 lg:-mt-32 xl:-mt-36 relative z-20">
          <p className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#2CC7D0] via-[#3A7BF7] to-[#8B5CF6] bg-clip-text text-transparent tracking-tight transform transition-all duration-300 hover:scale-105"
             style={{
               textShadow: '0 0 20px rgba(44, 199, 208, 0.5)',
               filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
             }}>
            Smart tech, for smarter jobs.
          </p>
        </div>
      </div>
      
      {/* Subtle hover instruction */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-xs text-gray-400 animate-pulse">Move your mouse around</p>
      </div>
    </div>
  )
}