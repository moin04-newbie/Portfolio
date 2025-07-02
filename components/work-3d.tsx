"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, OrbitControls, Text3D } from "@react-three/drei"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import * as THREE from "three"

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "3D Portfolio Website",
    category: "Web Development",
    description:
      "An immersive 3D portfolio website built with React Three Fiber, featuring interactive animations and smooth transitions.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce platform with 3D product visualization and AR try-on features.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "Three.js", "Stripe", "WebXR"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project",
  },
  {
    id: 3,
    title: "Mobile AR App",
    category: "App Development",
    description: "Augmented reality mobile application for interior design visualization using React Native.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React Native", "ARCore", "ARKit", "Three.js"],
  },
  {
    id: 4,
    title: "Interactive Dashboard",
    category: "Web Development",
    description: "3D data visualization dashboard with real-time analytics and interactive charts.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "D3.js", "Three.js", "WebGL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project",
  },
]

function Floating3DTitle() {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={textRef}>
        <Text3D font="/fonts/Inter_Bold.json" size={1} height={0.2} position={[-2, 0, 0]}>
          WORK
          <meshStandardMaterial color="#ff1493" />
        </Text3D>
      </group>
    </Float>
  )
}

function ProjectCubes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((_, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos((index / projects.length) * Math.PI * 2) * 3,
              Math.sin(index) * 2,
              Math.sin((index / projects.length) * Math.PI * 2) * 3,
            ]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={new THREE.Color().setHSL(index / projects.length, 0.7, 0.5)}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Work3D() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    // skip on the server or very first prerender
    if (typeof document === "undefined") return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedProject) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  return (
    <section id="work" className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <Environment preset="warehouse" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />

          <Floating3DTitle />
          <ProjectCubes />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent text-center">
          MY WORK
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-500 ${
                hoveredProject === project.id ? "transform scale-105" : ""
              }`}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-lg font-medium">View Project</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2 text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-400 text-sm mb-3">{project.category}</p>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-gray-900 text-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30">
              <div className="relative">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={800}
                  height={500}
                  className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedProject.title}</h3>
                    <p className="text-purple-400 mb-4">{selectedProject.category}</p>
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.liveUrl && (
                      <Button asChild className="bg-purple-600 hover:bg-purple-700">
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button
                        variant="outline"
                        asChild
                        className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                      >
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>

                <div>
                  <h4 className="font-semibold mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
