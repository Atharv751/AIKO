"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date (30 days from now)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <motion.div
            key={unit.value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-cyan-500/30 backdrop-blur-sm min-w-[80px]"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
            }}
          >
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{unit.label}</div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
