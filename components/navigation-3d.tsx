"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation3D() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (typeof window === "undefined") return // SSR / early render safeguard

    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return

    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest(".menu-container")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Floating Navigation Header */}
      <header
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
          scrollY > 100 ? "bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl" : "bg-transparent"
        }`}
        style={{
          transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)`,
        }}
      >
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="w-5 h-5 mr-2 rotate-180 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5 mr-2 transition-transform duration-300" />
              )}
            </div>
            <span className="text-sm font-light">Menu</span>
          </Button>

          <button
            onClick={() => scrollToSection("home")}
            className="text-lg md:text-xl font-light tracking-wider hover:text-pink-400 transition-all duration-300 hover:scale-105"
          >
            <span className="bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">MOIN SAYYAD</span>
          </button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 text-sm font-light p-2 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>
        </div>
      </header>

      {/* 3D Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
          <div className="flex items-center justify-center h-full">
            <nav className="text-center space-y-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block text-4xl md:text-6xl font-light transition-all duration-500 hover:scale-110 ${
                    activeSection === item.id ? "text-pink-500 transform scale-110" : "text-white hover:text-pink-400"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isMenuOpen ? "slideInUp 0.6s ease-out forwards" : "none",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
