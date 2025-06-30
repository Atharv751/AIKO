"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Plane, Cylinder } from "@react-three/drei"
import type * as THREE from "three"

export default function RetailEnvironment() {
  const groupRef = useRef<THREE.Group>(null)
  const lightsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, index) => {
        const offset = index * 2
        light.position.y = 2 + Math.sin(state.clock.elapsedTime + offset) * 0.2
      })
    }

    // Animate floating orbs
    const orbs = groupRef.current?.children.find((child) => child.children.length === 12)
    if (orbs) {
      orbs.children.forEach((orb: any, index) => {
        const time = state.clock.elapsedTime
        const offset = index * 0.5
        orb.position.y = 3 + (index % 4) + Math.sin(time + offset) * 0.5
        orb.rotation.y = time * 0.5 + offset
        orb.children[1].material.emissiveIntensity = 0.8 + Math.sin(time * 2 + offset) * 0.3
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} envMapIntensity={0.5} />
      </Plane>

      {/* Store Fronts */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 15
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <group key={i} position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
            {/* Store Structure */}
            <Box args={[6, 4, 1]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
            </Box>

            {/* Store Window */}
            <Box args={[4, 2.5, 0.1]} position={[0, 0, 0.5]}>
              <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} transparent opacity={0.3} />
            </Box>

            {/* Neon Sign */}
            <Box args={[3, 0.5, 0.2]} position={[0, 2.5, 0.6]}>
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </Box>
          </group>
        )
      })}

      {/* Central Pillars */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Cylinder key={i} args={[0.3, 0.3, 6]} position={[x, 1, z]}>
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
          </Cylinder>
        )
      })}

      {/* Floating Lights */}
      <group ref={lightsRef}>
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const radius = 12
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          return (
            <group key={i} position={[x, 2, z]}>
              <pointLight color="#00ffff" intensity={0.5} distance={10} decay={2} />
              <Cylinder args={[0.1, 0.1, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
              </Cylinder>
            </group>
          )
        })}
      </group>

      {/* Floating Data Orbs */}
      <group>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 5 + (i % 3) * 3
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const height = 3 + (i % 4)

          return (
            <group key={`orb-${i}`} position={[x, height, z]}>
              <pointLight color="#4a90e2" intensity={0.3} distance={5} decay={2} />
              <mesh>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial
                  color="#4a90e2"
                  emissive="#4a90e2"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* Ambient Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} color="#4a90e2" />
    </group>
  )
}
