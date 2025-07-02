"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, OrbitControls, Box } from "@react-three/drei"
import * as THREE from "three"

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
          <Box
            position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
            scale={0.1 + Math.random() * 0.2}
          >
            <meshStandardMaterial color={new THREE.Color().setHSL(Math.random(), 0.7, 0.5)} transparent opacity={0.6} />
          </Box>
        </Float>
      ))}
    </group>
  )
}

function SkillsOrb() {
  const orbRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.2
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={orbRef} position={[3, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.4} wireframe />
      </mesh>
    </Float>
  )
}

export default function About3D() {
  return (
    <section id="about" className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-20 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas>
          <Environment preset="city" />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />

          <FloatingCubes />
          <SkillsOrb />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            ABOUT
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <h3 className="text-2xl md:text-3xl font-light mb-6 text-blue-400">
                  Hello, I'm a Web & App Developer.
                </h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  I'm a passionate and self-driven developer focused on creating clean, functional, and user-friendly
                  websites and mobile applications. Alongside development, I also explore UI/UX design to craft
                  intuitive experiences that feel good to use.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  While I may not have formal industry experience yet, I've been actively building projects, learning
                  modern tools, and pushing myself to improve every day.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:transform hover:scale-105">
                <h4 className="text-xl font-medium mb-6 text-pink-400">Core Skills</h4>
                <div className="space-y-4">
                  {[
                    { skill: "Web Development", level: 90 },
                    { skill: "App Development", level: 85 },
                    { skill: "UI/UX Design", level: 80 },
                    { skill: "3D Development", level: 75 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">{item.skill}</span>
                        <span className="text-gray-400">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/20 transition-all duration-300 hover:transform hover:scale-105">
                <h4 className="text-xl font-medium mb-4 text-green-400">Education</h4>
                <div className="border-l-2 border-green-400 pl-4">
                  <h5 className="font-medium text-white">Bachelor of Business Administration</h5>
                  <p className="text-gray-400">Computer Applications</p>
                  <p className="text-gray-500 text-sm">Savitribai Phule Pune University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
