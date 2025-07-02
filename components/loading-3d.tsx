"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef, useEffect } from "react"
import type * as THREE from "three"

/* no listeners here, but we add a safety check for resize in case you add one later */
function useSafeWindowListener(
  type: keyof WindowEventMap,
  handler: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    if (typeof window === "undefined") return
    window.addEventListener(type, handler, options)
    return () => window.removeEventListener(type, handler, options)
  }, [type, handler, options])
}

function LoadingCube() {
  const cubeRef = useRef<THREE.Mesh>(null)

  useSafeWindowListener("resize", () => {
    /* future-proof: react to resize safely */
  })

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.7
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff1493" transparent opacity={0.8} wireframe />
      </mesh>
    </Float>
  )
}

export default function Loading3D() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-32 h-32">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <LoadingCube />
        </Canvas>
      </div>
    </div>
  )
}
