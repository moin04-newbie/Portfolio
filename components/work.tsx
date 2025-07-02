"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "SRS-Hospital",
    category: "Web Development",
    description: " White Lotus Hospital Portal A modern hospital management portal designed to streamline hospital workflows and improve digital accessibility for staff, patients, and administrators.",
    image: "/assests/srshospital.png", // Add your project images
    technologies: ["Next.js", "TypeScript", "Tailwind CSS",],
    liveUrl: "https://white-lotus-portal.vercel.app/",
    githubUrl: "https://github.com/moin04-newbie/white-lotus-portal",
    featured: true,
  },

  {
    id: 2,
    title: "The Weather Dashboard",
    category: "Web Development",
    description: "The Weather Dashboard is a modern and responsive application that provides real-time weather updates and forecasts based on user location or searched cities. With a clean UI and detailed metrics, it serves as a handy tool for travelers, commuters, and weather enthusiasts.",
    image: "/assests/weather.png",
    technologies: ["Html", "CSS", "JavaScript", "Typescript"],
    liveUrl: "https://the-weather-dashboard-omega.vercel.app/",
    githubUrl: "https://github.com/moin04-newbie/The-Weather-Dashboard",
  },

  {
    id: 3,
    title: "The Headphone Store",
    category: "Mobile App",
    description: "A sleek and modern mobile application built with **React Native (Expo)** for browsing and shopping high-quality headphones. Designed with an intuitive UI and a smooth user experience in mind, perfect for music lovers on the go.",
    image: "/assests/appimg.png",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    liveUrl: "https://dist-dtdzqc47u-moinsayyad529-gmailcoms-projects.vercel.app/",
    githubUrl: "https://github.com/moin04-newbie/the-headphone-store",
    featured: true,
  },
  
  {
    id: 4,
    title: "E-Commerce Store",
    category: "Mobile App",
    description: "Design project description. Talk about your design process, user research, and final outcomes.",
    image: "/assests/ecomapp.png",
    technologies: ["Dart", "Html", "C"],
    liveUrl: "https://shopease-eu3o2wgeb-moinsayyad529-gmailcoms-projects.vercel.app/",
    githubUrl: "https://github.com/moin04-newbie/ecommerce-app",
    featured: true,
  },

  {
    id: 5,
    title: "App UI/UX",
    category: "UI/UX Design",
    description: "This is a modern, visually-rich portfolio website.It is designed to showcase a developer's skills, projects, and contact info in a clean and interactive layout, with support for both light and dark themes and responsive design across devices.",
    image: "/assests/app3.png",
    technologies: ["Figma", "Prototyping", "User Research"],
  },

  // Add more projects as needed
]

const categories = ["All", "Web Development", "UI/UX Design", "Mobile App"]

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const featuredProjects = projects.filter((project) => project.featured)

  useEffect(() => {
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null)
    }
  }

  return (
    <section id="work" className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight">MY WORK</h2>

        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8 text-pink-500">Featured Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">View Project</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-medium mb-2">{project.title}</h4>
                    <p className="text-pink-400 text-sm mb-3">{project.category}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`
                ${selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-black border border-white text-white hover:bg-white hover:text-black hover:border-white transition-colors duration-200"}
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">View Project</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{project.category}</p>
              <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <div className="bg-white text-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={800}
                  height={500}
                  className="w-full h-64 md:h-96 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                >
                  ✕
                </Button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedProject.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedProject.category}</p>
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.liveUrl && (
                      <Button asChild>
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button variant="outline" asChild>
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{selectedProject.description}</p>

                <div>
                  <h4 className="font-semibold mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
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
