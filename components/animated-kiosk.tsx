"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedKiosk() {
  const [currentText, setCurrentText] = useState("")
  const fullText = "Coming Soon..."

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ x: -100, opacity: 0, rotateY: -90 }}
      animate={{ x: 0, opacity: 1, rotateY: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.2,
      }}
      className="relative mb-12"
    >
      {/* Kiosk Base */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl backdrop-blur-sm"
        style={{
          boxShadow: "0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)",
        }}
      >
        {/* Screen */}
        <div className="bg-black rounded-lg p-6 mb-4 border border-cyan-400/50 relative overflow-hidden">
          {/* Screen Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 animate-pulse" />

          {/* Typing Text */}
          <div className="relative z-10 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                className="text-cyan-300"
              >
                |
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-gray-300 text-sm"
            >
              Revolutionary AI-powered retail experiences
            </motion.p>
          </div>

          {/* Enhanced Scan Lines and Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse" />
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-cyan-400/30"
                animate={{
                  y: [0, 200, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.6,
                  ease: "linear",
                }}
              />
            ))}

            {/* Digital Rain Effect */}
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={`rain-${i}`}
                className="absolute w-px h-4 bg-gradient-to-b from-cyan-400/60 to-transparent"
                style={{
                  left: `${i * 10}%`,
                }}
                animate={{
                  y: [-20, 220],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex justify-center space-x-4">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Holographic Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-sm -z-10 animate-pulse" />
      </motion.div>

      {/* Floating Elements */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 2) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Holographic Data Streams */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px h-8 bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
          style={{
            left: `${10 + i * 10}%`,
            top: `${5 + (i % 3) * 10}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orbiting Elements */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="w-1 h-1 bg-blue-400 rounded-full"
            style={{
              transform: `translateX(${40 + i * 15}px) translateY(-50%)`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
