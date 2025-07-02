"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, Environment, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function FloatingText() {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group ref={textRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[-4, 1, 0]}
          fontSize={1.5}
          color="white"
          anchorX="left"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          
          {"\n"}
  
        </Text>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Text
          position={[4, -1, 0]}
          fontSize={1.5}
          color="white"
          anchorX="right"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          DEVELOPER
          {"\n"}& DESIGNER
        </Text>
      </Float>
    </group>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2
      sphereRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={sphereRef} position={[0, 0, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff1493" transparent opacity={0.3} wireframe />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <section id="home" className="h-screen relative overflow-hidden">
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <ParticleField />
        <FloatingText />
        <AnimatedSphere />
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-light text-white/80 mb-4">Welcome to the future of</h1>
          <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            PORTFOLIO
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
