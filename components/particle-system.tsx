"use client"

import { useEffect, useRef } from "react"

const toAlphaHex = (opacity: number) => {
  // Clamp to the [0, 1] range to avoid negative values (e.g. “-1a”)
  const clamped = Math.max(0, Math.min(1, opacity))
  return Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0")
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#00ffff" : "#4a90e2",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid lines
      const time = Date.now() * 0.001
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + Math.sin(time) * 0.05})`
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 2
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        const offset = Math.cos(time + y * 0.01) * 2
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }

      // Update and draw particles with enhanced effects
      particles.forEach((particle, index) => {
        // Add wave motion to particles
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.1
        particle.y += particle.vy + Math.cos(time + index * 0.1) * 0.1

        // Pulse opacity
        particle.opacity = 0.2 + Math.sin(time * 2 + index) * 0.3
        particle.opacity = Math.max(0, Math.min(1, particle.opacity)) // clamp

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `${particle.color}${toAlphaHex(particle.opacity)}`)
        gradient.addColorStop(1, `${particle.color}00`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${toAlphaHex(particle.opacity)}`
        ctx.fill()

        // Draw enhanced connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              const rawOpacity = 0.15 * (1 - distance / 120) * Math.sin(time + index * 0.1)
              const lineOpacity = Math.max(0, Math.min(1, Math.abs(rawOpacity)))
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity})`
              ctx.lineWidth = 0.5 + Math.sin(time * 3 + index) * 0.3
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-5" style={{ mixBlendMode: "screen" }} />
  )
}
