"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, OrbitControls, Sphere, Text } from "@react-three/drei"
import type * as THREE from "three"

function SkillSphere({
  position,
  color,
  label,
  level,
}: { position: [number, number, number]; color: string; label: string; level: number }) {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const scale = 0.3 + (level / 100) * 0.7

  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Sphere ref={sphereRef} args={[scale, 32, 32]}>
          <meshStandardMaterial color={color} transparent opacity={0.8} emissive={color} emissiveIntensity={0.2} />
        </Sphere>
        <Text
          position={[0, scale + 0.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="bottom"
          font="/fonts/Inter_Regular.json"
        >
          {label}
        </Text>
        <Text
          position={[0, scale + 0.3, 0]}
          fontSize={0.15}
          color="#888"
          anchorX="center"
          anchorY="bottom"
          font="/fonts/Inter_Regular.json"
        >
          {level}%
        </Text>
      </group>
    </Float>
  )
}

function SkillsConstellation() {
  const skills = [
    { label: "React", level: 95, color: "#61dafb", position: [2, 1, 0] as [number, number, number] },
    { label: "Next.js", level: 90, color: "#000000", position: [-2, 1, 1] as [number, number, number] },
    { label: "TypeScript", level: 88, color: "#3178c6", position: [0, 2, -1] as [number, number, number] },
    { label: "Three.js", level: 85, color: "#049ef4", position: [1, -1, 2] as [number, number, number] },
    { label: "Node.js", level: 82, color: "#339933", position: [-1, -1, -1] as [number, number, number] },
    { label: "Python", level: 80, color: "#3776ab", position: [3, 0, -2] as [number, number, number] },
    { label: "UI/UX", level: 85, color: "#ff6b6b", position: [-3, 0, 1] as [number, number, number] },
    { label: "WebGL", level: 75, color: "#990000", position: [0, -2, 0] as [number, number, number] },
  ]

  return (
    <group>
      {skills.map((skill, index) => (
        <SkillSphere
          key={index}
          position={skill.position}
          color={skill.color}
          label={skill.label}
          level={skill.level}
        />
      ))}
    </group>
  )
}

function ConnectingLines() {
  const linesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={linesRef}>
      {/* Add connecting lines between skills */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([2, 1, 0, -2, 1, 1])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </line>
    </group>
  )
}

export default function Skills3D() {
  return (
    <section id="skills" className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white py-20 relative">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff6b6b" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#61dafb" />

          <SkillsConstellation />
          <ConnectingLines />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent text-center">
          SKILLS
        </h2>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-xl text-gray-300 leading-relaxed">
            Explore my technical skills in an interactive 3D space. Each sphere represents a different technology, with
            size indicating proficiency level.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Frontend Development",
              description: "Modern web applications with React, Next.js, and cutting-edge technologies",
              icon: "🚀",
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "3D Web Development",
              description: "Immersive 3D experiences using Three.js, WebGL, and React Three Fiber",
              icon: "🎮",
              color: "from-purple-500 to-pink-500",
            },
            {
              title: "UI/UX Design",
              description: "User-centered design with focus on accessibility and modern aesthetics",
              icon: "🎨",
              color: "from-green-500 to-teal-500",
            },
            {
              title: "Backend Development",
              description: "Scalable server solutions with Node.js, Python, and cloud technologies",
              icon: "⚡",
              color: "from-orange-500 to-red-500",
            },
            {
              title: "Mobile Development",
              description: "Cross-platform mobile apps with React Native and modern frameworks",
              icon: "📱",
              color: "from-indigo-500 to-purple-500",
            },
            {
              title: "AR/VR Development",
              description: "Immersive experiences using WebXR, ARCore, and cutting-edge technologies",
              icon: "🥽",
              color: "from-pink-500 to-rose-500",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className={`text-4xl mb-4 p-3 rounded-xl bg-gradient-to-r ${service.color} w-fit`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
