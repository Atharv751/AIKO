"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Check, AlertCircle } from "lucide-react"
import { sendNotificationEmail } from "@/lib/send-email"

export default function EmailSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError("")

    try {
      const result = await sendNotificationEmail(email)

      if (result.success) {
        setIsSubmitted(true)
        setEmail("")
        // Reset after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setError(result.error || "Failed to send email. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div className="w-full max-w-md mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Get notified when we launch</h3>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            disabled={isLoading || isSubmitted}
            required
          />
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || isSubmitted || !email}
          className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex items-center justify-center space-x-2"
            animate={isSubmitted ? { scale: [1, 1.1, 1] } : {}}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isSubmitted ? (
              <>
                <Check className="w-5 h-5" />
                <span>Check your email!</span>
              </>
            ) : (
              <span>Notify Me</span>
            )}
          </motion.div>
        </motion.button>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">{error}</span>
          </motion.div>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
          >
            <span className="text-green-400 text-sm">Welcome aboard! Check your email for confirmation.</span>
          </motion.div>
        )}

        {/* Floating Form Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`form-particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </form>

      <p className="text-xs text-gray-400 text-center mt-3">We'll never spam you. Unsubscribe at any time.</p>
    </motion.div>
  )
}
