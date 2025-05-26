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
      className="relative group w-full h-full flex items-center justify-center"
    >
      {/* Subtle glow effect - matching original */}
      <div className="absolute -inset-10 md:-inset-20 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full blur-3xl opacity-10 group-hover:opacity-15 transition-opacity duration-1000" />
      
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
          <div className="h-[400px] w-[400px] md:h-[550px] md:w-[550px] lg:h-[650px] lg:w-[650px] xl:h-[720px] xl:w-[720px] flex items-center justify-center">
            <Image
              src="/rework-logo-detailed.png"
              alt="ReWork AI Resume Optimization"
              width={610}
              height={610}
              className="object-contain drop-shadow-2xl group-hover:scale-105 transition-all duration-1000 w-[380px] h-[380px] md:w-[520px] md:h-[520px] lg:w-[610px] lg:h-[610px] xl:w-[680px] xl:h-[680px] animate-gentle-float"
              priority
            />
          </div>
        </div>
        
        {/* Tagline - matching original */}
        <div className="text-center -mt-20 md:-mt-28 lg:-mt-32 xl:-mt-36">
          <p className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] bg-clip-text text-transparent tracking-tight">
            smart tech, for smarter jobs.
          </p>
        </div>
      </div>
    </div>
  )
}