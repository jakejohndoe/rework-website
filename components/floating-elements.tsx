"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function FloatingElements() {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate particles only on client side
    const newParticles = Array(6).fill(0).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    
    setParticles(newParticles);
  }, []);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-[#2CC7D0] to-[#3A7BF7] rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}