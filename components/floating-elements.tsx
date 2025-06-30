"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large Floating Orbs */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`large-orb-${i}`}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Data Stream Lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
          style={{
            left: `${5 + i * 8}%`,
            height: "100vh",
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Code Fragments */}
      {Array.from({ length: 8 }, (_, i) => {
        const codeFragments = ["AI", "ML", "01", ">>", "{}", "[]", "//", "&&"]
        return (
          <motion.div
            key={`code-${i}`}
            className="absolute text-cyan-400/30 font-mono text-sm"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.6, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "linear",
            }}
          >
            {codeFragments[i]}
          </motion.div>
        )
      })}

      {/* Pulsing Rings */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border border-cyan-400/20 rounded-full"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 1,
          }}
        />
      ))}
    </div>
  )
}
