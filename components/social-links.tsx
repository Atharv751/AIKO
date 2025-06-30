"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin, Instagram } from "lucide-react"

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export default function SocialLinks() {
  return (
    <div className="flex space-x-6">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          className="group relative p-3 rounded-full bg-gray-800/30 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />

          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {social.label}
          </div>
        </motion.a>
      ))}
    </div>
  )
}
