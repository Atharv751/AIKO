"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import RetailEnvironment from "@/components/retail-environment"
import AnimatedKiosk from "@/components/animated-kiosk"
import ParticleSystem from "@/components/particle-system"
import EmailSignup from "@/components/email-signup"
import SocialLinks from "@/components/social-links"
import FloatingElements from "@/components/floating-elements"

export default function ComingSoonPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showKiosk, setShowKiosk] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true)
      // Show kiosk after additional delay
      setTimeout(() => setShowKiosk(true), 2000)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Logo Placeholder */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-6 left-6 z-20"
      >
        <div className="flex items-center space-x-3 p-3 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-cyan-500/20">
          {/* Logo Image */}
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img src="logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>

          {/* Text Next to Logo */}
          <div>
            <div className="text-blue-400 font-bold text-lg">AIKO</div>
            <div className="text-xs text-gray-400">Retail AI Agent</div>
          </div>
        </div>
      </motion.div>

      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <RetailEnvironment />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Particle System Overlay */}
      <ParticleSystem />

      {/* Floating Ambient Elements */}
      <FloatingElements />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        {/* Brand Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            AIKO
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            The future of intelligent retail experiences
          </p>
        </motion.div>

        {/* Animated Kiosk */}
        <AnimatePresence>{showKiosk && <AnimatedKiosk />}</AnimatePresence>

        {/* Email Signup */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-8"
        >
          <EmailSignup />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  )
}
